export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'
export const CREATE_GROUP = 'CREATE_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const RESET_PROGRESS = 'RESET_PROGRESS'

export function changeActiveGroup(groupName) {
   return {
      type: CHANGE_ACTIVE_GROUP,
      groupName
   ***REMOVED***
***REMOVED***

export function createGroup(groupName, language) {
   return {
      type: CREATE_GROUP,
      groupName,
      language
   ***REMOVED***
***REMOVED***

export function editGroup(oldGroupName, newGroupName) {
   return {
      type: EDIT_GROUP,
      oldGroupName,
      newGroupName   
   ***REMOVED***
***REMOVED***

export function deleteGroup(groupName) {
   return {
      type: DELETE_GROUP,
      groupName
   ***REMOVED***
***REMOVED***

export function toggleComplete(groupName, lessonID) {
    return {
        type: TOGGLE_COMPLETE,
        groupName,
        lessonID
    ***REMOVED***
***REMOVED***

export function resetProgress(groupName) {
    return {
        type: RESET_PROGRESS,
        groupName
    ***REMOVED***
***REMOVED***