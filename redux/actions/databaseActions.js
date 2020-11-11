import * as FileSystem from 'expo-file-system'
import i18n from 'i18n-js'
import { groupNames ***REMOVED*** from '../../constants'
import db from '../../firebase/db'
import { changeActiveGroup, createGroup ***REMOVED*** from '../actions/groupsActions'
import { logInstallLanguage ***REMOVED*** from '../LogEventFunctions'
export const ADD_LANGUAGE = 'ADD_LANGUAGE'
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR'
export const STORE_DATA = 'STORE_DATA'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_FINISHED_ONBOARDING = 'SET_FINISHED_ONBOARDING'
export const SET_FINISHED_INITIAL_FETCH = 'SET_FINISHED_INITIAL_FETCH'
export const DELETE_LANGUAGE = 'DELETE_LANGUAGE'
export const ADD_SCRIPT = 'ADD_SCRIPT'
export const REMOVE_SCRIPT = 'REMOVE_SCRIPT'
export const SET_CURRENT_FETCH_PROGRESS = 'SET_CURRENT_FETCH_PROGRESS'
export const SET_TOTAL_TO_DOWNLOAD = 'SET_TOTAL_TO_DOWNLOAD'
export const STORE_DOWNLOAD = 'STORE_DOWNLOAD'

export function storeDownload (downloadResumable) {
  return {
    type: STORE_DOWNLOAD,
    downloadResumable
  ***REMOVED***
***REMOVED***

export function storeData (data, language) {
  return {
    type: STORE_DATA,
    data,
    language
  ***REMOVED***
***REMOVED***

export function setIsFetching (isFetching) {
  return {
    type: SET_IS_FETCHING,
    isFetching
  ***REMOVED***
***REMOVED***

export function setFinishedOnboarding (haveFinishedOnboarding) {
  return {
    type: SET_FINISHED_ONBOARDING,
    haveFinishedOnboarding
  ***REMOVED***
***REMOVED***

export function setFinishedInitialFetch (haveFinishedInitialFetch) {
  return {
    type: SET_FINISHED_INITIAL_FETCH,
    haveFinishedInitialFetch
  ***REMOVED***
***REMOVED***

export function setCurrentFetchProgress (progress) {
  return {
    type: SET_CURRENT_FETCH_PROGRESS,
    progress
  ***REMOVED***
***REMOVED***

export function setTotalToDownload (total) {
  return {
    type: SET_TOTAL_TO_DOWNLOAD,
    total
  ***REMOVED***
***REMOVED***
export function setFetchError (status, language) {
  return {
    type: SET_FETCH_ERROR,
    status,
    language
  ***REMOVED***
***REMOVED***

var shouldDownload = true

setTimeout(() => (shouldDownload = false), 3000)

// thunk function for adding a new language
export function addLanguage (language) {
  return async (dispatch, getState) => {
    // set isFetching to true to signal that we're doing stuff and don't want to load the rest of the app
    dispatch(setIsFetching(true))

    //+ FIREBASE FETCH

    //- get sets first
    var sets = []

    await db
      .collection('sets')
      .where('languageID', '==', language)
      .get()
      .then(response => {
        response.forEach(set => {
          console.log(set.id)
          sets.push({
            id: set.id,
            ...set.data()
          ***REMOVED***)
        ***REMOVED***)
      ***REMOVED***)
      .catch(error => dispatch(setFetchError(true, language)))

    //- then get language object from database and throw all of it in redux
    await db
      .collection('languages')
      .doc(language)
      .get()
      .then(async doc => {
        if (doc.exists) {
          // store the language data and sets in redux
          dispatch(
            storeData(
              {
                sets: sets,
                ...doc.data()
              ***REMOVED***,
              language
            )
          )

          // set total to download so we can display progress through downloads
          dispatch(setTotalToDownload(doc.data().files.length))

          // used to track progress through downloads
          var totalDownloaded = 0

          //+ DOWNLOAD FUNCTIONS

          //- some magic for downloading a bunch of files and doing something
          //-  when all of them are done
          async function asyncForEach (array, callback) {
            for (let index = 0; index < array.length; index++) {
              await callback(array[index], index, array)
            ***REMOVED***
          ***REMOVED***

          //- some more magic
          const downloadStuff = async () => {
            try {
              await asyncForEach(
                doc.data().files,
                async (fileName, index, files) => {
                  if (fileName.includes('header')) {
                    var download = FileSystem.createDownloadResumable(
                      `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language***REMOVED***%2Fother%2F${fileName***REMOVED***.png?alt=media`,
                      FileSystem.documentDirectory +
                        language +
                        '-' +
                        fileName.slice(0, -3) +
                        '.png'
                    )

                    // dispatch(storeDownload(download))

                    // console.log(shouldDownload)

                    await download
                      .downloadAsync()
                      .catch(error => dispatch(setFetchError(true, language)))

                    // await FileSystem.downloadAsync(
                    //   `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language***REMOVED***%2Fother%2F${fileName***REMOVED***.png?alt=media`,
                    //   FileSystem.documentDirectory +
                    //     language +
                    //     '-' +
                    //     fileName.slice(0, -3) +
                    //     '.png'
                    // ).catch(error => dispatch(setFetchError(true, language)))
                  ***REMOVED*** else {
                    var download = FileSystem.createDownloadResumable(
                      `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language***REMOVED***%2Fother%2F${fileName***REMOVED***.mp3?alt=media`,
                      FileSystem.documentDirectory +
                        language +
                        '-' +
                        fileName.slice(0, -3) +
                        '.mp3'
                    )

                    // dispatch(storeDownload(download))

                    // console.log(shouldDownload)

                    await download
                      .downloadAsync()
                      .catch(error => dispatch(setFetchError(true, language)))
                    // await FileSystem.downloadAsync(
                    //   `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${language***REMOVED***%2Fother%2F${fileName***REMOVED***.mp3?alt=media`,
                    //   FileSystem.documentDirectory +
                    //     language +
                    //     '-' +
                    //     fileName.slice(0, -3) +
                    //     '.mp3'
                    //   // if there's an error downloading a file
                    // ).catch(error => {
                    //   console.log(error)
                    //   dispatch(setFetchError(true, language))
                    // ***REMOVED***)
                  ***REMOVED***
                  totalDownloaded += 1
                  dispatch(setCurrentFetchProgress(totalDownloaded))
                ***REMOVED***
              )

              //+ STUFF TO DO WHEN DONE DOWNLOADING

              // log the language install for firebase analytics
              logInstallLanguage(language, i18n.locale)

              // create a new group using the default group name in constants.js
              dispatch(createGroup(groupNames[language], language, 'default'))

              // change the active group to the new group we just created
              dispatch(changeActiveGroup(groupNames[language]))

              // set isFetching to false since we're no longer fetching
              dispatch(setIsFetching(false))

              // set setFinishedInitialFetch to true because we're done fetching
              dispatch(setFinishedInitialFetch(true))

              // set fetchProgress back to 0 (in case user downloads another
              //  language later)
              dispatch(setCurrentFetchProgress(0))
              dispatch(setTotalToDownload(doc.data().files.length))
            ***REMOVED*** catch (error) {
              console.log(error)
              dispatch(setFetchError(true, language))
            ***REMOVED***
          ***REMOVED***

          //+ ACTUALLY DOWNLOAD STUFF
          try {
            downloadStuff()
          ***REMOVED*** catch (error) {
            dispatch(setFetchError(true, language))
          ***REMOVED***
        ***REMOVED*** else {
          // if doc doesn't exist, throw an error
          dispatch(setFetchError(true, language))
        ***REMOVED***
      ***REMOVED***)
      // if there's an error fetching from firebase
      .catch(error => {
        console.log(error)
        dispatch(setFetchError(true, language))
      ***REMOVED***)
  ***REMOVED***
***REMOVED***

export function deleteLanguage (language) {
  return {
    type: DELETE_LANGUAGE,
    language
  ***REMOVED***
***REMOVED***
