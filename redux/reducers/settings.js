import { SET_IS_DARK_MODE_ENABLED } from '../actions/settingsActions'

/**
 * The mobilization tools unlock redux reducer that stores whether the mobilization tools are unlocked globally. This is different from whether a group should show the mobilization tools tab or not. Before the user is able to show or hide the tab for a group, they have to enable the mobilization tools globally via this reducer. This state is persisted across app restarts.
 * @param {Object} action - Parameters passed from areMobilizationToolsUnlockedActions.js functions.
 * @param {boolean} areMobilizationToolsUnlocked - (state) Whether the mobilization tools are unlocked globally.
 */
export function settings (
  state = {
    isDarkModeEnabled: false
  },
  params
) {
  switch (params.type) {
    case SET_IS_DARK_MODE_ENABLED:
      return {
        ...state,
        isDarkModeEnabled: params.toSet
      }
    default:
      return state
  }
}
