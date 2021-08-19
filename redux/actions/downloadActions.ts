export const ADD_UPDATE_DOWNLOAD = 'ADD_UPDATE_DOWNLOAD'
export const REMOVE_DOWNLOAD = 'REMOVE_DOWNLOAD'

import { DownloadResumable } from 'expo-file-system'

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
