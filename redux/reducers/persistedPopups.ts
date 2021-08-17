import {
  PersistedPopupsActionParams,
  SET_HAS_USED_PLAY_SCREEN,
  SET_LESSON_COUNTER,
  SET_NUM_LESSONS_TIL_REVIEW,
  SET_REVIEW_TIMEOUT,
  SET_SHOW_TRAILER_HIGHLIGHTS
} from '../actions/persistedPopupsActions'

export interface PersistedPopupsState {
  showTrailerHighlights: boolean
  hasUsedPlayScreen: boolean
  reviewTimeout: number | undefined
  lessonCounter: number
  numLessonsTilReview: number
}

/**
 * The popups reducer stores various states for any modals or snackbars that need to be triggered globally. This state is persisted across app restarts.
 */
export function persistedPopups (
  state: PersistedPopupsState = {
    showTrailerHighlights: true,
    hasUsedPlayScreen: false,
    reviewTimeout: undefined,
    lessonCounter: 0,
    numLessonsTilReview: 2
  },
  params: PersistedPopupsActionParams
) {
  switch (params.type) {
    case SET_SHOW_TRAILER_HIGHLIGHTS:
      return {
        ...state,
        showTrailerHighlights: params.toSet
      }
    case SET_HAS_USED_PLAY_SCREEN:
      return {
        ...state,
        hasUsedPlayScreen: params.toSet
      }
    case SET_REVIEW_TIMEOUT:
      return {
        ...state,
        reviewTimeout: params.timeout
      }
    case SET_LESSON_COUNTER:
      return {
        ...state,
        lessonCounter: params.numLessons
      }
    case SET_NUM_LESSONS_TIL_REVIEW:
      return {
        ...state,
        numLessonsTilReview: params.numLessons
      }
    default:
      return state
  }
}
