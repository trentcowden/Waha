import React from 'react'
import { StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { activeDatabaseSelector ***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'

function mapStateToProps (state) {
  return {
    primaryColor: activeDatabaseSelector(state).primaryColor
  ***REMOVED***
***REMOVED***

// play, pause, and skip controls for play screen
function PlaybackControls ({
  // Props passed from a parent component.
  isMediaPlaying,
  onPlayPress,
  onSkipPress,
  // Props passed from redux.
  primaryColor
***REMOVED***) {
  //+ RENDER

  return (
    <View style={styles.playPauseSkipContainer***REMOVED***>
      {/* {hasHomework ? (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            justifyContent: 'center'
          ***REMOVED******REMOVED***
        >
          <TouchableOpacity
            style={{ position: 'absolute', paddingHorizontal: 20 ***REMOVED******REMOVED***
            onPress={showHomeworkModal***REMOVED***
          >
            <Icon name='list' size={40 * scaleMultiplier***REMOVED*** color={colors.tuna***REMOVED*** />
          </TouchableOpacity>
        </View>
      ) : null***REMOVED*** */***REMOVED***
      <TouchableOpacity
        style={styles.playPauseSkipButton***REMOVED***
        onPress={() => onSkipPress(-5000)***REMOVED***
      >
        <Icon
          name='skip-back-5'
          size={69 * scaleMultiplier***REMOVED***
          color={colors.tuna***REMOVED***
        />
      </TouchableOpacity>
      {/* {isVideoBuffering ? (
        <View
          style={{
            width: 101 * scaleMultiplier,
            height: 101 * scaleMultiplier,
            justifyContent: 'center',
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          <ActivityIndicator size='large' />
        </View>
      ) : ( */***REMOVED***
      <TouchableOpacity
        style={styles.playPauseSkipButton***REMOVED***
        onPress={onPlayPress***REMOVED***
      >
        <Icon
          name={isMediaPlaying ? 'pause' : 'play'***REMOVED***
          size={100 * scaleMultiplier***REMOVED***
          color={primaryColor***REMOVED***
        />
      </TouchableOpacity>
      {/* )***REMOVED*** */***REMOVED***
      <TouchableOpacity
        style={styles.playPauseSkipButton***REMOVED***
        onPress={() => onSkipPress(5000)***REMOVED***
      >
        <Icon
          name='skip-forward-5'
          size={69 * scaleMultiplier***REMOVED***
          color={colors.tuna***REMOVED***
        />
      </TouchableOpacity>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  playPauseSkipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -15
  ***REMOVED***,
  playPauseSkipButton: {
    alignItems: 'center',
    justifyContent: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(PlaybackControls)
