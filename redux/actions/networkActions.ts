export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS'

interface UpdateConnectionStatusParams {
  type: 'UPDATE_CONNECTION_STATUS'
  status: boolean
}

export type NetworkActionParams = UpdateConnectionStatusParams

/**
 * Updates the user's phone's current connection status.
 * @export
 * @param {boolean} status - Whether the user's phone is connected to the internet or not.
 * @return {Object} - Object to send to the reducer.
 */
export function updateConnectionStatus (
  status: boolean
): UpdateConnectionStatusParams {
  return {
    type: UPDATE_CONNECTION_STATUS,
    status
  }
}
