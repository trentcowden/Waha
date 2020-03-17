//imports
import React, { useState ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Button ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';

//redux imports
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { connect ***REMOVED*** from 'react-redux'

function LoadingScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


//   function navigateToOnboarding() {
//     props.navigation.navigate({
//       routeName: "Onboarding",
//       params: {
        
//       ***REMOVED***
//     ***REMOVED***)
//   ***REMOVED***


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

// LoadingScreen.navigationOptions = navigationData => {
//   return {
//     header: null
//   ***REMOVED***;
// ***REMOVED***;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
  //console.log(state)
  return {
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);