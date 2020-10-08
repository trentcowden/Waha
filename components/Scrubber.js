import Slider from '@react-native-community/slider'
import React from 'react'
import { StyleSheet, View ***REMOVED*** from 'react-native'
import TimeDisplay from '../components/TimeDisplay'
import { colors ***REMOVED*** from '../constants'
// scrubber component rendered on play screen
function Scrubber (props) {
  //+ RENDER

  return (
    <View style={styles.scrubberContainer***REMOVED***>
      <View style={styles.scrubber***REMOVED***>
        <Slider
          value={props.value***REMOVED***
          onSlidingComplete={value => props.onSlidingComplete(value)***REMOVED***
          onValueChange={props.onValueChange***REMOVED***
          minimumValue={0***REMOVED***
          maximumValue={props.maximumValue***REMOVED***
          step={100***REMOVED***
          minimumTrackTintColor={colors.tuna***REMOVED***
          thumbTintColor={colors.tuna***REMOVED***
        />
      </View>
      <View style={styles.timeInfo***REMOVED***>
        <TimeDisplay time={props.seekPosition***REMOVED*** max={props.maximumValue***REMOVED*** />
        <TimeDisplay time={props.maximumValue***REMOVED*** max={props.maximumValue***REMOVED*** />
      </View>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  scrubberContainer: {
    paddingHorizontal: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  ***REMOVED***,
  scrubber: {
    width: '100%'
  ***REMOVED***,
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  ***REMOVED***
***REMOVED***)

export default Scrubber
