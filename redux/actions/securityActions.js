export const SET_SECURITY_ENABLED = 'SET_SECURITY_ENABLED'
export const SET_CODE = 'SET_CODE'
export const SET_IS_MUTED = 'SET_IS_MUTED'
export const SET_TIMEOUT_DURATION = 'SET_TIMEOUT_DURATION'
export const SET_TIMER = 'SET_TIMER'
export const SET_IS_TIMED_OUT = 'SET_IS_TIMED_OUT'
export const SET_MT_UNLOCK_TIMEOUT = 'SET_MT_UNLOCK_TIMEOUT'
export const SET_MT_UNLOCK_ATTEMPTS = 'SET_MT_UNLOCK_ATTEMPTS'

/**
 * Sets whether Security Mode is enabled or not.
 * @export
 * @param {boolean***REMOVED*** toSet - Whether Security Mode should be enabled or not.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setSecurityEnabled (toSet) {
  return {
    type: SET_SECURITY_ENABLED,
    toSet
  ***REMOVED***
***REMOVED***

/**
 * Sets the code to play on the piano to unlock Waha from the Piano Screen.
 * @export
 * @param {string***REMOVED*** code - The unlock code.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setCode (code) {
  return {
    type: SET_CODE,
    code
  ***REMOVED***
***REMOVED***

/**
 * Sets whether the piano on the Piano Screen should be muted or not.
 * @export
 * @param {boolean***REMOVED*** toSet - Whether the piano should be muted or not.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setIsMuted (toSet) {
  return {
    type: SET_IS_MUTED,
    toSet
  ***REMOVED***
***REMOVED***

/**
 * Set the timeout duration for Security Mode to activate.
 * @export
 * @param {boolean***REMOVED*** ms - The timeout duration in milliseconds.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setTimeoutDuration (ms) {
  return {
    type: SET_TIMEOUT_DURATION,
    ms
  ***REMOVED***
***REMOVED***

/**
 * Sets the Security Mode timer.
 * @export
 * @param {boolean***REMOVED*** ms - The amount of time in milliseconds since the app switched to "inactive".
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setTimer (ms) {
  return {
    type: SET_TIMER,
    ms
  ***REMOVED***
***REMOVED***

/**
 * Sets whether Security Mode is "timed out" or not.
 * @export
 * @param {boolean***REMOVED*** toSet - Whether Security Mode is "timed out" or not.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setIsTimedOut (toSet) {
  return {
    type: SET_IS_TIMED_OUT,
    toSet
  ***REMOVED***
***REMOVED***

/**
 * Sets the Mobilization Tools unlock timeout.
 * @export
 * @param {boolean***REMOVED*** time - The amount of time the user has to wait before they can try and unlock the Mobilization Tools again in milliseconds.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setMTUnlockTimeout (time) {
  return {
    type: SET_MT_UNLOCK_TIMEOUT,
    time
  ***REMOVED***
***REMOVED***

/**
 * Sets the number of times the user has tried unsucessfully to unlock the Mobilization Tools.
 * @export
 * @param {boolean***REMOVED*** toSet - Whether Security Mode should be enabled or not.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setMTUnlockAttempts (numAttempts) {
  return {
    type: SET_MT_UNLOCK_ATTEMPTS,
    numAttempts
  ***REMOVED***
***REMOVED***
