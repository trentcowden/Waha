export const SET_SHOW_MT_TAB_ADDED_SNACKBAR = 'SET_SHOW_MT_TAB_ADDED_SNACKBAR'
export const SET_SHOW_PASSCODE_SET_SNACKBAR = 'SET_SHOW_PASSCODE_SET_SNACKBAR'

interface SetShowMTTabAddedSnackbarParams {
  type: 'SET_SHOW_MT_TAB_ADDED_SNACKBAR'
  toSet: boolean
}

interface SetShowPasscodeSetSnackbarParams {
  type: 'SET_SHOW_PASSCODE_SET_SNACKBAR'
  toSet: boolean
}

export type PopupsActionParams =
  | SetShowMTTabAddedSnackbarParams
  | SetShowPasscodeSetSnackbarParams

/**
 * Sets whether the MTTabAdded Snackbar should be visible or not.
 * @export
 * @param {boolean} toSet - Whether the snackbar should be visible.
 * @return {Object} - Object to send to the reducer.
 */
export function setShowMTTabAddedSnackbar (
  toSet: boolean
): SetShowMTTabAddedSnackbarParams {
  return {
    type: SET_SHOW_MT_TAB_ADDED_SNACKBAR,
    toSet
  }
}

/**
 * Sets whether the passcode set snackbar should be visible or not.
 * @export
 * @param {boolean} toSet - Whether the snackbar should be visible.
 * @return {Object} - Object to send to the reducer.
 */
export function setShowPasscodeSetSnackbar (
  toSet: boolean
): SetShowPasscodeSetSnackbarParams {
  return {
    type: SET_SHOW_PASSCODE_SET_SNACKBAR,
    toSet
  }
}
