//imports
import React, { useState, useEffect***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import { connect ***REMOVED*** from 'react-redux'

function LessonItem(props) {

    //state to keep track of whether this lesson is downloaded
    //NOTE: must be state; don't try it with a normal var
    const [isDownloaded, setIsDownloaded] = useState(false);

    //check if the lesson is downloaded and set isDownloaded accordingly
    FileSystem.getInfoAsync(FileSystem.documentDirectory + props.id + '.mp3')
        .then(({ exists ***REMOVED***) => {
            exists ? setIsDownloaded(true) : setIsDownloaded(false)
        ***REMOVED***)


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
            <Ionicons.Button 
                name={isDownloaded ? "md-cloud-done" : "md-cloud-download"***REMOVED*** 
                color={isDownloaded ? props.grayedOut : "black"***REMOVED***
                size={30***REMOVED***
                onPress={isDownloaded ? showDeleteModal : showSaveModal***REMOVED***
                backgroundColor="rgba(0,0,0,0)"
            />
        progressBar = null;
    ***REMOVED*** else {
        downloadedFeedback = <ActivityIndicator size="small" color="black" />
        progressBar = <Progress.Bar progress={props.downloadProgress***REMOVED*** width={400***REMOVED*** color="black" borderColor="black"/>
    ***REMOVED***  

    return (
        <View style={{...styles.lessonItem, ...props.isComplete ? {backgroundColor: "#D3D3D3"***REMOVED*** : null***REMOVED******REMOVED***>
            <View style={styles.mainDisplay***REMOVED***>
                <TouchableOpacity 
                    style={styles.progresAndTitle***REMOVED*** 
                    onPress={props.onLessonSelect***REMOVED***
                    onLongPress={showLessonOptionsModal***REMOVED***
                >
                    <View style={styles.icon***REMOVED***>
                        <MaterialCommunityIcons
                            name={props.isComplete ? "play-circle" : "play-box-outline"***REMOVED***
                            color={props.isComplete ? props.grayedOut : props.accentColor***REMOVED***
                            size={30***REMOVED***
                        />
                    </View>
                    <View styles={styles.titleContainer***REMOVED***>
                        <Text style={{...styles.title,...{color: props.isComplete ? props.grayedOut : "black"***REMOVED******REMOVED******REMOVED***>{props.title***REMOVED***</Text>
                        <Text style={styles.subtitle***REMOVED***>{props.subtitle***REMOVED***</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.icon***REMOVED***>
                    {downloadedFeedback***REMOVED***
                </View>
            </View>
            <View style={styles.progressBar***REMOVED***>
                {progressBar***REMOVED***
            </View>
        </View>
    )
***REMOVED***

const styles = StyleSheet.create({
    lessonItem: {
        height: 75,
        padding: 5,
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center"
    ***REMOVED***,
    mainDisplay: {
        flexDirection: "row"
    ***REMOVED***,
    title: {
        fontSize: 22,
        textAlignVertical: "center",
        paddingHorizontal: 10,
        fontFamily: 'open-sans-regular'
    ***REMOVED***,
    subtitle: {
        fontSize: 15,
        paddingHorizontal: 10,
        fontFamily: 'open-sans-light'
    ***REMOVED***,
    titleContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
    ***REMOVED***,
    icon: {
        justifyContent: "center",
        marginHorizontal: 10
    ***REMOVED***,
    progresAndTitle: {
        justifyContent: "flex-start",
        flexDirection: 'row',
        alignContent: "center",
        flex: 1
    ***REMOVED***,
    progressBar: {
        width: "100%"
    ***REMOVED***
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
      downloadLesson: (lessonID, source) => {dispatch(downloadLesson(lessonID, source))***REMOVED***,
      toggleComplete: lessonID => {dispatch(toggleComplete(lessonID))***REMOVED***
    ***REMOVED***
  ***REMOVED***
  
  export default connect(mapStateToProps, mapDispatchToProps)(LessonItem);