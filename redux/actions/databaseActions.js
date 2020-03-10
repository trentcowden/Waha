export const ADD_LANGUAGE = 'ADD_LANGUAGE'
export const FETCH_ERROR = 'FETCH_ERROR'
export const STORE_DATA = 'STORE_DATA'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export const SET_IS_FETCHING = 'SET_IS_FETCHING'

//export const CHOOSE_LANGUAGE = 'CHOOSE_LANGUAGE'

import firebase from 'firebase';
import '@firebase/firestore'

//firebase initializing
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

//action creators
export function storeData(data, language) {
    return {
        type: STORE_DATA,
        data,
        language
    ***REMOVED***
***REMOVED***

export function setIsFetching(isFetching) {
    return {
        type: SET_IS_FETCHING,
        isFetching
    ***REMOVED***
***REMOVED***

export function fetchError() {
    return {
        type: FETCH_ERROR
    ***REMOVED***
***REMOVED***

export function addLanguage(language) {
    return dispatch => {
        dispatch(setIsFetching(true));
        //Get stuff from database and throw it in redux
        db.collection("languages").doc(language).get().then(doc => {
            if (doc.exists) {
                dispatch(storeData(doc.data(), language));
                dispatch(setIsFetching(false));
            ***REMOVED*** else {
                console.log("error: doc doesn't exist")
            ***REMOVED******REMOVED***)
    ***REMOVED***
***REMOVED***

export function changeLanguage(newLanguage) {
    console.log('change language action creator firing')
    return {
        type: CHANGE_LANGUAGE,
        newLanguage
    ***REMOVED***
***REMOVED***