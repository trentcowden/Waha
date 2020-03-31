//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, StyleSheet ***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons, Entypo ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function StudySetItemSmall(props) {

   function chooseAccentColor() {

      value = parseInt(props.id.substr(2,4)) % 4

      if (value === 1) {
         return props.colors.primaryColor
      ***REMOVED*** else if (value === 2) {
         return props.colors.accentColor1
      ***REMOVED*** else if (value === 3) {
         return props.colors.accentColor3
      ***REMOVED*** else {
         return props.colors.accentColor4
      ***REMOVED***
   ***REMOVED***

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
      <View style={styles.studySetItem***REMOVED***>
         <View style={{ flexDirection: "row" ***REMOVED******REMOVED***>
            <View style={styles.progressImage***REMOVED***>
               <AnimatedCircularProgress
                  size={65 * scaleMultiplier***REMOVED***
                  width={5 * scaleMultiplier***REMOVED***
                  fill={(numCompleted / numLessons) * 100***REMOVED***
                  tintColor={fullyCompleted ? "#828282" : "#1D1E20"***REMOVED***
                  rotation={0***REMOVED***
                  backgroundColor="#FFFFFF"
               >
                  {(fill) => (<View style={{backgroundColor: chooseAccentColor(), width: "100%", height: "100%", justifyContent: "center", alignItems: "center"***REMOVED******REMOVED***><MaterialCommunityIcons name={props.iconName***REMOVED*** size={40 * scaleMultiplier***REMOVED*** color={fullyCompleted ? "#828282" : "#1D1E20"***REMOVED*** /></View>)***REMOVED***
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
      height: 75 * scaleMultiplier,
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
      fontSize: 14 * scaleMultiplier,
      textAlignVertical: "center",
      flexWrap: "wrap",
      fontFamily: 'medium'
   ***REMOVED***,
   subtitle: {
      fontSize: 10 * scaleMultiplier, 
      textAlignVertical: "center",
      flexWrap: "wrap",
      fontFamily: 'light'
   ***REMOVED***,
***REMOVED***)


function mapStateToProps(state) {

   return {
      progress: state.appProgress,
      colors: state.database[state.database.currentLanguage].colors,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(StudySetItemSmall);