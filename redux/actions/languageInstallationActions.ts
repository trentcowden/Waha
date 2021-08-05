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

interface SetHasOnboardedParams {
  type: 'SET_HAS_ONBOARDED'
  hasOnboarded: boolean
}

interface SetHasInstalledFirstLanguageInstanceParams {
  type: 'SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE'
  hasInstalledFirstLanguageInstance: boolean
}

interface SetHasFetchedLanguageDataParams {
  type: 'SET_HAS_FETCHED_LANGUAGE_DATA'
  hasFetchedLanguageData: boolean
}

interface SetLanguageCoreFilesDownloadProgressParams {
  type: 'SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS'
  languageCoreFilesDownloadProgress: number
}

interface SetTotalLanguageCoreFilesToDownloadParams {
  type: 'SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD'
  totalLanguageCoreFilesToDownload: number
}

interface StoreLanguageCoreFileCreatedTimeParams {
  type: 'STORE_LANGUAGE_CORE_FILE_CREATED_TIME'
  fileName: string
  timeCreated: number
}

interface AddLanguageCoreFileToUpdateParams {
  type: 'ADD_LANGUAGE_CORE_FILE_TO_UPDATE'
  fileName: string
}

interface ClearLanguageCoreFilesToUpdateParams {
  type: 'CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE'
}

interface StoreActingLanguageIDParams {
  type: 'STORE_ACTING_LANGUAGE_ID'
  languageID: string | undefined
}

interface SetRecentActiveGroupParams {
  type: 'SET_RECENT_ACTIVE_GROUP'
  groupName: string
}

interface IncrementGlobalGroupCounterParams {
  type: 'INCREMENT_GLOBAL_GROUP_COUNTER'
}

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

/**
 * Sets whether the user has completed the initial onboarding or not.
 * @export
 * @param {boolean} hasOnboarded - Whether the user has onboarded.
 * @return {Object} - Object to send to the reducer.
 */
export function setHasOnboarded (hasOnboarded: boolean): SetHasOnboardedParams {
  return {
    type: SET_HAS_ONBOARDED,
    hasOnboarded
  }
}

/**
 * Sets whether the user has installed their first language instance or not.
 * @export
 * @param {boolean} hasInstalledFirstLanguageInstance - Whether the user has installed their first language instance.
 * @return {Object} - Object to send to the reducer.
 */
export function setHasInstalledFirstLanguageInstance (
  hasInstalledFirstLanguageInstance: boolean
): SetHasInstalledFirstLanguageInstanceParams {
  return {
    type: SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE,
    hasInstalledFirstLanguageInstance
  }
}

/**
 * Sets whether the app has fetched the necessary Firebase data for a language instance install.
 * @export
 * @param {boolean} hasFetchedLanguageData
 * @return {Object} - Object to send to the reducer.
 */
export function setHasFetchedLanguageData (
  hasFetchedLanguageData: boolean
): SetHasFetchedLanguageDataParams {
  return {
    type: SET_HAS_FETCHED_LANGUAGE_DATA,
    hasFetchedLanguageData
  }
}

/**
 * Sets the progress of downloading the core files for a language.
 * @export
 * @param {number} languageCoreFilesDownloadProgress - The number of core files that have been downloaded.
 * @return {Object} - Object to send to the reducer.
 */
export function setLanguageCoreFilesDownloadProgress (
  languageCoreFilesDownloadProgress: number
): SetLanguageCoreFilesDownloadProgressParams {
  return {
    type: SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS,
    languageCoreFilesDownloadProgress
  }
}

/**
 * Sets the total number of language core files to download. Used in tandem with languageCoreFilesDownloadProgress to calculate the progress through the downloads.
 * @export
 * @param {number} totalLanguageCoreFilesToDownload - The number of core files to download.
 * @return {Object} - Object to send to the reducer.
 */
export function setTotalLanguageCoreFilesToDownload (
  totalLanguageCoreFilesToDownload: number
): SetTotalLanguageCoreFilesToDownloadParams {
  return {
    type: SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD,
    totalLanguageCoreFilesToDownload
  }
}

/**
 * Stores the created time of a specific file.
 * @export
 * @param {string} fileName - The name of the file to store the time created of.
 * @param {string} timeCreated - The time the file was created.
 * @return {Object} - Object to send to the reducer.
 */
export function storeLanguageCoreFileCreatedTime (
  fileName: string,
  timeCreated: number
): StoreLanguageCoreFileCreatedTimeParams {
  return {
    type: STORE_LANGUAGE_CORE_FILE_CREATED_TIME,
    fileName,
    timeCreated
  }
}

/**
 * Adds a file name to be stored in the core files to update array.
 * @export
 * @param {string} fileName - The name of the file that needs to be updated.
 * @return {Object} - Object to send to the reducer.
 */
export function addLanguageCoreFileToUpdate (
  fileName: string
): AddLanguageCoreFileToUpdateParams {
  return {
    type: ADD_LANGUAGE_CORE_FILE_TO_UPDATE,
    fileName
  }
}

/**
 * Clears the core files to update array.
 * @export
 * @return {Object} - Object to send to the reducer.
 */
export function clearLanguageCoreFilesToUpdate (): ClearLanguageCoreFilesToUpdateParams {
  return {
    type: CLEAR_LANGUAGE_CORE_FILES_TO_UPDATE
  }
}

/**
 * Stores the language that is actively installing.
 * @export
 * @param {string} languageID - The ID of the language instance to delete.
 * @return {Object} - Object to send to the reducer.
 */
export function storeActingLanguageID (
  languageID: string | undefined
): StoreActingLanguageIDParams {
  return {
    type: STORE_ACTING_LANGUAGE_ID,
    languageID: languageID
  }
}

/**
 * Sets the most recent active group so that if we cancel a language install, we know what group to go back to.
 * @export
 * @param {string} groupName - The name of the most recent active group.
 * @return {Object} - Object to send to the reducer.
 */
export function setRecentActiveGroup (
  groupName: string
): SetRecentActiveGroupParams {
  return {
    type: SET_RECENT_ACTIVE_GROUP,
    groupName: groupName
  }
}

/**
 * Increments the global group counter redux variable by 1.
 * @export
 * @return {Object} - Object to send to the reducer.
 */
export function incrementGlobalGroupCounter (): IncrementGlobalGroupCounterParams {
  return {
    type: INCREMENT_GLOBAL_GROUP_COUNTER
  }
}
