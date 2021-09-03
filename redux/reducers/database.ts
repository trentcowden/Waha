import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as FileSystem from 'expo-file-system'
import { DownloadResumable } from 'expo-file-system'
import * as Localization from 'expo-localization'
import firebase from 'firebase'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { logInstallLanguage } from '../../functions/analyticsFunctions'
import { LanguageID } from '../../languages'
import { setIsInstallingLanguageInstance } from '../reducers/isInstallingLanguageInstance'
import {
  clearLanguageCoreFilesToUpdate,
  setHasFetchedLanguageData,
  setHasInstalledFirstLanguageInstance,
  setLanguageCoreFilesDownloadProgress,
  setTotalLanguageCoreFilesToDownload,
  storeActingLanguageID,
  storeLanguageCoreFileCreatedTime
} from '../reducers/languageInstallation'
import { storeDownloads } from '../reducers/storedDownloads'
import { AppDispatch, RootState } from '../store'

// Waha's local database is an object where the 2-character language ID's are keys and the language's data are the values.
export type Database = Record<string, DBLanguageData>

// This is all of a language's data, except for all of its Story Sets, that is stored in the Firestore database.
export interface FirestoreLanguageData {
  // The core files that must be downloaded to the device when a language is installed.
  files: string[]
  // Every question set for a language. Keys are the names of the question sets.
  questions: {
    // A question set contains an array of strings, one for each question.
    [questionSetName: string]: string[]
  }
}

// This is all of the data that is stored for a language in the local database.
export type DBLanguageData = FirestoreLanguageData & {
  // The install time for a language so that they can be ordered appropriately when listed in the app.
  installTime: number
  // All of the Story Sets for a language.
  sets: StorySet[]
}

export interface StorySet {
  // The ID of a set in the format xx.1.1, where xx is the language ID.
  id: string
  // The ID of the language that a Story Set is a part of.
  languageID: LanguageID
  title: string
  subtitle: string
  // The name of the icon for a Story Set. See the <SVG /> component for a list of available icons.
  iconName: string
  // The lessons for a Story Set.
  lessons: Lesson[]
  // Tags used to filter Topical Story Sets on the <AddSetScreen /> since there could be a lot of them.
  tags?: string[]
}

export interface Lesson {
  id: string
  title: string
  // Whether a lesson has an audio file stored in Firebase storage.
  hasAudio: boolean
  // Whether a lesson has a video file stored in Firebase storage.
  hasVideo: boolean
  // For lessons that have questions, this is the question set to be used with a lesson's Fellowship chapter.
  fellowshipType?: string
  // For lessons that have questions, this is the question set to be used with a lesson's Application chapter.
  applicationType?: string
  // For book or audiobook lessons, this is the text content for the book.
  text?: string
  // For lessons with videos, this is a shareable link to the video.
  videoShareLink?: string
  // For lessons that have Scripture, this is an array of Scripture passages.
  scripture?: ScripturePassage[]
}

export interface ScripturePassage {
  // The header to be displayed above the Scripture text.
  header: string
  // The API.Bible ID used to dynamically import the Scripture text and header, and is also handy for knowing what Scripture a ScripturePassage is for, since the header will likely not be in English. From https://docs.api.bible/guides/passages: "Capture a range of verses when looking for a grouping (i.e. MAT.1.12-MAT.1.20)".
  addressID: string
  // The Scripture text.
  text: string
}

const initialState: Database = {}

const database = createSlice({
  name: 'database',
  initialState,
  reducers: {
    storeLanguageData: (
      state,
      action: PayloadAction<{
        languageData: FirestoreLanguageData
        languageID: LanguageID
      }>
    ) => {
      state[action.payload.languageID] = {
        ...state[action.payload.languageID],
        files: action.payload.languageData.files,
        questions: action.payload.languageData.questions,
        installTime: state[action.payload.languageID].installTime
          ? state[action.payload.languageID].installTime
          : Date.now()
      }
    },
    storeLanguageSets: (
      state,
      action: PayloadAction<{
        sets: StorySet[]
        languageID: LanguageID
      }>
    ) => {
      state[action.payload.languageID] = {
        ...state[action.payload.languageID],
        sets: action.payload.sets
      }
    },
    deleteLanguageData: (
      state,
      action: PayloadAction<{ languageID: LanguageID }>
    ) => {
      delete state[action.payload.languageID]
    }
  }
})

export const {
  storeLanguageData,
  storeLanguageSets,
  deleteLanguageData
} = database.actions
export default database.reducer

/**
 * Downloads all the core files for a single language instance and does a whole bunch of stuff once they're done downloading. The core files include the header image, the dummy story mp3, and every question set mp3.
 */
