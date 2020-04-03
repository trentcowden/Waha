//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import { connect ***REMOVED*** from 'react-redux'
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { scaleMultiplier ***REMOVED*** from '../constants'

function GroupListItem(props) {

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   return (
      <View style={[styles.groupListItemContainer, { direction: props.isRTL ? "rtl" : "ltr" ***REMOVED***]***REMOVED***>
         <View style={styles.iconContainer***REMOVED***>
            <Ionicons name='ios-people' size={50***REMOVED*** />
         </View>
         <Text style={styles.groupNameText***REMOVED***>{props.name***REMOVED***</Text>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   groupListItemContainer: {
      height: 72 * scaleMultiplier,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      margin: 5
   ***REMOVED***,
   iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 15
   ***REMOVED***,
   groupNameText: {
      color: "#3A3C3F",
      fontSize: 18,
      fontFamily: 'bold'
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   return {
      colors: state.database[state.database.currentLanguage].colors,
      progress: state.appProgress,
      isRTL: state.database[state.database.currentLanguage].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: lessonID => { dispatch(toggleComplete(lessonID)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupListItem);