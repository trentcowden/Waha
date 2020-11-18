import {
  DELETE_LANGUAGE_DATA,
  SET_HAS_FETCHED_LANGUAGE_DATA,
  SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE,
  SET_HAS_ONBOARDED,
  SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS,
  SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD,
  STORE_LANGUAGE_DATA
***REMOVED*** from '../actions/databaseActions'

export function database (
  state = {
    hasOnboarded: false,
    hasInstalledFirstLanguageInstance: false,
    languageCoreFilesDownloadProgress: 0,
    storedDownloads: []
  ***REMOVED***,
  action
) {
  switch (action.type) {
    case STORE_LANGUAGE_DATA:
      return { ...state, [action.languageInstanceID]: action.languageData ***REMOVED***
    case SET_HAS_ONBOARDED:
      return { ...state, hasOnboarded: action.hasOnboarded ***REMOVED***
    case SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE:
      return {
        ...state,
        hasInstalledFirstLanguageInstance:
          action.hasInstalledFirstLanguageInstance
      ***REMOVED***
    case SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS:
      return {
        ...state,
        languageCoreFilesDownloadProgress:
          action.languageCoreFilesDownloadProgress
      ***REMOVED***
    case SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD:
      return {
        ...state,
        totalLanguageCoreFilesToDownload:
          action.totalLanguageCoreFilesToDownload
      ***REMOVED***
    case DELETE_LANGUAGE_DATA:
      const languageToDelete = action.languageInstanceID
      const { [languageToDelete]: value, ...newObject ***REMOVED*** = state
      return newObject
    case SET_HAS_FETCHED_LANGUAGE_DATA:
      return { ...state, hasFetchedLanguageData: action.hasFetchedLanguageData ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***
