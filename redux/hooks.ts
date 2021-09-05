import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppDispatch, RootState } from './store'

/**
 * Used throughout Waha instead of plain `useDispatch` and `useSelector` to access redux state and dispatch redux actions. I'm not exactly sure how this works, but the redux docs say to do it!
 */
export const useAppDispatch = () =>
  useDispatch<AppDispatch & ThunkDispatch<RootState, undefined, AnyAction>>()
export const useThunkDispatch = () =>
  useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>()
export const selector: TypedUseSelectorHook<RootState> = useSelector
