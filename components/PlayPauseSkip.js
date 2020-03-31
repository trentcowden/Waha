//basic imports
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions ***REMOVED*** from 'react-native';
import { MaterialCommunityIcons, MaterialIcons ***REMOVED*** from '@expo/vector-icons';
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
            <MaterialIcons name="replay-10" size={69 * scaleMultiplier***REMOVED*** />
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={props.onPlayPress***REMOVED***
         >
            <MaterialCommunityIcons
               name={props.isPlaying ? "pause-circle" : "play-circle"***REMOVED***
               size={100 * scaleMultiplier***REMOVED***
               color={props.colors.primaryColor***REMOVED***
            />
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.playPauseSkipButton***REMOVED***
            onPress={() => props.onSkipPress(10000)***REMOVED***
         >
            <MaterialIcons name="forward-10" size={69 * scaleMultiplier***REMOVED*** />
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
   //console.log(state.downloads)
   return {
      colors: state.database[state.database.currentLanguage].colors
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(PlayPauseSkip);
