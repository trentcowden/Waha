import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PopupsState {
  showMTTabAddedSnackbar: boolean
  showPasscodeSetSnackbar: boolean
}

const initialState = {
  showMTTabAddedSnackbar: false,
  showPasscodeSetSnackbar: false
}

/**
 * The popups reducer stores various states for any modals or snackbars that need to be triggered globally. This state is persisted across app restarts.
 */
const popups = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setShowMTTabAddedSnackbar: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.showMTTabAddedSnackbar = action.payload.toSet
    },
    setShowPasscodeSetSnackbar: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.showPasscodeSetSnackbar = action.payload.toSet
    }
  }
})

export const {
  setShowMTTabAddedSnackbar,
  setShowPasscodeSetSnackbar
} = popups.actions

export default popups.reducer
