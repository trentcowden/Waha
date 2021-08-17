import { Emoji } from 'assets/groupIcons/_groupIcons'
import { LanguageID } from 'languages'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppDispatch, RootState } from 'redux/store'
import {
  logAddStorySet,
  logCompleteStorySet,
  logCreateGroup
} from '../../functions/analyticsFunctions'
import { getSetInfo } from '../../functions/setAndLessonDataFunctions'
import { StorySet } from '../reducers/database'

export const CREATE_GROUP = 'CREATE_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
export const RESET_PROGRESS = 'RESET_PROGRESS'
export const ADD_SET = 'ADD_SET'
export const SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB =
  'SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB'

export type GroupsActionParams =
  | CreateGroupParams
  | EditGroupParams
  | UpdateProgressParams
  | DeleteGroupParams
  | AddSetParams
  | SetShouldShowMobilizationToolsTabParams

interface CreateGroupParams {
  type: 'CREATE_GROUP'
  groupName: string
  groupID: number
  language: LanguageID
  emoji: Emoji
  shouldShowMobilizationToolsTab: boolean
}

/**
 * Creates a new group.
 */
export function createGroup (
  groupName: string,
  language: LanguageID,
  emoji: Emoji,
  shouldShowMobilizationToolsTab: boolean,
  groupID: number,
  groupNumber: number
): CreateGroupParams {
  logCreateGroup(language, groupID, groupNumber)
  return {
    type: CREATE_GROUP,
    groupName,
    language,
    emoji,
    groupID,
    shouldShowMobilizationToolsTab
  }
}

interface EditGroupParams {
  type: 'EDIT_GROUP'
  oldGroupName: string
  newGroupName: string
  emoji: Emoji
  shouldShowMobilizationToolsTab: boolean
}

/**
 * Edits the information for a group.
 */
export function editGroup (
  oldGroupName: string,
  newGroupName: string,
  emoji: Emoji,
  shouldShowMobilizationToolsTab: boolean
): EditGroupParams {
  return {
    type: EDIT_GROUP,
    oldGroupName,
    newGroupName,
    emoji,
    shouldShowMobilizationToolsTab
  }
}

interface DeleteGroupParams {
  type: 'DELETE_GROUP'
  groupName: string
}

/**
 * Deletes a group.
 */
export function deleteGroup (groupName: string): DeleteGroupParams {
  return {
    type: DELETE_GROUP,
    groupName
  }
}

interface UpdateProgressParams {
  type: 'UPDATE_PROGRESS'
  groupName: string
  set: StorySet
  // The set after the one to update the progress in. We need this in case the lesson we're marking as complete finishes a set and the bookmark needs to move onto the next set.
  nextSet: StorySet
  // The index of the lesson within the set we need to mark/unmark as complete.
  lessonIndex: number
  setLength: number
}

/**
 * Update the progress of a set for a group, i.e. marking a lesson within a set complete or incomplete. Only called within the toggleComplete function below.
 */
function updateProgress (
  groupName: string,
  set: StorySet,
  nextSet: StorySet,
  lessonIndex: number,
  setLength: number
): UpdateProgressParams {
  return {
    type: UPDATE_PROGRESS,
    groupName,
    set,
    nextSet,
    lessonIndex,
    setLength
  }
}

/**
 * Toggles the complete status of a lesson. This function acts a bridge function. It's called in components but doesn't send anything to the reducer itself. Its purpose is only to use state to get some more information that the above updateProgress function needs in order to work and then dispatch the updateProgress action.
 */
export function toggleComplete (
  groupName: string,
  set: StorySet,
  lessonIndex: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  // Set up a thunk function so we can get state and dispatch other actions from within this action.
  return (dispatch: AppDispatch, getState: () => RootState) => {
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

    // Get the length of the set that the lesson we're updating the progress of is in.
    var setLength = set.lessons.length

    // Get the object for the group that we're updating the progress in.
    var thisGroup = getState().groups.filter(item => item.name === groupName)[0]

    // Get the progress array for the set that we're updating progress in.
    var thisSetProgress = thisGroup.addedSets.filter(
      savedSet => savedSet.id === set.id
    )[0].progress

    if (
      !thisSetProgress.includes(lessonIndex) &&
      thisSetProgress.length === setLength - 1
    ) {
      logCompleteStorySet(set, thisGroup.id)
    }

    // Dispatch our update progress action with all the information we just got.
    dispatch(updateProgress(groupName, set, nextSet, lessonIndex, setLength))
  }
}

/**
 * DEPRECATED. Resets the progress for a group.
 * @export
 * @param {string} groupName - The name of the group to reset the progress of.
 * @return {Object} - Object to send to the reducer.
 */
// export function resetProgress (groupName) {
//   return {
//     type: RESET_PROGRESS,
//     groupName
//   }
// }

interface AddSetParams {
  type: 'ADD_SET'
  groupName: string
  groupID: number
  set: StorySet
}

/**
 * Adds a new set to a specified group.
 */
export function addSet (
  groupName: string,
  groupID: number,
  set: StorySet
): AddSetParams {
  logAddStorySet(set, groupID)
  return {
    type: ADD_SET,
    groupName,
    groupID,
    set
  }
}

interface SetShouldShowMobilizationToolsTabParams {
  type: 'SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB'
  groupName: string
  toSet: boolean
}

/**
 * Sets whether this group should show the mobilization tools tab or not.
 */
export function setShouldShowMobilizationToolsTab (
  groupName: string,
  toSet: boolean
): SetShouldShowMobilizationToolsTabParams {
  return {
    type: SET_SHOULD_SHOW_MOBILIZATION_TOOLS_TAB,
    groupName,
    toSet
  }
}
