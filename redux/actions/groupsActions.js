import { getLessonInfo, getSetInfo ***REMOVED*** from '../../constants'
import {
  logAddStorySet,
  logCompleteLesson,
  logCreateGroup
***REMOVED*** from '../LogEventFunctions'

export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'
export const CREATE_GROUP = 'CREATE_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
export const RESET_PROGRESS = 'RESET_PROGRESS'
export const ADD_SET = 'ADD_SET'
export const SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB =
  'SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB'

export function changeActiveGroup (groupName) {
  return {
    type: CHANGE_ACTIVE_GROUP,
    groupName
  ***REMOVED***
***REMOVED***

export function createGroup (groupName, language, emoji) {
  logCreateGroup(language)
  return {
    type: CREATE_GROUP,
    groupName,
    language,
    emoji
  ***REMOVED***
***REMOVED***

export function editGroup (oldGroupName, newGroupName, emoji) {
  return {
    type: EDIT_GROUP,
    oldGroupName,
    newGroupName,
    emoji
  ***REMOVED***
***REMOVED***

export function deleteGroup (groupName) {
  return {
    type: DELETE_GROUP,
    groupName
  ***REMOVED***
***REMOVED***

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

export function toggleComplete (groupName, set, lessonIndex) {
  return (dispatch, getState) => {
    var thisLanguage = getState().groups.filter(
      group => group.name === groupName
    )[0].language
    var nextSet = getState().database[thisLanguage].sets.filter(
      dbSet =>
        getSetInfo('category', dbSet.id) === getSetInfo('category', set.id) &&
        getSetInfo('index', dbSet.id) === getSetInfo('index', set.id) + 1
    )[0]
    var thisLesson = set.lessons.filter(
      lesson => getLessonInfo('index', lesson.id) === lessonIndex
    )[0]
    var setLength = set.lessons.length
    var thisGroup = getState().groups.filter(item => item.name === groupName)[0]
    var thisSetProgress = thisGroup.addedSets.filter(
      addedSet => addedSet.id === set.id
    )[0].progress
    if (!thisSetProgress.includes(lessonIndex)) {
      logCompleteLesson(thisLesson, set, thisLanguage)
    ***REMOVED***
    dispatch(updateProgress(groupName, set, nextSet, lessonIndex, setLength))
  ***REMOVED***
***REMOVED***

export function resetProgress (groupName) {
  return {
    type: RESET_PROGRESS,
    groupName
  ***REMOVED***
***REMOVED***

export function addSet (groupName, set) {
  logAddStorySet(set)
  return {
    type: ADD_SET,
    groupName,
    set
  ***REMOVED***
***REMOVED***

export function setShouldShowMobilizationToolsTab (groupName, toSet) {
  return {
    type: SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB,
    groupName,
    toSet
  ***REMOVED***
***REMOVED***
