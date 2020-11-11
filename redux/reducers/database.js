import {
  DELETE_LANGUAGE,
  SET_CURRENT_FETCH_PROGRESS,
  SET_FETCH_ERROR,
  SET_FINISHED_INITIAL_FETCH,
  SET_FINISHED_ONBOARDING,
  SET_IS_FETCHING,
  SET_TOTAL_TO_DOWNLOAD,
  STORE_DATA,
  STORE_DOWNLOAD
***REMOVED*** from '../actions/databaseActions'

export function database (
  state = {
    haveFinishedOnboarding: false,
    haveFinishedInitialFetch: false,
    currentFetchProgress: 0,
    storedDownloads: []
  ***REMOVED***,
  action
) {
  switch (action.type) {
    case STORE_DATA:
      return { ...state, [action.language]: action.data ***REMOVED***
    case SET_FINISHED_ONBOARDING:
      return { ...state, haveFinishedOnboarding: action.haveFinishedOnboarding ***REMOVED***
    case SET_FINISHED_INITIAL_FETCH:
      return {
        ...state,
        haveFinishedInitialFetch: action.haveFinishedInitialFetch
      ***REMOVED***
    case SET_CURRENT_FETCH_PROGRESS:
      return { ...state, currentFetchProgress: action.progress ***REMOVED***
    case SET_TOTAL_TO_DOWNLOAD:
      return { ...state, totalToDownload: action.total ***REMOVED***
    case DELETE_LANGUAGE:
      const languageToDelete = action.language
      const { [languageToDelete]: value, ...newObject ***REMOVED*** = state
      return newObject
    case STORE_DOWNLOAD:
      return {
        ...state,
        storedDownload: action.downloadResumable
      ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***

export function fetchingStatus (
  state = { isFetching: false, fetchError: false, errorLanguage: null ***REMOVED***,
  action
) {
  switch (action.type) {
    case SET_IS_FETCHING:
      // true whenever we're getting data from firebase
      return { ...state, isFetching: action.isFetching ***REMOVED***
    case SET_FETCH_ERROR:
      return {
        ...state,
        fetchError: action.status,
        errorLanguage: action.language
      ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***
