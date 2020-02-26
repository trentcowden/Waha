//basic imports
import React, { useState***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

function LessonItem(props) {

    const [isDownloaded, setIsDownloaded] = useState(false);
    var isComplete;
    if(props.isComplete === 'complete') {
        isComplete = true;
    ***REMOVED*** else {
        isComplete = false;
    ***REMOVED***

    FileSystem.getInfoAsync(FileSystem.documentDirectory + props.id + '.mp3')
        .then(({ exists ***REMOVED***) => {
            exists ? setIsDownloaded(true) : setIsDownloaded(false)
        ***REMOVED***)

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
                <Ionicons.Button 
                    name={isDownloaded ? "ios-backspace" : "md-cloud-download"***REMOVED*** 
                    size={30***REMOVED***
                    onPress={isDownloaded ? props.deleteLesson : props.downloadLesson***REMOVED***
                    backgroundColor="rgba(0,0,0,0)"
                    color="black"
                 />
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