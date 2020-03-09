import {STORE_DATA, FETCH_ERROR***REMOVED*** from '../actions/databaseActions'

export function database(state = {***REMOVED***, action) {
    switch (action.type) {
        case STORE_DATA:
            console.log(action.data)
            data = action.data
            return {...state, data***REMOVED***
        default:
            return state
    ***REMOVED***
***REMOVED***