import {
  SET_CODE,
  SET_IS_MUTED,
  SET_IS_TIMED_OUT,
  SET_MT_UNLOCK_TIMEOUT,
  SET_SECURITY_ENABLED,
  SET_TIMEOUT_DURATION,
  SET_TIMER
***REMOVED*** from '../actions/securityActions'

/**
 * The security redux reducer stores all the information related to Waha's Security Mode, except for the Mobilization Tools unlock attempts, which is stored in a separate reducer so that it isn't persisted.
 * @param {Object***REMOVED*** action - Parameters passed from securityActions.js functions.
 * @param {Object[]***REMOVED*** security - (state) Stores all of the information related ot Waha's Security Mode.
 * @param {boolean***REMOVED*** security.securityEnabled - Whether Security Mode is enabled or not.
 * @param {string***REMOVED*** security.code - The code to play on the piano to unlock Waha from the Piano (Security) Screen.
 * @param {boolean***REMOVED*** security.isMuted - Whether the piano on the Piano Screen should actually play sounds or not.
 * @param {number***REMOVED*** security.timeoutDuration - The timeout duration for Security Mode to activate. This is the amount of time that the user can be away from the app (where appState is "inactive") before the Piano Screen will show up next time they open the app.
 * @param {number***REMOVED*** security.timer - The Security Mode timer. This is the amount of time since the app has last been "inactive".
 * @param {boolean***REMOVED*** security.isTimedOut - Whether Security Mode is "timed out" or not. This is if the time since the app has gone "inactive" is greater than the timeout duration.
 * @param {boolean***REMOVED*** security.mtUnlockTimeout - The Mobilization Tools unlock timeout, as in the amount of time until they can attempt to unlock the Mobilization Tools again. If the tries unsucessfully too many times to unlock the Mobilization Tools, they'll be locked out.
 */
export function security (
  state = {
    securityEnabled: false,
    code: null,
    isMuted: false,
    timeoutDuration: 0,
    timer: 0,
    isTimedOut: false,
    mtUnlockTimeout: 0
  ***REMOVED***,
  action
) {
  switch (action.type) {
    case SET_SECURITY_ENABLED:
      return {
        ...state,
        securityEnabled: action.toSet
      ***REMOVED***

    case SET_CODE:
      return {
        ...state,
        code: action.code
      ***REMOVED***
    case SET_IS_MUTED:
      return {
        ...state,
        isMuted: action.toSet
      ***REMOVED***
    case SET_TIMEOUT_DURATION:
      return {
        ...state,
        timeoutDuration: action.ms
      ***REMOVED***
    case SET_TIMER:
      return {
        ...state,
        timer: action.ms
      ***REMOVED***
    case SET_IS_TIMED_OUT:
      return {
        ...state,
        isTimedOut: action.toSet
      ***REMOVED***
    case SET_MT_UNLOCK_TIMEOUT:
      return {
        ...state,
        mtUnlockTimeout: action.time
      ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***
