export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_ERROR = 'FETCH_ERROR'
export const STORE_DATA = 'STORE_DATA'
//export const CHOOSE_LANGUAGE = 'CHOOSE_LANGUAGE'

import firebase from 'firebase';
import '@firebase/firestore'

***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***;

firebase.initializeApp(config);
const db = firebase.firestore();

export function storeData(data) {
    return {
        type: STORE_DATA,
        data
    ***REMOVED***
***REMOVED***

export function fetchError() {
    return {
        type: FETCH_ERROR
    ***REMOVED***
***REMOVED***

export function fetchData() {
    return dispatch => {
        //Get stuff from database
        //console.log(db)
        db.collection("languages").doc("english").get().then(doc => {
            if (doc.exists) {
                //console.log(doc.data())
                dispatch(storeData(doc.data()))
            ***REMOVED*** else {
                console.log("error: doc doesn't exist")
            ***REMOVED******REMOVED***)
    ***REMOVED***
***REMOVED***