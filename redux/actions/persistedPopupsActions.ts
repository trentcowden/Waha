export const SET_SHOW_TRAILER_HIGHLIGHTS = 'SET_SHOW_TRAILER_HIGHLIGHTS'
export const SET_HAS_USED_PLAY_SCREEN = 'SET_HAS_USED_PLAY_SCREEN'
export const SET_REVIEW_TIMEOUT = 'SET_REVIEW_TIMEOUT'
export const SET_LESSON_COUNTER = 'SET_LESSON_COUNTER'
export const SET_NUM_LESSONS_TIL_REVIEW = 'SET_NUM_LESSONS_TIL_REVIEW'

interface SetShowTrailerHighlightsParams {
  type: 'SET_SHOW_TRAILER_HIGHLIGHTS'
  toSet: boolean
}

interface SetHasUsedPlayScreenParams {
  type: 'SET_HAS_USED_PLAY_SCREEN'
  toSet: boolean
}

interface SetReviewTimeoutParams {
  type: 'SET_REVIEW_TIMEOUT'
  timeout: number
}

interface SetLessonCounterParams {
  type: 'SET_LESSON_COUNTER'
  numLessons: number
}

interface SetNumLessonsTilReviewParams {
  type: 'SET_NUM_LESSONS_TIL_REVIEW'
  numLessons: number
}

export type PersistedPopupsActionParams =
  | SetShowTrailerHighlightsParams
  | SetHasUsedPlayScreenParams
  | SetReviewTimeoutParams
  | SetLessonCounterParams
  | SetNumLessonsTilReviewParams

// Complete lesson
// 1. If conditions for review request are met, set reviewTimer to 1 hour
// 2. In app state listener, if we're active and time is more than 1 hour ago, show review request
// 3. Set reviewTimer to null

export function setShowTrailerHighlights (
  toSet: boolean
): SetShowTrailerHighlightsParams {
  return {
    type: SET_SHOW_TRAILER_HIGHLIGHTS,
    toSet
  }
}

export function setHasUsedPlayScreen (
  toSet: boolean
): SetHasUsedPlayScreenParams {
  return {
    type: SET_HAS_USED_PLAY_SCREEN,
    toSet
  }
}

export function setReviewTimeout (timeout: number): SetReviewTimeoutParams {
  return {
    type: SET_REVIEW_TIMEOUT,
    timeout
  }
}

export function setLessonCounter (numLessons: number): SetLessonCounterParams {
  return {
    type: SET_LESSON_COUNTER,
    numLessons
  }
}

export function setNumLessonsTilReview (
  numLessons: number
): SetNumLessonsTilReviewParams {
  return {
    type: SET_NUM_LESSONS_TIL_REVIEW,
    numLessons
  }
}
