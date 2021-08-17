import { LanguageID } from 'languages'

export const SET_HAS_ONBOARDED = 'SET_HAS_ONBOARDED'
export const SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE =
  'SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE'
export const SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS =
  'SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS'
export const SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD =
  'SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD'
export const SET_HAS_FETCHED_LANGUAGE_DATA = 'SET_HAS_FETCHED_LANGUAGE_DATA'
export const STORE_LANGUAGE_CORE_FILE_CREATED_TIME =
  'STORE_LANGUAGE_CORE_FILE_CREATED_TIME'
export const ADD_LANGUAGE_CORE_FILE_TO_UPDATE =
  'ADD_LANGUAGE_CORE_FILE_TO_UPDATE'
export const CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE =
  'CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE'
export const STORE_ACTING_LANGUAGE_ID = 'STORE_ACTING_LANGUAGE_ID'
export const INCREMENT_GLOBAL_GROUP_COUNTER = 'INCREMENT_GLOBAL_GROUP_COUNTER'
export const SET_RECENT_ACTIVE_GROUP = 'SET_RECENT_ACTIVE_GROUP'
export const SET_GLOBAL_GROUP_COUNTER = 'SET_GLOBAL_GROUP_COUNTER'

export type LanguageInstallationActionParams =
  | SetHasOnboardedParams
  | SetHasInstalledFirstLanguageInstanceParams
  | SetHasFetchedLanguageDataParams
  | SetLanguageCoreFilesDownloadProgressParams
  | SetTotalLanguageCoreFilesToDownloadParams
  | StoreLanguageCoreFileCreatedTimeParams
  | AddLanguageCoreFileToUpdateParams
  | ClearLanguageCoreFilesToUpdateParams
  | StoreActingLanguageIDParams
  | SetRecentActiveGroupParams
  | IncrementGlobalGroupCounterParams
  | SetGlobalGroupCounterParams

interface SetHasOnboardedParams {
  type: 'SET_HAS_ONBOARDED'
  hasOnboarded: boolean
}

/**
 * Sets whether the user has completed the initial onboarding or not.
 */
export function setHasOnboarded (hasOnboarded: boolean): SetHasOnboardedParams {
  return {
    type: SET_HAS_ONBOARDED,
    hasOnboarded
  }
}
interface SetHasInstalledFirstLanguageInstanceParams {
  type: 'SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE'
  hasInstalledFirstLanguageInstance: boolean
}

/**
 * Sets whether the user has installed their first language instance or not.
 */
export function setHasInstalledFirstLanguageInstance (
  hasInstalledFirstLanguageInstance: boolean
): SetHasInstalledFirstLanguageInstanceParams {
  return {
    type: SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE,
    hasInstalledFirstLanguageInstance
  }
}
interface SetHasFetchedLanguageDataParams {
  type: 'SET_HAS_FETCHED_LANGUAGE_DATA'
  hasFetchedLanguageData: boolean
}

/**
 * Sets whether the app has fetched the necessary Firebase data for a language instance install.
 */
export function setHasFetchedLanguageData (
  hasFetchedLanguageData: boolean
): SetHasFetchedLanguageDataParams {
  return {
    type: SET_HAS_FETCHED_LANGUAGE_DATA,
    hasFetchedLanguageData
  }
}

interface SetLanguageCoreFilesDownloadProgressParams {
  type: 'SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS'
  languageCoreFilesDownloadProgress: number
}

/**
 * Sets the progress of downloading the core files for a language.
 */
export function setLanguageCoreFilesDownloadProgress (
  languageCoreFilesDownloadProgress: number
): SetLanguageCoreFilesDownloadProgressParams {
  return {
    type: SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS,
    languageCoreFilesDownloadProgress
  }
}

interface SetTotalLanguageCoreFilesToDownloadParams {
  type: 'SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD'
  totalLanguageCoreFilesToDownload: number
}

/**
 * Sets the total number of language core files to download. Used in tandem with languageCoreFilesDownloadProgress to calculate the progress through the downloads.
 */
export function setTotalLanguageCoreFilesToDownload (
  totalLanguageCoreFilesToDownload: number
): SetTotalLanguageCoreFilesToDownloadParams {
  return {
    type: SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD,
    totalLanguageCoreFilesToDownload
  }
}

interface StoreLanguageCoreFileCreatedTimeParams {
  type: 'STORE_LANGUAGE_CORE_FILE_CREATED_TIME'
  fileName: string
  timeCreated: string
}

/**
 * Stores the created time of a specific file.
 */
export function storeLanguageCoreFileCreatedTime (
  fileName: string,
  timeCreated: string
): StoreLanguageCoreFileCreatedTimeParams {
  return {
    type: STORE_LANGUAGE_CORE_FILE_CREATED_TIME,
    fileName,
    timeCreated
  }
}

interface AddLanguageCoreFileToUpdateParams {
  type: 'ADD_LANGUAGE_CORE_FILE_TO_UPDATE'
  fileName: string
}

/**
 * Adds a file name to be stored in the core files to update array.
 */
export function addLanguageCoreFileToUpdate (
  fileName: string
): AddLanguageCoreFileToUpdateParams {
  return {
    type: ADD_LANGUAGE_CORE_FILE_TO_UPDATE,
    fileName
  }
}

interface ClearLanguageCoreFilesToUpdateParams {
  type: 'CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE'
}

/**
 * Clears the core files to update array.
 */
export function clearLanguageCoreFilesToUpdate (): ClearLanguageCoreFilesToUpdateParams {
  return {
    type: CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE
  }
}

interface StoreActingLanguageIDParams {
  type: 'STORE_ACTING_LANGUAGE_ID'
  languageID: LanguageID | undefined
}

/**
 * Stores the language that is actively installing.
 */
export function storeActingLanguageID (
  languageID: LanguageID | undefined
): StoreActingLanguageIDParams {
  return {
    type: STORE_ACTING_LANGUAGE_ID,
    languageID: languageID
  }
}

interface SetRecentActiveGroupParams {
  type: 'SET_RECENT_ACTIVE_GROUP'
  groupName: string
}

/**
 * Sets the most recent active group so that if we cancel a language install, we know what group to go back to.
 */
export function setRecentActiveGroup (
  groupName: string
): SetRecentActiveGroupParams {
  return {
    type: SET_RECENT_ACTIVE_GROUP,
    groupName: groupName
  }
}

interface IncrementGlobalGroupCounterParams {
  type: 'INCREMENT_GLOBAL_GROUP_COUNTER'
}

/**
 * Increments the global group counter redux variable by 1.
 */
export function incrementGlobalGroupCounter (): IncrementGlobalGroupCounterParams {
  return {
    type: INCREMENT_GLOBAL_GROUP_COUNTER
  }
}

interface SetGlobalGroupCounterParams {
  type: 'SET_GLOBAL_GROUP_COUNTER'
  toSet: number
}

/**
 * Shortcut for setting the group counter to a specific number in case we need to manually change it.
 */
export function setGlobalGroupCounter (
  toSet: number
): SetGlobalGroupCounterParams {
  return {
    type: SET_GLOBAL_GROUP_COUNTER,
    toSet: toSet
  }
}
