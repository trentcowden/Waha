//basic imports
import React, { useState, useEffect, useRef ***REMOVED*** from 'react';
import { View, StyleSheet, Button, Text, Slider, AsyncStorage ***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';

//sound stuff
import { Audio ***REMOVED*** from 'expo-av';

//components
import TimeDisplay  from "../components/TimeDisplay";

function PlayScreen(props) {

  ////STATE////
  //set early when the screen opens
  const [soundObject, setSoundObject] = useState(new Audio.Sound());
  const [lengthMilli, setLengthMilli] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMounted = useRef(true);
  const source = props.navigation.getParam("source");
  const [isComplete, setIsComplete] = useState(false);
  const [currentLessonID, setCurrentLessonID] = useState(props.navigation.getParam("id"));

  //keep track of it audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  //the current position of the scrubber
  const [seekPosition, setSeekPosition] = useState(0);
  
  //should the scrubber be updating based on the track position?
  //only time it shouldn't should be during scrubbing/skipping
  const [shouldTickUpdate, setShouldTickUpdate] = useState(true);

  //update on every api call and every second
  soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
  ***REMOVED***)

  ////CONSTRUCTOR////
  useEffect(() => {
    //on first open, load audio file and set interval for 
    //updating scrubber
    loadAudioFile();
    const interval = setInterval(updateSeekerTick, 1000);

    //console.log(typeof props.navigation.getParam("id"));

    //figure out if lesson is marked as complete or not, 
    //and send over info to navigation
    getSetLessonMark();
    props.navigation.setParams({navIsComplete: isComplete***REMOVED***)
    props.navigation.setParams({navMarkHandler: markHandler***REMOVED***)

    //when leaving the screen, set ismounted to flase
    //and unload the audio file
    return function cleanup() {
      isMounted.current = false;
      clearInterval(interval);
      soundObject.unloadAsync();
      setSoundObject(null);
    ***REMOVED*** 
  ***REMOVED***, []);

  useEffect(() => {
    props.navigation.setParams({navIsComplete: isComplete***REMOVED***);
    props.navigation.setParams({navMarkHandler: markHandler***REMOVED***);
  ***REMOVED***, [isComplete])
  
  //function to load the audio file
  async function loadAudioFile() {
    try {
      await soundObject
        .loadAsync({uri: source***REMOVED***, {progressUpdateIntervalMillis: 1000***REMOVED***)
        .then(async playbackStatus => {
          setIsLoaded(playbackStatus.isLoaded);
          setLengthMilli(playbackStatus.durationMillis);
      ***REMOVED***) 
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
  ***REMOVED***

  //check if lesson is complete or not
  async function getSetLessonMark() {
    try {
      await AsyncStorage
        .getItem(currentLessonID)
        .then(value => {
          if (value === 'incomplete') {
            setIsComplete(false);
          ***REMOVED*** else {
            setIsComplete(true);
          ***REMOVED***
        ***REMOVED***)
    ***REMOVED*** catch (error) {
      console.log(error);
    ***REMOVED***
  ***REMOVED***

  function markHandler() {
    //change async storage value
    isComplete ? AsyncStorage.setItem(currentLessonID, 'incomplete') : AsyncStorage.setItem(currentLessonID, 'complete');
    getSetLessonMark();
  ***REMOVED***

  //gets called every second, and updates the seeker position
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

  //function gets called whenever user taps the play/pause button
  //if currently playing, pause the track
  //if currently paused, start playing the track
  function playHandler() {
    if(isLoaded) {
      updateSeekerTick();
      isPlaying ? 
      soundObject.setStatusAsync({progressUpdateIntervalMillis: 1000, shouldPlay: false***REMOVED***) : 
      soundObject.setStatusAsync({progressUpdateIntervalMillis: 1000, shouldPlay: true***REMOVED***);
      setIsPlaying(currentStatus => !currentStatus);
    ***REMOVED***
  ***REMOVED***

  //start playing from the position they release the thumb at
  function onSeekRelease(value) {
    isPlaying ?
    soundObject.setStatusAsync({ shouldPlay: true, positionMillis: value ***REMOVED***) :
    soundObject.setStatusAsync({ shouldPlay: false, positionMillis: value ***REMOVED***);
    setShouldTickUpdate(true);
    setSeekPosition(value);
  ***REMOVED***

  //prevent the seeker from updating every second whenever
  //the user is dragging the thumb
  function onSeekHold(value) {
    setShouldTickUpdate(false);
  ***REMOVED***

  //skips an amount of milliseconds through the audio track
  function skip(amount) {
    isPlaying ?
    soundObject.setStatusAsync({ shouldPlay: true, positionMillis: (seekPosition + amount) ***REMOVED***) :
    soundObject.setStatusAsync({ shouldPlay: false, positionMillis: (seekPosition + amount) ***REMOVED***);
    setSeekPosition(seekPosition => seekPosition + amount);
  ***REMOVED***


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
              onValueChange={onSeekHold***REMOVED***
              minimumValue={0***REMOVED***
              maximumValue={lengthMilli***REMOVED***
              step={1000***REMOVED***
            />
          </View>
          <View style={styles.timeInfo***REMOVED***>
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={seekPosition***REMOVED*** max={lengthMilli***REMOVED*** />
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={lengthMilli***REMOVED*** max={lengthMilli***REMOVED*** />
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

export default PlayScreen;