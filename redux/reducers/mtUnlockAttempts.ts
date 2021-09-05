import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 0

/**
 * This reducer stores the number of times that the user has unsuccessfully attempted to unlock the Mobilization Tools. After a few attempts, the app will lock out the user from attempting to unlock them for 30 minutes. This state is NOT persisted across app restarts.
 */
const mtUnlockAttempts = createSlice({
  name: 'mtUnlockAttempts',
  initialState,
  reducers: {
    setMTUnlockAttempts: (
      state,
      action: PayloadAction<{ numAttempts: number }>
    ) => {
      return action.payload.numAttempts
    }
  }
})

export const { setMTUnlockAttempts } = mtUnlockAttempts.actions

export default mtUnlockAttempts.reducer
