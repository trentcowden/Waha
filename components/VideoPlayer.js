import { Video ***REMOVED*** from 'expo-av'
import React, { useState ***REMOVED*** from 'react'
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function VideoPlayer (props) {
  //+ STATE

  const [showVideoControls, setShowVideoControls] = useState(false)
  const [video, setVideo] = useState()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!showVideoControls) {
          setShowVideoControls(true)
          setTimeout(() => setShowVideoControls(false), 1000)
        ***REMOVED***
      ***REMOVED******REMOVED***
      style={{ width: '100%' ***REMOVED******REMOVED***
    >
      <View
        style={{
          height: Dimensions.get('window').width - 80,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center'
          // backgroundColor: 'black'
        ***REMOVED******REMOVED***
      >
        <Video
          ref={ref => {
            setVideo(ref)
            props.setVideo(ref)
          ***REMOVED******REMOVED***
          rate={1.0***REMOVED***
          volume={1.0***REMOVED***
          isMuted={false***REMOVED***
          resizeMode='contain'
          shouldPlay
          usePoster
          onLoad={() => props.setIsMediaLoaded(true)***REMOVED***
          style={{ flex: 1 ***REMOVED******REMOVED***
          onPlaybackStatusUpdate={status => {
            // match up so there's a single source of truth between
            // waha controls and native video controls
            if (status.isPlaying) props.setIsMediaPlaying(true)
            else if (!status.isPlaying) props.setIsMediaPlaying(false)

            // if we're buffering, turn play icon into activity indicator
            if (!status.isBuffering) props.setIsVideoBuffering(false)
            else if (status.isBuffering) props.setIsVideoBuffering(true)

            // if video finishes, switch to last chapter
            if (status.didJustFinish && props.lessonType !== 'v')
              props.changeChapter('application')
            else if (
              status.didJustFinish &&
              props.lessonType === 'v' &&
              !props.isComplete
            ) {
              props.changeCompleteStatus()
            ***REMOVED***
          ***REMOVED******REMOVED***
          onLoadStart={() => props.setIsMediaLoaded(false)***REMOVED***
          onLoad={() => props.setIsMediaLoaded(true)***REMOVED***
          onFullscreenUpdate={({ fullscreenUpdate, status ***REMOVED***) => {
            // console.log(fullscreenUpdate)
          ***REMOVED******REMOVED***
        />
        {/* display a video icon placeholder when we're loading */***REMOVED***
        {props.isMediaLoaded ? null : (
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              position: 'absolute',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <Icon
              name='video'
              size={100 * scaleMultiplier***REMOVED***
              color={colors.oslo***REMOVED***
            />
          </View>
        )***REMOVED***
        {/* video controls overlay */***REMOVED***
        {showVideoControls ? (
          <View
            style={{
              width: '100%',
              height: 65 * scaleMultiplier,
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: colors.shark + '50',
              justifyContent: 'center'
            ***REMOVED******REMOVED***
          >
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' ***REMOVED******REMOVED***
              onPress={() => {
                video.presentFullscreenPlayer()
              ***REMOVED******REMOVED***
            >
              <Icon
                name='fullscreen-enter'
                size={50 * scaleMultiplier***REMOVED***
                color={colors.white***REMOVED***
              />
            </TouchableOpacity>
          </View>
        ) : null***REMOVED***
      </View>
    </TouchableWithoutFeedback>
  )
***REMOVED***

const styles = StyleSheet.create({
  topPortion: {
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  topImage: {
    resizeMode: 'contain',
    height: 170 * scaleMultiplier,
    alignSelf: 'center'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(VideoPlayer)
