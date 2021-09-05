import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as FileSystem from 'expo-file-system'
import { DownloadResumable } from 'expo-file-system'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppDispatch, RootState } from 'redux/store'

export interface Download {
  // The progress of the download from 0 to 1.
  progress: number
  // The Expo DownloadResumable object for the download in case we need to cancel it.
  resumable: DownloadResumable
}

export type Downloads = Record<string, Download>

export interface AddUpdateDownloadPayload {
  progress: number
  resumable: DownloadResumable
  lessonID: string
}

const initialState: Downloads = {}

/**
 * The downloads reducer stores the progress for any active lesson Story chapter mp3s or Training chapter mp4s downloads. Core File downloads that happen during the initial install of a language are NOT stored here. They are handled by the database. This state NOT is persisted across app restarts, so all downloads are cancelled if the user quits the app.
 */
const downloads = createSlice({
  name: 'downloads',
  initialState,
  reducers: {
    addUpdateDownload: (
      state,
      action: PayloadAction<AddUpdateDownloadPayload>
    ) => {
      state[action.payload.lessonID] = {
        progress: action.payload.progress,
        resumable: action.payload.resumable
      }
    },
    removeDownload: (state, action: PayloadAction<{ lessonID: string }>) => {
      delete state[action.payload.lessonID]
    }
  }
})

export const { addUpdateDownload, removeDownload } = downloads.actions
export default downloads.reducer

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
          addUpdateDownload({
            progress,
            resumable: downloadResumable,
            lessonID: lessonID + videoModifier
          })
        )
        // A simple way to only update the progress every 10 calls to the callback function. This helps with performance, especially when downloading multiple files at the same time.
      } else if (counter % 10 == 0) {
        dispatch(
          addUpdateDownload({
            progress: progress,
            resumable: downloadResumable,
            lessonID: lessonID + videoModifier
          })
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
    dispatch(
      addUpdateDownload({
        progress: 0,
        resumable: downloadResumable,
        lessonID: lessonID + videoModifier
      })
    )

    // Download the file.
    downloadResumable.downloadAsync().catch(error => {
      console.log(error)
    })
  }
}
