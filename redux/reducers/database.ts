import {
  DatabaseActionParams,
  DELETE_LANGUAGE_DATA,
  STORE_LANGUAGE_DATA,
  STORE_LANGUAGE_SETS
} from '../actions/databaseActions'

export type Database = Record<string, DBLanguageData>

export interface DBLanguageData {
  files: string[]
  questions: {
    [questionSet: string]: string[]
  }
  installTime: number
  sets: StorySet[]
}

export interface StorySet {
  id: string
  languageID: string
  title: string
  subtitle: string
  iconName: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  hasAudio: boolean
  hasVideo: boolean
  fellowshipType?: string
  applicationType?: string
  text?: string
  videoShareLink?: string
  scripture?: ScripturePassage[]
}

export interface ScripturePassage {
  header: string
  addressID: string
  text: string
}

// The database redux reducer stores all the information for all language instances installed on this device. This includes app translations, lesson translations, language instance properties, etc. All of this is fetched from Firestore and stored in redux. It also stores the user's progress through setting up the app, such as onboarding, installing their first language instance, etc. This state is persisted across app restarts.
export function database (state: Database = {}, params: DatabaseActionParams) {
  switch (params.type) {
    case STORE_LANGUAGE_DATA:
      return {
        ...state,
        [params.languageInstanceID]: {
          ...state[params.languageInstanceID],
          // appVersion: params.languageData[appVersion],
          // contactEmail: params.languageData.contactEmail,
          // displayName: params.languageData.displayName,
          // bibleID: params.languageData.bibleID,
          // isRTL: params.languageData.isRTL,
          files: params.languageData.files,
          questions: params.languageData.questions,
          installTime: state[params.languageInstanceID].installTime
            ? state[params.languageInstanceID].installTime
            : Date.now()
        }
      }
    case STORE_LANGUAGE_SETS:
      return {
        ...state,
        [params.languageInstanceID]: {
          ...state[params.languageInstanceID],
          sets: params.languageSets
        }
      }
    case DELETE_LANGUAGE_DATA:
      const languageToDelete = params.languageInstanceID
      const { [languageToDelete]: value, ...newObject } = state
      return newObject
    default:
      return state
  }
}
