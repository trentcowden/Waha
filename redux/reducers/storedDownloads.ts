import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DownloadResumable } from 'expo-file-system'

const initialState: DownloadResumable[] = []

/**
 * This reducer stores the download resumables of any downloading core files so they can be cancelled if necessary. These are separate from those in the downloads.js reducer. These resumables are only for core files, which are downloaded immediately upon a language instance install. The reason we store these is so that we have the option to cancel the downloads, thus cancelling our language install. This state is NOT persisted across app restarts.
 */
const storedDownloads = createSlice({
  name: 'storedDownloads',
  initialState,
  reducers: {
    storeDownloads: (
      state,
      action: PayloadAction<{ resumables: DownloadResumable[] }>
    ) => {
      return action.payload.resumables
    }
  }
})

export const { storeDownloads } = storedDownloads.actions

export default storedDownloads.reducer
