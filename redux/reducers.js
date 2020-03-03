import { combineReducers ***REMOVED*** from 'redux'
import { UPDATE_DOWNLOAD_PROGRESS ***REMOVED*** from './actions'

const initialState = {
    somethingDownloading: false,
    downloadProgress: 0
***REMOVED***

function downloadProgress(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DOWNLOAD_PROGRESS:
            return Object.assign({***REMOVED***, state, {donwloadProgress: action.progress***REMOVED***)
        default: 
            return initialState
    ***REMOVED***
***REMOVED***


export default rootReducer = combineReducers({
    downloadProgress
***REMOVED***)