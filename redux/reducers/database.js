import {
  DELETE_LANGUAGE,
  SET_CURRENT_FETCH_PROGRESS,
  SET_FINISHED_INITIAL_FETCH,
  SET_FINISHED_ONBOARDING,
  SET_TOTAL_TO_DOWNLOAD,
  STORE_DATA
***REMOVED*** from '../actions/databaseActions'

export function database (
  state = {
    haveFinishedOnboarding: false,
    haveFinishedInitialFetch: false,
    currentFetchProgress: 0,
    fetchSuccess: null,
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

    default:
      return state
  ***REMOVED***
***REMOVED***
