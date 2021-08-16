export const STORE_LANGUAGE_DATA = 'STORE_LANGUAGE_DATA'
export const STORE_LANGUAGE_SETS = 'STORE_LANGUAGE_SETS'
export const DELETE_LANGUAGE_DATA = 'DELETE_LANGUAGE_DATA'

import * as FileSystem from 'expo-file-system'
import { DownloadResumable } from 'expo-file-system'
import * as Localization from 'expo-localization'
import firebase from 'firebase'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { logInstallLanguage } from '../../functions/analyticsFunctions'
import { LanguageData, StorySet } from '../reducers/database'
import { AppDispatch, RootState } from '../store'
import { setIsInstallingLanguageInstance } from './isInstallingLanguageInstanceActions'
import {
  clearLanguageCoreFilesToUpdate,
  setHasFetchedLanguageData,
  setHasInstalledFirstLanguageInstance,
  setLanguageCoreFilesDownloadProgress,
  setTotalLanguageCoreFilesToDownload,
  storeActingLanguageID,
  storeLanguageCoreFileCreatedTime
} from './languageInstallationActions'
import { storeDownloads } from './storedDownloadsActions'

interface StoreLanguageDataParams {
  type: 'STORE_LANGUAGE_DATA'
  languageData: LanguageData
  languageInstanceID: string
}

interface StoreLanguageSetsParams {
  type: 'STORE_LANGUAGE_SETS'
  languageSets: StorySet[]
  languageInstanceID: string
}

interface DeleteLanguageDataParams {
  type: 'DELETE_LANGUAGE_DATA'
  languageInstanceID: string
}

export type DatabaseActionParams =
  | StoreLanguageDataParams
  | StoreLanguageSetsParams
  | DeleteLanguageDataParams

/**
 * Stores the language data for a language instance in redux. This includes the display name, the bible ID, whether this language is RTL, the primary color of this language instance, the list of core files to download, the questions for every question set, and all the app t.
 * @export
 * @param {Object} languageData - All the data for a language.
 * @param {string} languageInstanceID - The ID of the language instance that we're storing data for.
 * @return {Object} - Object to send to the reducer.
 */
export function storeLanguageData (
  languageData: LanguageData,
  languageInstanceID: string
): StoreLanguageDataParams {
  return {
    type: STORE_LANGUAGE_DATA,
    languageData,
    languageInstanceID
  }
}

/**
 * Stores all the sets for a language instance. The sets are stored as individual objects in Firestore but are combined before getting to this action. Then, they are stored as the "sets" key in the language data object.
 * @export
 * @param {Object[]} languageSets - An array of all the sets to store in redux.
 * @param {string} languageInstanceID - The ID of the language instance that we're storing data for.
 * @return {Object} - Object to send to the reducer.
 */
export function storeLanguageSets (
  languageSets: StorySet[],
  languageInstanceID: string
): StoreLanguageSetsParams {
  return {
    type: STORE_LANGUAGE_SETS,
    languageSets,
    languageInstanceID
  }
}

/**
 * Deletes all of the redux data for a language instance. This includes language data and language sets.
 * @export
 * @param {string} languageInstanceID - The ID of the language instance to delete.
 * @return {Object} - Object to send to the reducer.
 */
export function deleteLanguageData (
  languageInstanceID: string
): DeleteLanguageDataParams {
  return {
    type: DELETE_LANGUAGE_DATA,
    languageInstanceID
  }
}

/**
 * Downloads all the core files for a single language instance and does a whole bunch of stuff once they're done downloading. The core files include the header image, the dummy story mp3, and every question set mp3.
 * @export
 * @param {string} language - The ID for the language instance that we're downloading the core files for.
 */
