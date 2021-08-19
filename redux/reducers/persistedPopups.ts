import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PersistedPopupsState {
  showTrailerHighlights: boolean
  hasUsedPlayScreen: boolean
  reviewTimeout: number | undefined
  lessonCounter: number
  numLessonsTilReview: number
}

const initialState: PersistedPopupsState = {
  showTrailerHighlights: true,
  hasUsedPlayScreen: false,
  reviewTimeout: undefined,
  lessonCounter: 0,
  numLessonsTilReview: 2
}

/**
 * The popups reducer stores various states for any modals or snackbars that need to be triggered globally. This state is persisted across app restarts.
 */
const persistedPopups = createSlice({
  name: 'persistedPopups',
  initialState,
  reducers: {
    setShowTrailerHighlights: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.showTrailerHighlights = action.payload.toSet
    },
    setHasUsedPlayScreen: (
      state,
      action: PayloadAction<{ toSet: boolean }>
    ) => {
      state.hasUsedPlayScreen = action.payload.toSet
    },
    setReviewTimeout: (
      state,
      action: PayloadAction<{ timeout: number | undefined }>
    ) => {
      state.reviewTimeout = action.payload.timeout
    },
    setLessonCounter: (state, action: PayloadAction<{ counter: number }>) => {
      state.lessonCounter = action.payload.counter
    },
    setNumLessonsTilReview: (
      state,
      action: PayloadAction<{ numLessons: number }>
    ) => {
      state.numLessonsTilReview = action.payload.numLessons
    }
  }
})

export const {
  setShowTrailerHighlights,
  setHasUsedPlayScreen,
  setReviewTimeout,
  setLessonCounter,
  setNumLessonsTilReview
} = persistedPopups.actions

export default persistedPopups.reducer
