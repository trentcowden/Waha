//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Button ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { resetProgress ***REMOVED*** from '../redux/actions/appProgressActions';

function GroupsScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


  
  //set language based on user's language vs user's location?
  useEffect(() => {
   props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  function getNavOptions() {
   return {
       headerRight: props.isRTL ? () =>
         <BackButton
            isRTL={props.isRTL***REMOVED***
            onPress={() => props.navigation.goBack()***REMOVED***
         /> :
         () => <View></View>,
      headerLeft: props.isRTL ? () =>
         <View></View> :
         () =>
         <BackButton
            isRTL={props.isRTL***REMOVED***
            onPress={() => props.navigation.goBack()***REMOVED***
         />,
   ***REMOVED***
***REMOVED***

  ///////////////////////
  ////OTHER FUNCTIONS////
  ///////////////////////



  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////


  //create modal in here, pass state to show it to lesson item so lesson item
  //can change it and show the modal on this screen
  return (
    <View>
       <Button title="test" onPress={() => props.navigation.navigate('AddNewGroup')***REMOVED***/>
    </View>
  )
***REMOVED***

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
  console.log(state.groups)
  return {
    downloads: state.downloads,
    appProgress: state.appProgress,
    database: state.database,
    colors: state.database[state.database.currentLanguage].colors,
    isRTL: state.database[state.database.currentLanguage].isRTL,
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language)),
    resetProgress: () => dispatch(resetProgress())
  ***REMOVED***
***REMOVED*** 

export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);