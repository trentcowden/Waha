import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NetworkState {
  isConnected: boolean
}

const initialState: NetworkState = { isConnected: true }

/**
 * This reducer stores whether the app is connected to the internet or not. This state is persisted across app restarts.
 */
const network = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<{ toSet: boolean }>) => {
      state.isConnected = action.payload.toSet
    }
  }
})

export const { setIsConnected } = network.actions

export default network.reducer
