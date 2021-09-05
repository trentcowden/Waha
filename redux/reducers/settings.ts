import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  isDarkModeEnabled: boolean
}

const initialState: SettingsState = {
  isDarkModeEnabled: false
}

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsDarkModeEnabled: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.isDarkModeEnabled = action.payload.toSet
    }
  }
})

export const { setIsDarkModeEnabled } = settings.actions

export default settings.reducer
