//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Alert, Image ***REMOVED*** from 'react-native';
import LessonItem from '../components/LessonItem';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import StudySetItemSmall from '../components/StudySetItemSmall';
import FlatListSeparator from '../components/FlatListSeparator'
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'
import HeaderButtons from '../components/HeaderButtons'
import NetInfo from '@react-native-community/netinfo';
import { scaleMultiplier ***REMOVED*** from '../constants'

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
   const [isConnected, setIsConnected] = useState(false);

   //modal states
   const [idToDownload, setIDToDownload] = useState(null);
   const [showSaveLessonModal, setShowSaveLessonModal] = useState(false);
   const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
   const [showLessonOptionsModal, setShowLessonOptionsModal] = useState(false);

   //find our specified study set with data taken from the last screen
   selectedStudySetArray = props.database[props.database.currentLanguage].studySets.filter(studyset => studyset.id === props.navigation.getParam("studySetID"));

   //make our data only the array of lessons
   selectedLessonList = selectedStudySetArray[0].lessons;

   useEffect(() => {
      props.navigation.setParams({ primaryColor: props.colors.primaryColor ***REMOVED***)
      const unsubscribe = NetInfo.addEventListener(state => {
         setIsConnected(state.isConnected)
      ***REMOVED***);
      return function cleanup() {
         unsubscribe();
      ***REMOVED***
   ***REMOVED***, [])

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
            scripture: item.scripture,
            iconName: props.navigation.getParam("iconName")
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
                           onPress: () => { ***REMOVED***
                        ***REMOVED***])
               ***REMOVED***)

            break;
         case 'application':
            Sharing.shareAsync(FileSystem.documentDirectory + props.currentLanguage + 'chapter3.mp3')
            break;
      ***REMOVED***
   ***REMOVED***

   function markUpToThisPointAsComplete(id) {
      languageAndStudySet = id.substr(0, 4)
      markToLesson = id.substr(4,5)

      for (var i = 1; i <= parseInt(markToLesson); i++) {
         var formattedID = ("0" + i).slice(-2);
         idToMark = languageAndStudySet + formattedID
         if (!(idToMark in props.appProgress)) {
            props.toggleComplete(idToMark)
         ***REMOVED***  
      ***REMOVED***
      hideModals();
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
            setRefresh={() => setRefresh()***REMOVED***
            isConnected={isConnected***REMOVED***
         />
      )
   ***REMOVED***

   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.studySetItemContainer***REMOVED***>
            <StudySetItemSmall
               title={props.navigation.getParam("title")***REMOVED***
               subtitle={props.navigation.getParam("subtitle")***REMOVED***
               id={props.navigation.getParam("studySetID")***REMOVED***
               iconName={props.navigation.getParam("iconName")***REMOVED***
            />
         </View>
         <FlatListSeparator/>
         <FlatList
            data={selectedLessonList***REMOVED***
            renderItem={renderLessonItem***REMOVED***
            extraData={refresh***REMOVED***
            ItemSeparatorComponent={FlatListSeparator***REMOVED***
         />
         <WahaModal isVisible={showSaveLessonModal***REMOVED***>
            <ModalButton title="Download lesson" onPress={downloadLesson***REMOVED*** />
            <ModalButton title="Cancel" onPress={hideModals***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
         <WahaModal isVisible={showDeleteLessonModal***REMOVED***>
            <ModalButton title="Delete lesson" onPress={deleteLesson***REMOVED*** />
            <ModalButton title="Cancel" onPress={hideModals***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
         <WahaModal isVisible={showLessonOptionsModal***REMOVED***>
            <ModalButton title="Mark lesson as complete" onPress={() => toggleComplete('complete')***REMOVED*** />
            <ModalButton title="Mark lesson as incomplete" onPress={() => toggleComplete('incomplete')***REMOVED*** />
            <ModalButton title="Share Chapter 1: Fellowship" onPress={() => shareLesson('fellowship')***REMOVED*** />
            <ModalButton title="Share Chapter 2: Passage" onPress={() => shareLesson('passage')***REMOVED*** />
            <ModalButton title="Share Chapter 3: Application" onPress={() => shareLesson('application')***REMOVED*** />
            <ModalButton title="Mark to this point at complete" onPress={() => markUpToThisPointAsComplete(idToDownload)***REMOVED*** />
            <ModalButton title="Close" onPress={hideModals***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
      </View>
   )
***REMOVED***

LessonListScreen.navigationOptions = navigationData => {
   const primaryColor = navigationData.navigation.getParam("primaryColor");

   return {
      headerTitle: () => <Image style={styles.headerImage***REMOVED*** source={require('../assets/headerLogo.png')***REMOVED***/>,
      headerBackTitle: "Back",
      headerStyle: {
         backgroundColor: "#F7F9FA",
      ***REMOVED***,
      headerLeft: () => 
         <HeaderButtons
            name='ios-arrow-back'
            onPress1={() => navigationData.navigation.goBack()***REMOVED***
            hasCompleteButton={false***REMOVED***
         />,
   ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#F7F9FA"
   ***REMOVED***,
   studySetItemContainer: {
      width: "100%",
      height: 80 * scaleMultiplier
   ***REMOVED***,
   headerImage: {
      resizeMode: "center",
      width: 120,
      height: 40,
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   return {
      downloads: state.downloads,
      appProgress: state.appProgress,
      database: state.database,
      currentLanguage: state.database.currentLanguage,
      colors: state.database[state.database.currentLanguage].colors
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: lessonID => { dispatch(toggleComplete(lessonID)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonListScreen);