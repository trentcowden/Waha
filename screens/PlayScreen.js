//basic imports
import React, { useState, useEffect, useRef ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, Dimensions ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

//sound stuff
import { Audio ***REMOVED*** from 'expo-av';

//components
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'
import Scrubber from '../components/Scrubber'
import PlayPauseSkip from '../components/PlayPauseSkip';
import ChapterSelect from '../components/ChapterSelect'
import HeaderButtons from '../components/HeaderButtons'

//redux
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { connect ***REMOVED*** from 'react-redux'
import { downloadLesson ***REMOVED*** from '../redux/actions/downloadActions'
console.disableYellowBox = true;

function PlayScreen(props) {


   /////////////
   ////STATE////
   /////////////


   //sound object for storing/controlling audio file
   const [soundObject, setSoundObject] = useState(new Audio.Sound());

   //the length of the current audio file (loaded by sound object)
   const [audioFileLength, setAudioFileLength] = useState(null);

   //boolean to determine if the audio file has finished loading 
   const [isLoaded, setIsLoaded] = useState(false);

   //boolean to determine if the audio file is currently playing or paused
   const [isPlaying, setIsPlaying] = useState(false);

   //the current position of the seeker
   const [seekPosition, setSeekPosition] = useState(0);

   //boolean to determine if the seeker should update every second
   //NOTE: only time it shouldn't is during seeking, skipping, or loading a new chapter
   const shouldTickUpdate = useRef(false);

   //string of the currently active chapter
   const [activeChapter, setActiveChapter] = useState('fellowship')

   //sources for all 3 audio files
   const [chapter1Source, setChapter1Source] = useState(FileSystem.documentDirectory + props.currentLanguage + 'chapter1.mp3');
   const [chapter2Source, setChapter2Source] = useState(FileSystem.documentDirectory + props.navigation.getParam('id') + '.mp3');
   const [chapter3Source, setChapter3Source] = useState(FileSystem.documentDirectory + props.currentLanguage + 'chapter3.mp3');

   //share modal
   const [showShareLessonModal, setShowShareLessonModal] = useState(false);

   //ALBUM ART SLIDER STUFF
   //const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

   const albumSlidesData = [
      {
         index: '0',
         type: 'text',
         body: "QUESTIONS",
         marginLeft: 10
      ***REMOVED***,
      {
         index: '1',
         type: 'image',
         iconName: props.navigation.getParam("iconName")
      ***REMOVED***,
      {
         index: '2',
         type: 'text',
         body: "SCRIPTURE"
      ***REMOVED***,
   ]


   ///////////////////
   ////CONSTRUCTOR////
   ///////////////////


   //PURPOSE: constructor on first open
   useEffect(() => {
      //load up chapter 1 initially
      try {
         loadAudioFile(chapter1Source);
      ***REMOVED*** catch (error) {
         console.log(error)
      ***REMOVED***

      //check if file is downloaded, then load it
      checkIsDownloaded(); // -> loadAudioFile()

      //determine complete status of loaded lesson
      var id = props.navigation.getParam('id');

      //send completion info over to navigation (appProgress is from redux)
      props.navigation.setParams({ navIsComplete: (id in props.progress) ***REMOVED***);
      props.navigation.setParams({ navMarkHandler: changeCompleteStatus ***REMOVED***);
      props.navigation.setParams({ setShowShareLessonModal: setShowShareLessonModal ***REMOVED***)
      props.navigation.setParams({ primaryColor: props.colors.primaryColor ***REMOVED***)

      //set up our timer tick for updating the seeker every second
      const interval = setInterval(updateSeekerTick, 1000);

      //when leaving the screen, cancel the interval timer and unload the audio file
      return function cleanup() {
         clearInterval(interval);
         if (soundObject) {
            soundObject.unloadAsync();
            setSoundObject(null);
         ***REMOVED***
      ***REMOVED***
   ***REMOVED***, []);


   ///////////////////////////////
   ////AUDIO CONTROL FUNCTIONS////
   ///////////////////////////////


   //PURPOSE: update something on every api call to audio object and every second
   soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
      if (playbackStatus.isLoaded) {
         setIsLoaded(true)
      ***REMOVED***

      //depending on what chapter we're on, either jump to the next chapter once we finish or 
      //toggle the whole lesson as complete
      if (playbackStatus.didJustFinish) {
         if (activeChapter === 'fellowship') {
            changeChapter('passage')
         ***REMOVED*** else if (activeChapter === 'passage') {
            changeChapter('application')
         ***REMOVED*** else if (activeChapter === 'application') {
            var id = props.navigation.getParam('id');
            var isComplete = (id in props.progress)
            if (!isComplete)
               changeCompleteStatus();
         ***REMOVED***
      ***REMOVED***
   ***REMOVED***)

   //PURPOSE: check if the lesson is downloaded or not
   async function checkIsDownloaded() {
      FileSystem.getInfoAsync(FileSystem.documentDirectory + props.navigation.getParam('id') + '.mp3')
         .then(({ exists ***REMOVED***) => {
            if (!exists && !(props.navigation.getParam('id') in props.downloads)) {
               props.downloadLesson(props.navigation.getParam('id'), props.navigation.getParam('source'));
            ***REMOVED***
         ***REMOVED***)
   ***REMOVED***

   //PURPOSE: load the audio file and set isLoaded and 
   //PARAMETERS: source to load file from
   async function loadAudioFile(source) {
      //console.log(source);
      try {
         await soundObject
            .loadAsync({ uri: source ***REMOVED***, { progressUpdateIntervalMillis: 1000 ***REMOVED***)
            .then(playbackStatus => {
               setAudioFileLength(playbackStatus.durationMillis);
               soundObject.setStatusAsync({ progressUpdateIntervalMillis: 1000, shouldPlay: true ***REMOVED***);
               shouldTickUpdate.current = true;
               setIsPlaying(true)
            ***REMOVED***)
      ***REMOVED*** catch (error) {
         console.log(error)
      ***REMOVED***
   ***REMOVED***

   //PURPOSE: gets called every second by our interval, and updates the seeker position
   //based on the progress through the audio file
   async function updateSeekerTick() {
      //console.log(shouldTickUpdate.current)
      if (shouldTickUpdate.current) {
         try {
            await soundObject
               .getStatusAsync()
               .then(playbackStatus => {
                  setSeekPosition(playbackStatus.positionMillis);
               ***REMOVED***)
            //.catch(err => console.log(err))
         ***REMOVED*** catch (error) {
            console.log(error)
         ***REMOVED***
      ***REMOVED***
   ***REMOVED***

   //PURPOSE: when user taps the play button, if the audio is playing, 
   //pause it; if it's paused, start playing it
   function playHandler() {
      if (isLoaded) {
         updateSeekerTick();
         isPlaying ?
            soundObject.setStatusAsync({ progressUpdateIntervalMillis: 1000, shouldPlay: false ***REMOVED***) :
            soundObject.setStatusAsync({ progressUpdateIntervalMillis: 1000, shouldPlay: true ***REMOVED***);
         setIsPlaying(currentStatus => !currentStatus);
      ***REMOVED***
   ***REMOVED***

   //PURPOSE: start playing from the position they release the thumb at
   //PARAMETERS: the current seeker value
   //NOTE: .catchs are empty because of a weird ios-only warning appearing
   //that doesn't seem to affect any functionality. it's being ignored
   function onSeekRelease(value) {
      if (isPlaying) {
         soundObject.setStatusAsync({
            shouldPlay: false,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
         ***REMOVED***).catch(err => { ***REMOVED***)
         soundObject.setStatusAsync({
            shouldPlay: true,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
         ***REMOVED***).catch(err => { ***REMOVED***)
      ***REMOVED*** else {
         soundObject.setStatusAsync({
            shouldPlay: false,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
         ***REMOVED***).catch(err => { ***REMOVED***)
      ***REMOVED***
      shouldTickUpdate.current = true;
      setSeekPosition(value);
   ***REMOVED***

   //PURPOSE: prevent the seeker from updating every second whenever
   //the user is dragging the thumb
   function onSeekDrag(value) {
      shouldTickUpdate.current = false;
   ***REMOVED***

   //PURPOSE: skips an amount of milliseconds through the audio track
   function skip(amount) {
      isPlaying ?
         soundObject.setStatusAsync({ shouldPlay: true, positionMillis: (seekPosition + amount) ***REMOVED***) :
         soundObject.setStatusAsync({ shouldPlay: false, positionMillis: (seekPosition + amount) ***REMOVED***);
      setSeekPosition(seekPosition => seekPosition + amount);
   ***REMOVED***


   ///////////////////////
   ////OTHER FUNCTIONS////
   ///////////////////////

   //PURPOSE: change the active chapter
   function changeChapter(chapter) {
      //stop updating ticker
      shouldTickUpdate.current = false;

      //set seek position back to 0
      setSeekPosition(0)

      //unload whatever old sound object was loaded
      soundObject.unloadAsync();

      //set the button to show the new active chapter
      setActiveChapter(chapter)

      //load the new audio file
      if (chapter === 'fellowship') {
         loadAudioFile(chapter1Source)
      ***REMOVED*** else if (chapter === 'passage') {
         loadAudioFile(chapter2Source)
      ***REMOVED*** else if (chapter === 'application') {
         loadAudioFile(chapter3Source)
      ***REMOVED***
   ***REMOVED***

   //PURPOSE: switch the complete status of a lesson to the opposite of its current status
   function changeCompleteStatus() {
      var id = props.navigation.getParam('id');
      var isComplete = (id in props.progress)
      //redux action: change the complete status
      props.toggleComplete(id)

      if (isComplete) {
         Alert.alert('Lesson marked as incomplete!',
            'Don\' forget to select when your next lesson is!',
            [{
               text: 'OK',
               onPress: () => { props.navigation.goBack(); ***REMOVED***
            ***REMOVED***])
      ***REMOVED*** else {
         Alert.alert(props.translations['completeMessageTitle'],
            props.translations['completeMessageBody'],
            [{
               text: 'OK',
               onPress: () => { props.navigation.goBack(); ***REMOVED***
            ***REMOVED***])
      ***REMOVED***
   ***REMOVED***

   //PURPOSE: open the share sheet to share a chapter
   function shareLesson(chapter) {
      switch (chapter) {
         case 'fellowship':
            Sharing.shareAsync(chapter1Source).catch(error => console.log(error))
            break;
         case 'passage':
            Sharing.shareAsync(chapter2Source)
            break;
         case 'application':
            Sharing.shareAsync(chapter3Source)
            break;
      ***REMOVED***
   ***REMOVED***


   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   //PURPOSE: render the album art slide flatlist
   function renderAlbumSlide(slideList) {
      var content;
      if (slideList.item.type === 'text') {
         content = <Text style={{ flexWrap: "wrap", fontFamily: 'regular' ***REMOVED******REMOVED***>{slideList.item.body***REMOVED***</Text>
      ***REMOVED*** else {
         content = <MaterialCommunityIcons name={slideList.item.iconName***REMOVED*** size={350***REMOVED*** />
      ***REMOVED***
      return (
         <ScrollView style={{ ...styles.albumArtContainer, ...{ backgroundColor: props.colors.lessonSetScreenBG, ***REMOVED*** ***REMOVED******REMOVED***>
            {content***REMOVED***
         </ScrollView>
      )
   ***REMOVED***



   //PLAY/PAUSE/SKIP CONTAINER
   //conditionally rendered because we don't want to show controls when the audio is loading
   var audioControlContainer;
   if (!isLoaded) {
      //special case when audio is still loading
      audioControlContainer =
         <View style={styles.audioControlContainer***REMOVED***>
            <ActivityIndicator size="large" color="black" />
         </View>
   ***REMOVED*** else {
      //general case which shows scrubber/play controls
      audioControlContainer =
         <View style={styles.audioControlContainer***REMOVED***>
            <Scrubber
               value={seekPosition***REMOVED***
               onSlidingComplete={onSeekRelease***REMOVED***
               onValueChange={onSeekDrag***REMOVED***
               maximumValue={audioFileLength***REMOVED***
               seekPosition={seekPosition***REMOVED***
            />
            <PlayPauseSkip
               isPlaying={isPlaying***REMOVED***
               onPlayPress={playHandler***REMOVED***
               onSkipPress={value => { skip(value) ***REMOVED******REMOVED***
            />
         </View>
   ***REMOVED***

   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.titlesContainer***REMOVED***>
            <Text style={styles.title***REMOVED***>{props.navigation.getParam("title")***REMOVED***</Text>
            <Text style={styles.subtitle***REMOVED***>{props.navigation.getParam("scripture")***REMOVED***</Text>
         </View>
         <View style={styles.albumArtListContainer***REMOVED***>
            <ScrollView
               horizontal={true***REMOVED***
               pagingEnabled={true***REMOVED***
               snapToAlignment={"start"***REMOVED***
               snapToInterval={Dimensions.get('window').width - 70***REMOVED***
               decelerationRate={"fast"***REMOVED***
               initialScrollIndex={1***REMOVED***
               contentOffset={{x: Dimensions.get('window').width - 70, y: 0***REMOVED******REMOVED***
            >
               <View style={{...styles.albumArtContainer, ...{marginLeft: 30***REMOVED******REMOVED******REMOVED***>
                  <ScrollView>
                     <Text style={{ flexWrap: "wrap", fontFamily: 'regular' ***REMOVED******REMOVED***>scripture</Text>
                  </ScrollView>
               </View>
               <View style={{...styles.albumArtContainer, ...{justifyContent: "center", alignItems: "center"***REMOVED******REMOVED******REMOVED***>
                  <MaterialCommunityIcons name={props.navigation.getParam("iconName")***REMOVED*** size={200***REMOVED*** />
               </View>
               <View style={{...styles.albumArtContainer, ...{marginRight: 30***REMOVED******REMOVED******REMOVED***>
                  <ScrollView>
                     <Text style={{ flexWrap: "wrap", fontFamily: 'regular' ***REMOVED******REMOVED***>questions</Text>
                  </ScrollView>
               </View>
            </ScrollView>
         </View>
         <View style={styles.controlsContainer***REMOVED***>
            <ChapterSelect
               activeChapter={activeChapter***REMOVED***
               lessonID={props.navigation.getParam('id')***REMOVED***
               onPress={chapter => changeChapter(chapter)***REMOVED***
            />
            {audioControlContainer***REMOVED***
         </View>

         {/* MODALS */***REMOVED***
         <WahaModal isVisible={showShareLessonModal***REMOVED***>
            <ModalButton title="Share Chapter 1: Fellowship" onPress={() => shareLesson('fellowship')***REMOVED*** />
            <ModalButton title="Share Chapter 2: Passage" onPress={() => shareLesson('passage')***REMOVED*** />
            <ModalButton title="Share Chapter 3: Application" onPress={() => shareLesson('application')***REMOVED*** />
            <ModalButton title="Close" onPress={() => setShowShareLessonModal(false)***REMOVED*** style={{ color: "red" ***REMOVED******REMOVED*** />
         </WahaModal>
      </View>

   )
***REMOVED***

PlayScreen.navigationOptions = navigationData => {
   const navIsComplete = navigationData.navigation.getParam("navIsComplete");
   const navMarkHandler = navigationData.navigation.getParam("navMarkHandler");
   const setShowShareLessonModal = navigationData.navigation.getParam("setShowShareLessonModal");
   const primaryColor = navigationData.navigation.getParam("primaryColor");

   return {
      headerTitle: navigationData.navigation.getParam("subtitle"),
      headerBackTitle: "Back",
      headerStyle: {
         backgroundColor: primaryColor
      ***REMOVED***,
      headerTitleStyle: {
         color: "#fff",
         fontFamily: 'bold'
      ***REMOVED***,
      gestureEnabled: false,
      headerRight: () =>
         <HeaderButtons
            name='md-share'
            onPress1={() => setShowShareLessonModal(true)***REMOVED***
            hasCompleteButton={true***REMOVED***
            completeOnPress={navMarkHandler***REMOVED***
            completeCondition={navIsComplete***REMOVED***
         />,
      headerLeft: () => 
      <HeaderButtons
            name='ios-arrow-back'
            onPress1={() => navigationData.navigation.goBack()***REMOVED***
            hasCompleteButton={false***REMOVED***
         />,
   ***REMOVED***
***REMOVED***;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "space-between"
   ***REMOVED***,
   titlesContainer: {
      flexDirection: "column",
      marginTop: 10
   ***REMOVED***,
   title: {
      textAlign: "center",
      fontSize: 30,
      fontFamily: 'black'
   ***REMOVED***,
   subtitle: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: 'regular'
   ***REMOVED***,
   albumArtListContainer: {
      width: (Dimensions.get('window').width),
      height: (Dimensions.get('window').width),
   ***REMOVED***,
   albumArtContainer: {
      width: (Dimensions.get('window').width - 80),
      height: (Dimensions.get('window').width - 80),
      borderRadius: 10,
      margin: 10,
      padding: 10,
      backgroundColor: "#DEE3E9"
   ***REMOVED***,
   controlsContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginBottom: 10
   ***REMOVED***,
   audioControlContainer: {
      justifyContent: "center",
      flexDirection: "column",
      marginHorizontal: 10,
      width: "100%",
      height: 160
   ***REMOVED***,

***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   //console.log(state.downloads)
   return {
      progress: state.appProgress,
      database: state.database,
      currentLanguage: state.database.currentLanguage,
      translations: state.database[state.database.currentLanguage].translations,
      downloads: state.downloads,
      colors: state.database[state.database.currentLanguage].colors
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      toggleComplete: lessonID => { dispatch(toggleComplete(lessonID)) ***REMOVED***,
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);