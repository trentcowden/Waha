export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'
export const CREATE_GROUP = 'CREATE_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'

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

export function deleteGroup(groupName) {
   return {
      type: DELETE_GROUP,
      groupName
   ***REMOVED***
***REMOVED***