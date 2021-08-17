export const SET_IS_INSTALLING_LANGUAGE_INSTANCE =
  'SET_IS_INSTALLING_LANGUAGE_INSTANCE'

export type IsInstallingLanguageInstanceActionParams = SetIsInstallingLanguageInstanceParams

interface SetIsInstallingLanguageInstanceParams {
  type: 'SET_IS_INSTALLING_LANGUAGE_INSTANCE'
  isInstallingLanguageInstance: boolean
}

/**
 * Sets whether we're currently installing a language instance or not.
 */
export function setIsInstallingLanguageInstance (
  isInstallingLanguageInstance: boolean
): SetIsInstallingLanguageInstanceParams {
  return {
    type: SET_IS_INSTALLING_LANGUAGE_INSTANCE,
    isInstallingLanguageInstance
  }
}
