import { RootState } from 'redux/store'
import {
  ActiveGroupActionParams,
  CHANGE_ACTIVE_GROUP
} from '../actions/activeGroupActions'
import { DBLanguageData } from '../reducers/database'
import { Group } from '../reducers/groups'
/**
 * The active group redux reducer that stores the name of the currently active group. This state is persisted across app restarts.
 */
export function activeGroup (
  state: string = '',
  params: ActiveGroupActionParams
) {
  switch (params.type) {
    case CHANGE_ACTIVE_GROUP:
      return params.groupName
    default:
      return state
  }
}

/**
 * Takes in state and returns an object for the active group.
 */
export function activeGroupSelector (state: RootState): Group {
  // Fallback group so that, in case a group isn't found, we can still return something and not have the app be unusable.
  const fallbackGroup: Group = {
    name: 'No Active Group',
    id: 1,
    language: 'en',
    emoji: 'default',
    // Set the recent Foundational or Mobilization Tool set and the set bookmark to the Set 1.1.
    recentCoreOrTool: 'en.1.1',
    setBookmark: 'en.1.1',
    shouldShowMobilizationToolsTab: false,
    // Adds the first 2 Foundational Story Sets automatically as well as the first 2 Mobilization Tools Sets. Even though the user won't see the MT Sets yet, we add them now, so that when they unlock the MTs later, the sets show up automatically.
    addedSets: [
      {
        id: 'en.1.1',
        progress: [],
        bookmark: 1
      },
      {
        id: 'en.1.2',
        progress: [],
        bookmark: 1
      },
      {
        id: 'en.3.1',
        progress: [],
        bookmark: 1
      },
      {
        id: 'en.3.2',
        progress: [],
        bookmark: 1
      }
    ]
  }

  // Get the active group by finding the group with the matching name.
  var activeGroup = state.groups.filter(item => item.name === state.activeGroup)

  // If we found a group, return it. Otherwise, return the fallback group.
  return activeGroup.length !== 0 ? activeGroup[0] : fallbackGroup
}

/**
 * Takes in state and returns the database of the active group's language.
 */
export function activeDatabaseSelector (
  state: RootState
): DBLanguageData | undefined {
  var activeGroup = state.groups.filter(item => item.name === state.activeGroup)
  return activeGroup.length !== 0
    ? state.database[activeGroup[0].language]
    : undefined
}
