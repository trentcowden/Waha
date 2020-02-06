//basic imports
import React, { useState, useEffect, useRef ***REMOVED*** from 'react';
import { View, StyleSheet, Button, Text, Slider ***REMOVED*** from 'react-native';

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

  //keep track of it audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  //the current position of the scrubber
  const [seekPosition, setSeekPosition] = useState(0);
  
  //should the scrubber be updating based on the track position?
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

    //when leaving the screen, set ismounted to flase
    //and unload the audio file
    return function cleanup() {
      isMounted.current = false;
      clearInterval(interval);
      soundObject.unloadAsync();
      setSoundObject(null);
    ***REMOVED*** 
  ***REMOVED***, []);
  
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
  /*useEffect(() => {
    soundObject.playFromPositionAsync(seekPosition);
  ***REMOVED***, [seekPosition])  */ 

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
      <Text style={{ textAlign: "center" ***REMOVED******REMOVED***>Status: {isLoaded ? "Finished loading" : "Loading"***REMOVED***</Text>
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
          <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={lengthMilli***REMOVED*** max={lengthMilli***REMOVED***/>
        </View>
      </View>
      <View style={styles.controlsContainer***REMOVED***>
        <Button title="Skip behind" onPress={skip.bind("this", -5000)***REMOVED*** />
        <Button title={isPlaying ? "Pause" : "Play"***REMOVED*** onPress={playHandler***REMOVED*** />
        <Button title="Skip ahead" onPress={skip.bind("this", 15000)***REMOVED*** />
      </View>
    </View>
  )
***REMOVED***

PlayScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam("title")
  ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  ***REMOVED***,
  albumArt: {
    height: 400,
    padding: 50,
    backgroundColor: "black",
    margin: 25
  ***REMOVED***,
  scrubberContainer: {
    paddingHorizontal: 10,
    flexDirection: "column",
    width: "100%"
  ***REMOVED***,
  scrubberInfo: {
    padding: 10
  ***REMOVED***,
  controlsContainer: {
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
  ***REMOVED***
***REMOVED***)

export default PlayScreen;