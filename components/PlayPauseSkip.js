import React from 'react'
import { StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// play, pause, and skip controls for play screen
function PlayPauseSkip (props) {
  //+ RENDER

  return (
    <View style={styles.playPauseSkipContainer***REMOVED***>
      {props.hasHomework ? (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            justifyContent: 'center'
          ***REMOVED******REMOVED***
        >
          <TouchableOpacity
            style={{ position: 'absolute', paddingHorizontal: 20 ***REMOVED******REMOVED***
            onPress={props.showHomeworkModal***REMOVED***
          >
            <Icon name='list' size={40 * scaleMultiplier***REMOVED*** color={colors.tuna***REMOVED*** />
          </TouchableOpacity>
        </View>
      ) : null***REMOVED***
      <TouchableOpacity
        style={styles.playPauseSkipButton***REMOVED***
        onPress={() => props.onSkipPress(-10000)***REMOVED***
      >
        <Icon
          name='skip-back'
          size={69 * scaleMultiplier***REMOVED***
          color={colors.tuna***REMOVED***
        />
      </TouchableOpacity>
      {/* {props.isVideoBuffering ? (
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
        onPress={props.onPlayPress***REMOVED***
      >
        <Icon
          name={props.isMediaPlaying ? 'pause' : 'play'***REMOVED***
          size={100 * scaleMultiplier***REMOVED***
          color={props.primaryColor***REMOVED***
        />
      </TouchableOpacity>
      {/* )***REMOVED*** */***REMOVED***
      <TouchableOpacity
        style={styles.playPauseSkipButton***REMOVED***
        onPress={() => props.onSkipPress(10000)***REMOVED***
      >
        <Icon
          name='skip-forward'
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

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(PlayPauseSkip)
