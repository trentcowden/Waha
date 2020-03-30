//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons, Entypo ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'

function StudySetItem(props) {

   const [numCompleted, setNumCompleted] = useState(0)
   const [fullyCompleted, setFullyCompleted] = useState(false)

   var numLessons = 13

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
      <TouchableOpacity style={styles.studySetItem***REMOVED*** onPress={props.onStudySetSelect***REMOVED***>
            <View style={styles.progressContainer***REMOVED***>
               <AnimatedCircularProgress
                  size={85***REMOVED***
                  width={8***REMOVED***
                  fill={(numCompleted / numLessons) * 100***REMOVED***
                  tintColor={fullyCompleted ? props.grayedOut : props.primaryColor***REMOVED***
                  rotation={0***REMOVED***
                  backgroundColor="#fff"
               >
                  {(fill) => (<MaterialCommunityIcons name={props.iconName***REMOVED*** size={50***REMOVED*** color={fullyCompleted ? props.grayedOut : props.primaryColor***REMOVED*** />)***REMOVED***
               </AnimatedCircularProgress>
               <View style={styles.percentageTextContainer***REMOVED***>
                  <Text style={styles.percentageText***REMOVED***>{Math.round((numCompleted / numLessons) * 100)***REMOVED***%</Text>
               </View>
            </View>
            <View style={styles.titleContainer***REMOVED***>
               <Text style={{ ...styles.subtitle, ...{ color: fullyCompleted ? props.grayedOut : "black" ***REMOVED*** ***REMOVED******REMOVED***>{props.subtitle***REMOVED***</Text>
               <Text style={{ ...styles.title, ...{ color: fullyCompleted ? props.grayedOut : "black" ***REMOVED*** ***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
            </View>
            <View style={styles.iconContainer***REMOVED***>
               <Entypo
                  name='triangle-right'
                  size={40***REMOVED***
                  color="gray"
               />
            </View>
      </TouchableOpacity>
   )
***REMOVED***

const styles = StyleSheet.create({
   studySetItem: {
      flexDirection: "row",
      flex: 1,
      height: 128,
      margin: 5,
      justifyContent: "center"
   ***REMOVED***,
   progressContainer: {
      flexDirection: "column",
      justifyContent: "center",
      margin: 5
   ***REMOVED***,
   percentageTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 5
   ***REMOVED***,
   percentageText: {
      fontFamily: 'light',
      color: "#9FA5AD",
      fontSize: 10
   ***REMOVED***,
   titleContainer: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: 10,
      marginRight: 5
   ***REMOVED***,
   title: {
      fontSize: 18,
      textAlignVertical: "center",
      flexWrap: "wrap",
      fontFamily: 'bold'
   ***REMOVED***,
   subtitle: {
      fontSize: 12,
      textAlignVertical: "center",
      flexWrap: "wrap",
      fontFamily: 'light'
   ***REMOVED***,
   iconContainer: {
      justifyContent: "center",
      marginRight: 15
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