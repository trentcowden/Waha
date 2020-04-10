//basic imports
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';
import { scaleMultiplier ***REMOVED*** from '../constants'

function ChapterSelect(props) {

   //CHAPTE 2 BUTTON ICON
   var chapter2IconName;

   if (props.activeChapter === 'fellowship') {
      chapter2IconName = '2-filled'
   ***REMOVED*** else if (props.activeChapter === 'passage') {
      chapter2IconName = '2-unfilled'
   ***REMOVED*** else {
      chapter2IconName = 'check-filled'
   ***REMOVED***

   var chapter2Button;   

   //CHAPTER 2 BUTTON
   if (props.lessonID in props.downloads) {
      chapter2Button =
         <View style={{ ...styles.chapterSelect, flexDirection: "row", borderColor: "#82868D" ***REMOVED******REMOVED***>
            <AnimatedCircularProgress
               size={20***REMOVED***
               width={4***REMOVED***
               fill={(props.downloads[props.lessonID] * 100)***REMOVED***
               tintColor="#82868D"
               rotation={0***REMOVED***
               backgroundColor="white"
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: "#82868D"  ***REMOVED*** ***REMOVED******REMOVED***>Passage</Text>
         </View>
   ***REMOVED*** else {
      chapter2Button =
      <TouchableOpacity 
         style={{ ...styles.chapterSelect, ...{ 
            borderColor: props.colors.primaryColor,
            backgroundColor: (props.activeChapter === 'passage') ? props.colors.primaryColor : "#EFF2F4"***REMOVED***,
         ***REMOVED******REMOVED*** 
         onPress={() => props.onPress('passage')***REMOVED***
      >
         <Icon
            name={chapter2IconName***REMOVED***
            size={25***REMOVED***
            color={(props.activeChapter === 'passage') ? "white" : props.colors.primaryColor***REMOVED***
         />
         <Text style={{ ...styles.chapterSelectText, ...{ color: (props.activeChapter === 'passage') ? "white" : props.colors.primaryColor ***REMOVED*** ***REMOVED******REMOVED***>Passage</Text>
      </TouchableOpacity>
   ***REMOVED***


   return (
      <View style={styles.chapterSelectContainer***REMOVED***>
         <TouchableOpacity 
            style={{ ...styles.chapterSelect, ...{ 
               borderColor: props.colors.primaryColor,
               backgroundColor: (props.activeChapter === 'fellowship') ? props.colors.primaryColor : "#EFF2F4"***REMOVED***,
            ***REMOVED******REMOVED*** 
            onPress={() => props.onPress('fellowship')***REMOVED***
         >
            <Icon
               name={(props.activeChapter === 'fellowship') ? "1-unfilled" : "check-filled"***REMOVED***
               size={25***REMOVED***
               color={(props.activeChapter === 'fellowship') ? "white" : props.colors.primaryColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: (props.activeChapter === 'fellowship') ? "white" : props.colors.primaryColor ***REMOVED*** ***REMOVED******REMOVED***>Fellowship</Text>
         </TouchableOpacity>
         {chapter2Button***REMOVED***
         <TouchableOpacity 
            style={{ ...styles.chapterSelect, ...{ 
               borderColor: props.colors.primaryColor , 
               backgroundColor: (props.activeChapter === 'application') ? props.colors.primaryColor : "#EFF2F4"***REMOVED***, 
            ***REMOVED******REMOVED*** 
            onPress={() => props.onPress('application')***REMOVED***
         >
            <Icon
               name={props.activeChapter === 'application' ? "3-unfilled" : '3-filled'***REMOVED***
               size={25***REMOVED***
               color={(props.activeChapter === 'application') ? "white" : props.colors.primaryColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: (props.activeChapter === 'application') ? "white" : props.colors.primaryColor ***REMOVED*** ***REMOVED******REMOVED***>Application</Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   chapterSelectContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
   ***REMOVED***,
   chapterSelect: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      height: 50 * scaleMultiplier,
      justifyContent: "center",
      borderWidth: 2,
   ***REMOVED***,
   chapterSelectText: {
      fontFamily: 'black',
      fontSize: 16 * scaleMultiplier
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      downloads: state.downloads,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(ChapterSelect);
