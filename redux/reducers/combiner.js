//simple file to combine all reducers to be used in redux/store.js

import { combineReducers ***REMOVED*** from 'redux'
import { activeGroup ***REMOVED*** from '../reducers/activeGroup'
import { database, fetchingStatus ***REMOVED*** from '../reducers/database'
import { downloads ***REMOVED*** from '../reducers/downloads'
import { groups ***REMOVED*** from '../reducers/groups'
import { mtUnlockAttempts ***REMOVED*** from '../reducers/mtUnlockAttempts'
import { network ***REMOVED*** from '../reducers/network'
import { security ***REMOVED*** from '../reducers/security'
import { toolkitEnabled ***REMOVED*** from '../reducers/toolkitEnabled'

export default rootReducer = combineReducers({
  downloads,
  database,
  groups,
  activeGroup,
  network,
  fetchingStatus,
  toolkitEnabled,
  security,
  mtUnlockAttempts
***REMOVED***)
