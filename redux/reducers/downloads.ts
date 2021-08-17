import { DownloadResumable } from 'expo-file-system'
import {
  ADD_UPDATE_DOWNLOAD,
  DownloadActionParams,
  REMOVE_DOWNLOAD
} from '../actions/downloadActions'

export interface Download {
  // The progress of the download from 0 to 1.
  progress: number
  // The Expo DownloadResumable object for the download in case we need to cancel it.
  resumable: DownloadResumable
}

export type Downloads = Record<string, Download>

/**
 * The downloads reducer stores the progress for any active lesson downloads. Downloads that happen during the initial install of a language are NOT stored here. They are handled by the database.js reducer and the databaseActions.js. This is only for downloading lesson scripture audio files or lesson video files. This state NOT is persisted across app restarts, so all downloads are cancelled if the user quits the app.
 */
export function downloads (
  state: Downloads = {},
  params: DownloadActionParams
) {
  switch (params.type) {
    // The reason that adding and updating a download are grouped into one is because the functionality is the same. If the lesson ID is found in the object, it replaces it (updates it). If it's not, it adds it.
    case ADD_UPDATE_DOWNLOAD:
      return {
        ...state,
        [params.lessonID]: {
          progress: params.progress,
          resumable: params.resumable
        }
      }
    case REMOVE_DOWNLOAD:
      // Get the key of the download we want to delete.
      var idToDelete = params.lessonID

      // Filters the key that should be deleted, then builds a new object from the remaining keys and the initial object.
      return Object.keys(state)
        .filter(key => key !== idToDelete)
        .reduce((result, current) => {
          result[current] = state[current]
          return result
        }, {})
    default:
      return state
  }
}
