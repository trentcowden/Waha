//basic imports
import React, { useState, useEffect, useRef ***REMOVED*** from 'react';
import { View, StyleSheet, Button, Text, Slider ***REMOVED*** from 'react-native';

//sound stuff
import { Audio ***REMOVED*** from 'expo-av';

function PlayScreen(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [soundObject, setSoundObject] = useState(new Audio.Sound());
  const isMounted = useRef(true);
  const [lengthMilli, setLengthMilli] = useState(null);
  const [shouldSeek, setShouldSeek] = useState(true);
  const source = props.navigation.getParam("source");

  soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
   
    //if (isMounted.current) {***REMOVED***
  ***REMOVED***)


  useEffect(() => {
    //on first open, load audio file and set interval for 
    //updating scrubber
    loadAudioFile();
    const interval = setInterval(updateSeeker, 1000);

    //when leaving the screen, set ismounted to flase
    //and unload the audio file
    return function cleanup() {
      isMounted.current = false;
      clearInterval(interval);
      soundObject.unloadAsync();
      setSoundObject(null);
    ***REMOVED*** 
  ***REMOVED***, []);

/*   useEffect(() => {
    setSeekPosition(playbackStatus.positionMillis);
  ***REMOVED***, [timer]); */
  
/* 
  useEffect(() => {
    soundObject.playFromPositionAsync(seekPosition);
  ***REMOVED***, [seekPosition])  */ 

  //function to load the audio file
  async function updateSeeker() {
    if (shouldSeek) {
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

  //function gets called whenever user taps the play/pause button
  //if currently playing, pause the track
  //if currently pause, start playing the track
  function playHandler() {
    if(isLoaded) {
      updateSeeker();
      isPlaying ? 
      soundObject.setStatusAsync({progressUpdateIntervalMillis: 1000, shouldPlay: false***REMOVED***) : 
      soundObject.setStatusAsync({progressUpdateIntervalMillis: 1000, shouldPlay: true***REMOVED***);
      setIsPlaying(currentStatus => !currentStatus);
    ***REMOVED***
  ***REMOVED***

  //function to convert a time in milliseconds to a 
  //nicely formatted string (for the scrubber)
  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
  
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return minutes + ":" + seconds;
  ***REMOVED***

  //when the user releases the, start playing from the position
  //they release the scrubber at
  function onSeekRelease() {
    updateSeeker();
    isPlaying ?
    soundObject.setStatusAsync({ shouldPlay: true, positionMillis: seekPosition ***REMOVED***) :
    soundObject.setStatusAsync({ shouldPlay: false, positionMillis: seekPosition ***REMOVED***);
    updateSeeker();
    setShouldSeek(true);
  ***REMOVED***

  //constnatly update the value of the scrubber when the user is scrubbing
  function onSeekHold(value) {
    //set the seek position to the new scrubber value
    setSeekPosition(value);

    //pause the audio
    soundObject.setStatusAsync({ shouldPlay: false ***REMOVED***);

    //stop the scrubber from being able to change values with the music
    setShouldSeek(false);
  ***REMOVED***

  // dont work yet
  function skipAhead() {
    setShouldSeek(false);
    soundObject.setStatusAsync({ shouldPlay: false, positionMillis: seekPosition ***REMOVED***);
    setSeekPosition(currentSeekPosition => currentSeekPosition + 15000);
    soundObject.setStatusAsync({ shouldPlay: true, positionMillis: seekPosition ***REMOVED***);
    setShouldSeek(true);
  ***REMOVED***

  //dont work yet
  function skipBehind() {
    setShouldSeek(false);
    soundObject.setStatusAsync({ shouldPlay: false, positionMillis: seekPosition ***REMOVED***);
    setSeekPosition(currentSeekPosition => currentSeekPosition - 5000);
    soundObject.setStatusAsync({ shouldPlay: true, positionMillis: seekPosition ***REMOVED***);
    setShouldSeek(true);
  ***REMOVED***


  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.scrubberContainer***REMOVED***>
        <View style={styles.scrubberInfo***REMOVED***><Text>{msToTime(seekPosition)***REMOVED***</Text></View>
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
        <Text style={styles.scrubberInfo***REMOVED***>{msToTime(lengthMilli)***REMOVED***</Text>
      </View>
      <Text style={{textAlign: "center"***REMOVED******REMOVED***>Status: {isLoaded ? "Finished loading" : "Loading"***REMOVED***</Text>
      <View style={styles.controlsContainer***REMOVED***>
        <Button title="Skip behind" onPress={skipBehind***REMOVED***/>
        <Button title={isPlaying ? "Pause" : "Play"***REMOVED*** onPress={playHandler***REMOVED*** />
        <Button title="Skip ahead" onPress={skipAhead***REMOVED***/>
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
    paddingHorizontal: 20,
    flexDirection: "row",
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
    flex: 1
  ***REMOVED***
***REMOVED***)

export default PlayScreen;