//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'

function StudySetItem(props) {

    const [numCompleted, setNumCompleted] = useState(0)

    console.log(props.id)

    useEffect(() => {
        var localNumCompleted = 0
        for (lesson in props.progress) {
            if (lesson.startsWith(props.id)) {
                localNumCompleted += 1
            ***REMOVED***
        ***REMOVED***
        setNumCompleted(localNumCompleted)
    ***REMOVED***, [])
    

    

    return(
        <TouchableOpacity style={styles.studySetItem***REMOVED*** onPress={props.onStudySetSelect***REMOVED***>
            <View style={{flexDirection: "row"***REMOVED******REMOVED***>   
                <View style={styles.progressImage***REMOVED***>
                    <AnimatedCircularProgress
                        size={120***REMOVED***
                        width={15***REMOVED***
                        fill={(numCompleted / 5) * 100***REMOVED***
                        tintColor="#00e0ff"
                        onAnimationComplete={() => console.log('onAnimationComplete')***REMOVED***
                        backgroundColor="#3d5875"
                    >
                        {(fill) => (<MaterialCommunityIcons name='pine-tree' size={80***REMOVED***/>)***REMOVED***
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.titleContainer***REMOVED***>
                 <Text style={styles.title***REMOVED***>{props.title***REMOVED***</Text>
                </View>
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
        paddingHorizontal: 10,
        flexWrap: "wrap",
    ***REMOVED***,
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    ***REMOVED***,
    progressImage: {
        margin: 5
    ***REMOVED***
***REMOVED***)


function mapStateToProps(state) {
    
    return {
        progress: state.appProgress
    ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(StudySetItem);