export const ADD_UPDATE_DOWNLOAD = 'ADD_UPDATE_DOWNLOAD'
export const REMOVE_DOWNLOAD = 'REMOVE_DOWNLOAD'

import * as FileSystem from 'expo-file-system'
import { DownloadResumable } from 'expo-file-system'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppDispatch, RootState } from 'redux/store'

export type DownloadActionParams =
  | AddUpdateDownloadParams
  | RemoveDownloadParams

interface AddUpdateDownloadParams {
  type: 'ADD_UPDATE_DOWNLOAD'
  progress: number
  resumable: DownloadResumable
  lessonID: string
}

/**
 * Adds or updates the progress for a download in the downloads state.
 */
export function addUpdateDownload (
  progress: number,
  resumable: DownloadResumable,
  lessonID: string
): AddUpdateDownloadParams {
  return {
    type: ADD_UPDATE_DOWNLOAD,
    progress,
    resumable,
    lessonID
  }
}

interface RemoveDownloadParams {
  type: 'REMOVE_DOWNLOAD'
  lessonID: string
}

/**
 * Removes a download from the downloads object.
 */
export function removeDownload (lessonID: string): RemoveDownloadParams {
  return {
    type: REMOVE_DOWNLOAD,
    lessonID
  }
}

/**
 * Downloads the scripture mp3 for a lesson or the video for a lesson. This is a thunk function, so it dispatches other actions, in this case addUpdateDownload() above.
 */
export function downloadMedia (
  type: string,
  lessonID: string,
  source: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  var counter = 0

  // All video files are named the same as the audio files except with a 'v' at the end, so if we're downloading a video file we need to add that to the file name that we're wanting to download. We also want to adjust the file extension depending on the media type: .mp3 for audio and .mp4 for video. This is used for the name of the file as it will be saved as on the device.
  var videoModifier = ''
  var fileEnd = ''

  if (type === 'video') {
    videoModifier = 'v'
    fileEnd = 'v.mp4'
  } else {
    fileEnd = '.mp3'
  }

  return (dispatch: AppDispatch) => {
    // Callback function for updating the progress of a download.
    function callback ({
      totalBytesWritten,
      totalBytesExpectedToWrite
    }: {
      totalBytesWritten: number
      totalBytesExpectedToWrite: number
    }) {
      // Calculate the progress of the download.
      var progress = totalBytesWritten / totalBytesExpectedToWrite

      // We always want to update the progress whenever the download finishes so we know when it's done and can remove the download.
      if (progress == 1) {
        dispatch(
          addUpdateDownload(
            progress,
            downloadResumable,
            lessonID + videoModifier
          )
        )
        // A simple way to only update the progress every 10 calls to the callback function. This helps with performance, especially when downloading multiple files at the same time.
      } else if (counter % 10 == 0) {
        dispatch(
          addUpdateDownload(
            progress,
            downloadResumable,
            lessonID + videoModifier
          )
        )
      }
      counter += 1
    }

    // Create our download object.
    const downloadResumable = FileSystem.createDownloadResumable(
      source,
      FileSystem.documentDirectory + lessonID + fileEnd,
      {},
      callback
    )

    // Add our download to the downloads state object with progress 0.
    dispatch(addUpdateDownload(0, downloadResumable, lessonID + videoModifier))

    // Download the file.
    downloadResumable.downloadAsync().catch(error => {
      console.log(error)
    })
  }
}
