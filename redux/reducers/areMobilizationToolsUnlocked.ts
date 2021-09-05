import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

/**
 * This reducer stores whether the Mobilization Tools have been globally unlocked or not.
 */
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
