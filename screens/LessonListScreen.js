//basic imports
import React, { useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, AsyncStorage ***REMOVED*** from 'react-native';
import { useFocusEffect ***REMOVED*** from 'react-navigation-hooks';
import * as FileSystem from 'expo-file-system';

//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';

//component import
import LessonItem from '../components/LessonItem';


function LessonListScreen(props) {
  useFocusEffect(
    React.useCallback(() => {
      //console.log("useFocus has triggered, refreshing...")
      fetchCompleteStatuses();

      return () => { ***REMOVED***;
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

  //PURPOSE: download a lesson .mp3 from a specified source
  function downloadLesson(item) {
    try {
    FileSystem.downloadAsync(
      item.source,
      FileSystem.documentDirectory + item.id + '.mp3'
    )
      .then(({ uri ***REMOVED***) => {
        setRefresh(old => !old)
      ***REMOVED***)
      .catch(error => {
        console.error(error);
      ***REMOVED***);
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
  ***REMOVED***

  //PURPOSE: delete a lesson .mp3 from a specific address
  function deleteLesson(item) {
    FileSystem.deleteAsync(FileSystem.documentDirectory + item.id + '.mp3')
    setRefresh(old => !old)
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={selectedLessonList***REMOVED***
        renderItem={renderLessonItem***REMOVED***
        extraData={refresh***REMOVED***
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