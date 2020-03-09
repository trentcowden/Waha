import {STORE_DATA, FETCH_ERROR***REMOVED*** from '../actions/databaseActions'

export function database(state = {***REMOVED***, action) {
    switch (action.type) {
        case STORE_DATA:
            return {...state, [action.language]: action.data***REMOVED***
        default:
            return state
    ***REMOVED***
***REMOVED***