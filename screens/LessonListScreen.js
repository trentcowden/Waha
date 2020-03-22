//imports
import React, { useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Button, Modal, Alert ***REMOVED*** from 'react-native';
import LessonItem from '../components/LessonItem';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

//redux imports
import { downloadLesson ***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { connect ***REMOVED*** from 'react-redux'

function LessonListScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


  //simple state to switch back and forth whenever we want to re-render
  //the screen. attached to the extraData prop on the flatlist
  const [refresh, setRefresh] = useState(false);

  //modal states
  const [idToDownload, setIDToDownload] = useState(null);
  const [showSaveLessonModal, setShowSaveLessonModal] = useState(false);
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
  const [showLessonOptionsModal, setShowLessonOptionsModal] = useState(false);

  //find our specified study set with data taken from the last screen
  selectedStudySetArray = props.database[props.database.currentLanguage].studySets.filter(studyset => studyset.id === props.navigation.getParam("studySetID"));

  //make our data only the array of lessons
  selectedLessonList = selectedStudySetArray[0].lessons;

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
        scripture: item.scripture
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***


  ///////////////////////
  ////OTHER FUNCTIONS////
  ///////////////////////


  //PURPOSE: delete a lesson .mp3 of id set by an individual flatlist item
  function deleteLesson() {
    FileSystem.deleteAsync(FileSystem.documentDirectory + idToDownload + '.mp3')
    hideModals();
    setRefresh(old => !old)
  ***REMOVED***

  //PURPOSE: download a lesson .mp3 of id set by an individual flatlist item
  function downloadLesson() {
    //get our source from our array of lessons in this study set
    const currentLesson = selectedLessonList.filter(lesson => lesson.id === idToDownload)
    const source = currentLesson[0].source
    props.downloadLesson(idToDownload, source);
    hideModals();
  ***REMOVED***

  //PURPOSE: hide the modal without doing anything
  function hideModals() {
    setShowSaveLessonModal(false);
    setShowDeleteLessonModal(false);
    setShowLessonOptionsModal(false);
  ***REMOVED***
  
  //PURPOSE: change the complete status via redux dispatch
  function toggleComplete(whatToMark) {
    if (idToDownload in props.appProgress && whatToMark === 'incomplete') {
      props.toggleComplete(idToDownload);
    ***REMOVED*** else if (!(idToDownload in props.appProgress) && whatToMark === 'complete') {
      props.toggleComplete(idToDownload); 
    ***REMOVED***
    hideModals();
  ***REMOVED***

  //share lesson functionality
  function shareLesson(chapter) {
    switch (chapter) {
      case 'fellowship':
        Sharing.shareAsync(FileSystem.documentDirectory + props.currentLanguage + 'chapter1.mp3')
        break;
      case 'passage':
        FileSystem.getInfoAsync(FileSystem.documentDirectory + idToDownload + '.mp3')
        .then(({ exists ***REMOVED***) => {
            exists ? 
              Sharing.shareAsync(FileSystem.documentDirectory + idToDownload + '.mp3') : 
              Alert.alert('Error', 
              'Lesson must be downloaded before share is enabled!',
              [{
                text: 'OK', 
                onPress: () => {***REMOVED***
              ***REMOVED***])
        ***REMOVED***)
        
        break;
      case 'application':
        Sharing.shareAsync(FileSystem.documentDirectory + props.currentLanguage + 'chapter3.mp3')
        break;
    ***REMOVED***
  ***REMOVED***

  
  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////


  //PURPOSE: function to render each individual lesson item in the flatlist
  function renderLessonItem(LessonList) {
    return (
      <LessonItem
        id={LessonList.item.id***REMOVED***
        title={LessonList.item.title***REMOVED***
        subtitle={LessonList.item.subtitle***REMOVED***
        onLessonSelect={() => navigateToPlay(LessonList.item)***REMOVED***
        isComplete={(LessonList.item.id in props.appProgress)***REMOVED***
        downloadProgress={props.downloads[LessonList.item.id]***REMOVED***
        setShowSaveLessonModal={() => setShowSaveLessonModal(true)***REMOVED***
        setShowDeleteLessonModal={() => setShowDeleteLessonModal(true)***REMOVED***
        setIDToDownload={() => setIDToDownload(LessonList.item.id)***REMOVED***
        setShowLessonOptionsModal={() => setShowLessonOptionsModal(true)***REMOVED***
      />
    )
  ***REMOVED***

  //create modal in here, pass state to show it to lesson item so lesson item
  //can change it and show the modal on this screen
  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={selectedLessonList***REMOVED***
        renderItem={renderLessonItem***REMOVED***
        extraData={refresh***REMOVED***
      />
      <Modal 
        visible={showSaveLessonModal***REMOVED***
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true***REMOVED***
      >
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", paddingBottom: "5%"***REMOVED******REMOVED***>
          <Button title="Download lesson" onPress={downloadLesson***REMOVED*** />
          <Button title="Cancel" onPress={hideModals***REMOVED*** />
        </View>
      </Modal>
      <Modal 
        visible={showDeleteLessonModal***REMOVED***
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true***REMOVED***
      >
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", paddingBottom: "5%"***REMOVED******REMOVED***>
          <Button title="Delete lesson" onPress={deleteLesson***REMOVED*** />
          <Button title="Cancel" onPress={hideModals***REMOVED*** />
        </View>
      </Modal>
      <Modal 
        visible={showLessonOptionsModal***REMOVED***
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true***REMOVED***
      >
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", paddingBottom: "5%"***REMOVED******REMOVED***>
          <Button title="Mark lesson as complete" onPress={() => toggleComplete('complete')***REMOVED*** />
          <Button title="Mark lesson as incomplete" onPress={() => toggleComplete('incomplete')***REMOVED*** />
          <Button title="Share Chapter 1: Fellowship" onPress={() => shareLesson('fellowship')***REMOVED*** />
          <Button title="Share Chapter 2: Passage" onPress={() => shareLesson('passage')***REMOVED*** />
          <Button title="Share Chapter 3: Application" onPress={() => shareLesson('application')***REMOVED*** />
          <Button title="Mark lesson as incomplete" onPress={() => toggleComplete('incomplete')***REMOVED*** />
          <Button title="Close" onPress={hideModals***REMOVED*** />
        </View>
      </Modal>
    </View>
  )
***REMOVED***

LessonListScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "waha"
  ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
  console.log(state.downloads)
  return {
    downloads: state.downloads,
    appProgress: state.appProgress,
    database: state.database,
    currentLanguage: state.database.currentLanguage
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
    downloadLesson: (lessonID, source) => {dispatch(downloadLesson(lessonID, source))***REMOVED***,
    toggleComplete: lessonID => {dispatch(toggleComplete(lessonID))***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonListScreen);