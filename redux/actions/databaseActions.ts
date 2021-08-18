export const STORE_LANGUAGE_DATA = 'STORE_LANGUAGE_DATA'
export const STORE_LANGUAGE_SETS = 'STORE_LANGUAGE_SETS'
export const DELETE_LANGUAGE_DATA = 'DELETE_LANGUAGE_DATA'

import { LanguageID } from 'languages'
import { FirestoreLanguageData, StorySet } from '../reducers/database'

export type DatabaseActionParams =
  | StoreLanguageDataParams
  | StoreLanguageSetsParams
  | DeleteLanguageDataParams

interface StoreLanguageDataParams {
  type: 'STORE_LANGUAGE_DATA'
  languageData: FirestoreLanguageData
  // The ID of the language instance that we're storing data for.
  languageID: LanguageID
}
/**
 * Stores the language data for a language instance in redux.
 */
export function storeLanguageData (
  languageData: FirestoreLanguageData,
  languageID: LanguageID
): StoreLanguageDataParams {
  return {
    type: STORE_LANGUAGE_DATA,
    languageData,
    languageID
  }
}

interface StoreLanguageSetsParams {
  type: 'STORE_LANGUAGE_SETS'
  languageSets: StorySet[]
  // The ID of the language instance that we're storing Story Sets for.
  languageID: LanguageID
}

/**
 * Stores all the sets for a language instance. The sets are stored as individual objects in Firestore but are combined before getting to this action. Then, they are stored as the "sets" key in the language data object.
 */
export function storeLanguageSets (
  languageSets: StorySet[],
  languageID: LanguageID
): StoreLanguageSetsParams {
  return {
    type: STORE_LANGUAGE_SETS,
    languageSets,
    languageID
  }
}

interface DeleteLanguageDataParams {
  type: 'DELETE_LANGUAGE_DATA'
  // The ID of the language instance that we're deleting.
  languageInstanceID: string
}

/**
 * Deletes all of the redux data for a language instance. This includes language data and language sets.
 */
export function deleteLanguageData (
  languageInstanceID: string
): DeleteLanguageDataParams {
  return {
    type: DELETE_LANGUAGE_DATA,
    languageInstanceID
  }
}
