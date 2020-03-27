//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'

function StudySetItem(props) {

    const [numCompleted, setNumCompleted] = useState(0)
    const [fullyCompleted, setFullyCompleted] = useState(false)

    var numLessons = 5

    useEffect(() => {
        var localNumCompleted = 0
        for (lesson in props.progress) {
            if (lesson.startsWith(props.id)) {
                localNumCompleted += 1
            ***REMOVED***
        ***REMOVED***
        setNumCompleted(localNumCompleted)
    ***REMOVED***, [props.progress])

    useEffect(() => {
        if(numCompleted === numLessons) {
            setFullyCompleted(true)
        ***REMOVED*** else {
            setFullyCompleted(false)
        ***REMOVED***
    ***REMOVED***, [numCompleted])
    

    return(
        <TouchableOpacity style={styles.studySetItem***REMOVED*** onPress={props.onStudySetSelect***REMOVED***>
            <View style={{flexDirection: "row"***REMOVED******REMOVED***>   
                <View style={styles.progressImage***REMOVED***>
                    <AnimatedCircularProgress
                        size={100***REMOVED***
                        width={8***REMOVED***
                        fill={(numCompleted / numLessons) * 100***REMOVED***
                        tintColor={fullyCompleted ? props.grayedOut : props.primaryColor***REMOVED***
                        rotation={0***REMOVED***
                        backgroundColor="#fff"
                    >
                        {(fill) => (<MaterialCommunityIcons name={props.iconName***REMOVED*** size={70***REMOVED*** color={fullyCompleted ? props.grayedOut : props.primaryColor***REMOVED***/>)***REMOVED***
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.titleContainer***REMOVED***>
                    <Text style={{...styles.subtitle,...{color: fullyCompleted ? props.grayedOut : "black"***REMOVED******REMOVED******REMOVED***>{props.subtitle***REMOVED***</Text>
                    <Text style={{...styles.title,...{color: fullyCompleted ? props.grayedOut : "black"***REMOVED******REMOVED******REMOVED***>{props.title***REMOVED***</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
***REMOVED***

const styles = StyleSheet.create({
    studySetItem: {
        flex: 1,
        height: 128,
        margin: 5,
        justifyContent: "center"
    ***REMOVED***,
    title: {
        fontSize: 18,
        textAlignVertical: "center",
        paddingHorizontal: 10,
        flexWrap: "wrap",
        fontFamily: 'open-sans-bold'
    ***REMOVED***,
    subtitle: {
        fontSize: 12,
        textAlignVertical: "center",
        paddingHorizontal: 10,
        flexWrap: "wrap",
        fontFamily: 'open-sans-light'
    ***REMOVED***,
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
    ***REMOVED***,
    progressImage: {
        margin: 5
    ***REMOVED***
***REMOVED***)


function mapStateToProps(state) {
    
    return {
        progress: state.appProgress,
        primaryColor: state.database[state.database.currentLanguage].colors.primaryColor,
        grayedOut: state.database[state.database.currentLanguage].colors.grayedOut,
    ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(StudySetItem);