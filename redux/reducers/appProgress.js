//reducer for all actions related to app progress
//TOGGLE_COMPLETE:  marking a lesson as complete or incomplete depending on what
//it currently is 
//RESET_PROGRESS: marks all lessons as incomplete by removing everything from object

//action imports
import { TOGGLE_COMPLETE, RESET_PROGRESS ***REMOVED*** from '../actions/appProgressActions'

export function appProgress(state = {***REMOVED***, action) {
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