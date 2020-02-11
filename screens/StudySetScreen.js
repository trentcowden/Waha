//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet ***REMOVED*** from 'react-native';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';
import { AsyncStorage ***REMOVED*** from 'react-native';

//other component imports
import StudySetItem from '../components/StudySetItem';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';

function StudySetScreen(props) {
    
    const [isFirstLaunch, setIsFirstLaunch] = useState(false);

    async function checkFirstLaunch() {
        //AsyncStorage.clear()
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

    function setProgress() {
        var lesson;
        for (i = 0; i < STUDYSETS.length; i++) {
            for (j = 0; j < STUDYSETS[i].lessonList.length; j++) {
                lesson = STUDYSETS[i].lessonList[j].id
                setAsyncValue(lesson, 'incomplete');
            ***REMOVED***
        ***REMOVED*** 
    ***REMOVED***

    async function setAsyncValue(key, mark) {
        try {
            await AsyncStorage
               .setItem(key, mark)
               .then(value => {
               ***REMOVED***) 
       ***REMOVED*** catch (error) {
           console.log(error);
       ***REMOVED*** 
    ***REMOVED***

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
        return(
            <StudySetItem 
                title={studySetList.item.title***REMOVED***
                onStudySetSelect={() => navigateToLessonList(studySetList.item)***REMOVED***
            />
        )
    ***REMOVED***

    return(
        <View style={styles.screen***REMOVED***>
            <FlatList 
                data={STUDYSETS***REMOVED***
                renderItem={renderStudySetItem***REMOVED***
            />
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

export default StudySetScreen;