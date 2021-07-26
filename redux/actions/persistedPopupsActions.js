export const SET_SHOW_TRAILER_HIGHLIGHTS = 'SET_SHOW_TRAILER_HIGHLIGHTS'

// Complete lesson
// 1. If conditions for review request are met, set reviewTimer to 1 hour
// 2. In app state listener, if we're active and time is more than 1 hour ago, show review request
// 3. Set reviewTimer to null

export function setShowTrailerHighlights (toSet) {
  return {
    type: SET_SHOW_TRAILER_HIGHLIGHTS,
    toSet
  }
}
