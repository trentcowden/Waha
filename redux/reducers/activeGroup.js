import { CHANGE_ACTIVE_GROUP ***REMOVED*** from '../actions/activeGroupActions'

/**
 * The active group redux reducer that stores the name of the currently active group. This state is persisted across app restarts.
 * @param {Object***REMOVED*** action - Parameters passed from groupsAction.js functions.
 * @param {string***REMOVED*** activeGroup - (state) The name of the active group.
 */
export function activeGroup (state = null, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_GROUP:
      return action.groupName
    default:
      return state
  ***REMOVED***
***REMOVED***

/**
 * Takes in state and returns an object for the active group.
 */
export function activeGroupSelector (state) {
  return state.groups.filter(item => item.name === state.activeGroup)[0]
***REMOVED***

/**
 * Takes in state and returns the language of the active group.
 */
export function activeGroupLanguageSelector (state) {
  return state.groups.filter(item => item.name === state.activeGroup)[0]
    .language
***REMOVED***
