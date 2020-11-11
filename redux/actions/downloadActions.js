export const ADD_UPDATE_DOWNLOAD = 'ADD_UPDATE_DOWNLOAD'
export const REMOVE_DOWNLOAD = 'REMOVE_DOWNLOAD'

import * as FileSystem from 'expo-file-system'

export function addUpdateDownload (progress, resumable, lessonID) {
  return {
    type: ADD_UPDATE_DOWNLOAD,
    progress,
    resumable,
    lessonID
  ***REMOVED***
***REMOVED***

export function removeDownload (lessonID) {
  return {
    type: REMOVE_DOWNLOAD,
    lessonID
  ***REMOVED***
***REMOVED***

// thunk function for async downloading
export function downloadMedia (type, lessonID, source) {
  var counter = 0

  var videoModifier = ''
  var fileEnd

  if (type === 'video') {
    videoModifier = 'v'
    fileEnd = 'v.mp4'
  ***REMOVED*** else {
    fileEnd = '.mp3'
  ***REMOVED***

  return dispatch => {
    // callback function
    function callback ({ totalBytesWritten, totalBytesExpectedToWrite ***REMOVED***) {
      progress = totalBytesWritten / totalBytesExpectedToWrite
      if (progress == 1) {
        dispatch(
          addUpdateDownload(
            progress,
            downloadResumable,
            lessonID + videoModifier
          )
        )
      ***REMOVED*** else if (counter % 10 == 0) {
        dispatch(
          addUpdateDownload(
            progress,
            downloadResumable,
            lessonID + videoModifier
          )
        )
      ***REMOVED***
      counter += 1
    ***REMOVED***

    // create our download object
    const downloadResumable = FileSystem.createDownloadResumable(
      source,
      FileSystem.documentDirectory + lessonID + fileEnd,
      {***REMOVED***,
      callback
    )

    // add our download to state with progress 0
    dispatch(addUpdateDownload(0, downloadResumable, lessonID + videoModifier))

    // dispatch(storeDownload(downloadResumable, lessonID))

    // attempt to download file
    downloadResumable.downloadAsync().catch(error => {
      console.log(error)
    ***REMOVED***)
  ***REMOVED***
***REMOVED***
