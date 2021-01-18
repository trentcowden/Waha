import { CHANGE_ACTIVE_GROUP ***REMOVED*** from '../actions/groupsActions'

/**
 * The active group redux reducer that stores the name of the currently active group. This state is persisted across app restarts.
 * @param {Object***REMOVED*** action - Parameters passed from groupsAction.js functions.
 * @param {string***REMOVED*** activeGroup - (state) The name of the active group.
 */
export function activeGroup (state = null, action) {
  switch (action.type) {
    /**
     * Updates the name of the currently active group.
     */
    case CHANGE_ACTIVE_GROUP:
      return action.groupName
    default:
      return state
  ***REMOVED***
***REMOVED***
