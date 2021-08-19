import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

const areMobilizationToolsUnlocked = createSlice({
  name: 'areMobilizationToolsUnlocked',
  initialState,
  reducers: {
    setAreMobilizationToolsUnlocked: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      return action.payload.toSet
    }
  }
})

export const {
  setAreMobilizationToolsUnlocked
} = areMobilizationToolsUnlocked.actions
export default areMobilizationToolsUnlocked.reducer
