export const ADD_LANGUAGE = 'ADD_LANGUAGE'
export const STORE_LANGUAGE_DATA = 'STORE_LANGUAGE_DATA'
export const SET_HAS_ONBOARDED = 'SET_HAS_ONBOARDED'
export const SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE =
  'SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE'
export const DELETE_LANGUAGE_DATA = 'DELETE_LANGUAGE_DATA'
export const SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS =
  'SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS'
export const SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD =
  'SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD'
export const SET_HAS_FETCHED_LANGUAGE_DATA = 'SET_HAS_FETCHED_LANGUAGE_DATA'

import * as FileSystem from 'expo-file-system'
import i18n from 'i18n-js'
import { groupNames ***REMOVED*** from '../../constants'
import { logInstallLanguage ***REMOVED*** from '../LogEventFunctions'
import { changeActiveGroup, createGroup ***REMOVED*** from './groupsActions'
import { setIsInstallingLanguageInstance ***REMOVED*** from './isInstallingLanguageInstanceActions'
import { storeDownloads ***REMOVED*** from './storedDownloadsActions'

/**
 *
 * @export
 * @param {****REMOVED*** languageData
 * @param {****REMOVED*** languageInstanceID
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function storeLanguageData (languageData, languageInstanceID) {
  return {
    type: STORE_LANGUAGE_DATA,
    languageData,
    languageInstanceID
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** hasOnboarded
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setHasOnboarded (hasOnboarded) {
  return {
    type: SET_HAS_ONBOARDED,
    hasOnboarded
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** hasInstalledFirstLanguageInstance
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setHasInstalledFirstLanguageInstance (
  hasInstalledFirstLanguageInstance
) {
  return {
    type: SET_HAS_INSTALLED_FIRST_LANGUAGE_INSTANCE,
    hasInstalledFirstLanguageInstance
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** hasFetchedLanguageData
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setHasFetchedLanguageData (hasFetchedLanguageData) {
  return {
    type: SET_HAS_FETCHED_LANGUAGE_DATA,
    hasFetchedLanguageData
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** languageCoreFilesDownloadProgress
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setLanguageCoreFilesDownloadProgress (
  languageCoreFilesDownloadProgress
) {
  return {
    type: SET_LANGUAGE_CORE_FILES_DOWNLOAD_PROGRESS,
    languageCoreFilesDownloadProgress
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** totalLanguageCoreFilesToDownload
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setTotalLanguageCoreFilesToDownload (
  totalLanguageCoreFilesToDownload
) {
  return {
    type: SET_TOTAL_LANGUAGE_CORE_FILES_TO_DOWNLOAD,
    totalLanguageCoreFilesToDownload
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** languageInstanceID
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function deleteLanguageData (languageInstanceID) {
  return {
    type: DELETE_LANGUAGE_DATA,
    languageInstanceID
  ***REMOVED***
***REMOVED***

/**
 *
 * @export
 * @param {****REMOVED*** language
 * @return {Object***REMOVED*** - Thunk object that allows us to get the state and dispatch actions.
 */
export function downloadLanguageCoreFiles (language) {
  return async (dispatch, getState) => {
    var totalDownloaded = 0
    dispatch(
      setTotalLanguageCoreFilesToDownload(
        getState().database[language].files.length
      )
    )

    function callback ({ totalBytesWritten, totalBytesExpectedToWrite ***REMOVED***) {
      if (totalBytesWritten === totalBytesExpectedToWrite) {
        // totalDownloaded += 1
        // console.log(`file ${totalDownloaded***REMOVED*** downloaded`)
        // dispatch(setCurrentFetchProgress(totalDownloaded))
      ***REMOVED***
    ***REMOVED***

    // 1. add all download resumables into one array
    var filesToDownload = []

    getState().database[language].files.forEach(fileName => {
      var download
      if (fileName.includes('header')) {
        download = FileSystem.createDownloadResumable(
          `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language***REMOVED***%2Fother%2F${fileName***REMOVED***.png?alt=media`,
          FileSystem.documentDirectory +
            language +
            '-' +
            fileName.slice(0, -3) +
            '.png',
          {***REMOVED***,
          callback
        )
      ***REMOVED*** else {
        download = FileSystem.createDownloadResumable(
          `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language***REMOVED***%2Fother%2F${fileName***REMOVED***.mp3?alt=media`,
          FileSystem.documentDirectory +
            language +
            '-' +
            fileName.slice(0, -3) +
            '.mp3',
          {***REMOVED***,
          callback
        )
      ***REMOVED***

      filesToDownload.push(download)
    ***REMOVED***)

    // 2. add those download resumables to redux
    dispatch(storeDownloads(filesToDownload))

    // 3. start downloads in parallel
    function downloadFile (resumable) {
      return resumable
        .downloadAsync()
        .catch(error => console.log('download error'))
        .then(status => {
          if (status) {
            totalDownloaded += 1
            dispatch(setLanguageCoreFilesDownloadProgress(totalDownloaded))
          ***REMOVED***
        ***REMOVED***)
    ***REMOVED***

    const downloadFunctions = filesToDownload.map(resumable =>
      downloadFile(resumable)
    )

    Promise.all(downloadFunctions).then(() => {
      if (totalDownloaded === getState().database[language].files.length) {
        console.log('resolved')
        // var stupid = false
        // if (stupid) {

        //log the language install for firebase analytics
        logInstallLanguage(language, i18n.locale)

        // create a new group using the default group name in constants.js
        dispatch(createGroup(groupNames[language], language, 'default'))

        // change the active group to the new group we just created
        dispatch(changeActiveGroup(groupNames[language]))

        // set isFetching to false since we're no longer fetching
        dispatch(setIsInstallingLanguageInstance(false))

        // set setFinishedInitialFetch to true because we're done fetching
        dispatch(setHasInstalledFirstLanguageInstance(true))

        dispatch(setHasFetchedLanguageData(false))

        // set fetchProgress back to 0 (in case user downloads another
        //  language later)
        dispatch(setLanguageCoreFilesDownloadProgress(0))
        dispatch(
          setTotalLanguageCoreFilesToDownload(
            getState().database[language].files.length
          )
        )
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***
***REMOVED***
