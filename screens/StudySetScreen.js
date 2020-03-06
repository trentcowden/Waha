//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Text ***REMOVED*** from 'react-native';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';
import { AsyncStorage ***REMOVED*** from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');

//other component imports
import StudySetItem from '../components/StudySetItem';

//redux
import { connect ***REMOVED*** from 'react-redux'

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
const db = firebase.firestore()

function StudySetScreen(props) {

     //Get stuff from database
    db.collection("languages").doc("english").get().then(doc => {
        if (doc.exists) {
            //deal with colors and fonts
            //console.log("Document data:", doc.data());
        ***REMOVED*** else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
        ***REMOVED******REMOVED***)

    db.collection("languages").doc("english").collection("studySets").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            //console.log(doc.data())
        ***REMOVED***)
    ***REMOVED***) 

    //state to do stuff on first launch (use for onboarding)
    const [isFirstLaunch, setIsFirstLaunch] = useState(false);

    async function checkFirstLaunch() {
        //UNCOMMENT TO CLEAR ASYNC STORAGE
          const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
            AsyncStorage.clear();
        ***REMOVED***  
        try {
            await AsyncStorage
                .getItem('alreadyLaunched')
                .then(value => {
                    if (value == null) {
                        AsyncStorage.setItem('alreadyLaunched', 'true');
                        setIsFirstLaunch(true);
                        setProgress();
                    ***REMOVED***
                ***REMOVED***)
        ***REMOVED*** catch (error) {
            console.log(error);
        ***REMOVED***
    ***REMOVED***

    //Purpose: set status of all lessons to 'incomplete'
    function setProgress() {
        var progress = {***REMOVED***;
        for (i = 0; i < STUDYSETS.length; i++) {
            for (j = 0; j < STUDYSETS[i].lessonList.length; j++) {
                progress[STUDYSETS[i].lessonList[j].id] = 'incomplete'
            ***REMOVED***
        ***REMOVED***
        AsyncStorage.setItem('progress', JSON.stringify(progress))
    ***REMOVED***

    //check if we're on first launch (maybe get better solution later;
    //this does an async operation every time this screen opens)
    useEffect(() => {
        checkFirstLaunch();
    ***REMOVED***, [])

    //function to navigate to the lesson list screen
    //props.navigation.navigate takes us to lessonlist screen
    //params is the information we want to pass to lessonlist screen
    function navigateToLessonList(item) {
        props.navigation.navigate({
            routeName: "LessonList",
            params: {
                title: item.title,
                studySetID: item.id
            ***REMOVED***
        ***REMOVED***)
    ***REMOVED***

    //function to render the studyset items
    //includes onSelect which navigates to the appropriate lesson list screen
    function renderStudySetItem(studySetList) {
        return (
            <StudySetItem
                title={studySetList.item.title***REMOVED***
                onStudySetSelect={() => navigateToLessonList(studySetList.item)***REMOVED***
            />
        )
    ***REMOVED***

    return (
        <View style={styles.screen***REMOVED***>
            <FlatList
                data={STUDYSETS***REMOVED***
                renderItem={renderStudySetItem***REMOVED***
            />
            <View>
                <Text>{JSON.stringify(props.downloadProgress)***REMOVED***</Text>
            </View>
        </View>
    )
***REMOVED***

StudySetScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Study Sets'
    ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
    return {
      downloadProgress: state.downloadProgress,
      somethingDownloading: state.somethingDownloading
    ***REMOVED***
  ***REMOVED***;

export default connect(mapStateToProps)(StudySetScreen);