import { DownloadResumable } from 'expo-file-system'

export const STORE_DOWNLOADS = 'STORE_DOWNLOADS'

interface StoreDownloadsParams {
  type: 'STORE_DOWNLOADS'
  resumables: DownloadResumable[]
}

export type StoredDownloadsActionParams = StoreDownloadsParams

/**
 * Stores an array of download resumable objects.
 */
export function storeDownloads (
  resumables: DownloadResumable[]
): StoreDownloadsParams {
  return {
    type: STORE_DOWNLOADS,
    resumables
  }
}
