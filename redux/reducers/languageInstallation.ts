import { LanguageID } from 'languages'
import {
  ADD_LANGUAGE_CORE_FILE_TO_UPDATE,
  CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE,
  INCREMENT_GLOBAL_GROUP_COUNTER,
  LanguageInstallationActionParams,
  SET_GLOBAL_GROUP_COUNTER,
  SET_HAS_FETCHED_LANGUAGE_DATA,
  SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE,
  SET_HAS_ONBOARDED,
  SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS,
  SET_RECENT_ACTIVE_GROUP,
  SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD,
  STORE_ACTING_LANGUAGE_ID,
  STORE_LANGUAGE_CORE_FILE_CREATED_TIME
} from '../actions/languageInstallationActions'

export type CoreFileCreatedTimes = Record<string, number>

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

export function languageInstallation (
  state: LanguageInstallationState = {
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
  },
  params: LanguageInstallationActionParams
) {
  switch (params.type) {
    case INCREMENT_GLOBAL_GROUP_COUNTER:
      return {
        ...state,
        globalGroupCounter: state.globalGroupCounter + 1
      }
    case SET_GLOBAL_GROUP_COUNTER:
      return {
        ...state,
        globalGroupCounter: params.toSet
      }
    case SET_HAS_ONBOARDED:
      return { ...state, hasOnboarded: params.hasOnboarded }
    case SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE:
      return {
        ...state,
        hasInstalledFirstLanguageInstance:
          params.hasInstalledFirstLanguageInstance
      }
    case SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS:
      return {
        ...state,
        languageCoreFilesDownloadProgress:
          params.languageCoreFilesDownloadProgress
      }
    case SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD:
      return {
        ...state,
        totalLanguageCoreFilesToDownload:
          params.totalLanguageCoreFilesToDownload
      }
    case STORE_LANGUAGE_CORE_FILE_CREATED_TIME:
      return {
        ...state,
        languageCoreFilesCreatedTimes: {
          ...state.languageCoreFilesCreatedTimes,
          [params.fileName]: params.timeCreated
        }
      }
    case ADD_LANGUAGE_CORE_FILE_TO_UPDATE:
      return {
        ...state,
        languageCoreFilesToUpdate: [
          ...state.languageCoreFilesToUpdate,
          params.fileName
        ]
      }
    case CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE:
      return {
        ...state,
        languageCoreFilesToUpdate: []
      }
    case SET_HAS_FETCHED_LANGUAGE_DATA:
      return { ...state, hasFetchedLanguageData: params.hasFetchedLanguageData }
    case STORE_ACTING_LANGUAGE_ID:
      return {
        ...state,
        actingLanguageID: params.languageID
      }
    case SET_RECENT_ACTIVE_GROUP:
      return {
        ...state,
        recentActiveGroup: params.groupName
      }
    default:
      return state
  }
}
