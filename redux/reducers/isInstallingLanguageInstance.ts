import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

/**
 * This reducer simply stores whether the app is currently installing a language instance or not. This is stored in a separate reducer from languageInstallation.ts so that it isn't persisted.
 */
const isInstallingLanguageInstance = createSlice({
  name: 'isInstallingLanguageInstance',
  initialState,
  reducers: {
    setIsInstallingLanguageInstance: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      return action.payload.toSet
    }
  }
})

export const {
  setIsInstallingLanguageInstance
} = isInstallingLanguageInstance.actions

export default isInstallingLanguageInstance.reducer
