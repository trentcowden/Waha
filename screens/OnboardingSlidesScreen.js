//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Button ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';

//redux imports
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { setFirstOpen ***REMOVED*** from '../redux/actions/databaseActions'
import { connect ***REMOVED*** from 'react-redux'

function OnboardingSlidesScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


  function navigateToLoading() {
    props.navigation.navigate({
      routeName: "Loading",
      params: {
        
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***

  useEffect(() => {
    props.setFirstOpen(false)
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
        <Text>Language select screen</Text>
        <Button title="navigate to loading screen" onPress={navigateToLoading***REMOVED***/>
    </View>
  )
***REMOVED***

OnboardingSlidesScreen.navigationOptions = navigationData => {
  return {
    headerShown: false
  ***REMOVED***;
***REMOVED***;

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
    setFirstOpen: toSet => dispatch(setFirstOpen(toSet)),
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSlidesScreen);