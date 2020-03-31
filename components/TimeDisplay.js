//basic imports
import React from 'react';
import { View, Text, StyleSheet***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'

function TimeDisplay(props) {

    //function to convert a time in milliseconds to a 
    //nicely formatted string (for the scrubber)
    function msToTime(duration) {
        if (duration > 0 && duration <= props.max) {
        var seconds = Math.floor((duration / 1000) % 60);
        var minutes = Math.floor((duration / (1000 * 60)) % 60);

        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return minutes + ":" + seconds;
        ***REMOVED*** else if (duration > props.max) {
            return msToTime(props.max);
        ***REMOVED*** else {
            return "00:00";
        ***REMOVED***
    ***REMOVED***

    return (
        <View styles={props.style***REMOVED***>
            <Text style={styles.timeText***REMOVED***>{msToTime(props.time)***REMOVED***</Text>
        </View>
    )
***REMOVED***

const styles = StyleSheet.create({
   timeText: {
      fontFamily: 'regular',
      fontSize: 12
   ***REMOVED***
***REMOVED***)

export default TimeDisplay;
