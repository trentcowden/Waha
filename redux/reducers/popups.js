import { SET_SHOW_MT_TAB_ADDED_SNACKBAR ***REMOVED*** from '../actions/popupsActions'

/**
 * The popups reducer stores various states for any modals or snackbars that need to be triggered globally. This state is persisted across app restarts.
 * @param {Object***REMOVED*** params - Parameters passed from popupsActions.js functions.
 * @param {boolean***REMOVED*** popups - (state) The boolean values for whether modals/snackbars that need to be triggered globally are visible.
 */
export function popups (
  state = {
    showMTTabAddedSnackbar: false
  ***REMOVED***,
  params
) {
  switch (params.type) {
    case SET_SHOW_MT_TAB_ADDED_SNACKBAR:
      return {
        ...state,
        showMTTabAddedSnackbar: params.toSet
      ***REMOVED***
    default:
      return state
  ***REMOVED***
***REMOVED***