export function downloadLanguageCoreFiles (
  language: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // Store the ID of the language that we're downloading core files for so that if we cancel the install, we know what language to delete from the database.
    dispatch(storeActingLanguageID(language))

    // Set the totalDownloaded variable to 0. This is our download progress tracking variable. We add one to this variable whenever we finish downloading a file.
    var totalDownloaded = 0

    // Set the setTotalLanguageCoreFilesToDownload redux variable to the number of files we have to download.
    dispatch(
      setTotalLanguageCoreFilesToDownload(
        getState().database[language].files.length
      )
    )

    // 1. Add all the download resumables into one array.
    var filesToDownload: DownloadResumable[] = []

    // Run some code for each file we have to download for a language instance. The files we have to download are stored in our redux database (which we fetched from firebase).
    getState().database[language].files.forEach(fileName => {
      // Create download object.
      var download: DownloadResumable

      // Set the file extension based on what type of file we're downloading. Every language core file is an mp3 except for the header image which is a png.

      var fileExtension = fileName.includes('header') ? 'png' : 'mp3'

      // Set the firebase storage URL to download from. The file structure in firebase must be set up exactly right for this link to work.

      var url = `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language}%2Fother%2F${fileName}.${fileExtension}?alt=media`

      // Set the local storage path to download to and the name of the file. The format is simple: FileSystem/languageID-fileName.extension.

      var localPath = `${FileSystem.documentDirectory}${language}-${fileName}.${fileExtension}`

      // Create the download object. Uses url and localPath from above, an empty parameters object, and an empty callback function.
      download = FileSystem.createDownloadResumable(
        url,
        localPath,
        {},
        () => {}
      )

      // Add this download to the filesToDownload object.
      filesToDownload.push(download)

      // Add the time created of this file to our createdTimes redux object so that we know later if a file gets updated.
      firebase
        .storage()
        .refFromURL(url)
        .getMetadata()
        .then(metadata =>
          dispatch(
            storeLanguageCoreFileCreatedTime(
              `${language}-${fileName}`,
              metadata.timeCreated
            )
          )
        )
    })

    // 2. Store out download resumables array in redux.
    dispatch(storeDownloads(filesToDownload))

    // 3. Start all the downloads in the download resumables array in parallel.

    /**
     * Downloads one file. Updates the total files downloaded redux variable once it's finished so we know how many files we've downloaded.
     * @param {Object} resumable - The download resumable object.
     */
    function downloadFile (resumable: DownloadResumable) {
      return resumable
        .downloadAsync()
        .catch(error => console.log(error))
        .then(status => {
          if (status) {
            totalDownloaded += 1
            dispatch(setLanguageCoreFilesDownloadProgress(totalDownloaded))
          }
        })
    }

    // Create an array of all of our download resumable objects. This is what allows us to execute some code once all the downloads finish using Promise.all.
    const downloadFunctions = filesToDownload.map(resumable =>
      downloadFile(resumable)
    )

    // Start all of our downloads at once.
    Promise.all(downloadFunctions)
      .then(() => {
        // Once all the downloads have finished...
        if (
          getState().database[language] &&
          totalDownloaded === getState().database[language].files.length
        ) {
          // Log the language install in firebase for firebase analytics.
          logInstallLanguage(language, Localization.locale)

          // Set our actingLanguageID variable to null since we're not downloading a language instance anymore.
          dispatch(storeActingLanguageID(undefined))

          // Set the isInstallingLanguageInstance redux variable to false since we're no longer actively installing a language instance.
          dispatch(setIsInstallingLanguageInstance(false))

          // Set the hasInstalledFirstLanguageInstance redux variable to true because we've finished installing our first language instance.
          dispatch(setHasInstalledFirstLanguageInstance(true))

          // Set the hasFetchedLanguageData variable to false so that on the next language install, it starts out as false.
          dispatch(setHasFetchedLanguageData(false))

          // Set the languageCoreFilesDownloadProgress to 0 so that next time we install a language instance, our progress starts out at 0.
          dispatch(setLanguageCoreFilesDownloadProgress(0))

          // Clear stored downloads.
          dispatch(storeDownloads([]))

          // Set the setTotalLanguageCoreFilesToDownload to the number of files to download for this language. I think this is only here to avoid divide-by-zero erros but I'm not sure. I'm just too scared to delete it.
          dispatch(setTotalLanguageCoreFilesToDownload(1))
        }
      })
      .catch(error => console.log(error))
  }
}

/**
 * Very similar to downloadLanguageCoreFiles, but with a few key differences. This function is used to update core files in an already-installed language instance instead of downloading core files for a new one. We download any files stored in languageCoreFilesToUpdate instead of every core file for a language instance. Note: there's no language parameter as this function can update core files for multiple language instances at the same time if need be.
 * @export
 */
