//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Alert, ScrollView***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import SettingsItem from '../components/SettingsItem'
import * as WebBrowser from 'expo-web-browser';

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { resetProgress ***REMOVED*** from '../redux/actions/appProgressActions';

function LanguageInstancesScreen(props) {

  
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


  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////


  //create modal in here, pass state to show it to lesson item so lesson item
  //can change it and show the modal on this screen
  return (
    <View style={styles.screen***REMOVED***>
      
    </View>
  )
***REMOVED***

LanguageInstancesScreen.navigationOptions = navigationData => {
   const primaryColor = navigationData.navigation.getParam("primaryColor");

   return {
       headerTitle: "waha",
       headerBackTitle: "Back",
       headerStyle: {
           backgroundColor: primaryColor
       ***REMOVED***,
       headerTitleStyle: {
           color: "#fff",
           fontFamily: 'open-sans-bold'
       ***REMOVED***,
       
   ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInstancesScreen);