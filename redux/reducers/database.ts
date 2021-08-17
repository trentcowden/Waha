import { LanguageID } from 'languages'
import {
  DatabaseActionParams,
  DELETE_LANGUAGE_DATA,
  STORE_LANGUAGE_DATA,
  STORE_LANGUAGE_SETS
} from '../actions/databaseActions'

// Waha's local database is an object where the 2-character language ID's are keys and the language's data are the values.
export type Database = Record<string, DBLanguageData>

// This is all of a language's data, except for all of its Story Sets, that is stored in the Firestore database.
export interface FirestoreLanguageData {
  // The core files that must be downloaded to the device when a language is installed.
  files: string[]
  // Every question set for a language. Keys are the names of the question sets.
  questions: {
    // A question set contains an array of strings, one for each question.
    [questionSetName: string]: string[]
  }
}

// This is all of the data that is stored for a language in the local database.
export type DBLanguageData = FirestoreLanguageData & {
  // The install time for a language so that they can be ordered appropriately when listed in the app.
  installTime: number
  // All of the Story Sets for a language.
  sets: StorySet[]
}

export interface StorySet {
  // The ID of a set in the format xx.1.1, where xx is the language ID.
  id: string
  // The ID of the language that a Story Set is a part of.
  languageID: LanguageID
  title: string
  subtitle: string
  // The name of the icon for a Story Set. See the <SVG /> component for a list of available icons.
  iconName: string
  // The lessons for a Story Set.
  lessons: Lesson[]
  // Tags used to filter Topical Story Sets on the <AddSetScreen /> since there could be a lot of them.
  tags?: string[]
}

export interface Lesson {
  id: string
  title: string
  // Whether a lesson has an audio file stored in Firebase storage.
  hasAudio: boolean
  // Whether a lesson has a video file stored in Firebase storage.
  hasVideo: boolean
  // For lessons that have questions, this is the question set to be used with a lesson's Fellowship chapter.
  fellowshipType?: string
  // For lessons that have questions, this is the question set to be used with a lesson's Application chapter.
  applicationType?: string
  // For book or audiobook lessons, this is the text content for the book.
  text?: string
  // For lessons with videos, this is a shareable link to the video.
  videoShareLink?: string
  // For lessons that have Scripture, this is an array of Scripture passages.
  scripture?: ScripturePassage[]
}

export interface ScripturePassage {
  // The header to be displayed above the Scripture text.
  header: string
  // The API.Bible ID used to dynamically import the Scripture text and header, and is also handy for knowing what Scripture a ScripturePassage is for, since the header will likely not be in English. From https://docs.api.bible/guides/passages: "Capture a range of verses when looking for a grouping (i.e. MAT.1.12-MAT.1.20)".
  addressID: string
  // The Scripture text.
  text: string
}

/** The database redux reducer stores all the information for all installed languages. */
export function database (state: Database = {}, params: DatabaseActionParams) {
  switch (params.type) {
    case STORE_LANGUAGE_DATA:
      return {
        ...state,
        [params.languageID]: {
          ...state[params.languageID],
          files: params.languageData.files,
          questions: params.languageData.questions,
          installTime: state[params.languageID].installTime
            ? state[params.languageID].installTime
            : Date.now()
        }
      }
    case STORE_LANGUAGE_SETS:
      return {
        ...state,
        [params.languageID]: {
          ...state[params.languageID],
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
