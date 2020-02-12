//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, AsyncStorage ***REMOVED*** from 'react-native';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';

//component import
import LessonItem from '../components/LessonItem';
import { Audio ***REMOVED*** from 'expo-av';

function LessonListScreen(props) {

  //idea: could I have all the progress tracking logic on this screen instead of in the play screen?
  //send over array of all the progress for that study set and filter on play screen
  //update it using a function prop passed to play screen that changes the state on 

  const [progressArray, setProgressArray] = useState([]);

  //find our specified study set with data taken from the last screen
  selectedStudySetArray = STUDYSETS.filter(studyset => studyset.id === props.navigation.getParam("studySetID"));

  //make our data only the array of lessons
  selectedLessonList = selectedStudySetArray[0].lessonList;

  useEffect(() => {
    getLessonMarks(selectedLessonList)
  ***REMOVED***, [])

  useEffect(() => {
    console.log("progressArrayChanging");
  ***REMOVED***, [progressArray])

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

  async function getLessonMarks(selectedLessonList) {
    for (i = 0; i < selectedLessonList.length; i++) {
      try {
        await AsyncStorage
          .getItem(selectedLessonList[i].id)
          .then(value => {
            setProgressArray(currentArray => currentArray.concat([value]));
          ***REMOVED***)
      ***REMOVED*** catch (error) {
        console.log(error);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  function renderLessonItem(LessonList) {

    return (
      <LessonItem
        id={LessonList.item.id***REMOVED***
        title={LessonList.item.title***REMOVED***
        subtitle={LessonList.item.subtitle***REMOVED***
        onLessonSelect={() => navigateToPlay(LessonList.item)***REMOVED***
        progressArray={progressArray***REMOVED***
      />
    )
  ***REMOVED***





  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={selectedLessonList***REMOVED***
        renderItem={renderLessonItem***REMOVED***
        extraData={progressArray***REMOVED***
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