import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Alert, Image, Button, Text ***REMOVED*** from 'react-native';
import LessonItem from '../components/LessonItem';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import SetItem from '../components/SetItem';
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'
import NetInfo from '@react-native-community/netinfo';
import { scaleMultiplier ***REMOVED*** from '../constants'
import BackButton from '../components/BackButton'
import { downloadLesson ***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete, setBookmark ***REMOVED*** from '../redux/actions/groupsActions'
import { connect ***REMOVED*** from 'react-redux'

function LessonListScreen(props) {

   //// STATE

   // switches back and forth whenever we want to re-render
   // the screen (attached to the extraData prop on the flatlist)
   const [refresh, setRefresh] = useState(false);

   // keeps track of whether the user has internet connection
   const [isConnected, setIsConnected] = useState(false);

   // keeps track of the lesson to download/delete/toggle complete when modals are up
   const [activeLessonInModal, setActiveLessonInModal] = useState({***REMOVED***);

   // modal states
   const [showSaveLessonModal, setShowSaveLessonModal] = useState(false);
   const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
   const [showLessonOptionsModal, setShowLessonOptionsModal] = useState(false);
   


   //// CONSTRUCTOR

   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
      const unsubscribe = NetInfo.addEventListener(state => {
         setIsConnected(state.isConnected)
      ***REMOVED***);
      return function cleanup() {
         unsubscribe();
      ***REMOVED***
   ***REMOVED***, [])

   //// NAV OPTIONS

   function getNavOptions() {
      return {
         headerTitle: () => <Image style={styles.headerImage***REMOVED*** source={{ uri: FileSystem.documentDirectory + props.activeGroup.language + 'header.png' ***REMOVED******REMOVED*** />,
         headerRight: props.isRTL ?
            () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** /> :
            () => <View></View>,
         headerLeft: props.isRTL ?
            () => <View></View> :
            () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
      ***REMOVED***
   ***REMOVED***

   //// FUNCTIONS

   // downloads a lesson's chapter 2 mp3 via modal press
   function downloadLessonFromModal() {
      props.downloadLesson(activeLessonInModal.id, activeLessonInModal.source);
      hideModals();
      setRefresh(old => !old)
   ***REMOVED***

   // deletes a lesson's chapter 2 mp3 via modal press
   function deleteLessonFromModal() {
      FileSystem.deleteAsync(FileSystem.documentDirectory + activeLessonInModal.id + '.mp3')
      hideModals();
      setRefresh(old => !old)
   ***REMOVED***

   // changes the complete status of a lesson via modal press
   // note: don't change it if they're marking it as what it's already marked as
   function toggleCompleteFromModal(statusToMark) {
      if (props.activeGroup.progress.includes(activeLessonInModal.index) && statusToMark === 'incomplete') {
         props.toggleComplete(props.activeGroup.name, activeLessonInModal.index);
         props.setBookmark(props.activeGroup.name)
      ***REMOVED*** else if (!props.activeGroup.progress.includes(activeLessonInModal.index) && statusToMark === 'complete') {
         props.toggleComplete(props.activeGroup.name, activeLessonInModal.index);
         props.setBookmark(props.activeGroup.name)
      ***REMOVED***
      hideModals();
   ***REMOVED***

   // marks every lesson in current set as complete up until the selected lesson via modal press
   function markUpToThisPointAsCompleteFromModal() {
      for (var i = 1; i <= activeLessonInModal.index; i++) {
         if (!props.activeGroup.progress.includes(i) && props.activeDatabase.lessons[i - 1].setid === props.route.params.setID) {
            props.toggleComplete(props.activeGroup.name, i)
         ***REMOVED***
      ***REMOVED***
      hideModals();
      props.setBookmark(props.activeGroup.name)
   ***REMOVED***

   function swipeGestureEnded(data) {
      //   if (data.translateX === Dimensions.get('window').width / 2) {
      //      //console.log('test')
      //   ***REMOVED***
      console.log(data)
   ***REMOVED***

   function test() { console.log('testing') ***REMOVED***


   // hides all the modals 
   function hideModals() {
      setShowSaveLessonModal(false);
      setShowDeleteLessonModal(false);
      setShowLessonOptionsModal(false);
   ***REMOVED***


   // opens the share sheet to share a chapter of a lesson
   function shareLesson(chapter) {
      switch (chapter) {
         case 'fellowship':
            console.log(props.activeGroup.language + 'chapter1.mp3')
            Sharing.shareAsync(FileSystem.documentDirectory + props.activeGroup.language + 'chapter1.mp3')
            break;
         case 'passage':
            FileSystem.getInfoAsync(FileSystem.documentDirectory + activeLessonInModal.id + '.mp3')
               .then(({ exists ***REMOVED***) => {
                  exists ?
                     Sharing.shareAsync(FileSystem.documentDirectory + activeLessonInModal.id + '.mp3') :
                     Alert.alert(
                        props.translations.alerts.shareUndownloaded.header,
                        props.translations.alerts.shareUndownloaded.body,
                        [{ text: props.translations.alerts.options.ok, onPress: () => { ***REMOVED*** ***REMOVED***]
                     )
               ***REMOVED***)
            break;
         case 'application':
            Sharing.shareAsync(FileSystem.documentDirectory + props.activeGroup.language + 'chapter3.mp3')
            break;
      ***REMOVED***
   ***REMOVED***

   //// RENDER

   function renderLessonItem(lessonList) {
      return (
         <LessonItem
            lesson={lessonList.item***REMOVED***
            onLessonSelect={() => props.navigation.navigate('Play', {
               id: lessonList.item.id,
               setid: lessonList.item.setid,
               index: lessonList.item.index,
               title: lessonList.item.title,
               subtitle: lessonList.item.subtitle,
               source: lessonList.item.source,
               scriptureHeader: lessonList.item.scriptureHeader,
               scriptureText: lessonList.item.scriptureText,
            ***REMOVED***)***REMOVED***
            isComplete={props.activeGroup.progress.includes(lessonList.item.index)***REMOVED***
            isConnected={isConnected***REMOVED***
            downloadProgress={props.downloads[lessonList.item.id]***REMOVED***
            setShowSaveLessonModal={() => setShowSaveLessonModal(true)***REMOVED***
            setShowDeleteLessonModal={() => setShowDeleteLessonModal(true)***REMOVED***
            setActiveLessonInModal={() => setActiveLessonInModal(lessonList.item)***REMOVED***
            setShowLessonOptionsModal={() => setShowLessonOptionsModal(true)***REMOVED***
            setRefresh={() => setRefresh()***REMOVED***
         />
      )
   ***REMOVED***

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
            data={props.activeDatabase.lessons.filter(lesson => props.route.params.setID === lesson.setid)***REMOVED***
            renderItem={renderLessonItem***REMOVED***
            keyExtractor={item => item.id***REMOVED***
         />
         {/* MODALS */***REMOVED***
         <WahaModal 
            isVisible={showSaveLessonModal***REMOVED*** 
            hideModal={hideModals***REMOVED***
            closeText={props.activeDatabase.translations.modals.downloadLessonOptions.cancel***REMOVED***
         > 
            <ModalButton isLast={true***REMOVED***title={props.activeDatabase.translations.modals.downloadLessonOptions.downloadLesson***REMOVED*** onPress={downloadLessonFromModal***REMOVED*** />
         </WahaModal>
         <WahaModal 
            isVisible={showDeleteLessonModal***REMOVED*** 
            hideModal={hideModals***REMOVED***
            closeText={props.activeDatabase.translations.modals.deleteLessonOptions.cancel***REMOVED***
         >
            <ModalButton isLast={true***REMOVED*** title={props.activeDatabase.translations.modals.deleteLessonOptions.deleteLesson***REMOVED*** onPress={deleteLessonFromModal***REMOVED*** />
         </WahaModal>
         <WahaModal 
            isVisible={showLessonOptionsModal***REMOVED*** 
            hideModal={hideModals***REMOVED***
            closeText={props.activeDatabase.translations.modals.lessonOptions.close***REMOVED***
         >
            <ModalButton title={props.activeDatabase.translations.modals.lessonOptions.markLessonComplete***REMOVED*** onPress={() => toggleCompleteFromModal('complete')***REMOVED*** />
            <ModalButton title={props.activeDatabase.translations.modals.lessonOptions.markLessonIncomplete***REMOVED*** onPress={() => toggleCompleteFromModal('incomplete')***REMOVED*** />
            <ModalButton title={props.activeDatabase.translations.modals.lessonOptions.shareChapter1***REMOVED*** onPress={() => shareLesson('fellowship')***REMOVED*** />
            <ModalButton title={props.activeDatabase.translations.modals.lessonOptions.shareChapter2***REMOVED*** onPress={() => shareLesson('passage')***REMOVED*** />
            <ModalButton title={props.activeDatabase.translations.modals.lessonOptions.shareChapter3***REMOVED*** onPress={() => shareLesson('application')***REMOVED*** />
            <ModalButton isLast={true***REMOVED*** title={props.activeDatabase.translations.modals.lessonOptions.markUpToPointAsComplete***REMOVED*** onPress={markUpToThisPointAsCompleteFromModal***REMOVED*** />
         </WahaModal>
      </View>
   )
***REMOVED***

//// STYLES

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
      resizeMode: "contain",
      width: 120,
      height: 40,
      alignSelf: "center",
   ***REMOVED***,
   hiddenItemContainer: {
      justifyContent: "space-between",
      flexDirection: "row",

   ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      downloads: state.downloads,
      activeDatabase: state.database[activeGroup.language],
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroup: activeGroup,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: (groupName, lessonIndex) => { dispatch(toggleComplete(groupName, lessonIndex)) ***REMOVED***,
      setBookmark: groupName => { dispatch(setBookmark(groupName)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonListScreen);