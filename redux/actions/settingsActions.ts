export const SET_IS_DARK_MODE_ENABLED = 'SET_IS_DARK_MODE_ENABLED'

export function setIsDarkModeEnabled (toSet) {
  return {
    type: SET_IS_DARK_MODE_ENABLED,
    toSet
  }
}
