import { Database } from 'interfaces/database'
import { Group } from 'interfaces/groups'
import { RootState } from 'redux/store'
import {
  ActiveGroupActionParams,
  CHANGE_ACTIVE_GROUP
} from '../actions/activeGroupActions'
/**
 * The active group redux reducer that stores the name of the currently active group. This state is persisted across app restarts.
 * @param {Object} action - Parameters passed from groupsAction.js functions.
 * @param {string} activeGroup - (state) The name of the active group.
 */
export function activeGroup (state = null, params: ActiveGroupActionParams) {
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
  const fallbackGroup: Group = {
    name: 'Group 1',
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
): Database | undefined {
  var activeGroup = state.groups.filter(item => item.name === state.activeGroup)
  return activeGroup.length !== 0
    ? state.database[activeGroup[0].language]
    : undefined
}
