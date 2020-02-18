//basic imports
import React, {useEffect, useState***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';

function LessonItem(props) {

    //console.log(props.isComplete);
    var isComplete;
    if(props.isComplete === 'complete') {
        isComplete = true;
    ***REMOVED*** else {
        isComplete = false;
    ***REMOVED***

    return(
        <TouchableOpacity style={styles.lessonItem***REMOVED*** onPress={props.onLessonSelect***REMOVED***>
            <View style={styles.icon***REMOVED***><Ionicons name={isComplete ? "ios-arrow-dropdown-circle" : "ios-arrow-dropdown"***REMOVED*** size={30***REMOVED***/></View>
            
            <View styles={styles.titleContainer***REMOVED***>
                <Text style={styles.title***REMOVED***>{props.title***REMOVED***</Text>
                <Text style={styles.subtitle***REMOVED***>{props.subtitle***REMOVED***</Text>
            </View>
        </TouchableOpacity>
    )
***REMOVED***

const styles = StyleSheet.create({
    lessonItem: {
        flex: 1,
        height: 75,
        borderColor: "black",
        borderWidth: 2,
        margin: 5,
        justifyContent: "flex-start",
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
    ***REMOVED***
***REMOVED***)

export default LessonItem;