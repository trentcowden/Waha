//basic imports
import React, { useState, useEffect, useRef ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Slider, Alert, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, Dimensions ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import * as Sharing from 'expo-sharing';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';

//sound stuff
import { Audio ***REMOVED*** from 'expo-av';

//components
import TimeDisplay from "../components/TimeDisplay";
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'

//redux
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { connect ***REMOVED*** from 'react-redux'
import { downloadLesson ***REMOVED*** from '../redux/actions/downloadActions'
console.disableYellowBox = true;

function PlayScreen(props) {


  ///////////////////////////
  ////STATE & CONSTRUCTOR////
  ///////////////////////////


  //sound object for storing/controlling audio file
  const [soundObject, setSoundObject] = useState(new Audio.Sound());

  //the length of the current audio file (loaded by sound object)
  const [audioFileLength, setAudioFileLength] = useState(null);

  //boolean to determine if the audio file has finished loading 
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  //boolean to determine if the audio file is currently playing or paused
  const [isPlaying, setIsPlaying] = useState(false);

  //the current position of the seeker
  const [seekPosition, setSeekPosition] = useState(0);

  //boolean to determine if the seeker should update every second
  //NOTE: only time it shouldn't is during seeking, skipping, or loading a new chapter
  const shouldTickUpdate = useRef(false);

  const [activeChapter, setActiveChapter] = useState('fellowship')

  const [chapter1Source, setChapter1Source] = useState(FileSystem.documentDirectory + props.currentLanguage + 'chapter1.mp3');
  const [chapter2Source, setChapter2Source] = useState(FileSystem.documentDirectory + props.navigation.getParam('id') + '.mp3');
  const [chapter3Source, setChapter3Source] = useState(FileSystem.documentDirectory + props.currentLanguage + 'chapter3.mp3');

  //share modal
  const [showShareLessonModal, setShowShareLessonModal] = useState(false);


  //ALBUM ART SLIDER STUFF
  const [flatListRef, setFlatListRef] = useState()

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

  const albumSlidesData = [
    {
      key: '0',
      type: 'text',
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ***REMOVED***,
    {
      key: '1',
      type: 'image',
      iconName: props.navigation.getParam("iconName")
    ***REMOVED***,
    {
      key: '2',
      type: 'text',
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ***REMOVED***,
  ]

  //PURPOSE: update something on every api call to audio object and every second
  soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
    if (playbackStatus.isLoaded) {
      setIsLoaded(true)
    ***REMOVED***

    if (playbackStatus.isBuffering) {
      setIsBuffering(true)
    ***REMOVED*** else {
      setIsBuffering(false)
    ***REMOVED***

    //depending on what chapter we're on, either jump to the next chapter once we finish or 
    //toggle the whole lesson as complete
    if (playbackStatus.didJustFinish) {
      if (activeChapter === 'fellowship') {
        changeChapter('passage')
      ***REMOVED*** else if (activeChapter === 'passage') {
        changeChapter('application')
      ***REMOVED*** else if (activeChapter === 'application') {
        changeCompleteStatus();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)

  //PURPOSE: constructor on first screen open
  useEffect(() => {
    //load up chapter 1 initially
    try {
      console.log('loading chapter 1')
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


  //////////////////////////////////
  ////PROGRESS STORAGE FUNCTIONS////
  //////////////////////////////////


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


  ///////////////////////
  ////SHARE FUNCTIONS////
  ///////////////////////


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
    //setShowShareLessonModal(false)
  ***REMOVED***


  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////


  function renderAlbumSlide(slideList) {
    var content;
    if (slideList.item.type === 'text') {
      content = <Text style={{ flexWrap: "wrap", fontFamily: 'open-sans-regular' ***REMOVED******REMOVED***>{slideList.item.body***REMOVED***</Text>
    ***REMOVED*** else {
      content = <MaterialCommunityIcons name={slideList.item.iconName***REMOVED*** size={350***REMOVED*** />
    ***REMOVED***
    return (
      <ScrollView style={{...styles.albumArtContainer, ...{backgroundColor: props.colors.lessonSetScreenBG, ***REMOVED******REMOVED******REMOVED***>
        {content***REMOVED***
      </ScrollView>
    )
  ***REMOVED***


  //PLAY/PAUSE/SKIP CONTAINER
  var audioControlContainer;
  if (!isLoaded) {
    audioControlContainer =
      <View style={styles.audioControlContainer***REMOVED***>
        <ActivityIndicator size="large" color="black" />
      </View>
  ***REMOVED*** else {
    audioControlContainer =
      <View style={styles.audioControlContainer***REMOVED***>
        <View style={styles.scrubberContainer***REMOVED***>
          <View style={styles.scrubber***REMOVED***>
            <Slider
              value={seekPosition***REMOVED***
              onSlidingComplete={onSeekRelease***REMOVED***
              onValueChange={onSeekDrag***REMOVED***
              minimumValue={0***REMOVED***
              maximumValue={audioFileLength***REMOVED***
              step={1000***REMOVED***
              minimumTrackTintColor={props.colors.primaryColor***REMOVED***
              thumbTintColor={props.colors.accentColor***REMOVED***
            />
          </View>
          <View style={styles.timeInfo***REMOVED***>
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={seekPosition***REMOVED*** max={audioFileLength***REMOVED*** />
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={audioFileLength***REMOVED*** max={audioFileLength***REMOVED*** />
          </View>
        </View>
        <View style={styles.playPauseSkipContainer***REMOVED***>
          <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={skip.bind("this", -10000)***REMOVED***
          >
            <MaterialIcons name="replay-10" size={60***REMOVED*** />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playPauseSkipButton***REMOVED***
            onPress={playHandler***REMOVED***
          >
            <MaterialCommunityIcons 
              name={isPlaying ? "pause-circle" : "play-circle"***REMOVED*** 
              size={125***REMOVED*** 
              color={props.colors.accentColor***REMOVED***
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={skip.bind("this", 10000)***REMOVED***
          >
            <MaterialIcons name="forward-10" size={60***REMOVED*** />
          </TouchableOpacity>
        </View>
      </View>

  ***REMOVED***

  //CHAPTE 2 BUTTON ICON
  var chapter2IconName
  if (activeChapter === 'fellowship') {
    chapter2IconName = 'numeric-2'
  ***REMOVED*** else if (activeChapter === 'passage') {
    chapter2IconName = 'numeric-2-box'
  ***REMOVED*** else {
    chapter2IconName = 'checkbox-marked'
  ***REMOVED***
    
  //CHAPTER 2 BUTTON
  if ((props.navigation.getParam('id') in props.downloads)) {
    chapter2Button =
      <View style={{ ...styles.chapterSelect, flexDirection: "row", borderColor: props.colors.grayedOut ***REMOVED******REMOVED***>
        <AnimatedCircularProgress
          size={20***REMOVED***
          width={4***REMOVED***
          fill={(props.downloads[props.navigation.getParam("id")] * 100)***REMOVED***
          tintColor={props.colors.grayedOut***REMOVED***
          rotation={0***REMOVED***
          backgroundColor="white"
        />
        <Text style={{...styles.chapterSelectText, ...{color: props.colors.grayedOut***REMOVED******REMOVED******REMOVED***>Passage</Text>
      </View>
  ***REMOVED*** else {
    chapter2Button =
      <TouchableOpacity style={{...styles.chapterSelect, ...{borderColor: props.colors.accentColor***REMOVED******REMOVED******REMOVED*** onPress={() => changeChapter('passage')***REMOVED***>
        <MaterialCommunityIcons 
          name={chapter2IconName***REMOVED*** 
          size={30***REMOVED*** 
          color={props.colors.accentColor***REMOVED***
        />
        <Text style={{...styles.chapterSelectText, ...{color: props.colors.accentColor***REMOVED******REMOVED******REMOVED***>Passage</Text>
      </TouchableOpacity>
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.titlesContainer***REMOVED***>
        <Text style={styles.title***REMOVED***>{props.navigation.getParam("title")***REMOVED***</Text>
        <Text style={styles.subtitle***REMOVED***>{props.navigation.getParam("scripture")***REMOVED***</Text>
      </View>
      <FlatList
        renderItem={renderAlbumSlide***REMOVED***
        data={albumSlidesData***REMOVED***
        ref={(ref) => { setFlatListRef(ref) ***REMOVED******REMOVED***
        horizontal={true***REMOVED***
        pagingEnabled={true***REMOVED***
        snapToAlignment={"start"***REMOVED***
        snapToInterval={Dimensions.get('window').width***REMOVED***
        decelerationRate={"fast"***REMOVED***
        viewabilityConfig={viewConfigRef.current***REMOVED***
        initialScrollIndex={0***REMOVED***
      />
      <View style={styles.controlsContainer***REMOVED***>
        <View style={styles.chapterSelectContainer***REMOVED***>
          <TouchableOpacity style={{...styles.chapterSelect, ...{borderColor: props.colors.accentColor***REMOVED******REMOVED******REMOVED*** onPress={() => changeChapter('fellowship')***REMOVED***>
            <MaterialCommunityIcons 
              name={(activeChapter === 'fellowship')   ? "numeric-1-box" : "checkbox-marked"***REMOVED*** 
              size={30***REMOVED*** 
              color={props.colors.accentColor***REMOVED***
            />
            <Text style={{...styles.chapterSelectText, ...{color: props.colors.accentColor***REMOVED******REMOVED******REMOVED***>Fellowship</Text>
          </TouchableOpacity>
            {chapter2Button***REMOVED***
          <TouchableOpacity style={{...styles.chapterSelect, ...{borderColor: props.colors.accentColor***REMOVED******REMOVED******REMOVED*** onPress={() => changeChapter('application')***REMOVED***>
            <MaterialCommunityIcons 
              name={(activeChapter === 'application') ? "numeric-3-box" : "numeric-3"***REMOVED*** 
              size={30***REMOVED*** 
              color={props.colors.accentColor***REMOVED***
            />
            <Text style={{...styles.chapterSelectText, ...{color: props.colors.accentColor***REMOVED******REMOVED******REMOVED***>Application</Text>
          </TouchableOpacity>
        </View>
        {audioControlContainer***REMOVED***
      </View>
      <WahaModal isVisible={showShareLessonModal***REMOVED***>
        <ModalButton title="Share Chapter 1: Fellowship" onPress={() => shareLesson('fellowship')***REMOVED*** />
        <ModalButton title="Share Chapter 2: Passage" onPress={() => shareLesson('passage')***REMOVED*** />
        <ModalButton title="Share Chapter 3: Application" onPress={() => shareLesson('application')***REMOVED*** />
        <ModalButton title="Close" onPress={() => setShowShareLessonModal(false)***REMOVED*** style={{color: "red"***REMOVED******REMOVED***/>
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
      fontFamily: 'open-sans-bold'
    ***REMOVED***,
    gestureEnabled: false,
    headerRight: () =>
      <View style={styles.headerButtonsContainer***REMOVED***>
        <TouchableOpacity 
            style={styles.headerButton***REMOVED***
            onPress={() => setShowShareLessonModal(true)***REMOVED***
          >
            <Ionicons 
              name='md-share'
              size={30***REMOVED*** 
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton***REMOVED***
            onPress={navMarkHandler***REMOVED***
          >
            <Ionicons 
              name={navIsComplete ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"***REMOVED***
              size={30***REMOVED*** 
              color='white'
            />
          </TouchableOpacity>
      </View>
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
    fontFamily: 'open-sans-bold'
  ***REMOVED***,
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'open-sans-light'
  ***REMOVED***,
  albumArtContainer: { 
    width: (Dimensions.get('window').width - 40), 
    padding: 20, 
    margin: 20, 
    borderRadius: 10 
  ***REMOVED***,
  controlsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  ***REMOVED***,
  chapterSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  ***REMOVED***,
  chapterSelect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    borderTopWidth: 2,
    borderBottomWidth: 2
  ***REMOVED***,
  chapterSelectText: {
    fontFamily: 'open-sans-regular',
    fontSize: 16
  ***REMOVED***,
  audioControlContainer: {
    justifyContent: "space-around",
    flexDirection: "column",
    marginBottom: 5,
    marginHorizontal: 10,
    width: "100%",
    height: 200
  ***REMOVED***,
  scrubberContainer: {
    paddingHorizontal: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  ***REMOVED***,
  scrubber: {
    width: "100%"
  ***REMOVED***,
  scrubberInfo: {
    padding: 10
  ***REMOVED***,
  playPauseSkipContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  ***REMOVED***,
  playPauseSkipButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  ***REMOVED***,
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  ***REMOVED***,
  headerButtonsContainer: {
    flexDirection: "row",
    width: 80
  ***REMOVED***,
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  ***REMOVED***
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