//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import { connect ***REMOVED*** from 'react-redux'
import { toggleComplete, setBookmark ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { removeDownload ***REMOVED*** from '../redux/actions/downloadActions'


function LessonItem(props) {

   //// FUNCTIONS

   // calls the various modal functions on lessonlistscreen
   function showSaveModal() {
      props.setActiveLessonInModal.call();
      props.setShowSaveLessonModal.call();
   ***REMOVED***
   function showDeleteModal() {
      props.setActiveLessonInModal.call();
      props.setShowDeleteLessonModal.call();
   ***REMOVED***
   function showLessonOptionsModal() {
      props.setActiveLessonInModal.call();
      props.setShowLessonOptionsModal.call();
   ***REMOVED***

   //// RENDER

   // renders cloud icon conditionally as statuses can be downloaded, undownloaded, downloading, and no internet
   var downloadStatus = props.downloads[props.thisLesson.id] && props.downloads[props.thisLesson.id] < 1 ?
      <View style={styles.downloadButtonContainer***REMOVED***>
         <AnimatedCircularProgress
            size={25 * scaleMultiplier***REMOVED***
            width={6 * scaleMultiplier***REMOVED***
            fill={ props.downloads[props.thisLesson.id] * 100***REMOVED***
            tintColor={"#828282"***REMOVED***
            rotation={0***REMOVED***
            backgroundColor="#FFFFFF"
         />
      </View> :
      <TouchableOpacity
         onPress={
            props.downloads[props.thisLesson.id] == 1 ? showDeleteModal :
               (props.isConnected ? showSaveModal :
                  () => Alert.alert(
                     props.translations.alerts.downloadNoInternet.header,
                     props.translations.alerts.downloadNoInternet.body,
                     [{ text: props.translations.alerts.options.ok, onPress: () => { ***REMOVED*** ***REMOVED***]
                  ))***REMOVED***
         style={styles.downloadButtonContainer***REMOVED***
      >
         <Icon
            name={props.downloads[props.thisLesson.id] == 1 ? "cloud-check" : (props.isConnected ? "cloud-download" : "cloud-slash")***REMOVED***
            color={props.downloads[props.thisLesson.id] == 1 ? "#9FA5AD" : "#3A3C3F"***REMOVED***
            size={25 * scaleMultiplier***REMOVED***
         />
      </TouchableOpacity>

   return (
      <View style={[styles.lessonItem, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED***>
         <TouchableOpacity
            style={[styles.progressAndTitle, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED***
            onPress={
               (!props.isConnected && !props.downloads[props.thisLesson.id]) ?
                  () => Alert.alert(
                     props.translations.alerts.playUndownloadedNoInternet.header,
                     props.translations.alerts.playUndownloadedNoInternet.body,
                     [{ text: props.translations.alerts.options.ok, onPress: () => { ***REMOVED*** ***REMOVED***]) :
                  props.onLessonSelect
            ***REMOVED***
            onLongPress={showLessonOptionsModal***REMOVED***
         >
            <View
               style={styles.completeStatusContainer***REMOVED***
               onPress={() => {

               ***REMOVED******REMOVED***
            >
               <Icon
                  name={props.isComplete ? "check-unfilled" : props.activeGroup.bookmark === props.thisLesson.index ? props.isRTL ? 'triangle-left' : "triangle-right" : null***REMOVED***
                  size={30 * scaleMultiplier***REMOVED***
                  color={props.isComplete ? "#828282" : props.colors.primaryColor***REMOVED***
               />
            </View>
            <View style={styles.titleContainer***REMOVED***>
               <Text style={{ ...styles.title, ...{ color: props.isComplete ? "#9FA5AD" : "black", textAlign: props.isRTL ? 'right' : 'left' ***REMOVED*** ***REMOVED******REMOVED***>{props.thisLesson.title***REMOVED***</Text>
               <Text style={{ ...styles.subtitle, ...{ color: props.isComplete ? "#9FA5AD" : "black", textAlign: props.isRTL ? 'right' : 'left' ***REMOVED*** ***REMOVED******REMOVED***>{props.thisLesson.subtitle***REMOVED***</Text>
            </View>

         </TouchableOpacity>
         {downloadStatus***REMOVED***
      </View>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   lessonItem: {
      height: 72 * scaleMultiplier,
      justifyContent: "center",
      flexDirection: "row",
      alignContent: "center",
      backgroundColor: "#F7F9FA"
   ***REMOVED***,
   progressAndTitle: {
      justifyContent: "flex-start",
      flexDirection: 'row',
      alignContent: "center",
      flex: 1,
   ***REMOVED***,
   completeStatusContainer: {
      justifyContent: "center",
      marginHorizontal: 10,
      width: 35 * scaleMultiplier
   ***REMOVED***,
   titleContainer: {
      flexDirection: "column",
      justifyContent: "center",
      flex: 1
   ***REMOVED***,
   title: {
      fontSize: 18 * scaleMultiplier,
      textAlignVertical: "center",
      fontFamily: 'medium',
   ***REMOVED***,
   subtitle: {
      fontSize: 14 * scaleMultiplier,
      fontFamily: 'regular',
   ***REMOVED***,
   downloadButtonContainer: {
      justifyContent: "center",
      marginHorizontal: 15
   ***REMOVED***,
***REMOVED***)

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      progress: state.appProgress,
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroup: activeGroup,
      downloads: state.downloads
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: (groupName, lessonIndex) => { dispatch(toggleComplete(groupName, lessonIndex)) ***REMOVED***,
      setBookmark: groupName => { dispatch(setBookmark(groupName)) ***REMOVED***,
      removeDownload: lessonID => { dispatch(removeDownload(lessonID)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonItem);