import { AsyncStorage ***REMOVED*** from 'react-native'
import { applyMiddleware, createStore ***REMOVED*** from 'redux'
import { persistReducer, persistStore ***REMOVED*** from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { reduxMode ***REMOVED*** from '../modeSwitch'
import rootReducer from './reducers/combiner'

const blacklist =
  reduxMode === 'test'
    ? [
        'downloads',
        'fetchingStatus',
        'mtUnlockAttempts',
        'areMobilizationToolsUnlocked',
        'groups',
        'database',
        'security',
        'storedDownloads'
      ]
    : ['downloads', 'fetchingStatus', 'mtUnlockAttempts', 'storedDownloads']

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: blacklist
***REMOVED***

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
)

export const persistor = persistStore(store)
