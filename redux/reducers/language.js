import { CHANGE_LANGUAGE ***REMOVED*** from '../actions/currentLanguageActions'

export function language(state = {***REMOVED***, action) {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return Object.assign({***REMOVED***, state, {currentLanguage: action.newLanguage***REMOVED***)
        default:
            return state;
    ***REMOVED*** 
***REMOVED***