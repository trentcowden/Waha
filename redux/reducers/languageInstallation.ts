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
  globalGroupCounter: number
  hasOnboarded: boolean
  hasFetchedLanguageData: boolean
  hasInstalledFirstLanguageInstance: boolean
  languageCoreFilesDownloadProgress: number
  languageCoreFilesToUpdate: string[]
  actingLanguageID: string | undefined
  recentActiveGroup: string | undefined
  languageCoreFilesCreatedTimes: Record<string, number>
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
    languageCoreFilesCreatedTimes: {}
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
