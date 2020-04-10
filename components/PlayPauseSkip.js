//basic imports
import React from 'react';
import { View, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function PlayPauseSkip(props) {
   //console.log((Dimensions.get('window').width / 380))
   return (
      <View style={styles.playPauseSkipContainer***REMOVED***>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={() => props.onSkipPress(-10000)***REMOVED***
         >
            <Icon name="skip-back" size={69 * scaleMultiplier***REMOVED*** />
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={props.onPlayPress***REMOVED***
         >
            <Icon
               name={props.isPlaying ? "pause-filled" : "play-filled"***REMOVED***
               size={100 * scaleMultiplier***REMOVED***
               color={props.colors.primaryColor***REMOVED***
            />
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={() => props.onSkipPress(10000)***REMOVED***
         >
            <Icon name="skip-forward" size={69 * scaleMultiplier***REMOVED*** />
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   playPauseSkipContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: -15,

   ***REMOVED***,
   playPauseSkipButton: {
      alignItems: "center",
      justifyContent: "center",
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(PlayPauseSkip);
