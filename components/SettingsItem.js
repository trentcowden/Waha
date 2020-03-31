//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function SettingsItem(props) {

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   return (
      <TouchableOpacity style={styles.settingsItem***REMOVED*** onPress={props.onPress***REMOVED***>
         <Text style={styles.title***REMOVED***>{props.text***REMOVED***</Text>
         <Ionicons
            name='ios-arrow-forward'
            size={50***REMOVED***
            color="gray"
         />
      </TouchableOpacity>
   )
***REMOVED***

const styles = StyleSheet.create({
   settingsItem: {
      height: 75,
      padding: 5,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 20
   ***REMOVED***,
   title: {
      fontSize: 20,
      textAlignVertical: "center",
      paddingHorizontal: 10,
      fontFamily: 'regular'
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   return {
      grayedOut: state.database[state.database.currentLanguage].colors.grayedOut,
      accentColor: state.database[state.database.currentLanguage].colors.accentColor,
      progress: state.appProgress,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: lessonID => { dispatch(toggleComplete(lessonID)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SettingsItem);