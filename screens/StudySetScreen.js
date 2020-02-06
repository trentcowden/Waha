//basic imports
import React from 'react';
import { View, Text, Button, FlatList ***REMOVED*** from 'react-native';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';

//other component imports
import StudySetItem from '../components/StudySetItem';

function StudySetScreen(props) {
    
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
        <View>
            <FlatList 
                data={STUDYSETS***REMOVED***
                renderItem={renderStudySetItem***REMOVED***
            />
        </View>
    )
***REMOVED***

StudySetScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Study Sets',
    ***REMOVED***;
  ***REMOVED***;

export default StudySetScreen;