//simple file to combine all reducers to be used in redux/store.js

import { downloads ***REMOVED*** from '../reducers/downloads'
import { database, fetchingStatus ***REMOVED*** from '../reducers/database'
import { groups ***REMOVED*** from '../reducers/groups'
import { activeGroup ***REMOVED*** from '../reducers/activeGroup'
import { network ***REMOVED*** from '../reducers/network'
import { combineReducers ***REMOVED*** from 'redux'

export default rootReducer = combineReducers({
    downloads,
    database,
    groups,
    activeGroup,
    network,
    fetchingStatus
***REMOVED***)