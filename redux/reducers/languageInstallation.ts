import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LanguageID } from 'languages'

export type LanguageInstallationState = {
  // Stores a global Group counter that goes up by 1 whenever a new Group is created. This is so that each Group and have a unique ID.
  globalGroupCounter: number
  // Whether the user has completed the onboarding slides after selecting a language.
  hasOnboarded: boolean
  // Whether the app has finished fetching Language data from Firestore.
  hasFetchedLanguageData: boolean
  // Whether the user has finished installing their first language instance, including selecting their language, going through the onboarding, and downloading all of the necessary core files.
  hasInstalledFirstLanguageInstance: boolean
  // The total number of core files to download for a language.
  totalLanguageCoreFilesToDownload: number
  // The progress of the core files download from 0 to the number of total files to download.
  languageCoreFilesDownloadProgress: number
  // An array of file names that need to be updated because they're outdated or missing.
  languageCoreFilesToUpdate: string[]
  // The ID of the language that is currently downloading or updating.
  actingLanguageID: LanguageID | undefined
  // When adding a subsequent language, we need to keep track of which Group the user was on before installing a subsequent one in case they cancel and we need to revert back to the original Group.
  recentActiveGroup: string | undefined
  // Stores the created times of the core files so that we know if we need have updated versions to download.
  languageCoreFilesCreatedTimes: Record<string, string>
}

const initialState: LanguageInstallationState = {
  globalGroupCounter: 0,
  hasOnboarded: false,
  hasFetchedLanguageData: false,
  hasInstalledFirstLanguageInstance: false,
  languageCoreFilesDownloadProgress: 0,
  languageCoreFilesToUpdate: [],
  actingLanguageID: undefined,
  recentActiveGroup: undefined,
  languageCoreFilesCreatedTimes: {},
  totalLanguageCoreFilesToDownload: 0
}

/**
 * This reducer stores a bunch of info related to the installation of a language.
 */
const languageInstallation = createSlice({
  name: 'languageInstallation',
  initialState,
  reducers: {
    setHasOnboarded: (state, action: PayloadAction<{ toSet: boolean }>) => {
      state.hasOnboarded = action.payload.toSet
    },
    setHasInstalledFirstLanguageInstance: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.hasInstalledFirstLanguageInstance = action.payload.toSet
    },
    setHasFetchedLanguageData: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.hasFetchedLanguageData = action.payload.toSet
    },
    setLanguageCoreFilesDownloadProgress: (
      state,
      action: PayloadAction<{ progress: number }>
    ) => {
      state.languageCoreFilesDownloadProgress = action.payload.progress
    },
    setTotalLanguageCoreFilesToDownload: (
      state,
      action: PayloadAction<{ filesToDownload: number }>
    ) => {
      state.totalLanguageCoreFilesToDownload = action.payload.filesToDownload
    },
    storeLanguageCoreFileCreatedTime: (
      state,
      action: PayloadAction<{ fileName: string; createdTime: string }>
    ) => {
      state.languageCoreFilesCreatedTimes = {
        ...state.languageCoreFilesCreatedTimes,
        [action.payload.fileName]: action.payload.createdTime
      }
    },
    addLanguageCoreFileToUpdate: (
      state,
      action: PayloadAction<{ fileName: string }>
    ) => {
      state.languageCoreFilesToUpdate.push(action.payload.fileName)
    },
    clearLanguageCoreFilesToUpdate: state => {
      state.languageCoreFilesToUpdate = []
    },
    storeActingLanguageID: (
      state,
      action: PayloadAction<{ languageID: LanguageID | undefined }>
    ) => {
      state.actingLanguageID = action.payload.languageID
    },
    setRecentActiveGroup: (
      state,
      action: PayloadAction<{ groupName: string }>
    ) => {
      state.recentActiveGroup = action.payload.groupName
    },
    incrementGlobalGroupCounter: state => {
      state.globalGroupCounter += 1
    },
    setGlobalGroupCounter: (
      state,
      action: PayloadAction<{ counter: number }>
    ) => {
      state.globalGroupCounter = action.payload.counter
    }
  }
})

export const {
  setHasOnboarded,
  setHasInstalledFirstLanguageInstance,
  setHasFetchedLanguageData,
  setLanguageCoreFilesDownloadProgress,
  setTotalLanguageCoreFilesToDownload,
  storeLanguageCoreFileCreatedTime,
  addLanguageCoreFileToUpdate,
  clearLanguageCoreFilesToUpdate,
  storeActingLanguageID,
  setRecentActiveGroup,
  incrementGlobalGroupCounter,
  setGlobalGroupCounter
} = languageInstallation.actions
export default languageInstallation.reducer
