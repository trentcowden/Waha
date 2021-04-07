import Slider from '@react-native-community/slider'
import React from 'react'
import { StyleSheet, View ***REMOVED*** from 'react-native'
import TimeDisplay from '../components/TimeDisplay'
import { colors ***REMOVED*** from '../styles/colors'

// scrubber component rendered on play screen
const Scrubber = ({
  // Props passed from a parent component.
  onSlidingComplete,
  onValueChange,
  maximumValue,
  seekPosition
***REMOVED***) => {
  console.log(`${Date.now()***REMOVED*** Scrubber re-rendering.`)

  return (
    <View style={styles.scrubberContainer***REMOVED***>
      <View style={styles.scrubber***REMOVED***>
        <Slider
          value={seekPosition***REMOVED***
          onSlidingComplete={value => onSlidingComplete(value)***REMOVED***
          onValueChange={onValueChange***REMOVED***
          minimumValue={0***REMOVED***
          maximumValue={maximumValue***REMOVED***
          step={100***REMOVED***
          minimumTrackTintColor={colors.tuna***REMOVED***
          thumbTintColor={colors.tuna***REMOVED***
        />
      </View>
      <View style={styles.timeInfo***REMOVED***>
        <TimeDisplay time={seekPosition***REMOVED*** max={maximumValue***REMOVED*** />
        <TimeDisplay time={maximumValue***REMOVED*** max={maximumValue***REMOVED*** />
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

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.seekPosition === nextProps.seekPosition &&
    prevProps.maximumValue === nextProps.maximumValue
  )
***REMOVED***

export default Scrubber
