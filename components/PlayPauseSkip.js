//basic imports
import React from 'react';
import { View, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { MaterialCommunityIcons, MaterialIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'

function PlayPauseSkip(props) {
   return (
      <View style={styles.playPauseSkipContainer***REMOVED***>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={() => props.onSkipPress(-10000)***REMOVED***
         >
            <MaterialIcons name="replay-10" size={69***REMOVED*** />
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={props.onPlayPress***REMOVED***
         >
            <MaterialCommunityIcons
               name={props.isPlaying ? "pause-circle" : "play-circle"***REMOVED***
               size={100***REMOVED***
               color={props.colors.accentColor***REMOVED***
            />
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={() => props.onSkipPress(10000)***REMOVED***
         >
            <MaterialIcons name="forward-10" size={69***REMOVED*** />
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
      marginTop: -15
   ***REMOVED***,
   playPauseSkipButton: {
      alignItems: "center",
      justifyContent: "center",
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   //console.log(state.downloads)
   return {
      colors: state.database[state.database.currentLanguage].colors
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(PlayPauseSkip);
