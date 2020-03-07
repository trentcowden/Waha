//basic imports
import React, { useState, useEffect***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';

function LessonItem(props) {

    //state to keep track of whether this lesson is downloaded
    //NOTE: must be state; don't try it with a normal var
    const [isDownloaded, setIsDownloaded] = useState(false);

    //check if the lesson is downloaded and set isDownloaded accordingly
    FileSystem.getInfoAsync(FileSystem.documentDirectory + props.id + '.mp3')
        .then(({ exists ***REMOVED***) => {
            exists ? setIsDownloaded(true) : setIsDownloaded(false)
        ***REMOVED***)


    function showSaveModal() {
        props.setIDToDownload.call();
        props.setShowSaveLessonModal.call();
    ***REMOVED***

    function showDeleteModal() {
        props.setIDToDownload.call();
        props.setShowDeleteLessonModal.call();
    ***REMOVED***

    //component for what to display on the far right of the list
    //can either be cloud down arrow (click to download), x (click to delete),
    //a no internet icon, or a spin icon if it's downloading
    var downloadedFeedback;
    var progressBar;
    if (!props.downloadProgress) {
        downloadedFeedback = 
            <Ionicons.Button 
                name={isDownloaded ? "ios-backspace" : "md-cloud-download"***REMOVED*** 
                size={30***REMOVED***
                onPress={isDownloaded ? showDeleteModal : showSaveModal***REMOVED***
                backgroundColor="rgba(0,0,0,0)"
                color="black"
            />
        progressBar = null;
    ***REMOVED*** else {
        downloadedFeedback = <ActivityIndicator size="small" color="black" />
        progressBar = <Progress.Bar progress={props.downloadProgress***REMOVED*** width={400***REMOVED*** color="black" borderColor="black"/>
    ***REMOVED***  

    return (
        <View style={styles.lessonItem***REMOVED***>
            <View style={styles.mainDisplay***REMOVED***>
                <TouchableOpacity style={styles.progresAndTitle***REMOVED*** onPress={props.onLessonSelect***REMOVED***>
                    <View style={styles.icon***REMOVED***>
                        <Ionicons
                            name={props.isComplete ? "ios-arrow-dropdown-circle" : "ios-arrow-dropdown"***REMOVED***
                            size={30***REMOVED***
                        />
                    </View>
                    <View styles={styles.titleContainer***REMOVED***>
                        <Text style={styles.title***REMOVED***>{props.title***REMOVED***</Text>
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
        flex: 1,
        height: 75,
        borderColor: "black",
        borderWidth: 2,
        margin: 5,
        justifyContent: "space-between",
        flexDirection: "column",
    ***REMOVED***,
    mainDisplay: {
        flexDirection: "row"
    ***REMOVED***,
    title: {
        fontSize: 22,
        textAlignVertical: "center",
        paddingHorizontal: 10
    ***REMOVED***,
    subtitle: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: "gray"
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

export default LessonItem;