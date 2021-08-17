export const SET_ARE_MOBILIZATION_TOOLS_UNLOCKED =
  'SET_ARE_MOBILIZATION_TOOLS_UNLOCKED'

export type AreMobilizationToolsUnlockedActionParams = SetAreMobilizationToolsUnlockedParams

interface SetAreMobilizationToolsUnlockedParams {
  type: 'SET_ARE_MOBILIZATION_TOOLS_UNLOCKED'
  toSet: boolean
}

/**
 * Sets whether the mobilization tools are unlocked globally or not.
 */
export function setAreMobilizationToolsUnlocked (
  toSet: boolean
): SetAreMobilizationToolsUnlockedParams {
  return {
    type: SET_ARE_MOBILIZATION_TOOLS_UNLOCKED,
    toSet
  }
}
