import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () =>
  useDispatch<AppDispatch & ThunkDispatch<RootState, undefined, AnyAction>>()
export const useThunkDispatch = () =>
  useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>()
export const selector: TypedUseSelectorHook<RootState> = useSelector
