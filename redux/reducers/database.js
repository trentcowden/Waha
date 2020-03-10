import { STORE_DATA, FETCH_ERROR, SET_IS_FETCHING, CHANGE_LANGUAGE ***REMOVED*** from '../actions/databaseActions'

export function database(state = {isFetching: true***REMOVED***, action) {
    switch (action.type) {
        case STORE_DATA:
            return {...state, [action.language]: action.data***REMOVED***
        case CHANGE_LANGUAGE:
            return Object.assign({***REMOVED***, state, {currentLanguage: action.newLanguage***REMOVED***)
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching***REMOVED***
        default:
            return state
    ***REMOVED***
***REMOVED***