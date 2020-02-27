//basic imports
import React, { useState, useEffect***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

function LessonItem(props) {

    //state to keep track of whether this lesson is downloaded
    //NOTE: must be state; don't try it with a normal var
    const [isDownloaded, setIsDownloaded] = useState(false);

    //const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false); 

    //var to keep track of whether this lesson is complete
    //NOTE: must be var; don't try with state
    var isComplete;

    //check if our info passed is complete or not and set isComplete accordingly
    if(props.isComplete === 'complete') {
        isComplete = true;
    ***REMOVED*** else {
        isComplete = false;
    ***REMOVED***

    //check when our download finishes so we can update icon
    useEffect(() => {
        if (props.downloadProgress === 1) {
            setIsDownloading(false);
        ***REMOVED***
    ***REMOVED***, [props.downloadProgress])

    //calls the download lesson function passed from props
    //in addition to signalling that this specific lesson is downloading
    //so that the progress can be shown
    function downloadLesson() {
        props.downloadLesson.call();
        setIsDownloading(true);
    ***REMOVED***

    //check if the lesson is downloaded and set isDownloaded accordingly
    FileSystem.getInfoAsync(FileSystem.documentDirectory + props.id + '.mp3')
        .then(({ exists ***REMOVED***) => {
            exists ? setIsDownloaded(true) : setIsDownloaded(false)
        ***REMOVED***)

    function showDeleteAlert() {
        Alert.alert(
            'Lesson Delete',
            'You are about to delete this lesson. Are you sure you\'d like to do so?',
            [{text: 'No', onPress: () => {***REMOVED******REMOVED***, {text: 'Yes', onPress: props.deleteLesson***REMOVED***],
            { cancelable: false ***REMOVED***
        );
    ***REMOVED***

    var downloadedFeedback;
    if (!isDownloading) {
        downloadedFeedback = 
            <Ionicons.Button 
                name={isDownloaded ? "ios-backspace" : "md-cloud-download"***REMOVED*** 
                size={30***REMOVED***
                onPress={isDownloaded ? showDeleteAlert : downloadLesson***REMOVED***
                backgroundColor="rgba(0,0,0,0)"
                color="black"
            />
    ***REMOVED*** else {
        downloadedFeedback = 
            <Text>{Math.ceil(props.downloadProgress * 100).toString() + '%'***REMOVED***</Text>
    ***REMOVED***

    return(
        <View style={styles.lessonItem***REMOVED***>
            <TouchableOpacity style={styles.progresAndTitle***REMOVED*** onPress={props.onLessonSelect***REMOVED***>
                <View style={styles.icon***REMOVED***>
                    <Ionicons 
                        name={isComplete ? "ios-arrow-dropdown-circle" : "ios-arrow-dropdown"***REMOVED*** 
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
        flexDirection: "row",
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
        alignContent: "center"
    ***REMOVED***,
    downloadButton: {
    ***REMOVED***
***REMOVED***)

export default LessonItem;