import {
  PopupsActionParams,
  SET_SHOW_MT_TAB_ADDED_SNACKBAR,
  SET_SHOW_PASSCODE_SET_SNACKBAR
} from '../actions/popupsActions'

export interface PopupsState {
  showMTTabAddedSnackbar: boolean
  showPasscodeSetSnackbar: boolean
}

/**
 * The popups reducer stores various states for any modals or snackbars that need to be triggered globally. This state is persisted across app restarts.
 */
export function popups (
  state = {
    showMTTabAddedSnackbar: false,
    showPasscodeSetSnackbar: false
  },
  params: PopupsActionParams
) {
  switch (params.type) {
    case SET_SHOW_MT_TAB_ADDED_SNACKBAR:
      return {
        ...state,
        showMTTabAddedSnackbar: params.toSet
      }
    case SET_SHOW_PASSCODE_SET_SNACKBAR:
      return {
        ...state,
        showPasscodeSetSnackbar: params.toSet
      }
    default:
      return state
  }
}
