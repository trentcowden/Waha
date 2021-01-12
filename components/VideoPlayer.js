import { Video ***REMOVED*** from 'expo-av'
import React, { useState ***REMOVED*** from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import {
  colors,
  getLanguageFont,
  lockLandscape,
  lockPortrait,
  scaleMultiplier
***REMOVED*** from '../constants'

function VideoPlayer (props) {
  //+ STATE

  const [showVideoControls, setShowVideoControls] = useState(false)
  const [video, setVideo] = useState()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!showVideoControls) {
          setShowVideoControls(true)
          setTimeout(() => setShowVideoControls(false), 2000)
        ***REMOVED***
      ***REMOVED******REMOVED***
      style={{ width: '100%' ***REMOVED******REMOVED***
    >
      <View
        style={{
          // flex: 1,
          height: Dimensions.get('window').width - 80,
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.shark
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
          resizeMode={Video.RESIZE_MODE_CONTAIN***REMOVED***
          shouldPlay
          // onLoad={() => {
          //   console.log('loaded')
          //   props.setIsMediaLoaded(true)
          // ***REMOVED******REMOVED***
          style={{
            width: Dimensions.get('window').width,
            // height: Dimensions.get('window').width - 80
            height: (Dimensions.get('window').width * 9) / 16
            // flex: 1
          ***REMOVED******REMOVED***
          onPlaybackStatusUpdate={status => {
            // match up so there's a single source of truth between
            //  waha controls and full screen native video controls
            if (
              props.fullscreenStatus ===
              Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
            ) {
              if (status.isPlaying) props.setIsMediaPlaying(true)
              else if (!status.isPlaying) props.setIsMediaPlaying(false)
            ***REMOVED***

            if (status.isLoaded && !props.isMediaLoaded) {
              console.log('loaded')
              props.setIsMediaLoaded(true)
            ***REMOVED***

            // lock portrait and exit full screen once the video finishes
            if (
              status.didJustFinish &&
              props.fullscreenStatus ===
                Video.IOS_FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
            ) {
              lockPortrait(() => props.video.dismissFullscreenPlayer())
              // ScreenOrientation.supportsOrientationLockAsync(
              //   ScreenOrientation.OrientationLock.PORTRAIT
              // ).then(isSupported => {
              //   if (isSupported) {
              //     ScreenOrientation.lockAsync(
              //       ScreenOrientation.OrientationLock.PORTRAIT
              //     ).then(() => {
              //       props.video.dismissFullscreenPlayer()
              //     ***REMOVED***)
              //   ***REMOVED*** else {
              //     ScreenOrientation.lockAsync(
              //       ScreenOrientation.OrientationLock.PORTRAIT_UP
              //     ).then(() => {
              //       props.video.dismissFullscreenPlayer()
              //     ***REMOVED***)
              //   ***REMOVED***
              // ***REMOVED***)
            ***REMOVED***

            if (status.didJustFinish && props.lessonType !== 'v')
              setTimeout(() => props.changeChapter('application'), 500)
            else if (
              status.didJustFinish &&
              props.lessonType === 'v' &&
              !props.isComplete
            ) {
              setTimeout(() => props.changeCompleteStatus(), 1000)
            ***REMOVED***
          ***REMOVED******REMOVED***
          onLoadStart={() => props.setIsMediaLoaded(false)***REMOVED***
          onLoad={() => props.setIsMediaLoaded(true)***REMOVED***
          onFullscreenUpdate={({ fullscreenUpdate, status ***REMOVED***) => {
            if (Platform.OS === 'android') {
              switch (fullscreenUpdate) {
                // lock video to landscape whenever you enter full screen
                case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:
                case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                  lockLandscape(() => {***REMOVED***)
                  // ScreenOrientation.lockAsync(
                  //   ScreenOrientation.OrientationLock.LANDSCAPE
                  // )
                  break
                // lock video to portrait when we exit full screen
                case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                  lockPortrait(() => {***REMOVED***)
                  // ScreenOrientation.supportsOrientationLockAsync(
                  //   ScreenOrientation.OrientationLock.PORTRAIT
                  // ).then(isSupported => {
                  //   if (isSupported) {
                  //     ScreenOrientation.lockAsync(
                  //       ScreenOrientation.OrientationLock.PORTRAIT
                  //     )
                  //   ***REMOVED*** else {
                  //     ScreenOrientation.lockAsync(
                  //       ScreenOrientation.OrientationLock.PORTRAIT_UP
                  //     )
                  //   ***REMOVED***
                  // ***REMOVED***)
                  break
                case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
                  lockPortrait(() => {***REMOVED***)
                  // ScreenOrientation.supportsOrientationLockAsync(
                  //   ScreenOrientation.OrientationLock.PORTRAIT
                  // ).then(isSupported => {
                  //   if (isSupported) {
                  //     ScreenOrientation.lockAsync(
                  //       ScreenOrientation.OrientationLock.PORTRAIT
                  //     )
                  //   ***REMOVED*** else {
                  //     ScreenOrientation.lockAsync(
                  //       ScreenOrientation.OrientationLock.PORTRAIT_UP
                  //     )
                  //   ***REMOVED***
                  // ***REMOVED***)
                  props.video.playAsync()
                  props.setIsMediaPlaying(true)
                  break
                // default:
                //   ScreenOrientation.supportsOrientationLockAsync(
                //     ScreenOrientation.OrientationLock.PORTRAIT
                //   ).then(isSupported => {
                //     if (isSupported) {
                //       ScreenOrientation.lockAsync(
                //         ScreenOrientation.OrientationLock.PORTRAIT
                //       )
                //     ***REMOVED*** else {
                //       ScreenOrientation.lockAsync(
                //         ScreenOrientation.OrientationLock.PORTRAIT_UP
                //       )
                //     ***REMOVED***
                //   ***REMOVED***)
                //   break
              ***REMOVED***
            ***REMOVED*** else {
              if (
                fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS
              ) {
                props.setIsMediaPlaying(false)
              ***REMOVED***
            ***REMOVED***
            props.setFullScreenStatus(fullscreenUpdate)
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
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.shark + '70'
            ***REMOVED******REMOVED***
          >
            <TouchableOpacity
              style={{***REMOVED******REMOVED***
              onPress={() => {
                video.presentFullscreenPlayer()
                // props.navigateToFullscreen()
              ***REMOVED******REMOVED***
            >
              <Icon
                name='fullscreen-enter'
                size={100 * scaleMultiplier***REMOVED***
                color={colors.white***REMOVED***
              />
            </TouchableOpacity>
          </View>
        ) : null***REMOVED***
        {/* </View> */***REMOVED***
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
    font: getLanguageFont(activeGroup.language),
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(VideoPlayer)
