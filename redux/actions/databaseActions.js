export const ADD_LANGUAGE = 'ADD_LANGUAGE'
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

export function storeData(data, language) {
    return {
        type: STORE_DATA,
        data,
        language
    ***REMOVED***
***REMOVED***

export function fetchError() {
    return {
        type: FETCH_ERROR
    ***REMOVED***
***REMOVED***

export function addLanguage(language) {
    return dispatch => {
        //Get stuff from database
        db.collection("languages").doc(language).get().then(doc => {
            if (doc.exists) {
                dispatch(storeData(doc.data(), language))
            ***REMOVED*** else {
                console.log("error: doc doesn't exist")
            ***REMOVED******REMOVED***)
    ***REMOVED***
***REMOVED***

export function changeSelectedLanguage(language) {
    return {
        type: CHANGE_SELECTED_LANGUAGE,
        language
    ***REMOVED***
***REMOVED***