export function downloadLanguageCoreFiles (
  language: LanguageID
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // Store the ID of the language that we're downloading core files for so that if we cancel the install, we know what language to delete from the database.
    dispatch(storeActingLanguageID({ languageID: language }))

    // Set the totalDownloaded variable to 0. This is our download progress tracking variable. We add one to this variable whenever we finish downloading a file.
    var totalDownloaded = 0

    // Set the setTotalLanguageCoreFilesToDownload redux variable to the number of files we have to download.
    dispatch(
      setTotalLanguageCoreFilesToDownload({
        filesToDownload: getState().database[language].files.length
      })
    )

    // This array is used to store the various Expo DownloadResumable objects for the core files we must download for a language. See https://docs.expo.dev/versions/latest/sdk/filesystem/ for more info.
    var filesToDownload: DownloadResumable[] = []

    // Run some code for each file we have to download for a language instance. The names for the files we have to download are stored in our redux database (which we fetched from Firestore).
    getState().database[language].files.forEach((fileName: string) => {
      // Create a new download object.
      var download: DownloadResumable

      // Set the file extension based on what type of file we're downloading. Every language core file is an mp3 except for the header and header-dark images which are png's.
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

      // Add this download to the filesToDownload array.
      filesToDownload.push(download)

      // Add the created time of this file to our createdTimes redux object so that we know later if a file gets updated.
      firebase
        .storage()
        .refFromURL(url)
        .getMetadata()
        .then(metadata =>
          dispatch(
            storeLanguageCoreFileCreatedTime({
              fileName: `${language}-${fileName}`,
              createdTime: metadata.timeCreated
            })
          )
        )
    })

    // Store our download resumables array in redux so that we can cancel them later if necessary.
    dispatch(storeDownloads({ resumables: filesToDownload }))

    /**
     * Downloads one file. Updates the total files downloaded redux variable once it's finished so we know how many files we've downloaded.
     */
    function downloadFile (resumable: DownloadResumable) {
      return resumable
        .downloadAsync()
        .catch(error => console.log(error))
        .then(status => {
          if (status) {
            totalDownloaded += 1
            dispatch(
              setLanguageCoreFilesDownloadProgress({
                progress: totalDownloaded
              })
            )
          }
        })
    }

    // Create an array of all of our download resumable objects. This is what allows us to execute some code once all the downloads finish using Promise.all.
    const downloadFunctions = filesToDownload.map(resumable =>
      downloadFile(resumable)
    )

    // Start all the downloads in the download resumables array in parallel.
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
          dispatch(storeActingLanguageID({ languageID: undefined }))

          // Set the isInstallingLanguageInstance redux variable to false since we're no longer actively installing a language instance.
          dispatch(setIsInstallingLanguageInstance({ toSet: false }))

          // Set the hasInstalledFirstLanguageInstance redux variable to true because we've finished installing our first language instance.
          dispatch(setHasInstalledFirstLanguageInstance({ toSet: true }))

          // Set the hasFetchedLanguageData variable to false so that on the next language install, it starts out as false.
          dispatch(setHasFetchedLanguageData({ toSet: false }))

          // Set the languageCoreFilesDownloadProgress to 0 so that next time we install a language instance, our progress starts out at 0.
          dispatch(setLanguageCoreFilesDownloadProgress({ progress: 0 }))

          // Clear stored downloads.
          dispatch(storeDownloads({ resumables: [] }))

          // Set the setTotalLanguageCoreFilesToDownload to the number of files to download for this language. I think this is only here to avoid divide-by-zero errors but I'm not sure. I'm just too scared to delete it.
          dispatch(setTotalLanguageCoreFilesToDownload({ filesToDownload: 1 }))
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
      setTotalLanguageCoreFilesToDownload({
        filesToDownload: languageCoreFilesToUpdate.length
      })
    )

    // This array is used to store the various Expo DownloadResumable objects for the core files we must download for a language. See https://docs.expo.dev/versions/latest/sdk/filesystem/ for more info.
    var filesToDownload: DownloadResumable[] = []

    // Run some code for each file we have to download for a language instance. The names for the files we have to download are stored in our redux database (which we fetched from Firestore).
    languageCoreFilesToUpdate.forEach(fileName => {
      // This is here because I'm a fool and didn't automatically include the language ID in the file names in Firebase. Therefore, we have to remove the language ID here.
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
            storeLanguageCoreFileCreatedTime({
              fileName,
              createdTime: metadata.timeCreated
            })
          )
        )
    })

    // Store out download resumables array in redux.
    dispatch(storeDownloads({ resumables: filesToDownload }))

    /**
     * Downloads one file. Updates the total files downloaded redux variable once it's finished so we know how many files we've downloaded.
     */
    function downloadFile (resumable: DownloadResumable) {
      return resumable
        .downloadAsync()
        .catch(error => console.log(error))
        .then(status => {
          if (status) {
            totalDownloaded += 1
            dispatch(
              setLanguageCoreFilesDownloadProgress({
                progress: totalDownloaded
              })
            )
          }
        })
    }

    // Create an array of all of our download resumable objects. This is what allows us to execute some code once all the downloads finish using Promise.all.
    const downloadFunctions = filesToDownload.map(resumable =>
      downloadFile(resumable)
    )

    // Start all the downloads in the download resumables array in parallel.
    Promise.all(downloadFunctions).then(() => {
      // Once all the downloads have finished...
      if (totalDownloaded === languageCoreFilesToUpdate.length) {
        // Set the isInstallingLanguageInstance redux variable to false since we're no longer actively installing a language instance.
        dispatch(setIsInstallingLanguageInstance({ toSet: false }))

        // Set the hasFetchedLanguageData variable to false so that on the next language install, it starts out as false.
        dispatch(setHasFetchedLanguageData({ toSet: false }))

        // Set the languageCoreFilesToUpdate redux variable to an empty array since we've downloaded all the new files that we need to.
        dispatch(clearLanguageCoreFilesToUpdate())

        // Set the languageCoreFilesDownloadProgress to 0 so that next time we install a language instance, our progress starts out at 0.
        dispatch(setLanguageCoreFilesDownloadProgress({ progress: 0 }))

        // Clear stored downloads.
        dispatch(storeDownloads({ resumables: [] }))

        // I think this is only here to avoid divide-by-zero errors but I'm not sure. I'm just too scared to delete it.
        dispatch(setTotalLanguageCoreFilesToDownload({ filesToDownload: 1 }))
      }
    })
  }
}
