//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Alert, ScrollView***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import SettingsItem from '../components/SettingsItem'
import * as WebBrowser from 'expo-web-browser';
import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { resetProgress ***REMOVED*** from '../redux/actions/appProgressActions';

function SettingsScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


  
  //set language based on user's language vs user's location?
  useEffect(() => {
   props.navigation.setParams({primaryColor: props.colors.primaryColor***REMOVED***)
  ***REMOVED***, [])


  ///////////////////////
  ////OTHER FUNCTIONS////
  ///////////////////////

  async function openBrowser(url) {
     await WebBrowser.openBrowserAsync(url);
  ***REMOVED***

  function deleteDownloadedLessons() {
     //look through all downloaded files
   FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
      //only delete the lessons which are 6 digit ids
      var regexp = /^[0-9]{6,6***REMOVED***/
      for (var i = 0; i < contents.length; i++) {
         var shouldDelete = regexp.exec(contents[i])
         if (shouldDelete)
            FileSystem.deleteAsync(FileSystem.documentDirectory + contents[i])
      ***REMOVED***
  ***REMOVED***);
   props.navigation.replace("StudySet")
  ***REMOVED***

  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////


  //create modal in here, pass state to show it to lesson item so lesson item
  //can change it and show the modal on this screen
  return (
    <ScrollView style={styles.screen***REMOVED***>
      <SettingsItem
         text="Privacy Policy"
         onPress={() => openBrowser('https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif')***REMOVED***
      />
      <SettingsItem
         text="Submit Feedback"
         onPress={() => openBrowser('https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif')***REMOVED***
      />
      <SettingsItem
         text="Language Instances"
         onPress={() => props.navigation.navigate("LanguageInstances")***REMOVED***
      />
      <SettingsItem
         text="Reset Progress"
         onPress={() => Alert.alert('Warning', 
            "Are you sure you'd like to reset all of your progress through the app?",
            [{
               text: 'Cancel', 
               onPress: () => {***REMOVED***
            ***REMOVED***,
            {
               text: 'Yes',
               onPress: () => props.resetProgress()
            ***REMOVED***
            ])
         ***REMOVED***
      />
      <SettingsItem
         text="Remove Downloaded Lessons"
         onPress={() => Alert.alert('Warning', 
            "Are you sure you'd like to remove all downloaded lessons from your device?",
            [{
               text: 'Cancel', 
               onPress: () => {***REMOVED***
            ***REMOVED***,
            {
               text: 'Yes',
               onPress: deleteDownloadedLessons
            ***REMOVED***
            ])
         ***REMOVED***
      />
      <SettingsItem
         text="Coaching Tools"
         onPress={() => {***REMOVED******REMOVED***
      />
      <SettingsItem
         text="View Credits"
         onPress={() => openBrowser('https://media.giphy.com/media/C4msBrFb6szHG/giphy.gif')***REMOVED***
      /> 
    </ScrollView>
  )
***REMOVED***

SettingsScreen.navigationOptions = navigationData => {
   const isRTL = navigationData.navigation.getParam("isRTL");
   const primaryColor = navigationData.navigation.getParam("primaryColor");

   return {
       headerTitle: "Settings",
       headerBackTitle: "Back",
       headerStyle: {
           backgroundColor: "#F7F7F7",
       ***REMOVED***,
       headerTitleStyle: {
           color: primaryColor,
           fontFamily: 'bold'
       ***REMOVED***,
       headerRight: isRTL ? () =>
         <BackButton
            isRTL={isRTL***REMOVED***
            onPress={() => navigationData.navigation.goBack()***REMOVED***
         /> :
         () => <View></View>,
      headerLeft: isRTL ? () =>
         <View></View> :
         () =>
         <BackButton
            isRTL={isRTL***REMOVED***
            onPress={() => navigationData.navigation.goBack()***REMOVED***
         />,
      gestureDirection: isRTL ? 'horizontal-inverted' : 'horizontal',
   ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#F7F7F7"
      //justifyContent: "flex-start"
   ***REMOVED***,
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
  //console.log(state.database)
  return {
    downloads: state.downloads,
    appProgress: state.appProgress,
    database: state.database,
    colors: state.database[state.database.currentLanguage].colors,
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language)),
    resetProgress: () => dispatch(resetProgress())
  ***REMOVED***
***REMOVED*** 

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);