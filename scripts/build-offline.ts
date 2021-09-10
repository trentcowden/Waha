#!/usr/bin/env node

import * as firebaseAdmin from 'firebase-admin'
import 'firebase/firestore'
import * as fs from 'fs'
import { Lesson } from 'redux/reducers/database'
import { getLessonInfo } from '../functions/setAndLessonDataFunctions'
import { dbMode } from '../modeSwitch'
import { requestPromise } from './util'

const serviceAccount =
  dbMode === 'test'
    ? require('./service-account-TEST.json')
    : require('./service-account-PROD.json')

const admin = firebaseAdmin

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
})

const firestore = admin.firestore()

const bundledLanguages = process.argv.slice(2)
process.env.BUNDLED_LANGUAGES = bundledLanguages.join(',')
const releaseChannel =
  'offline-' + process.env.BUNDLED_LANGUAGES.replace(',', '')

// Clear existing downloads folder.
const targetDirectory = './assets/downloaded'
if (fs.existsSync(targetDirectory)) {
  fs.rmdirSync(targetDirectory, {
    recursive: true
    // force: true
  })
}

// Make a fresh downloads folder.
fs.mkdirSync(targetDirectory)

// Create a new file called master-list. This will be full of require statements for the various Question Set mp3 and Lesson content assets to be used offline.
const assetListFile = fs.createWriteStream('./assets/downloaded/master-list.js')

// Add the start of the module exports to the new file.
assetListFile.write('module.exports = {')

const bundle = firestore.bundle(releaseChannel)

type LessonURL = {
  lessonID: string
  assetType: 'audio' | 'video'
  assetURL: string
}

type LessonURLsForALanguage = LessonURL[]

Promise.all(
  bundledLanguages.map(languageID => {
    // Determine full list of assets to download.
    // TODO: make this work for Language versions.

    const promises: Promise<void | LessonURLsForALanguage>[] = []
    promises.push(
      firestore
        .collection('languages')
        .doc(languageID)
        .get()
        .then(doc => {
          if (doc.exists && doc.data()) {
            bundle.add(doc)
          }
        })
    )
    promises.push(
      firestore
        .collection('sets')
        .where('languageID', '==', languageID)
        .get()
        .then(result => {
          const assets: LessonURLsForALanguage = []
          bundle.add(`language-${languageID}`, result)
          result.docs.map(set => {
            if (set.exists && set.data()) {
              // Queue download of video/audio for lesson if available
              set.data().lessons.forEach((lesson: Lesson) => {
                if (lesson.hasAudio) {
                  assets.push({
                    lessonID: lesson.id,
                    assetType: 'audio',
                    assetURL: getLessonInfo('audioSource', lesson.id)
                  })
                }
                if (lesson.hasVideo) {
                  assets.push({
                    lessonID: lesson.id,
                    assetType: 'video',
                    assetURL: getLessonInfo('videoSource', lesson.id)
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
    // Flatten the nested arrays of URLs into one array.
    var allLessonURLs: LessonURL[] = []

    results.forEach(languageData => {
      languageData.forEach(lessonURLs => {
        if (lessonURLs)
          lessonURLs.forEach(url => {
            allLessonURLs.push(url)
          })
      })
    })

    // const coalesce = (fileOrFiles: (void | LessonURLsForALanguage)[][] | string | LessonURLsForALanguage | LessonURLsForALanguage[]) => {
    //   if (typeof fileOrFiles === 'string') {
    //     files.push(fileOrFiles)
    //   } else if (typeof fileOrFiles === 'object') {
    //     fileOrFiles.forEach(object => {
    //       coalesce(object)
    //     })
    //   }
    // }
    // coalesce(results)
    return allLessonURLs
  })
  .then(allLessonURLs => {
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
    const fileDownloads: Promise<any>[] = []
    console.log('Downloading audio/video files...')
    allLessonURLs.forEach(lessonURL => {
      // Get the information from the lesson URL object.
      const { lessonID, assetType, assetURL } = lessonURL

      // Get the correct file end based on the asset type.
      const fileEnd = assetType === 'audio' ? '.mp3' : '.mp4'

      // Finally, create a local path to download the lesson content mp3 or mp4 to.
      const localFilePath = `${targetDirectory}/${lessonID}${fileEnd}`

      fileDownloads.push(
        requestPromise(lessonURL.assetURL).then(
          response => {
            const buffer = Buffer.from(response.body)
            // fs.mkdirSync(
            //   localFilePath
            //     .split('/')
            //     .slice(0, -1)
            //     .join('/'),
            //   { recursive: true }
            // )
            const file = fs.createWriteStream(localFilePath)
            file.write(buffer)
            file.close()
            assetListFile.write(
              `,\r\n\t${lessonID}: require('../.${localFilePath}')`
            )
          },
          reason => {
            console.log('WARN: Failed to download ' + lessonURL)
          }
        )
      )
    })
    return Promise.all(fileDownloads)
  })
  .then(_ => {
    assetListFile.write('}')
    assetListFile.close()
    // Publish to update assets
    // return spawnPromise('expo', [
    //   'publish',
    //   '--release-channel',
    //   releaseChannel
    // ])
  })
  .then(_ => {
    // Run APK build
    // return spawnPromise('expo', [
    //   'build:android',
    //   '-t',
    //   'apk',
    //   '--release-channel',
    //   releaseChannel
    // ])
  })
  .then(
    _ => {
      process.exit(0)
    },
    error => {
      // Handle all the errors here.
      console.error(error)
      process.exit(1)
    }
  )
