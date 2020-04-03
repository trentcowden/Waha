//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import { connect ***REMOVED*** from 'react-redux'
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { scaleMultiplier ***REMOVED*** from '../constants'

function LessonItem(props) {

   const [isDownloaded, setIsDownloaded] = useState(false)

   //check if the lesson is downloaded and set isDownloaded accordingly
   FileSystem.getInfoAsync(FileSystem.documentDirectory + props.id + '.mp3')
      .then(({ exists ***REMOVED***) => {
         exists ? setIsDownloaded(true) : setIsDownloaded(false)
         props.setRefresh(old => !old)
      ***REMOVED***
      )

   //functions to call modals from lessonlistscreen
   //function are setState functions passed from lessonlistscreen
   function showSaveModal() {
      props.setIDToDownload.call();
      props.setShowSaveLessonModal.call();
   ***REMOVED***

   function showDeleteModal() {
      props.setIDToDownload.call();
      props.setShowDeleteLessonModal.call();
   ***REMOVED***

   function showLessonOptionsModal() {
      props.setIDToDownload.call();
      props.setShowLessonOptionsModal.call();
   ***REMOVED***

   //console.log(props.isDownloaded)


   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////


   //component for what to display on the far right of the list
   //can either be cloud down arrow (click to download), x (click to delete),
   //a no internet icon, or a spin icon if it's downloading
   var downloadedFeedback;
   var progressBar;
   if (!props.downloadProgress) {
      downloadedFeedback =
         <TouchableOpacity
            onPress={
               isDownloaded ? showDeleteModal :
                  (props.isConnected ? showSaveModal : 
                     () => Alert.alert(
                     'Error',
                     'Internet connection is required to download lessons',
                     [{ text: 'OK', onPress: () => { ***REMOVED*** ***REMOVED***]))***REMOVED***
            style={styles.downloadButtonContainer***REMOVED***
         >
            <MaterialCommunityIcons
               name={isDownloaded ? "cloud-check" : (props.isConnected ? "cloud-download" : "cloud-off-outline")***REMOVED***
               color={isDownloaded ? "#9FA5AD" : "#3A3C3F"***REMOVED***
               size={25 * scaleMultiplier***REMOVED***
            />
         </TouchableOpacity>
      progressBar = null;
   ***REMOVED*** else {
      downloadedFeedback = <View style={styles.downloadButtonContainer***REMOVED***><ActivityIndicator size="small" color="black" /></View>
      progressBar = <Progress.Bar progress={props.downloadProgress***REMOVED*** width={400***REMOVED*** color="black" borderColor="black" />
   ***REMOVED***

   return (
      <View style={[styles.lessonItem, {direction: props.isRTL ? "rtl" : "ltr"***REMOVED***]***REMOVED***>
         <View style={styles.mainDisplay***REMOVED***>
            <TouchableOpacity
               style={styles.progressAndTitle***REMOVED***
               onPress={
                  (!props.isConnected && !isDownloaded) ?
                     () => Alert.alert(
                        'Error',
                        'Internet connection is required to listen to undownloaded lessons',
                        [{ text: 'OK', onPress: () => { ***REMOVED*** ***REMOVED***]) :
                     props.onLessonSelect
               ***REMOVED***
               onLongPress={showLessonOptionsModal***REMOVED***
            >
               <TouchableOpacity style={styles.completeStatusContainer***REMOVED*** onPress={() => props.toggleComplete(props.id)***REMOVED***>
                  <MaterialCommunityIcons
                     name={props.isComplete ? "check-circle" : "play-box-outline"***REMOVED***
                     size={30***REMOVED***
                     color={props.isComplete ? "#828282" : props.colors.primaryColor***REMOVED***
                  />
               </TouchableOpacity>
               <View style={styles.titleContainer***REMOVED***>
                  <Text style={{ ...styles.title, ...{ color: props.isComplete ? "#9FA5AD" : "black" ***REMOVED*** ***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
                  <Text style={{ ...styles.subtitle, ...{ color: props.isComplete ? "#9FA5AD" : "black" ***REMOVED*** ***REMOVED******REMOVED***>{props.subtitle***REMOVED***</Text>
               </View>

            </TouchableOpacity>
            {downloadedFeedback***REMOVED***
         </View>
         <View style={styles.progressBar***REMOVED***>
            {progressBar***REMOVED***
         </View>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   lessonItem: {
      height: 72 * scaleMultiplier,
      justifyContent: "center",
      flexDirection: "column",
      alignContent: "center",
   ***REMOVED***,
   mainDisplay: {
      flexDirection: "row",
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
   ***REMOVED***,
   titleContainer: {
      flexDirection: "column",
      justifyContent: "center",
      flex: 1
   ***REMOVED***,
   title: {
      fontSize: 18 * scaleMultiplier,
      textAlignVertical: "center",
      paddingHorizontal: 10,
      fontFamily: 'medium',
      textAlign: "left"
   ***REMOVED***,
   subtitle: {
      fontSize: 14 * scaleMultiplier,
      paddingHorizontal: 10,
      fontFamily: 'regular',
      textAlign: "left"
   ***REMOVED***,
   downloadButtonContainer: {
      justifyContent: "center",
      marginLeft: 5,
      marginRight: 15
   ***REMOVED***,
   progressBar: {
      width: "100%"
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      progress: state.appProgress,
      isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      downloadLesson: (lessonID, source) => { dispatch(downloadLesson(lessonID, source)) ***REMOVED***,
      toggleComplete: lessonID => { dispatch(toggleComplete(lessonID)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonItem);