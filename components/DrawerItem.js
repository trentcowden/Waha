//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function DrawerItem(props) {

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   return (
      <TouchableOpacity style={[styles.settingsItem, { direction: props.isRTL ? "rtl" : "ltr" ***REMOVED***]***REMOVED*** onPress={props.onPress***REMOVED***>
         <View style={styles.iconContainer***REMOVED***>
            <Icon
               name={props.name***REMOVED***
               size={50 * scaleMultiplier***REMOVED***
               color="#3A3C3F"
            />
         </View>
         <Text style={styles.title***REMOVED***>{props.text***REMOVED***</Text>
      </TouchableOpacity>
   )
***REMOVED***

const styles = StyleSheet.create({
   settingsItem: {
      height: 52 * scaleMultiplier,
      paddingLeft: 5,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      margin: 5
   ***REMOVED***,
   iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 50 * scaleMultiplier
   ***REMOVED***,
   title: {
      color: '#3A3C3F',
      fontSize: 18 * scaleMultiplier,
      textAlignVertical: "center",
      paddingHorizontal: 10,
      fontFamily: 'medium',
      textAlign: "center"
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0];
   return {
      isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: lessonID => { dispatch(toggleComplete(lessonID)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);