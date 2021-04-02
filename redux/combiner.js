import { combineReducers ***REMOVED*** from 'redux'
import { activeGroup ***REMOVED*** from './reducers/activeGroup'
import { areMobilizationToolsUnlocked ***REMOVED*** from './reducers/areMobilizationToolsUnlocked'
import { database ***REMOVED*** from './reducers/database'
import { downloads ***REMOVED*** from './reducers/downloads'
import { groups ***REMOVED*** from './reducers/groups'
import { isInstallingLanguageInstance ***REMOVED*** from './reducers/isInstallingLanguageInstance'
import { mtUnlockAttempts ***REMOVED*** from './reducers/mtUnlockAttempts'
import { network ***REMOVED*** from './reducers/network'
import { security ***REMOVED*** from './reducers/security'
import { storedDownloads ***REMOVED*** from './reducers/storedDownloads'

/**
 * Combines all the different reducers together using the combineReducers redux function.
 */
export default rootReducer = combineReducers({
  downloads,
  database,
  groups,
  activeGroup,
  network,
  isInstallingLanguageInstance,
  areMobilizationToolsUnlocked,
  security,
  mtUnlockAttempts,
  storedDownloads
***REMOVED***)
