//basic imports
import React from 'react';
import { View, StyleSheet, Slider, Platform ***REMOVED*** from 'react-native';
import TimeDisplay from "../components/TimeDisplay";
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function Scrubber(props) {
   return (
      <View style={styles.scrubberContainer***REMOVED***>
         <View style={styles.scrubber***REMOVED***>
            <Slider
               value={props.value***REMOVED***
               onSlidingComplete={props.onSlidingComplete***REMOVED***
               onValueChange={props.onValueChange***REMOVED***
               minimumValue={0***REMOVED***
               maximumValue={props.maximumValue***REMOVED***
               step={1000***REMOVED***
               minimumTrackTintColor={"#3A3C3F"***REMOVED***
               thumbTintColor={"#3A3C3F"***REMOVED***
            />
         </View>
         <View style={styles.timeInfo***REMOVED***>
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={props.seekPosition***REMOVED*** max={props.maximumValue***REMOVED*** />
            <TimeDisplay style={styles.scrubberInfo***REMOVED*** time={props.maximumValue***REMOVED*** max={props.maximumValue***REMOVED*** />
         </View>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   scrubberContainer: {
      paddingHorizontal: 8,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 10,
   ***REMOVED***,
   scrubber: {
      width: "100%"
   ***REMOVED***,
   timeInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%"
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(Scrubber);