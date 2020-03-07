import { combineReducers ***REMOVED*** from 'redux'
import { ADD_UPDATE_DOWNLOAD, REMOVE_DOWNLOAD, PURGE, TOGGLE_COMPLETE, RESET_PROGRESS ***REMOVED*** from './actions'

function downloads(state = {***REMOVED***, action) {
    switch (action.type) {
        case ADD_UPDATE_DOWNLOAD:
            return  {
                ...state, [action.lessonID]: action.progress
            ***REMOVED***
        case REMOVE_DOWNLOAD:
            //get the key of the download we want to delete
            var idToDelete = action.lessonID

            //return new object with the lesson we want to delete taken out
            Object.keys(state).reduce((object, key) => {
                if (key !== idToDelete) {
                  object[key] = state[key]
                ***REMOVED***
                return object
              ***REMOVED***, {***REMOVED***)
        case PURGE:
            console.log('purging')
            return {***REMOVED***
        default:
            return state
    ***REMOVED***
***REMOVED***

function appProgress(state = {***REMOVED***, action) {
    switch (action.type) {
        case TOGGLE_COMPLETE:
            console.log('made it to reducer...')
            if (action.lessonID in state) {
                var idToDelete = action.lessonID
                const { [idToDelete]: value, ...newObject ***REMOVED*** = state;
                return newObject
            ***REMOVED*** else {
                console.log('lesson not found in progress, adding...')
                return {...state, [action.lessonID]: 'complete'***REMOVED***
            ***REMOVED***
        case RESET_PROGRESS: 
            return {***REMOVED***
        default:
            return state
    ***REMOVED***
***REMOVED***

export default rootReducer = combineReducers({
    downloads,
    appProgress
***REMOVED***)