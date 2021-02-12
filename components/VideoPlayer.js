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
import { lockLandscape, lockPortrait, scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'

function VideoPlayer ({
  // passed from parent
  videoSource,
  video,
  setVideo,
  setIsMediaLoaded,
  setIsMediaPlaying,
  changeChapter,
  isMediaLoaded,
  lessonType,
  isComplete,
  changeCompleteStatus,
  setFullScreenStatus,
  fullscreenStatus
***REMOVED***) {
  //+ STATE

  const [showVideoControls, setShowVideoControls] = useState(false)
  // const [video, setVideo] = useState()

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
            setVideo(ref)
          ***REMOVED******REMOVED***
          rate={1.0***REMOVED***
          volume={1.0***REMOVED***
          isMuted={false***REMOVED***
          resizeMode={Video.RESIZE_MODE_CONTAIN***REMOVED***
          shouldPlay
          // onLoad={() => {
          //   console.log('loaded')
          //   setIsMediaLoaded(true)
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
              fullscreenStatus === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
            ) {
              if (status.isPlaying) setIsMediaPlaying(true)
              else if (!status.isPlaying) setIsMediaPlaying(false)
            ***REMOVED***

            if (status.isLoaded && !isMediaLoaded) {
              console.log('loaded')
              setIsMediaLoaded(true)
            ***REMOVED***

            // lock portrait and exit full screen once the video finishes
            if (
              status.didJustFinish &&
              fullscreenStatus ===
                Video.IOS_FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
            ) {
              lockPortrait(() => video.dismissFullscreenPlayer())
              // ScreenOrientation.supportsOrientationLockAsync(
              //   ScreenOrientation.OrientationLock.PORTRAIT
              // ).then(isSupported => {
              //   if (isSupported) {
              //     ScreenOrientation.lockAsync(
              //       ScreenOrientation.OrientationLock.PORTRAIT
              //     ).then(() => {
              //       video.dismissFullscreenPlayer()
              //     ***REMOVED***)
              //   ***REMOVED*** else {
              //     ScreenOrientation.lockAsync(
              //       ScreenOrientation.OrientationLock.PORTRAIT_UP
              //     ).then(() => {
              //       video.dismissFullscreenPlayer()
              //     ***REMOVED***)
              //   ***REMOVED***
              // ***REMOVED***)
            ***REMOVED***

            if (status.didJustFinish && lessonType !== 'v')
              setTimeout(() => changeChapter('application'), 500)
            else if (
              status.didJustFinish &&
              lessonType === 'v' &&
              !isComplete
            ) {
              setTimeout(() => changeCompleteStatus(), 1000)
            ***REMOVED***
          ***REMOVED******REMOVED***
          onLoadStart={() => setIsMediaLoaded(false)***REMOVED***
          onLoad={() => setIsMediaLoaded(true)***REMOVED***
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
                  video.playAsync()
                  setIsMediaPlaying(true)
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
                setIsMediaPlaying(false)
              ***REMOVED***
            ***REMOVED***
            setFullScreenStatus(fullscreenUpdate)
          ***REMOVED******REMOVED***
        />
        {/* display a video icon placeholder when we're loading */***REMOVED***
        {isMediaLoaded ? null : (
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
                // navigateToFullscreen()
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

export default VideoPlayer
