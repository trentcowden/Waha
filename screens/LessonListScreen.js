//basic imports
import React, { useEffect, useState, useCallback ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, AsyncStorage ***REMOVED*** from 'react-native';
import { useIsFocused, useFocusEffect ***REMOVED*** from 'react-navigation-hooks';
import * as FileSystem from 'expo-file-system';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';

//component import
import LessonItem from '../components/LessonItem';
import { Audio ***REMOVED*** from 'expo-av';

function LessonListScreen(props) {

  //idea: could I have all the progress tracking logic on this screen instead of in the play screen?
  //send over array of all the progress for that study set and filter on play screen
  //update it using a function prop passed to play screen that changes the state on 

   useFocusEffect(
    React.useCallback(() => {
      console.log("useFocus has triggered, refreshing...")
      fetchCompleteStatuses();
      return () => {***REMOVED***;
    ***REMOVED***, [])
  ); 

  const [progress, setProgress] = useState({***REMOVED***);

  const [refresh, setRefresh] = useState(false);

  //find our specified study set with data taken from the last screen
  selectedStudySetArray = STUDYSETS.filter(studyset => studyset.id === props.navigation.getParam("studySetID"));

  //make our data only the array of lessons
  selectedLessonList = selectedStudySetArray[0].lessonList;

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
        source: item.source,
        //refresh: refreshments
        //updateProgress: updateProgressArray
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***

  //PURPOSE: get the progress object from async
  async function fetchCompleteStatuses() {
    await AsyncStorage
          .getItem("progress")
          .then(value => {
            setProgress(JSON.parse(value))
          ***REMOVED***)
  ***REMOVED***

  //PURPOSE: function to render each individual lesson item in the flatlist
  function renderLessonItem(LessonList) {
    return (
      <LessonItem
        id={LessonList.item.id***REMOVED***
        title={LessonList.item.title***REMOVED***
        subtitle={LessonList.item.subtitle***REMOVED***
        onLessonSelect={() => navigateToPlay(LessonList.item)***REMOVED***
        downloadLesson={() => downloadLesson(LessonList.item)***REMOVED***
        deleteLesson={() => deleteLesson(LessonList.item)***REMOVED***
        isComplete={progress[LessonList.item.id]***REMOVED***
      />
    )
  ***REMOVED***

  function downloadLesson(item) {
    FileSystem.downloadAsync(
      item.source,
      FileSystem.documentDirectory + item.id + '.mp3'
    )
      .then(({ uri ***REMOVED***) => {
        console.log('Finished downloading to ', uri);
      ***REMOVED***)
      .catch(error => {
        console.error(error);
      ***REMOVED***);
  ***REMOVED***

  function deleteLesson(item) {
    console.log('delete');
  ***REMOVED***

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