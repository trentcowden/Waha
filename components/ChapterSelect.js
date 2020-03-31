//basic imports
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';
import { MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress';

function ChapterSelect(props) {

   //CHAPTE 2 BUTTON ICON
   var chapter2IconName;

   if (props.activeChapter === 'fellowship') {
      chapter2IconName = 'numeric-2-box'
   ***REMOVED*** else if (props.activeChapter === 'passage') {
      chapter2IconName = 'numeric-2-box'
   ***REMOVED*** else {
      chapter2IconName = 'checkbox-marked'
   ***REMOVED***

   var chapter2Button;   

   //CHAPTER 2 BUTTON
   if (props.lessonID in props.downloads) {
      chapter2Button =
         <View style={{ ...styles.chapterSelect, flexDirection: "row", borderColor: props.colors.grayedOut ***REMOVED******REMOVED***>
            <AnimatedCircularProgress
               size={20***REMOVED***
               width={4***REMOVED***
               fill={(props.downloads[props.lessonID] * 100)***REMOVED***
               tintColor={props.colors.grayedOut***REMOVED***
               rotation={0***REMOVED***
               backgroundColor="white"
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: props.colors.grayedOut ***REMOVED*** ***REMOVED******REMOVED***>Passage</Text>
         </View>
   ***REMOVED*** else {
      chapter2Button =
      <TouchableOpacity 
         style={{ ...styles.chapterSelect, ...{ 
            borderColor: props.colors.accentColor,
            backgroundColor: (props.activeChapter === 'passage') ? props.colors.accentColor : "#EFF2F4"***REMOVED***,
         ***REMOVED******REMOVED*** 
         onPress={() => props.onPress('passage')***REMOVED***
      >
         <MaterialCommunityIcons
            name={chapter2IconName***REMOVED***
            size={25***REMOVED***
            color={(props.activeChapter === 'passage') ? "white" : props.colors.accentColor***REMOVED***
         />
         <Text style={{ ...styles.chapterSelectText, ...{ color: (props.activeChapter === 'passage') ? "white" : props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED***>Passage</Text>
      </TouchableOpacity>
   ***REMOVED***


   return (
      <View style={styles.chapterSelectContainer***REMOVED***>
         <TouchableOpacity 
            style={{ ...styles.chapterSelect, ...{ 
               borderColor: props.colors.accentColor,
               backgroundColor: (props.activeChapter === 'fellowship') ? props.colors.accentColor : "#EFF2F4"***REMOVED***,
            ***REMOVED******REMOVED*** 
            onPress={() => props.onPress('fellowship')***REMOVED***
         >
            <MaterialCommunityIcons
               name={(props.activeChapter === 'fellowship') ? "numeric-1-box" : "checkbox-marked"***REMOVED***
               size={25***REMOVED***
               color={(props.activeChapter === 'fellowship') ? "white" : props.colors.accentColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: (props.activeChapter === 'fellowship') ? "white" : props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED***>Fellowship</Text>
         </TouchableOpacity>
         {chapter2Button***REMOVED***
         <TouchableOpacity 
            style={{ ...styles.chapterSelect, ...{ 
               borderColor: props.colors.accentColor , 
               backgroundColor: (props.activeChapter === 'application') ? props.colors.accentColor : "#EFF2F4"***REMOVED***, 
            ***REMOVED******REMOVED*** 
            onPress={() => props.onPress('application')***REMOVED***
         >
            <MaterialCommunityIcons
               name="numeric-3-box"
               size={25***REMOVED***
               color={(props.activeChapter === 'application') ? "white" : props.colors.accentColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: (props.activeChapter === 'application') ? "white" : props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED***>Application</Text>
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
      height: 50,
      justifyContent: "center",
      borderWidth: 2
   ***REMOVED***,
   chapterSelectText: {
      fontFamily: 'black',
      fontSize: 16
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   //console.log(state.downloads)
   return {
      colors: state.database[state.database.currentLanguage].colors,
      downloads: state.downloads,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(ChapterSelect);
