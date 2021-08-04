import { DownloadResumable } from 'expo-file-system'

export interface Download {
  progress: number
  resumable: DownloadResumable
}
