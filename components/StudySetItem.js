//basic imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet***REMOVED*** from 'react-native';

function StudySetItem(props) {
    return(
        <TouchableOpacity style={styles.studySetItem***REMOVED*** onPress={props.onStudySetSelect***REMOVED***>
            <View>
                <Text style={styles.title***REMOVED***>{props.title***REMOVED***</Text>
            </View>
        </TouchableOpacity>
    )
***REMOVED***

const styles = StyleSheet.create({
    studySetItem: {
        flex: 1,
        height: 150,
        borderColor: "black",
        borderWidth: 2,
        margin: 5,
        justifyContent: "center"
    ***REMOVED***,
    title: {
        fontSize: 22,
        textAlignVertical: "center",
        paddingHorizontal: 10
    ***REMOVED***
***REMOVED***)

export default StudySetItem;