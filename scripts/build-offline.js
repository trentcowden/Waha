#!/usr/bin/env node

// Imports.
import 'firebase/firestore'
var admin = require('firebase-admin')
var fs = require('fs')
var axios = require('axios')

// Note: to reset the app and make it ready for online mode again, run this script without any arguments.

/**
 * Downloads an asset from a URL and saves it to a path. Used to download audio, video, and image files.
 */
const downloadAsset = (url, path, callback) => {
  var file = fs.createWriteStream(path)
  return axios({
    url,
    responseType: 'stream'
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(file)
          .on('finish', () => {
            file.close(() => {
              callback()
              resolve()
            })
          })
          .on('error', e => reject(e))
      })
  )
}

/**
 * Gets the URL for a piece of Lesson content.
 */
export const getLessonAssetURL = (type, lessonID) => {
  // Split the ID up into separate sections.
  var idComponents = lessonID.split('.')

  // An example lessonID is "en.1.1.1".
  switch (type) {
    case 'audioSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] +
        '.' +
        idComponents[2]}%2F${lessonID}.mp3?alt=media`
    case 'videoSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] + '.' + idComponents[2]}%2F${lessonID +
        'v'}.mp4?alt=media`
    default:
      return undefined
  }
}

/**
 * Gets the URL for a Language Core File.
 */
const getCoreFileURL = (fileName, languageID) => {
  const urlStart = `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${languageID}%2Fother%2F`

  const urlEnd = fileName.includes('header')
    ? '.png?alt=media'
    : '.mp3?alt=media'

  return `${urlStart}${fileName}${urlEnd}`
}

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
const setsFile = fs.createWriteStream('./assets/downloaded/sets.js')
const languageConfigsFile = fs.createWriteStream(
  './assets/downloaded/languageConfigs.js'
)

// Add the start of the module exports to the new file.
assetListFile.write('module.exports = {')
setsFile.write('module.exports = [')
languageConfigsFile.write('module.exports = {')

// Fetch all the assets we need to download and store some info about them.
Promise.all(
  bundledLanguages.map(languageID => {
    // Determine full list of assets to download.
    const promises = []
    promises.push(
      firestore
        .collection('languages')
        .doc(languageID)
        .get()
        .then(doc => {
          var assets = []
          if (doc.exists && doc.data()) {
            // Write the language config info to a file.
            const files = doc.data().files
            const questions = doc.data().questions

            bundle.add(doc)
            languageConfigsFile.write(
              `\n\t${languageID}: {\n\t\tfiles: [\n\t\t\t`
            )

            files.forEach(fileName => {
              languageConfigsFile.write(`"${fileName}",\n\t\t\t`)
            })
            languageConfigsFile.write(`],\n\t\tquestions: {\n\t\t\t`)

            Object.keys(questions).forEach(questionSet => {
              languageConfigsFile.write(`"${questionSet}": [\n\t\t\t\t`)
              questions[questionSet].forEach(question => {
                languageConfigsFile.write(
                  `"${question.replace(/"/g, '\\"')}",\n\t\t\t\t`
                )
              })
              languageConfigsFile.write(`], \n\t\t\t`)
            })
            languageConfigsFile.write(`}\n\t\t}`)

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
    // var languagesSnapshot = await firestore.collection('languages').get()
    // var setsSnapshot = await firestore.collection('sets').get()
    // bundle.add('languages-query', languagesSnapshot)
    // bundle.add('sets-query', setsSnapshot)
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

    promises.push(
      firestore
        .collection('sets')
        .where('languageID', '==', languageID)
        .get()
        .then(result => {
          var assets = []
          bundle.add(`${languageID}`, result)
          result.docs.map(doc => {
            if (doc.exists && doc.data()) {
              // const set = doc.data()
              /*
                id: doc.id,
                languageID: doc.data().languageID,
                title: doc.data().title,
                subtitle: doc.data().subtitle,
                iconName: doc.data().iconName,
                lessons: doc.data().lessons,
                tags: doc.data().tags,
              */
              // Write the set to a js file.
              // setsFile.write(`\n\t{\n\t\tid: ${doc.id},\n\t\tlanguageID: ${set.languageID},\n\t\ttitle: ${set.title},\n\t\tsubtitle: ${set.subtitle},\n\t\t`)

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
    languageConfigsFile.write(`\n}`)
    // Flatten the nested arrays of asset info into one array.
    var allAssets = []

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
    // Write bundle to file.
    const file = `./assets/downloaded/all.firebase-bundle`
    assetListFile.write(`\r\n\tbundle: require('../.${file}')`)
    fs.writeFile(file, bundle.build(), { encoding: 'binary' }, err => {
      if (err) {
        throw err
      } else {
        console.log(`Built Firebase bundle: ${file}`)
      }
    })

    // Download audio/video files.
    const fileDownloads = []

    allAssets.forEach(asset => {
      // Get the information from the asset object.
      const { name, type, url } = asset

      // Get the correct file end based on the asset type.
      var fileEnd
      if (type === 'audio') fileEnd = '.mp3'
      else if (type === 'video') fileEnd = '.mp4'
      else fileEnd = '.png'

      // Finally, create a local path to download the lesson content mp3 or mp4 to.
      const localFilePath = `${targetDirectory}/${name}${fileEnd}`
      // const localFilePath = `${targetDirectory}/${name}`

      // const file = fs.createWriteStream(localFilePath)

      fileDownloads.push(
        downloadAsset(url, localFilePath, () => {
          // file.close()
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
    assetListFile.close(() => {
      'file closed successfully'
    })
    // Publish to update assets
    // return spawnPromise('expo', [
    //   'publish',
    //   '--release-channel',
    //   releaseChannel
    // ])
  })
// .then(_ => {
// Run APK build
// return spawnPromise('expo', [
//   'build:android',
//   '-t',
//   'apk',
//   '--release-channel',
//   releaseChannel
// ])
// })
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
