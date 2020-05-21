export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'
export const CREATE_GROUP = 'CREATE_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const SET_BOOKMARK = 'SET_BOOKMARK'
export const RESET_PROGRESS = 'RESET_PROGRESS'
export const ADD_SET = 'ADD_SET'
export const SET_SHOW_TOOLKIT = 'SET_SHOW_TOOLKIT'

export function changeActiveGroup (groupName) {
  return {
    type: CHANGE_ACTIVE_GROUP,
    groupName
  ***REMOVED***
***REMOVED***

export function createGroup (groupName, language, imageSource) {
  return {
    type: CREATE_GROUP,
    groupName,
    language,
    imageSource
  ***REMOVED***
***REMOVED***

export function editGroup (oldGroupName, newGroupName, imageSource) {
  return {
    type: EDIT_GROUP,
    oldGroupName,
    newGroupName,
    imageSource
  ***REMOVED***
***REMOVED***

export function deleteGroup (groupName) {
  return {
    type: DELETE_GROUP,
    groupName
  ***REMOVED***
***REMOVED***

export function toggleComplete (groupName, lessonIndex) {
  return {
    type: TOGGLE_COMPLETE,
    groupName,
    lessonIndex
  ***REMOVED***
***REMOVED***

export function setBookmark (groupName) {
  return {
    type: SET_BOOKMARK,
    groupName
  ***REMOVED***
***REMOVED***

export function resetProgress (groupName) {
  return {
    type: RESET_PROGRESS,
    groupName
  ***REMOVED***
***REMOVED***

export function addSet (groupName, setID) {
  return {
    type: ADD_SET,
    groupName,
    setID
  ***REMOVED***
***REMOVED***

export function setShowToolkit (groupName, toSet) {
  return {
    type: SET_SHOW_TOOLKIT,
    groupName,
    toSet
  ***REMOVED***
***REMOVED***
