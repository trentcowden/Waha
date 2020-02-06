//basic imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet***REMOVED*** from 'react-native';

function LessonItem(props) {
    return(
        <TouchableOpacity style={styles.lessonItem***REMOVED*** onPress={props.onLessonSelect***REMOVED***>
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
        justifyContent: "center"
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
        justifyContent: "center"
    ***REMOVED***
***REMOVED***)

export default LessonItem;