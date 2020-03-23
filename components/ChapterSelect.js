//basic imports
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';
import { MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'

function ChapterSelect(props) {

   //CHAPTE 2 BUTTON ICON
   var chapter2IconName;

   if (props.activeChapter === 'fellowship') {
      chapter2IconName = 'numeric-2'
   ***REMOVED*** else if (props.activeChapter === 'passage') {
      chapter2IconName = 'numeric-2-box'
   ***REMOVED*** else {
      chapter2IconName = 'checkbox-marked'
   ***REMOVED***

   var chapter2Button;   

   //CHAPTER 2 BUTTON
   if (props.id in props.downloads) {
      chapter2Button =
         <View style={{ ...styles.chapterSelect, flexDirection: "row", borderColor: props.colors.grayedOut ***REMOVED******REMOVED***>
            <AnimatedCircularProgress
               size={20***REMOVED***
               width={4***REMOVED***
               fill={(props.downloads[props.id] * 100)***REMOVED***
               tintColor={props.colors.grayedOut***REMOVED***
               rotation={0***REMOVED***
               backgroundColor="white"
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: props.colors.grayedOut ***REMOVED*** ***REMOVED******REMOVED***>Passage</Text>
         </View>
   ***REMOVED*** else {
      chapter2Button =
         <TouchableOpacity 
            style={{ ...styles.chapterSelect, ...{ borderColor: props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED*** 
            onPress={() => props.onPress('passage')***REMOVED***
         >
            <MaterialCommunityIcons
               name={chapter2IconName***REMOVED***
               size={30***REMOVED***
               color={props.colors.accentColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED***>Passage</Text>
         </TouchableOpacity>
   ***REMOVED***


   return (
      <View style={styles.chapterSelectContainer***REMOVED***>
         <TouchableOpacity style={{ ...styles.chapterSelect, ...{ borderColor: props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED*** onPress={() => props.onPress('fellowship')***REMOVED***>
            <MaterialCommunityIcons
               name={(props.activeChapter === 'fellowship') ? "numeric-1-box" : "checkbox-marked"***REMOVED***
               size={30***REMOVED***
               color={props.colors.accentColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED***>Fellowship</Text>
         </TouchableOpacity>
         {chapter2Button***REMOVED***
         <TouchableOpacity style={{ ...styles.chapterSelect, ...{ borderColor: props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED*** onPress={() => props.onPress('application')***REMOVED***>
            <MaterialCommunityIcons
               name={(props.activeChapter === 'application') ? "numeric-3-box" : "numeric-3"***REMOVED***
               size={30***REMOVED***
               color={props.colors.accentColor***REMOVED***
            />
            <Text style={{ ...styles.chapterSelectText, ...{ color: props.colors.accentColor ***REMOVED*** ***REMOVED******REMOVED***>Application</Text>
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
      borderTopWidth: 2,
      borderBottomWidth: 2
   ***REMOVED***,
   chapterSelectText: {
      fontFamily: 'open-sans-regular',
      fontSize: 16
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   //console.log(state.downloads)
   return {
      colors: state.database[state.database.currentLanguage].colors
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(ChapterSelect);
