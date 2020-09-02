import { AsyncStorage ***REMOVED*** from 'react-native'
import { applyMiddleware, createStore ***REMOVED*** from 'redux'
import { persistReducer, persistStore ***REMOVED*** from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/combiner'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'downloads',
    'fetchingStatus',
    'mtUnlockAttempts'
    // 'toolkitEnabled',
    // 'groups',
    // 'database',
    // 'security'
  ]
***REMOVED***

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
)

export const persistor = persistStore(store)
