import { Video ***REMOVED*** from 'expo-av'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { Dimensions, StatusBar, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, getLanguageFont ***REMOVED*** from '../constants'

function VideoScreen (props) {
  //+ STATE
  const [video, setVideo] = useState()

  //+ CONSTRUCTOR

  useEffect(() => {
    console.log(props.route.params)
    if (video)
      video
        .loadAsync(
          {
            uri: props.route.params.source
          ***REMOVED***,
          { progressUpdateIntervalMillis: 1000 ***REMOVED***
        )
        .then(() =>
          video.setStatusAsync({
            shouldPlay: props.route.params.shouldPlay,
            positionMillis: props.route.params.playFromPosition
          ***REMOVED***)
        )
  ***REMOVED***, [video])

  //+ FUNCTIONS

  //+ RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <StatusBar hidden />
      <Video
        ref={ref => {
          setVideo(ref)
        ***REMOVED******REMOVED***
        rate={1.0***REMOVED***
        volume={1.0***REMOVED***
        isMuted={false***REMOVED***
        resizeMode={Video.RESIZE_MODE_CONTAIN***REMOVED***
        shouldPlay
        style={{
          width: (Dimensions.get('window').width * 16) / 9,
          height: Dimensions.get('window').width,
          transform: [{ rotate: '90deg' ***REMOVED***]
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup,
    security: state.security,
    mtUnlockAttempts: state.mtUnlockAttempts
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {
    setAreMobilizationToolsUnlocked: toSet => {
      dispatch(setAreMobilizationToolsUnlocked(toSet))
    ***REMOVED***,
    setMTUnlockTimeout: time => {
      dispatch(setMTUnlockTimeout(time))
    ***REMOVED***,
    setMTUnlockAttempts: numAttempts => {
      dispatch(setMTUnlockAttempts(numAttempts))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen)
