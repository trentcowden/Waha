import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Emoji } from 'assets/groupIcons/_groupIcons'
import { LanguageID } from 'languages'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppDispatch, RootState } from 'redux/store'
import { logCompleteStorySet } from '../../functions/analyticsFunctions'
import { getSetInfo } from '../../functions/setAndLessonDataFunctions'
import { SetCategory } from '../../interfaces/setAndLessonInfo'
import { StorySet } from '../reducers/database'

export interface Group {
  // The name of a Group.
  name: string
  // A unique ID for a Group used only for Analytics purposes.
  id: number
  // The language a Group is a part of.
  language: LanguageID
  // The emoji used as a Group's avatar.
  emoji: Emoji
  // The most recently used Foundational or Mobilization Tools Set.
  recentCoreOrTool: string
  // The ID for the Story Set that is bookmarked.
  setBookmark: string
  // Whether or not the Mobilization Tools tab should be visible when a Group is selected.
  shouldShowMobilizationToolsTab: boolean
  // An array of Saved Sets that have been saved.
  addedSets: SavedSet[]
}

// A SavedSet differs from the StorySet type in that it represents a set that has been "saved" or "added" by the user and needs its progress tracked locally. Saved Sets are stored in a Group whereas Story Sets are stored in the local database.
export interface SavedSet {
  // The ID of a Story Set that is saved. Must match up with a Story Set in the local database.
  id: string
  // An array of numbers which contains the indices of completed lessons in a Story Set. For instance, if lesson 1.1.1 and 1.1.2 are completed, this would array would contain 1 and 2.
  progress: number[]
  // The index of the lesson in a Story Set that is bookmarked.
  bookmark: number
}

interface CreateGroupPayload {
  groupName: string
  language: LanguageID
  emoji: Emoji
  shouldShowMobilizationToolsTab: boolean
  groupID: number
  groupNumber: number
}

interface EditGroupPayload {
  oldGroupName: string
  newGroupName: string
  emoji: Emoji
  shouldShowMobilizationToolsTab: boolean
}

interface DeleteGroupPayload {
  groupName: string
}

interface UpdateProgressPayload {
  groupName: string
  set: StorySet
  nextSet: StorySet
  lessonIndex: number
  setLength: number
}

interface AddSetPayload {
  groupName: string
  groupID: number
  set: StorySet
}

const initialState: Group[] = []

const groups = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<CreateGroupPayload>) => {
      state.push({
        name: action.payload.groupName,
        id: action.payload.groupID,
        language: action.payload.language,
        emoji: action.payload.emoji,
        // Set the recent Foundational or Mobilization Tool set and the set bookmark to the Set 1.1.
        recentCoreOrTool: action.payload.language + '.1.1',
        setBookmark: action.payload.language + '.1.1',
        shouldShowMobilizationToolsTab:
          action.payload.shouldShowMobilizationToolsTab,
        // Adds the first 2 Foundational Story Sets automatically as well as the first 2 Mobilization Tools Sets. Even though the user won't see the MT Sets yet, we add them now, so that when they unlock the MTs later, the sets show up automatically.
        addedSets: [
          {
            id: action.payload.language + '.1.1',
            progress: [],
            bookmark: 1
          },
          {
            id: action.payload.language + '.1.2',
            progress: [],
            bookmark: 1
          },
          {
            id: action.payload.language + '.3.1',
            progress: [],
            bookmark: 1
          },
          {
            id: action.payload.language + '.3.2',
            progress: [],
            bookmark: 1
          }
        ]
      })
    },
    editGroup: (state, action: PayloadAction<EditGroupPayload>) => {
      const thisGroup = state.find(
        group => group.name === action.payload.oldGroupName
      )

      if (thisGroup) {
        thisGroup.name = action.payload.newGroupName
        thisGroup.emoji = action.payload.emoji
        thisGroup.shouldShowMobilizationToolsTab =
          action.payload.shouldShowMobilizationToolsTab
      }
    },
    deleteGroup: (state, action: PayloadAction<DeleteGroupPayload>) => {
      return state.filter(group => group.name != action.payload.groupName)
    },
    addSet: (state, action: PayloadAction<AddSetPayload>) => {
      const thisGroup = state.find(
        group => group.name === action.payload.groupName
      )

      if (thisGroup)
        thisGroup.addedSets = [
          ...thisGroup.addedSets,
          {
            // The bookmark starts at the first lesson and the progress for this set starts at empty.
            id: action.payload.set.id,
            progress: [],
            bookmark: 1
          }
        ]
    },
    updateProgress: (state, action: PayloadAction<UpdateProgressPayload>) => {
      const thisGroup = state.find(
        group => group.name === action.payload.groupName
      )

      const thisSavedSet = thisGroup?.addedSets.find(
        savedSet => savedSet.id === action.payload.set.id
      )

      if (thisGroup && thisSavedSet) {
        // Update the setBookmark to be the updating set.
        thisGroup.setBookmark = action.payload.set.id

        // If the set that had a lesson completed is a Foundational or Mobilization Tools one, update the recentCoreOrTool variable.
        if (
          getSetInfo('category', action.payload.set.id) ===
            SetCategory.FOUNDATIONAL ||
          getSetInfo('category', action.payload.set.id) ===
            SetCategory.MOBILIZATION_TOOLS
        )
          thisGroup.recentCoreOrTool = action.payload.set.id

        // If the lesson was marked as incomplete, update the set progress and change the bookmark.
        if (thisSavedSet.progress.includes(action.payload.lessonIndex)) {
          // Increment the lesson bookmark until we find one that hasn't been completed. It could be the one that just got marked as complete.
          do thisSavedSet.bookmark += 1
          while (
            thisSavedSet.progress.includes(thisSavedSet.bookmark) &&
            thisSavedSet.bookmark !== action.payload.lessonIndex
          )

          thisSavedSet.progress = thisSavedSet.progress.filter(
            index => index !== action.payload.lessonIndex
          )
        } // If we're marking a lesson as complete, check for a fully complete set and update the bookmark and progress.
        else {
          // If this lesson will complete a set, we have some special things to do.
          if (thisSavedSet.progress.length + 1 === action.payload.setLength) {
            // If the set that is being completed is a Foundational or Mobilization Tools set, we need to change the set bookmark to the set AFTER the one that just got completed.
            if (
              (getSetInfo('category', action.payload.set.id) ===
                SetCategory.FOUNDATIONAL ||
                getSetInfo('category', action.payload.set.id) ===
                  SetCategory.MOBILIZATION_TOOLS) &&
              action.payload.nextSet
            ) {
              thisGroup.setBookmark = action.payload.nextSet.id
              thisGroup.recentCoreOrTool = action.payload.nextSet.id
            } // If the set that is being completed is a Topical, change the set bookmark to the most recently updated Foundational/MT set.
            else thisGroup.setBookmark = thisGroup.recentCoreOrTool
          }

          // Increment the lesson bookmark until we find one that hasn't been completed. The one that just got marked as complete is exempt.
          do thisSavedSet.bookmark += 1
          while (
            thisSavedSet.progress.includes(thisSavedSet.bookmark) ||
            thisSavedSet.bookmark === action.payload.lessonIndex
          )

          thisSavedSet.progress = [
            ...thisSavedSet.progress,
            action.payload.lessonIndex
          ]
        }
      }
    }
  }
})

export const {
  createGroup,
  editGroup,
  deleteGroup,
  addSet,
  updateProgress
} = groups.actions
export default groups.reducer

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
    dispatch(
      updateProgress({ groupName, set, nextSet, lessonIndex, setLength })
    )
  }
}
