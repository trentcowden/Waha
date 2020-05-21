import {
  CREATE_GROUP,
  DELETE_GROUP,
  TOGGLE_COMPLETE,
  RESET_PROGRESS,
  EDIT_GROUP,
  SET_BOOKMARK,
  ADD_SET,
  SET_SHOW_TOOLKIT
***REMOVED*** from '../actions/groupsActions'

export function groups (state = [], action) {
  switch (action.type) {
    case CREATE_GROUP:
      // when creating a group, initialize the name and image source to what the user chose, the language
      // to whatever language they created it under, the progress as empty, and the bookmark as the first lesson
      return [
        ...state,
        {
          name: action.groupName,
          progress: [],
          language: action.language,
          imageSource: action.imageSource,
          bookmark: 1,
          addedSets: [action.language + '01', action.language + '02'],
          showToolkit: false
        ***REMOVED***
      ]
    case EDIT_GROUP:
      // only 2 things that the user can edit are the name and the image
      return state.map(group => {
        if (group.name === action.oldGroupName) {
          return {
            ...group,
            name: action.newGroupName,
            imageSource: action.imageSource
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    case DELETE_GROUP:
      return state.filter(group => group.name != action.groupName)
    case TOGGLE_COMPLETE:
      // add or remove a lesson from the progress array from one group
      return state.map(group => {
        if (group.name === action.groupName) {
          if (group.progress.includes(action.lessonIndex)) {
            return {
              ...group,
              progress: group.progress.filter(id => id !== action.lessonIndex)
            ***REMOVED***
          ***REMOVED*** else {
            return {
              ...group,
              progress: [...group.progress, action.lessonIndex]
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)

    case SET_BOOKMARK:
      var thisGroup = state.filter(group => group.name === action.groupName)[0]
      var bookmarkIndex = 0

      // increase bookmark index until we get to a lesson that isn't completed
      do {
        bookmarkIndex += 1
      ***REMOVED*** while (thisGroup.progress.includes(bookmarkIndex))

      return state.map(group => {
        if (group.name === action.groupName) {
          return { ...group, bookmark: bookmarkIndex ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)

    case RESET_PROGRESS:
      return state.map(group => {
        if (group.name === action.groupName) {
          return { ...group, progress: [] ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)

    case ADD_SET:
      return state.map(group => {
        if (group.name === action.groupName) {
          return { ...group, addedSets: [...group.addedSets, action.setID] ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    case SET_SHOW_TOOLKIT:
      return state.map(group => {
        if (group.name === action.groupName) {
          return { ...group, showToolkit: action.toSet ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    default:
      return state
  ***REMOVED***
***REMOVED***
