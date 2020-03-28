//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, StyleSheet ***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons, Entypo ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'

function StudySetItemSmall(props) {

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
      if (numCompleted === numLessons) {
         setFullyCompleted(true)
      ***REMOVED*** else {
         setFullyCompleted(false)
      ***REMOVED***
   ***REMOVED***, [numCompleted])


   return (
      <View style={styles.studySetItem***REMOVED***>
         <View style={{ flexDirection: "row" ***REMOVED******REMOVED***>
            <View style={styles.progressImage***REMOVED***>
               <AnimatedCircularProgress
                  size={65***REMOVED***
                  width={5***REMOVED***
                  fill={(numCompleted / numLessons) * 100***REMOVED***
                  tintColor={fullyCompleted ? props.grayedOut : props.primaryColor***REMOVED***
                  rotation={0***REMOVED***
                  backgroundColor="#fff"
               >
                  {(fill) => (<MaterialCommunityIcons name={props.iconName***REMOVED*** size={40***REMOVED*** color={fullyCompleted ? props.grayedOut : props.primaryColor***REMOVED*** />)***REMOVED***
               </AnimatedCircularProgress>
            </View>
            <View style={styles.titleContainer***REMOVED***>
               <Text style={{ ...styles.subtitle, ...{ color: fullyCompleted ? props.grayedOut : "black" ***REMOVED*** ***REMOVED******REMOVED***>{props.subtitle***REMOVED***</Text>
               <Text style={{ ...styles.title, ...{ color: fullyCompleted ? props.grayedOut : "black" ***REMOVED*** ***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
            </View>
         </View>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   studySetItem: {
      flex: 1,
      height: 75,
      margin: 5,
      justifyContent: "center"
   ***REMOVED***,
   progressImage: {
      margin: 5
   ***REMOVED***,
   titleContainer: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: 10,
      marginRight: 5
   ***REMOVED***,
   title: {
      fontSize: 14,
      textAlignVertical: "center",
      flexWrap: "wrap",
      fontFamily: 'medium'
   ***REMOVED***,
   subtitle: {
      fontSize: 10,
      textAlignVertical: "center",
      flexWrap: "wrap",
      fontFamily: 'light'
   ***REMOVED***,
***REMOVED***)


function mapStateToProps(state) {

   return {
      progress: state.appProgress,
      primaryColor: state.database[state.database.currentLanguage].colors.primaryColor,
      grayedOut: state.database[state.database.currentLanguage].colors.grayedOut,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(StudySetItemSmall);