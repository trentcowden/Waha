//simple file to combine all reducers to be used in redux/store.js

import { combineReducers ***REMOVED*** from 'redux'
import { activeGroup ***REMOVED*** from '../reducers/activeGroup'
import { areMobilizationToolsUnlocked ***REMOVED*** from '../reducers/areMobilizationToolsUnlocked'
import { database ***REMOVED*** from '../reducers/database'
import { downloads ***REMOVED*** from '../reducers/downloads'
import { groups ***REMOVED*** from '../reducers/groups'
import { isFetching ***REMOVED*** from '../reducers/isFetching'
import { mtUnlockAttempts ***REMOVED*** from '../reducers/mtUnlockAttempts'
import { network ***REMOVED*** from '../reducers/network'
import { security ***REMOVED*** from '../reducers/security'
import { storedDownloads ***REMOVED*** from '../reducers/storedDownloads'

export default rootReducer = combineReducers({
  downloads,
  database,
  groups,
  activeGroup,
  network,
  isFetching,
  areMobilizationToolsUnlocked,
  security,
  mtUnlockAttempts,
  storedDownloads
***REMOVED***)
