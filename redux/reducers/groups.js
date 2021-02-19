import { getSetInfo ***REMOVED*** from '../../constants'
import {
  ADD_SET,
  CREATE_GROUP,
  DELETE_GROUP,
  EDIT_GROUP,
  RESET_PROGRESS,
  SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB,
  UPDATE_PROGRESS
***REMOVED*** from '../actions/groupsActions'

/**
 * The groups redux reducer stores all the information related to groups. This state is persisted across app restarts.
 * @param {Object***REMOVED*** action - Parameters passed from groupActions.js functions.
 * @param {Object[]***REMOVED*** groups - (state) Stores all the created groups in an array.
 * @param {string***REMOVED*** groups[].name - The name of the group.
 * @param {string***REMOVED*** groups[].language - The language ID associated with the group.
 * @param {string***REMOVED*** groups[].emoji - The name of the emoji used for this group's avatar. Called 'default' by default.
 * @param {string***REMOVED*** groups[].recentCoreOrTool - The ID of the most recent foundational or mobilization tools set that has completed a lesson. Note: the name is outdated.
 * @param {string***REMOVED*** groups[].setBookmark - The ID of the bookmarked set for this group.
 * @param {boolean***REMOVED*** groups[].shouldShowMobilizationToolsTab - Whether the mobilization tools tab should show on the story sets screen.
 * @param {Object[]***REMOVED*** groups[].addedSets - An array of sets that have been 'added' to this group. The first 2 foundational sets are added automatically upon creating a new group.
 * @param {string***REMOVED*** groups[].addedSet[].id - The ID of the added set.
 * @param {number[]***REMOVED*** groups[].addedSet[].progress - Stores the progress for this particular set. Each element is a number for the index of the lesson that has been completed. A set with 0 completed lessons would have an empty progress array.
 * @param {number***REMOVED*** groups[].addedSet[].bookmark - The index
 */
export function groups (state = [], params) {
  switch (params.type) {
    /**
     * Adds a new group to the state.
     */
    case CREATE_GROUP:
      return [
        ...state,
        {
          name: params.groupName,
          id: action.groupID,
          language: params.language,
          emoji: params.emoji,
          // Set the recent Foundational or Mobilization Tool set and the set bookmark to the Set 1.1.
          recentCoreOrTool: params.language + '.1.1',
          setBookmark: params.language + '.1.1',
          // Adds the first 2 sets automatically.
          addedSets: [
            {
              id: params.language + '.1.1',
              progress: [],
              bookmark: 1
            ***REMOVED***,
            {
              id: params.language + '.1.2',
              progress: [],
              bookmark: 1
            ***REMOVED***
          ],
          shouldShowMobilizationToolsTab: false
        ***REMOVED***
      ]
    case EDIT_GROUP:
      return state.map(group => {
        if (group.name === params.oldGroupName) {
          return {
            ...group,
            // Only allowable changes are to the group name and the emoji.
            name: params.newGroupName,
            emoji: params.emoji
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    case DELETE_GROUP:
      return state.filter(group => group.name != params.groupName)
    /**
     * Toggles a lesson as complete or incomplete, and takes care of all of extra functionality that goes along with that.
     */
    case UPDATE_PROGRESS:
      // SET BOOKMARK
      // move set bookmark to the set of the lesson that was just marked as complete

      // MOST RECENT
      // check if the set is core or toolkit
      //    -> if it is, set the recentCoreOrTool to this set
      //    -> if it isn't, do nothing

      // PROGRESS
      // check if lesson index is already in progress for this set
      //    -> if it isn't, add lesson index to progress for the set with this lesson
      //    -> if it is, remove lesson index from progress for this set

      // LESSON BOOKMARK
      // set bookmark to earliest uncompleted lesson in this set

      // AUTO-UNLOCK SET
      // check if the set for this lesson is a core story set and is 75% completed
      //    -> if it is, unlock the next core story set automatically

      // WHAT TO DO ON FULLY COMPLETED
      // check if the set for this lesson is fully completed
      //    -> if it is now, check if it's a core/toolkit or topical
      //       -> if it's topical, move the set bookmark to whatever set is stored in
      //       -> if it's a core or toolkit, move the set bookmark to the next in the progression

      // store the set bookmark to be the set of the lesson
      var setBookmark = params.set.id

      // start recent core or tool as null in case we're on a topical set
      var recentCoreOrTool = null

      // start the lesson bookmark at 0
      var lessonBookmark = 0

      // set the recentcoreortool if this set is a core or toolkit
      if (
        getSetInfo('category', params.set.id) === 'foundational' ||
        getSetInfo('category', params.set.id) === 'mobilization tools'
      )
        recentCoreOrTool = params.set.id

      return state.map(group => {
        // get specified group
        if (group.name === params.groupName) {
          // if we didn't set the most recent core/tool set before, leave it as what it was before
          if (recentCoreOrTool === null)
            recentCoreOrTool = group.recentCoreOrTool

          // change some stuff in our specified group
          return {
            // return the rest of the group stuff as is
            ...group,

            //+ ADDED SETS (progress and lesson bookmark setting)
            addedSets: group.addedSets.map(set => {
              // get the set we're changing
              if (set.id === params.set.id) {
                // if the lesson is already marked as completed, mark it as uncomplete and set the bookmark
                if (set.progress.includes(params.lessonIndex)) {
                  // increment the bookmark until we get to 1 that's incomplete
                  // (including the one we're marking)
                  do {
                    lessonBookmark += 1
                  ***REMOVED*** while (
                    set.progress.includes(lessonBookmark) &&
                    lessonBookmark !== params.lessonIndex
                  )

                  // return the set with the new bookmark and progress
                  return {
                    ...set,
                    bookmark: lessonBookmark,
                    progress: set.progress.filter(
                      index => index !== params.lessonIndex
                    )
                  ***REMOVED***
                  // otherwise, mark it as complete and set the bookmark
                ***REMOVED*** else {
                  // if we've completed everything in a set
                  if (set.progress.length + 1 === params.setLength) {
                    // if core or toolkit, set to next in that category
                    if (
                      getSetInfo('category', params.set.id) ===
                        'foundational' ||
                      getSetInfo('category', params.set.id) ===
                        'mobilization tools'
                    ) {
                      setBookmark = params.nextSet
                        ? params.nextSet.id
                        : group.setBookmark

                      recentCoreOrTool = setBookmark
                      // if topical, set to recentCoreOrTool
                    ***REMOVED*** else {
                      setBookmark = recentCoreOrTool
                    ***REMOVED***
                  ***REMOVED***

                  // increment the bookmark until we get to 1 that's incomplete
                  // (including the one we're marking)
                  do {
                    lessonBookmark += 1
                  ***REMOVED*** while (
                    set.progress.includes(lessonBookmark) ||
                    lessonBookmark === params.lessonIndex
                  )

                  // return the set with the new bookmark and progress
                  return {
                    ...set,
                    bookmark: lessonBookmark,
                    progress: [...set.progress, params.lessonIndex]
                  ***REMOVED***
                ***REMOVED***
                // return the rest of the sets that we don't care about changing
              ***REMOVED*** else {
                return set
              ***REMOVED***
            ***REMOVED***),

            //+ MOST RECENT CORE OR TOOLKIT SET
            recentCoreOrTool: recentCoreOrTool,

            //+ SET BOOKMARK
            setBookmark: setBookmark
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    /**
     * DEPECRATED. Resets the progress for a group.
     */
    case RESET_PROGRESS:
      return state.map(group => {
        if (group.name === params.groupName) {
          return {
            ...group,
            setBookmark: group.language + '.1.1',
            addedSets: group.addedSets.map(set => {
              return { ...set, progress: [], bookmark: 1 ***REMOVED***
            ***REMOVED***)
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    case ADD_SET:
      return state.map(group => {
        if (group.name === params.groupName) {
          return {
            ...group,
            addedSets: [
              ...group.addedSets,
              {
                // The bookmark starts at the first lesson and the progress for this set starts at empty.
                id: params.set.id,
                progress: [],
                bookmark: 1
              ***REMOVED***
            ]
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    case SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB:
      return state.map(group => {
        if (group.name === params.groupName) {
          return {
            ...group,
            shouldShowMobilizationToolsTab: params.toSet
          ***REMOVED***
        ***REMOVED***
        return group
      ***REMOVED***)
    default:
      return state
  ***REMOVED***
***REMOVED***
