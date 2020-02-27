//basic imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, AsyncStorage ***REMOVED*** from 'react-native';
import { useFocusEffect, useIsFocused ***REMOVED*** from 'react-navigation-hooks';
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

  //don't update download progress if we leave the screen
  //(but still finish the download)
  useEffect(() => {
    return function cleanup() {
      setIsFocused(false);
      console.log('unloading')
    ***REMOVED***
  ***REMOVED***, [])

  const [isFocused, setIsFocused] = useState(true);

  const [progress, setProgress] = useState({***REMOVED***);

  const [refresh, setRefresh] = useState(false);

  const [downloadProgress, setDownloadProgress] = useState(0);
  
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
        //isDownloading={isDownloading***REMOVED***
        downloadProgress={downloadProgress***REMOVED***
      />
    )
  ***REMOVED***

  //PURPOSE: download a lesson .mp3 from a specified source
  function callback(downloadProgressParam) {
    const progress = downloadProgressParam.totalBytesWritten / downloadProgressParam.totalBytesExpectedToWrite;
    if (isFocused) {
      setDownloadProgress(progress)
      console.log('attempting to update download progress')
    ***REMOVED***
  ***REMOVED***

  async function downloadLesson(item) {
    const downloadResumable = FileSystem.createDownloadResumable(
      item.source,
      FileSystem.documentDirectory + item.id + '.mp3',
      {***REMOVED***,
      callback
    )
    try {
      const { uri ***REMOVED*** = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      setRefresh(old => !old)
    ***REMOVED*** catch (error) {
      console.error(error);
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
        //{isDownloading, downloadProgress***REMOVED***
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