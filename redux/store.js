import { AsyncStorage ***REMOVED*** from 'react-native'
import { applyMiddleware, createStore ***REMOVED*** from 'redux'
import { persistReducer, persistStore ***REMOVED*** from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/combiner'

// switch mode between test and prod
// note: test means that data isn't stored between app restarts
const mode = 'test'

const blacklist =
  mode === 'test'
    ? [
        'downloads',
        'fetchingStatus',
        'mtUnlockAttempts',
        'toolkitEnabled',
        'groups',
        'database',
        'security'
      ]
    : ['downloads', 'fetchingStatus', 'mtUnlockAttempts']

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
