import {
  IsInstallingLanguageInstanceActionParams,
  SET_IS_INSTALLING_LANGUAGE_INSTANCE
} from '../actions/isInstallingLanguageInstanceActions'

/**
 * This reducer simply stores whether the app is currently installing a language instance or not. This is stored in a separate reducer from languageInstallation.ts so that it isn't persisted.
 */
export function isInstallingLanguageInstance (
  state: boolean = false,
  params: IsInstallingLanguageInstanceActionParams
) {
  switch (params.type) {
    case SET_IS_INSTALLING_LANGUAGE_INSTANCE:
      return params.isInstallingLanguageInstance
    default:
      return state
  }
}
