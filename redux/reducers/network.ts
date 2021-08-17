import {
  NetworkActionParams,
  UPDATE_CONNECTION_STATUS
} from '../actions/networkActions'

export interface NetworkState {
  isConnected: boolean
}

/**
 * This reducer stores whether the app is connected to the internet or not. This state is persisted across app restarts.
 */
export function network (
  state: NetworkState = { isConnected: true },
  params: NetworkActionParams
) {
  switch (params.type) {
    case UPDATE_CONNECTION_STATUS:
      return { isConnected: params.status }
    default:
      return state
  }
}
