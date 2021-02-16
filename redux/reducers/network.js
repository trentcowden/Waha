import { UPDATE_CONNECTION_STATUS ***REMOVED*** from '../actions/networkActions'

/**
 * This reducer stores whether the app is connected to the internet or not. This state is persisted across app restarts.
 * @param {Object***REMOVED*** action - Parameters passed from networkActions.js functions.
 * @param {Object***REMOVED*** network - (state) Stores information related to the app's network connection.
 * @param {boolean***REMOVED*** network.isConnected - Whether the app is connected to the internet or not. Defaults to true.
 */
export function network (state = { isConnected: true ***REMOVED***, action) {
  switch (action.type) {
    case UPDATE_CONNECTION_STATUS:
      return { isConnected: action.status ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***