export function updateLanguageCoreFiles (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // Set the totalDownloaded variable to 0. This is our update progress tracking variable. We add one to this variable whenever we finish downloading a file.
    var totalDownloaded = 0

    // Remove any duplicates in the languageCoreFilesToUpdate variable.
    var languageCoreFilesToUpdate = getState().languageInstallation.languageCoreFilesToUpdate.filter(
      (item, pos) =>
        getState().languageInstallation.languageCoreFilesToUpdate.indexOf(
          item
        ) == pos
    )

    // Set the totalLanguageCoreFilesToDownload redux variable to the number of files we have to update.
    dispatch(
      setTotalLanguageCoreFilesToDownload(languageCoreFilesToUpdate.length)
    )

    // 1. Add all the download resumables into one array.
    var filesToDownload: DownloadResumable[] = []

    // Run some code for each file we have to download for a language instance. The files we have to download are stored in our redux database (which we fetched from firebase).
    languageCoreFilesToUpdate.forEach(fileName => {
      // This is here because I'm a fool and didn't automatically include the language ID in the file names in Firebase. Therefore, we have to remove the language ID here. Will be fixed soon.
      var languageID = fileName.slice(0, 2)

      // The shortened file name is the file name without the language ID. So en-header.png would be header.png.
      var shortenedFileName = fileName.slice(3)

      // Create the download object.
      var download

      // Set the file extension based on what type of file we're downloading. Every language core file is an mp3 except for the header image which is a png.
      var fileExtension = shortenedFileName.includes('header') ? 'png' : 'mp3'

      // Set the firebase storage URL to download from. The file structure in firebase must be set up exactly right for this link to work.

      var url = `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${languageID}%2Fother%2F${shortenedFileName}.${fileExtension}?alt=media`

      // Set the local storage path to download to and the name of the file. The format is simple: "FileSystem/languageID-localFileName.extension".
      var localPath = `${FileSystem.documentDirectory}${fileName}.${fileExtension}`

      // Create the download object. Uses url and localPath from above, an empty parameters object, and an empty callback function.
      download = FileSystem.createDownloadResumable(
        url,
        localPath,
        {},
        () => {}
      )

      // Add this download resumable to the filesToDownload object.
      filesToDownload.push(download)

      // Add the new created time of this core file to our createdTimes redux object so that we know later if a core file gets updated.
      firebase
        .storage()
        .refFromURL(url)
        .getMetadata()
        .then(metadata =>
          dispatch(
            storeLanguageCoreFileCreatedTime(fileName, metadata.timeCreated)
          )
        )
    })

    // 2. Store out download resumables array in redux.
    dispatch(storeDownloads(filesToDownload))

    // 3. Start all the downloads in the download resumables array in parallel.

    /**
     * Downloads one file. Updates the total files downloaded redux variable once it's finished so we know how many files we've downloaded.
     * @param {Object} resumable - The download resumable object.
     */
    function downloadFile (resumable: DownloadResumable) {
      return resumable
        .downloadAsync()
        .catch(error => console.log(error))
        .then(status => {
          if (status) {
            totalDownloaded += 1
            dispatch(setLanguageCoreFilesDownloadProgress(totalDownloaded))
          }
        })
    }

    // Create an array of all of our download resumable objects. This is what allows us to execute some code once all the downloads finish using Promise.all.
    const downloadFunctions = filesToDownload.map(resumable =>
      downloadFile(resumable)
    )

    // Start all of our downloads at once.
    Promise.all(downloadFunctions).then(() => {
      // Once all the downloads have finished...
      if (totalDownloaded === languageCoreFilesToUpdate.length) {
        // Set the isInstallingLanguageInstance redux variable to false since we're no longer actively installing a language instance.
        dispatch(setIsInstallingLanguageInstance(false))

        // Set the hasFetchedLanguageData variable to false so that on the next language install, it starts out as false.
        dispatch(setHasFetchedLanguageData(false))

        // Set the languageCoreFilesToUpdate redux variable to an empty array since we've downloaded all the new files that we need to.
        dispatch(clearLanguageCoreFilesToUpdate())

        // Set the languageCoreFilesDownloadProgress to 0 so that next time we install a language instance, our progress starts out at 0.
        dispatch(setLanguageCoreFilesDownloadProgress(0))

        // Clear stored downloads.
        dispatch(storeDownloads([]))

        // I think this is only here to avoid divide-by-zero erros but I'm not sure. I'm just too scared to delete it.
        dispatch(setTotalLanguageCoreFilesToDownload(1))
      }
    })
  }
}
