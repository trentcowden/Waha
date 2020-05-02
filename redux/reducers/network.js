import { UPDATE_CONNECTION_STATUS ***REMOVED*** from '../actions/networkActions'

export function network(state = {isConnected: true***REMOVED***, action) {
   switch (action.type) {
      case UPDATE_CONNECTION_STATUS:
         return {isConnected: action.status***REMOVED***
      default:
         return state
   ***REMOVED***
***REMOVED***