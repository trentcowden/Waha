export const SET_IS_DARK_MODE_ENABLED = 'SET_IS_DARK_MODE_ENABLED'

interface SetIsDarkModeEnabledParams {
  type: 'SET_IS_DARK_MODE_ENABLED'
  toSet: boolean
}

export type SettingsActionParams = SetIsDarkModeEnabledParams

export function setIsDarkModeEnabled (
  toSet: boolean
): SetIsDarkModeEnabledParams {
  return {
    type: SET_IS_DARK_MODE_ENABLED,
    toSet
  }
}
