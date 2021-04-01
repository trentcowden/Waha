import { getLessonInfo, getSetInfo ***REMOVED*** from '../../constants'
import {
  logAddStorySet,
  logCompleteLesson,
  logCompleteStorySet,
  logCreateGroup
***REMOVED*** from '../../LogEventFunctions'

export const CREATE_GROUP = 'CREATE_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
export const RESET_PROGRESS = 'RESET_PROGRESS'
export const ADD_SET = 'ADD_SET'
export const SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB =
  'SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB'

/**
 * Creates a new group.
 * @export
 * @param {string***REMOVED*** groupName - The name of the new group.
 * @param {string***REMOVED*** language - The language ID of the new group.
 * @param {string***REMOVED*** emoji - The name of the emoji for the new group's avatar.
 * @param {number***REMOVED*** groupID - A unique ID for this group. Taken from the globalGroupCounter redux variable.
 * @param {number***REMOVED*** groupNumber - The number this group is in relation to the total number of groups already created.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function createGroup (groupName, language, emoji, groupID, groupNumber) {
  logCreateGroup(language, groupID, groupNumber)
  // console.log(groupID)
  return {
    type: CREATE_GROUP,
    groupName,
    language,
    emoji,
    groupID
  ***REMOVED***
***REMOVED***

/**
 * Edits the information for a group.
 * @export
 * @param {string***REMOVED*** oldGroupName - The name of the group to edit.
 * @param {string***REMOVED*** newGroupName - The new name to replace oldGroupName.
 * @param {string***REMOVED*** emoji - The name of the emoji for the group's avatar.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function editGroup (oldGroupName, newGroupName, emoji) {
  return {
    type: EDIT_GROUP,
    oldGroupName,
    newGroupName,
    emoji
  ***REMOVED***
***REMOVED***

/**
 * Deletes a group.
 * @export
 * @param {string***REMOVED*** groupName - The name of the group to delete.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function deleteGroup (groupName) {
  return {
    type: DELETE_GROUP,
    groupName
  ***REMOVED***
***REMOVED***

/**
 * Update the progress of a set for a group, i.e. marking a lesson within a set complete or incomplete. Only called within the toggleComplete function below.
 * @param {string***REMOVED*** groupName - The name of the group to update the progress in.
 * @param {Object***REMOVED*** set - The set to update the progress in.
 * @param {Object***REMOVED*** nextSet - The set after the one to update the progress in. We need this in case the lesson we're marking as complete finishes a set and the bookmark needs to move onto the next set. This only happens for foundational and mobilization tools sets.
 * @param {number***REMOVED*** lessonIndex - The index of the lesson within the set we need to mark/unmark as complete.
 * @param {number***REMOVED*** setLength - The length of the set that the lesson we're updating the progress in is a part of.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
function updateProgress (groupName, set, nextSet, lessonIndex, setLength) {
  return {
    type: UPDATE_PROGRESS,
    groupName,
    set,
    nextSet,
    lessonIndex,
    setLength
  ***REMOVED***
***REMOVED***

/**
 * Toggles the complete status of a lesson. This function acts a bridge function. It's called in components but doesn't send anything to the reducer itself. Its purpose is only to use state to get some more information that the above updateProgress function needs in order to work and then dispatch the updateProgress action.
 * @export
 * @param {string***REMOVED*** groupName - The name of the group to update the progress in.
 * @param {Object***REMOVED*** set - The set to update the progress in.
 * @param {number***REMOVED*** lessonIndex - The index of the lesson within the set we need to mark/unmark as complete.
 * @return {Object***REMOVED*** - Thunk object that allows us to get the state and dispatch actions.
 */
export function toggleComplete (groupName, set, lessonIndex) {
  // Set up a thunk function so we can get state and dispatch other actions from within this action.
  return (dispatch, getState) => {
    // Firstly, get the language for the group we're editing the progress of.
    var thisLanguage = getState().groups.filter(
      group => group.name === groupName
    )[0].language

    // Get the set after the set we're updating the progress in. This is in case we complete a set and need to automatically add the next one.
    var nextSet = getState().database[thisLanguage].sets.filter(
      dbSet =>
        getSetInfo('category', dbSet.id) === getSetInfo('category', set.id) &&
        getSetInfo('index', dbSet.id) === getSetInfo('index', set.id) + 1
    )[0]

    // Get the object for the lesson that we're updating the progress of.
    var thisLesson = set.lessons.filter(
      lesson => getLessonInfo('index', lesson.id) === lessonIndex
    )[0]

    // Get the length of the set that the lesson we're updating the progress of is in.
    var setLength = set.lessons.length

    // Get the object for the group that we're updating the progress in.
    var thisGroup = getState().groups.filter(item => item.name === groupName)[0]

    // Get the progress array for the set that we're updating progrses in.
    var thisSetProgress = thisGroup.addedSets.filter(
      addedSet => addedSet.id === set.id
    )[0].progress

    // Track analytics.
    if (!thisSetProgress.includes(lessonIndex)) {
      logCompleteLesson(thisLesson, thisGroup.id)
    ***REMOVED***
    if (
      !thisSetProgress.includes(lessonIndex) &&
      thisSetProgress.length === setLength - 1
    ) {
      logCompleteStorySet(set, thisGroup.id)
    ***REMOVED***

    // Dispatch our update progress action with all the information we just got.
    dispatch(updateProgress(groupName, set, nextSet, lessonIndex, setLength))
  ***REMOVED***
***REMOVED***

/**
 * DEPRECATED. Resets the progress for a group.
 * @export
 * @param {string***REMOVED*** groupName - The name of the group to reset the progress of.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function resetProgress (groupName) {
  return {
    type: RESET_PROGRESS,
    groupName
  ***REMOVED***
***REMOVED***

/**
 * Adds a new set to a specified group.
 * @export
 * @param {string***REMOVED*** groupName - The name of the group to add a set in.
 * @param {number***REMOVED*** groupID - The ID of the group to add a set in. Used for analytics.
 * @param {Object***REMOVED*** set - The object for the set that we are adding to this group.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function addSet (groupName, groupID, set) {
  logAddStorySet(set, groupID)
  return {
    type: ADD_SET,
    groupName,
    set
  ***REMOVED***
***REMOVED***

/**
 * Sets whether this group should show the mobilization tools tab or not.
 * @export
 * @param {string***REMOVED*** groupName - The name of the group we want to show/hide the mobilzation tools tab on/from.
 * @param {boolean***REMOVED*** toSet - What to set to. True = show, false = don't show.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function setShouldShowMobilizationToolsTab (groupName, toSet) {
  return {
    type: SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB,
    groupName,
    toSet
  ***REMOVED***
***REMOVED***
