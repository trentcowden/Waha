//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import Icon from '../assets/fonts/icons'

function SetItem(props) {

   const [numCompleted, setNumCompleted] = useState(0)
   const [numLessons, setNumLessons] = useState(1)
   const [fullyCompleted, setFullyCompleted] = useState(false)

   useEffect(() => {

      for (const set of props.database.sets) {
         if (set.id === props.id) {
            setNumLessons(set.length)
         ***REMOVED***
      ***REMOVED***
      // var localNumCompleted = 0
      // for (const lesson of props.progress) {
      //    if (lesson.startsWith(props.id)) {
      //       localNumCompleted += 1
      //    ***REMOVED***
      // ***REMOVED***
      // setNumCompleted(localNumCompleted)
   ***REMOVED***, [props.progress])

   useEffect(() => {
      if (numCompleted === numLessons) {
         setFullyCompleted(true)
      ***REMOVED*** else {
         setFullyCompleted(false)
      ***REMOVED***
   ***REMOVED***, [numCompleted])

   var percentageText = props.isSmall ? null :
      <View style={styles.percentageTextContainer***REMOVED***>
         <Text style={styles.percentageText***REMOVED***>{Math.round((numCompleted / numLessons) * 100)***REMOVED***%</Text>
      </View>

   var triangleIcon = props.isSmall ? null :
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
                  <View style={{ backgroundColor: props.color, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" ***REMOVED******REMOVED***>
                     <MaterialCommunityIcons name={props.iconName***REMOVED*** size={props.isSmall ? 40 * scaleMultiplier : 50 * scaleMultiplier***REMOVED*** color={fullyCompleted ? "#828282" : "#1D1E20"***REMOVED*** />
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
               fontFamily: props.isSmall ? 'black' : 'bold',
            ***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
         </View>
         {triangleIcon***REMOVED***
      </TouchableOpacity>
   )
***REMOVED***

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


function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      progress: activeGroup.progress,
      isRTL: state.database[activeGroup.language].isRTL,
      database: state.database[activeGroup.language]
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(SetItem);