import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier, setImages ***REMOVED*** from '../constants'
import Icon from '../assets/fonts/icons'

function SetItem(props) {

   //// STATE

   // keeps track of the number of completed lessons in this set
   const [numCompleted, setNumCompleted] = useState(0)

   // keeps track of the number of total lessons in a set
   const [numLessons, setNumLessons] = useState(1)

   // keeps track of whether the set is fully completed or not
   const [fullyCompleted, setFullyCompleted] = useState(false)

   //// CONSTRUCTOR

   useEffect(() => {
      for (const set of props.activeDatabase.sets) {
         if (set.id === props.id) {
            setNumLessons(set.length)
         ***REMOVED***
      ***REMOVED***
      setNumCompleted(0);
      for (const lessonIndex of props.activeProgress) {
         if (props.activeDatabase.lessons.filter(lesson => lesson.index === lessonIndex)[0].setid === props.id) {
            setNumCompleted(numCompleted => numCompleted + 1)
         ***REMOVED***
      ***REMOVED***
   ***REMOVED***, [props.activeProgress])

   //// FUNCTIONS

   // changes a set as completed 
   useEffect(() => {
      if (numCompleted === numLessons) {
         setFullyCompleted(true)
      ***REMOVED*** else {
         setFullyCompleted(false)
      ***REMOVED***
   ***REMOVED***, [numCompleted])

   //// RENDER

   // render the percentage text conditionally as we don't need it for the small set items
   // note: small item appears on lesson list screen
   var percentageText = props.isSmall ? null :
      <View style={styles.percentageTextContainer***REMOVED***>
         <Text style={styles.percentageText***REMOVED***>{Math.round((numCompleted / numLessons) * 100)***REMOVED***%</Text>
      </View>

   // render the triangle icon conditionally as we don't need it for small set items
   var triangleIcon = props.isSmall ? null : fullyCompleted ?
      <View style={styles.iconContainer***REMOVED***>
         <Icon
            name='check-unfilled'
            size={37 * scaleMultiplier***REMOVED***
            color="#828282"
         />
      </View> :
      <View style={styles.iconContainer***REMOVED***>
         <Icon
            name={props.isRTL ? 'triangle-left' : 'triangle-right'***REMOVED***
            size={37 * scaleMultiplier***REMOVED***
            color="#828282"
         />
      </View>

   return (
      <TouchableOpacity style={[styles.studySetItem, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED*** onPress={props.onSetSelect***REMOVED***>
         <View style={styles.progressContainer***REMOVED***>
            <AnimatedCircularProgress
               size={props.isSmall ? 70 * scaleMultiplier : 85 * scaleMultiplier***REMOVED***
               width={props.isSmall ? 5 * scaleMultiplier : 8 * scaleMultiplier***REMOVED***
               fill={(numCompleted / numLessons) * 100***REMOVED***
               tintColor={fullyCompleted ? "#828282" : "#1D1E20"***REMOVED***
               rotation={0***REMOVED***
               backgroundColor="#FFFFFF"
            >
               {(fill) => (
                  <View style={{ backgroundColor: fullyCompleted ? null : props.color, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" ***REMOVED******REMOVED***>
                     <MaterialCommunityIcons name={setImages[props.index]***REMOVED*** size={props.isSmall ? 40 * scaleMultiplier : 50 * scaleMultiplier***REMOVED*** color={fullyCompleted ? "#828282" : "#1D1E20"***REMOVED*** />
                  </View>)***REMOVED***
            </AnimatedCircularProgress>
            {percentageText***REMOVED***
         </View>
         <View style={styles.titleContainer***REMOVED***>
            <Text style={{
               color: fullyCompleted ? "#9FA5AD" : "black",
               textAlign: props.isRTL ? 'right' : 'left',
               fontSize: props.isSmall ? 14 * scaleMultiplier : 12 * scaleMultiplier,
               textAlignVertical: "center",
               flexWrap: "wrap",
               fontFamily: 'light',
            ***REMOVED******REMOVED***>{props.subtitle***REMOVED***</Text>
            <Text style={{
               color: fullyCompleted ? "#9FA5AD" : "black",
               textAlign: props.isRTL ? 'right' : 'left',
               fontSize: props.isSmall ? 24 * scaleMultiplier : 18 * scaleMultiplier,
               textAlignVertical: "center",
               flexWrap: "wrap",
               fontFamily: 'black',
            ***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
         </View>
         {triangleIcon***REMOVED***
      </TouchableOpacity>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   studySetItem: {
      flexDirection: "row",
      flex: 1,
      height: 128 * scaleMultiplier,
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
   iconContainer: {
      justifyContent: "center",
      marginRight: 15
   ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      activeProgress: activeGroup.progress,
      isRTL: state.database[activeGroup.language].isRTL,
      activeDatabase: state.database[activeGroup.language]
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(SetItem);