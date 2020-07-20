import {
  SET_SECURITY_ENABLED,
  SET_ACTIVATE_ON_SWITCH
***REMOVED*** from '../actions/securityActions'

export function security (state = {***REMOVED***, action) {
  switch (action.type) {
    // note: only stores the active group's names
    case SET_SECURITY_ENABLED:
      return {
        ...state,
        securityEnabled: action.toSet
      ***REMOVED***
    case SET_ACTIVATE_ON_SWITCH:
      return {
        ...state,
        activateOnSwitch: action.toSet
      ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***
