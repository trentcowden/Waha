#!/usr/bin/env node

// Imports.
import 'firebase/firestore'
import {
  downloadAsset,
  getCoreFileURL,
  getLessonAssetURL,
  spawnPromise
} from './util'
var admin = require('firebase-admin')
var fs = require('fs')

// Note: to reset the app and make it ready for online mode again, run this script without any arguments.

// TODO: Figure out how to use this with modeSwitch.ts so we can distinguish between test and prod.
const serviceAccount =
  // dbMode === 'test'
  // ?
  require('./service-account-TEST.json')
// : require('./service-account-PROD.json')

// Initialize Firestore.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
})
const firestore = admin.firestore()

// Get the languages we want to include in this offline bundle.
const bundledLanguages = process.argv.slice(2)
process.env.BUNDLED_LANGUAGES = bundledLanguages.join(',')

// Build a release channel string so we can publish this offline bundle to a unique channel on expo.
const releaseChannel =
  'offline-' + process.env.BUNDLED_LANGUAGES.replace(',', '')

// Create our Firestore bundle object.
const bundle = firestore.bundle(releaseChannel)

// Clear existing downloads folder.
const targetDirectory = './assets/downloaded'
if (fs.existsSync(targetDirectory)) {
  fs.rmdirSync(targetDirectory, {
    recursive: true
  })
}

// Make a fresh downloads folder.
fs.mkdirSync(targetDirectory)

// Create a new file called master-list. This will be full of require statements for all the assets for a Language so they will be included when Expo builds the app bundle.
const assetListFile = fs.createWriteStream('./assets/downloaded/master-list.js')

// Add the start of the module exports to the new file.
assetListFile.write('module.exports = {')
assetListFile.write(`\n\tlanguages: [`)
bundledLanguages.forEach((languageID, index) => {
  assetListFile.write(`'${languageID}'`)
  if (index !== bundledLanguages.length - 1) assetListFile.write(`, `)
})
assetListFile.write(`],`)

// An array to store the async operations to run.
const promises = []

// 1. Add the Languages and Story Sets data to our Firestore bundle.
promises.push(
  firestore
    .collection('languages')
    .get()
    .then(result => {
      bundle.add('languages-query', result)
      return []
    })
)
promises.push(
  firestore
    .collection('sets')
    .get()
    .then(result => {
      bundle.add('sets-query', result)
      return []
    })
)

// Fetch all the assets we need to download and store some info about them.
Promise.all(
  bundledLanguages.map(languageID => {
    // 2. Add the Question Set mp3s and header images to the list of assets to download.
    promises.push(
      firestore
        .collection('languages')
        .doc(languageID)
        .get()
        .then(doc => {
          var assets = []
          if (doc.exists && doc.data()) {
            // Store info about all Core Files.
            doc.data().files.forEach(fileName => {
              if (fileName.includes('header'))
                assets.push({
                  name: `${languageID}-${fileName}`,
                  type: 'image',
                  url: getCoreFileURL(fileName, languageID)
                })
              else
                assets.push({
                  name: `${languageID}-${fileName}`,
                  type: 'audio',
                  url: getCoreFileURL(fileName, languageID)
                })
            })
          }
          return assets
        })
    )

    // 3. Add all of the Lesson content mp3s/mp4s to the list of assets to download.
    promises.push(
      firestore
        .collection('sets')
        .where('languageID', '==', languageID)
        .get()
        .then(result => {
          var assets = []
          // bundle.add(`${languageID}`, result)
          result.docs.map(doc => {
            if (doc.exists && doc.data()) {
              // Store info about every Lesson's assets.
              doc.data().lessons.forEach(lesson => {
                if (lesson.hasAudio) {
                  assets.push({
                    name: lesson.id,
                    type: 'audio',
                    url: getLessonAssetURL('audioSource', lesson.id)
                  })
                }
                if (lesson.hasVideo) {
                  assets.push({
                    name: lesson.id,
                    type: 'video',
                    url: getLessonAssetURL('videoSource', lesson.id)
                  })
                }
              })
            }
          })
          return assets
        })
    )
    return Promise.all(promises)
  })
)
  .then(results => {
    var allAssets = []

    // Add all of the assets into one flattened array.
    results.forEach(languageData => {
      languageData.forEach(assets => {
        if (assets)
          assets.forEach(asset => {
            allAssets.push(asset)
          })
      })
    })

    return allAssets
  })
  .then(allAssets => {
    // Location for the Firebase bundle to write.
    const file = `./assets/downloaded/all.firebase-bundle`

    // Add bundle to master list of assets to be required.
    assetListFile.write(`\r\n\tbundle: require('../.${file}')`)

    // Write bundle to file.
    fs.writeFile(file, bundle.build(), { encoding: 'binary' }, err => {
      if (err) throw err
      else console.log(`Built Firebase bundle: ${file}`)
    })

    // Create array of files to download.
    const fileDownloads = []

    // Go through each asset we must download.
    allAssets.forEach(asset => {
      // Get the information from the asset object.
      const { name, type, url } = asset

      // Get the correct file end based on the asset type.
      var fileEnd
      if (type === 'audio') fileEnd = '.mp3'
      else if (type === 'video') fileEnd = 'v.mp4'
      else fileEnd = '.png'

      // Finally, create a local path to download the Lesson content mp3 or mp4 to.
      const localFilePath = `${targetDirectory}/${name}${fileEnd}`

      // Add download to the fileDownloads array.
      fileDownloads.push(
        downloadAsset(url, localFilePath, () => {
          // Once the asset download finishes, adding it to the master list.
          assetListFile.write(
            `,\r\n\t'${name}${fileEnd}': require('../.${localFilePath}')`
          )
          console.log(`${name} successfully downloaded.`)
        })
      )
    })
    return Promise.all(fileDownloads)
  })
  .then(() => {
    console.log('\nAll files successfully downloaded.')

    assetListFile.write(`}`)
    assetListFile.close()
    // Publish to update assets
    return spawnPromise('expo', [
      'publish',
      '--release-channel',
      releaseChannel
    ])
  })
  .then(_ => {
    // Run APK build
    return spawnPromise('expo', [
      'build:android',
      '-t',
      'apk',
      '--release-channel',
      releaseChannel
    ])
  })
// .then(
//   _ => {
//     process.exit(0)
//   },
//   error => {
//     // Handle all the errors here.
//     console.error(error)
//     process.exit(1)
//   }
// )
