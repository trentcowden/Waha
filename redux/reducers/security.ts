import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SecurityState {
  // Whether Security Mode is enabled or not.
  securityEnabled: boolean
  // The code to play on the piano to unlock Waha from the <GameScreen />.
  code: string | undefined
  // Whether the piano on the Piano Screen should actually play sounds or not.
  isMuted: boolean
  // The timeout duration for Security Mode to activate. This is the amount of time that the user can be away from the app (where appState is "inactive") before the <GameScreen /> will show up next time they open the app.
  timeoutDuration: number
  // The Security Mode timer. This is the amount of time since the app has last been "inactive".
  timer: number
  // Whether Security Mode is "timed out" or not. This is if the time since the app has gone "inactive" is greater than the timeout duration.
  isTimedOut: boolean
  // The Mobilization Tools unlock timeout, as in the amount of time until they can attempt to unlock the Mobilization Tools again. If the user tries unsuccessfully too many times to unlock the Mobilization Tools, they'll be locked out.
  mtUnlockTimeout: number
}

const initialState: SecurityState = {
  securityEnabled: false,
  code: undefined,
  isMuted: false,
  timeoutDuration: 0,
  timer: 0,
  isTimedOut: false,
  mtUnlockTimeout: 0
}

/**
 * The security redux reducer stores all the information related to Waha's Security Mode, except for the Mobilization Tools unlock attempts, which is stored in a separate reducer so that it isn't persisted.
 */
const security = createSlice({
  name: 'security',
  initialState,
  reducers: {
    setSecurityEnabled: (state, action: PayloadAction<{ toSet: boolean }>) => {
      state.securityEnabled = action.payload.toSet
    },
    setCode: (state, action: PayloadAction<{ code: string }>) => {
      state.code = action.payload.code
    },
    setIsMuted: (state, action: PayloadAction<{ toSet: boolean }>) => {
      state.isMuted = action.payload.toSet
    },
    setTimeoutDuration: (state, action: PayloadAction<{ ms: number }>) => {
      state.timeoutDuration = action.payload.ms
    },
    setTimer: (state, action: PayloadAction<{ ms: number }>) => {
      state.timer = action.payload.ms
    },
    setIsTimedOut: (state, action: PayloadAction<{ toSet: boolean }>) => {
      state.isTimedOut = action.payload.toSet
    },
    setMTUnlockTimeout: (state, action: PayloadAction<{ time: number }>) => {
      state.mtUnlockTimeout = action.payload.time
    }
  }
})

export const {
  setSecurityEnabled,
  setCode,
  setIsMuted,
  setTimeoutDuration,
  setTimer,
  setIsTimedOut,
  setMTUnlockTimeout
} = security.actions

export default security.reducer
