//basic imports
import React from 'react';
import { View, FlatList, StyleSheet ***REMOVED*** from 'react-native';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';

//component import
import LessonItem from '../components/LessonItem';
import { Audio ***REMOVED*** from 'expo-av';

function LessonListScreen(props) {

    //function to navigate to the play screen
    //props.navigation.navigate takes us to the play screen
    //params is the information we want to pass to play screen
    function navigateToPlay(item) {
        props.navigation.navigate({
            routeName: "Play",
            params: {
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                source: item.source
            ***REMOVED***
        ***REMOVED***)
    ***REMOVED***

    function renderLessonItem(LessonList) {
        return(
            <LessonItem 
                title={LessonList.item.title***REMOVED***
                subtitle={LessonList.item.subtitle***REMOVED***
                onLessonSelect={() => navigateToPlay(LessonList.item)***REMOVED***
            />
        )
    ***REMOVED***

    //find our specified study set with data taken from the last screen
    selectedStudySetArray = STUDYSETS.filter(studyset => studyset.id === props.navigation.getParam("studySetID"));

    //make our data only the array of lessons
    selectedLessonList = selectedStudySetArray[0].lessonList;

    return (
        <View style={styles.screen***REMOVED***>
            <FlatList 
                data={selectedLessonList***REMOVED***
                renderItem={renderLessonItem***REMOVED***
            />
        </View>
    )
***REMOVED***

LessonListScreen.navigationOptions = navigationData => {
    return {
      headerTitle: navigationData.navigation.getParam("title")
    ***REMOVED***;
  ***REMOVED***;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    ***REMOVED***
***REMOVED***)

export default LessonListScreen;