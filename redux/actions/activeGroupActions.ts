export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'

export type ActiveGroupActionParams = ChangeActiveGroupParams

interface ChangeActiveGroupParams {
  type: 'CHANGE_ACTIVE_GROUP'
  groupName: string
}

/**
 * Changes the active group. Alters state using the activeGroup.js reducer, NOT the groups.js reducer.
 */
export function changeActiveGroup (groupName: string): ChangeActiveGroupParams {
  return {
    type: CHANGE_ACTIVE_GROUP,
    groupName
  }
}
