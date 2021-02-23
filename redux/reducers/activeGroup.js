import { CHANGE_ACTIVE_GROUP ***REMOVED*** from '../actions/activeGroupActions'

/**
 * The active group redux reducer that stores the name of the currently active group. This state is persisted across app restarts.
 * @param {Object***REMOVED*** action - Parameters passed from groupsAction.js functions.
 * @param {string***REMOVED*** activeGroup - (state) The name of the active group.
 */
export function activeGroup (state = null, params) {
  switch (params.type) {
    case CHANGE_ACTIVE_GROUP:
      return params.groupName
    default:
      return state
  ***REMOVED***
***REMOVED***

/**
 * Takes in state and returns an object for the active group.
 */
export function activeGroupSelector (state) {
  var activeGroup = state.groups.filter(item => item.name === state.activeGroup)
  return activeGroup.length !== 0 ? activeGroup[0] : null
***REMOVED***

/**
 * Takes in state and returns the language of the active group.
 */
export function activeDatabaseSelector (state) {
  var activeGroup = state.groups.filter(item => item.name === state.activeGroup)
  return activeGroup.length !== 0
    ? state.database[activeGroup[0].language]
    : null
***REMOVED***
