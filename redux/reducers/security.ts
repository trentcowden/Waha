import {
  SecurityActionParams,
  SET_CODE,
  SET_IS_MUTED,
  SET_IS_TIMED_OUT,
  SET_MT_UNLOCK_TIMEOUT,
  SET_SECURITY_ENABLED,
  SET_TIMEOUT_DURATION,
  SET_TIMER
} from '../actions/securityActions'

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

/**
 * The security redux reducer stores all the information related to Waha's Security Mode, except for the Mobilization Tools unlock attempts, which is stored in a separate reducer so that it isn't persisted.
 */
export function security (
  state: SecurityState = {
    securityEnabled: false,
    code: undefined,
    isMuted: false,
    timeoutDuration: 0,
    timer: 0,
    isTimedOut: false,
    mtUnlockTimeout: 0
  },
  params: SecurityActionParams
) {
  switch (params.type) {
    case SET_SECURITY_ENABLED:
      return {
        ...state,
        securityEnabled: params.toSet
      }

    case SET_CODE:
      return {
        ...state,
        code: params.code
      }
    case SET_IS_MUTED:
      return {
        ...state,
        isMuted: params.toSet
      }
    case SET_TIMEOUT_DURATION:
      return {
        ...state,
        timeoutDuration: params.ms
      }
    case SET_TIMER:
      return {
        ...state,
        timer: params.ms
      }
    case SET_IS_TIMED_OUT:
      return {
        ...state,
        isTimedOut: params.toSet
      }
    case SET_MT_UNLOCK_TIMEOUT:
      return {
        ...state,
        mtUnlockTimeout: params.time
      }
    default:
      return state
  }
}
