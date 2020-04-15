//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Alert, Image ***REMOVED*** from 'react-native';
import LessonItem from '../components/LessonItem';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import SetItem from '../components/SetItem';
import FlatListSeparator from '../components/FlatListSeparator'
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'
import NetInfo from '@react-native-community/netinfo';
import { scaleMultiplier, headerImages ***REMOVED*** from '../constants'
import BackButton from '../components/BackButton'

//redux imports
import { downloadLesson ***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete, setBookmark ***REMOVED*** from '../redux/actions/groupsActions'
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
   const [currentLesson, setCurrentLesson] = useState('')

   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
      setCurrentLesson(getCurrentLesson())
      const unsubscribe = NetInfo.addEventListener(state => {
         setIsConnected(state.isConnected)
      ***REMOVED***);
      return function cleanup() {
         unsubscribe();
      ***REMOVED***
   ***REMOVED***, [])

   function getNavOptions() {

      return {
         headerTitle: () => <Image style={styles.headerImage***REMOVED*** source={headerImages[props.activeGroup.language]***REMOVED*** />,
         headerRight: props.route.params.isRTL ? () =>
            <BackButton
               isRTL={props.route.params.isRTL***REMOVED***
               onPress={() => props.navigation.goBack()***REMOVED***
            /> :
            () => <View></View>,
         headerLeft: props.route.params.isRTL ? () =>
            <View></View> :
            () =>
               <BackButton
                  isRTL={props.route.params.isRTL***REMOVED***
                  onPress={() => props.navigation.goBack()***REMOVED***
               />,
      ***REMOVED***
   ***REMOVED***

   ///////////////////////
   ////OTHER FUNCTIONS////
   ///////////////////////

   function getCurrentLesson() {
      // var thisGroupDatabase = props.database[props.activeGroupLanguage]
      // var bookmarkInt = 0;

      // //if a group has no progress, return the first lesson in the first study set
      // if (props.activeGroupProgress.length === 0) {
      //    return thisGroupDatabase.studySets[0].lessons[0].id
      // ***REMOVED***
      // props.activeGroupProgress.map(lessonID => {
      //    if (parseInt(lessonID.slice(-4)) > bookmarkInt)
      //       bookmarkInt = parseInt(lessonID.slice(-4))
      //    return null;
      // ***REMOVED***)

      // //string of the id of the last completed lesson 
      // var bookmarkString = bookmarkInt.toString();
      // var extraZero = ''
      // if (bookmarkString.length < 4)
      //    extraZero = '0'
      // bookmarkString = extraZero + bookmarkString

      // var lessonListOfBookmarkStudySet = thisGroupDatabase.studySets.filter(
      //    studySet => (studySet.id).slice(2, 4) === bookmarkString.slice(0, 2)
      // )[0].lessons

      // //edge case: the last completed lesson is the last in a study set
      // if (parseInt(bookmarkString.slice(-2)) === lessonListOfBookmarkStudySet.length) {
      //    //edge case: the last completed lesson is the last available lesson in any study set
      //    if (parseInt(bookmarkString.slice(0, 2)) === thisGroupDatabase.studySets.length) {
      //       return ('Contact us for more study sets!')
      //    ***REMOVED*** else {
      //       bookmarkString = (extraZero + (parseInt(bookmarkString.slice(0, 2)) + 1)).toString().concat(bookmarkString.slice(-2))
      //       lessonListOfBookmarkStudySet = thisGroupDatabase.studySets.filter(
      //          studySet => (studySet.id).slice(2, 4) === bookmarkString.slice(0, 2)
      //       )[0].lessons
      //       bookmarkLesson = lessonListOfBookmarkStudySet.filter(
      //          lesson => lesson.id === (lesson.id).slice(0, 2).concat(bookmarkString.slice(0, 2), '01')
      //       )
      //    ***REMOVED***

      //    //normal case
      // ***REMOVED*** else {
      //    //get the lesson AFTER the last completed lesson 
      //    bookmarkLesson = lessonListOfBookmarkStudySet.filter(
      //       lesson => lesson.id === (lesson.id).slice(0, 2).concat(extraZero, (parseInt(bookmarkString) + 1).toString())
      //    )
      // ***REMOVED***
      // return bookmarkLesson[0].id
      return 'en001'
   ***REMOVED***


   //PURPOSE: delete a lesson .mp3 of id set by an individual flatlist item
   function deleteLesson() {
      FileSystem.deleteAsync(FileSystem.documentDirectory + idToDownload + '.mp3')
      hideModals();
      setRefresh(old => !old)
   ***REMOVED***

   //PURPOSE: download a lesson .mp3 of id set by an individual flatlist item
   function downloadLesson() {
      //get our source from our array of lessons in this study set
      const currentLesson = props.database.lessons.filter(lesson => lesson.id === idToDownload)
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
      if (props.currentProgress.includes(idToDownload) && whatToMark === 'incomplete') {
         props.toggleComplete(props.activeGroup.name, idToDownload);
      ***REMOVED*** else if (!props.currentProgress.includes(idToDownload) && whatToMark === 'complete') {
         props.toggleComplete(props.activeGroup.name, idToDownload);
      ***REMOVED***
      hideModals();
   ***REMOVED***

   //share lesson functionality
   function shareLesson(chapter) {
      switch (chapter) {
         case 'fellowship':
            Sharing.shareAsync(FileSystem.documentDirectory + props.activeLanguage + 'chapter1.mp3')
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
            Sharing.shareAsync(FileSystem.documentDirectory + props.activeLanguage + 'chapter3.mp3')
            break;
      ***REMOVED***
   ***REMOVED***

   function markUpToThisPointAsComplete(id) {
      var languageAndStudySet = id.substr(0, 4)
      var markToLesson = id.substr(4, 5)

      for (var i = 1; i <= parseInt(markToLesson); i++) {
         var formattedID = ("0" + i).slice(-2);
         idToMark = languageAndStudySet + formattedID
         if (!props.currentProgress.includes(idToMark)) {
            props.toggleComplete(props.activeGroup.name, idToMark)
         ***REMOVED***
      ***REMOVED***
      hideModals();
   ***REMOVED***


   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////


   //PURPOSE: function to render each individual lesson item in the flatlist
   function renderLessonItem(lessonList) {
      return (
         <LessonItem
            id={lessonList.item.id***REMOVED***
            title={lessonList.item.title***REMOVED***
            subtitle={lessonList.item.subtitle***REMOVED***
            onLessonSelect={() => props.navigation.navigate('Play', {
               id: lessonList.item.id,
               title: lessonList.item.title,
               subtitle: lessonList.item.subtitle,
               source: lessonList.item.source,
               scriptureHeader: lessonList.item.scriptureHeader,
               scriptureText: lessonList.item.scriptureText,
               isRTL: props.route.params.isRTL
            ***REMOVED***)***REMOVED***
            isComplete={props.currentProgress.includes(lessonList.item.id)***REMOVED***
            downloadProgress={props.downloads[lessonList.item.id]***REMOVED***
            setShowSaveLessonModal={() => setShowSaveLessonModal(true)***REMOVED***
            setShowDeleteLessonModal={() => setShowDeleteLessonModal(true)***REMOVED***
            setIDToDownload={() => setIDToDownload(lessonList.item.id)***REMOVED***
            setShowLessonOptionsModal={() => setShowLessonOptionsModal(true)***REMOVED***
            setRefresh={() => setRefresh()***REMOVED***
            isConnected={isConnected***REMOVED***
            currentLesson={currentLesson***REMOVED***
            getCurrentLesson={getCurrentLesson***REMOVED***
         />
      )
   ***REMOVED***

   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.studySetItemContainer***REMOVED***>
            <SetItem
               title={props.route.params.title***REMOVED***
               subtitle={props.route.params.subtitle***REMOVED***
               id={props.route.params.studySetID***REMOVED***
               isSmall={true***REMOVED***
               color={props.route.params.color***REMOVED***
            />
         </View>
         <FlatList
            data={props.database.lessons.filter(lesson => props.route.params.setID === lesson.setid)***REMOVED***
            renderItem={renderLessonItem***REMOVED***
            extraData={refresh***REMOVED***
         />
         <WahaModal isVisible={showSaveLessonModal***REMOVED***>
            <ModalButton title={props.database.translations.modals.downloadLessonOptions.downloadLesson***REMOVED*** onPress={downloadLesson***REMOVED*** />
            <ModalButton title={props.database.translations.modals.downloadLessonOptions.cancel***REMOVED*** onPress={hideModals***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
         <WahaModal isVisible={showDeleteLessonModal***REMOVED***>
            <ModalButton title={props.database.translations.modals.deleteLessonOptions.deleteLesson***REMOVED*** onPress={deleteLesson***REMOVED*** />
            <ModalButton title={props.database.translations.modals.deleteLessonOptions.cancel***REMOVED*** onPress={hideModals***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
         <WahaModal isVisible={showLessonOptionsModal***REMOVED***>
            <ModalButton title={props.database.translations.modals.lessonOptions.markLessonComplete***REMOVED*** onPress={() => toggleComplete('complete')***REMOVED*** />
            <ModalButton title={props.database.translations.modals.lessonOptions.markLessonIncomplete***REMOVED*** onPress={() => toggleComplete('incomplete')***REMOVED*** />
            <ModalButton title={props.database.translations.modals.lessonOptions.shareChapter1***REMOVED*** onPress={() => shareLesson('fellowship')***REMOVED*** />
            <ModalButton title={props.database.translations.modals.lessonOptions.shareChapter2***REMOVED*** onPress={() => shareLesson('passage')***REMOVED*** />
            <ModalButton title={props.database.translations.modals.lessonOptions.shareChapter3***REMOVED*** onPress={() => shareLesson('application')***REMOVED*** />
            <ModalButton title={props.database.translations.modals.lessonOptions.markUpToPointAsComplete***REMOVED*** onPress={() => markUpToThisPointAsComplete(idToDownload)***REMOVED*** />
            <ModalButton title={props.database.translations.modals.lessonOptions.close***REMOVED*** onPress={hideModals***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#F7F9FA"
   ***REMOVED***,
   studySetItemContainer: {
      width: "100%",
      height: 90 * scaleMultiplier
   ***REMOVED***,
   headerImage: {
      resizeMode: "center",
      width: 120,
      height: 40,
      alignSelf: "center",
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   //console.log(state.database[activeGroup.language].lessons)
   return {
      downloads: state.downloads,
      currentProgress: activeGroup.progress,
      database: state.database[activeGroup.language],
      activeLanguage: activeGroup.language,
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroup: activeGroup,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: (groupName, lessonID) => { dispatch(toggleComplete(groupName, lessonID)) ***REMOVED***,
      setBookmark: groupName => { dispatch(setBookmark(groupName)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonListScreen);