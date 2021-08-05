export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'

interface ChangeActiveGroupParams {
  type: 'CHANGE_ACTIVE_GROUP'
  groupName: string
}

export type ActiveGroupActionParams = ChangeActiveGroupParams

/**
 * Changes the active group. Alters state using the activeGroup.js reducer, NOT the groups.js reducer.
 * @export
 * @param {string} groupName - The name of the group to switch to.
 * @return {Object} - Object to send to the reducer.
 */
export function changeActiveGroup (groupName: string) {
  return {
    type: CHANGE_ACTIVE_GROUP,
    groupName
  }
}
