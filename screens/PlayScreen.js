//basic imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Slider, Alert ***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

//sound stuff
import { Audio ***REMOVED*** from 'expo-av';

//components
import TimeDisplay from "../components/TimeDisplay";

//redux
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { connect ***REMOVED*** from 'react-redux'

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

  //boolean to determine if the audio file is currently playing or paused
  const [isPlaying, setIsPlaying] = useState(false);

  //the current position of the seeker
  const [seekPosition, setSeekPosition] = useState(0);

  //boolean to determine if the seeker should update every second
  //NOTE: only time it shouldn't is during seeking or skipping
  /////////maybe should switch to useref???
  const [shouldTickUpdate, setShouldTickUpdate] = useState(true);
  

  //NOT USED CURRENTLY: update something on every api call to audio object and every second
  soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
  ***REMOVED***)

  //PURPOSE: constructor on first screen open
  useEffect(() => {

    //check if file is downloaded, then load it
    checkIsDownloaded(); // -> loadAudioFile()
 
    //determine complete status of loaded lesson
    var id = props.navigation.getParam('id');

    //send completion info over to navigation (appProgress is from redux)
    props.navigation.setParams({ navIsComplete: (id in props.appProgress) ***REMOVED***);
    props.navigation.setParams({ navMarkHandler: changeCompleteStatus ***REMOVED***);

    //set up our timer tick for updating the seeker every second
    const interval = setInterval(updateSeekerTick, 1000);

    //when leaving the screen, cancel the interval timer and unload the audio file
    return function cleanup() {
      clearInterval(interval);
      soundObject.unloadAsync();
    ***REMOVED***
  ***REMOVED***, []);


  ///////////////////////////////
  ////AUDIO CONTROL FUNCTIONS////
  ///////////////////////////////

  
  //PURPOSE: check if the lesson is downloaded or not
  async function checkIsDownloaded() {
    let source = '';
    FileSystem.getInfoAsync(FileSystem.documentDirectory + props.navigation.getParam('id') + '.mp3')
    .then(({exists***REMOVED***) => {
      if(exists) {
        //console.log('file exists')
        source = (FileSystem.documentDirectory + props.navigation.getParam('id') + '.mp3')
      ***REMOVED*** else {
        //console.log('file does not exist')
        source = props.navigation.getParam('source')
      ***REMOVED*** 
      loadAudioFile(source);
    ***REMOVED***)
  ***REMOVED***

  //PURPOSE: load the audio file and set isLoaded and 
  //PARAMETERS: source to load file from
  async function loadAudioFile(source) {
    console.log(source);
    try {
      await soundObject
        .loadAsync({ uri: source ***REMOVED***, { progressUpdateIntervalMillis: 1000 ***REMOVED***)
        .then(async playbackStatus => {
          setIsLoaded(playbackStatus.isLoaded);
          setAudioFileLength(playbackStatus.durationMillis);
        ***REMOVED***)
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
  ***REMOVED***

  //PURPOSE: gets called every second by our interval, and updates the seeker position
  //based on the progress through the audio file
  async function updateSeekerTick() {
    if (shouldTickUpdate) {
      try {
        await soundObject
          .getStatusAsync()
          .then(async playbackStatus => {
            setSeekPosition(playbackStatus.positionMillis);
          ***REMOVED***)
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
  function onSeekRelease(value) {
    isPlaying ?
      soundObject.setStatusAsync({ shouldPlay: true, positionMillis: value ***REMOVED***) :
      soundObject.setStatusAsync({ shouldPlay: false, positionMillis: value ***REMOVED***);
    setShouldTickUpdate(true);
    setSeekPosition(value);
  ***REMOVED***

  //PURPOSE: prevent the seeker from updating every second whenever
  //the user is dragging the thumb
  function onSeekDrag(value) {
    setShouldTickUpdate(false);
  ***REMOVED***

  //PURPOSE: skips an amount of milliseconds through the audio track
  function skip(amount) {
    isPlaying ?
      soundObject.setStatusAsync({ shouldPlay: true, positionMillis: (seekPosition + amount) ***REMOVED***) :
      soundObject.setStatusAsync({ shouldPlay: false, positionMillis: (seekPosition + amount) ***REMOVED***);
    setSeekPosition(seekPosition => seekPosition + amount);
  ***REMOVED***


  //////////////////////////////////
  ////PROGRESS STORAGE FUNCTIONS////
  //////////////////////////////////
  

  function changeCompleteStatus() {
    var id = props.navigation.getParam('id');
    var isComplete = (id in props.appProgress)
    //redux action: change the complete status
    props.toggleComplete(id)

    if (isComplete) {
      Alert.alert('Lesson marked as incomplete!', 
      'Don\' forget to select when your next lesson is!',
      [{
        text: 'OK', 
        onPress: () => {props.navigation.goBack();***REMOVED***
      ***REMOVED***])
    ***REMOVED*** else {
      Alert.alert('Lesson marked as complete!', 
      'Don\' forget to select when your next lesson is!',
      [{
        text: 'OK', 
        onPress: () => {props.navigation.goBack();***REMOVED***
      ***REMOVED***])
    ***REMOVED*** 

    //don't need to update button anymore
    // props.navigation.setParams({ navIsComplete: (id in props.appProgress)***REMOVED***);
    // props.navigation.setParams({ navMarkHandler: changeCompleteStatus ***REMOVED***);
  ***REMOVED***


  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////


  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.titlesContainer***REMOVED***>
        <Text style={styles.title***REMOVED***>{props.navigation.getParam("title")***REMOVED***</Text>
        <Text style={styles.subtitle***REMOVED***>{props.navigation.getParam("subtitle")***REMOVED***</Text>
      </View>
      <Text style={{ textAlign: "center", flex: 1 ***REMOVED******REMOVED***>Status: {isLoaded ? "Finished loading" : "Loading"***REMOVED***</Text>
      <View style={styles.controlsContainer***REMOVED***>
        <View style={styles.scrubberContainer***REMOVED***>
          <View style={styles.scrubber***REMOVED***>
            <Slider
              value={seekPosition***REMOVED***
              onSlidingComplete={onSeekRelease***REMOVED***
              onValueChange={onSeekDrag***REMOVED***
              minimumValue={0***REMOVED***
              maximumValue={audioFileLength***REMOVED***
              step={1000***REMOVED***
            />
          </View>
          <View style={styles.timeInfo***REMOVED***>
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={seekPosition***REMOVED*** max={audioFileLength***REMOVED*** />
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={audioFileLength***REMOVED*** max={audioFileLength***REMOVED*** />
          </View>
        </View>
        <View style={styles.buttonContainer***REMOVED***>
          <Ionicons.Button
            name="md-return-left"
            size={85***REMOVED***
            onPress={skip.bind("this", -5000)***REMOVED***
            backgroundColor="rgba(0,0,0,0)"
            iconStyle={styles.button***REMOVED***
          />
          <Ionicons.Button
            name={isPlaying ? "ios-pause" : "ios-play"***REMOVED***
            size={125***REMOVED***
            onPress={playHandler***REMOVED***
            backgroundColor="rgba(0,0,0,0)"
            iconStyle={styles.button***REMOVED***
          />
          <Ionicons.Button
            name="md-return-right"
            size={85***REMOVED***
            onPress={skip.bind("this", 15000)***REMOVED***
            backgroundColor="rgba(0,0,0,0)"
            iconStyle={styles.button***REMOVED***
          />
        </View>
      </View>
    </View>
  )
***REMOVED***

PlayScreen.navigationOptions = navigationData => {
  const navIsComplete = navigationData.navigation.getParam("navIsComplete");
  const navMarkHandler = navigationData.navigation.getParam("navMarkHandler");
  //console.log(`complete status in navigation: ${navIsComplete***REMOVED***`);
  return {
    headerTitle: navigationData.navigation.getParam("title"),
    headerRight: () =>
      <Ionicons.Button
        name={navIsComplete ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"***REMOVED***
        size={20***REMOVED***
        onPress={navMarkHandler***REMOVED***
        backgroundColor="rgba(0,0,0,0)"
        color="black"
        iconStyle={styles.markButton***REMOVED***
      />
  ***REMOVED***
***REMOVED***;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  ***REMOVED***,
  controlsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    marginBottom: 50,
    marginHorizontal: 15,
    height: 200
  ***REMOVED***,
  albumArt: {
    height: 400,
    padding: 50,
    backgroundColor: "black",
    margin: 25
  ***REMOVED***,
  scrubberContainer: {
    paddingHorizontal: 8,
    flexDirection: "column",
    width: "100%"
  ***REMOVED***,
  scrubberInfo: {
    padding: 10
  ***REMOVED***,
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  ***REMOVED***,
  scrubber: {
    width: "100%",
  ***REMOVED***,
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  ***REMOVED***,
  button: {
    margin: 10,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 0
  ***REMOVED***,
  titlesContainer: {
    flexDirection: "column",
    marginVertical: 15
  ***REMOVED***,
  title: {
    textAlign: "center",
    fontSize: 30
  ***REMOVED***,
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#d3d3d3"
  ***REMOVED***,
  markButton: {
    justifyContent: "center",
    alignContent: "center"
  ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
  console.log(state)
  return {
    appProgress: state.appProgress
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
    toggleComplete: lessonID => {dispatch(toggleComplete(lessonID))***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);