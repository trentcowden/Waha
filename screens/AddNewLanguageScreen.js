//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { createGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { addLanguage ***REMOVED*** from '../redux/actions/databaseActions'

function AddNewLanguageScreen(props) {


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

   var languageInstanceList = [
      {
         id: 'en',
         displayName: 'English'
      ***REMOVED***,
      {
         id: 'kl',
         displayName: 'Klingon'
      ***REMOVED***,
   ]

   var installedLanguageInstances = []
   for (key in props.database) {
      if (key.length === 2) {
         installedLanguageInstances.push(key)
      ***REMOVED***
   ***REMOVED***

   ///////////////////////
   ////OTHER FUNCTIONS////
   ///////////////////////

   function addNewLanguage(language) {
      props.addLanguage(language)
   ***REMOVED***

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   function renderLanguageInstanceItem(languageInstanceList) {
      return (
         <TouchableOpacity
            style={styles.languageInstanceItem***REMOVED***
            onPress={() => Alert.alert
               ("Are you sure you'd like to add a new language instance?",
                  "You will not be able to use the app until the language instance is added",
                  [{
                     text: 'Cancel',
                     onPress: () => { ***REMOVED***
                  ***REMOVED***,
                  {
                     text: 'OK',
                     onPress: () => addNewLanguage(languageInstanceList.item.id)
                  ***REMOVED***
                  ])***REMOVED***>
            <Text style={styles.languageInstanceText***REMOVED***>{languageInstanceList.item.displayName***REMOVED***</Text>
         </TouchableOpacity>
      )
   ***REMOVED***

   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <FlatList
            data={languageInstanceList.filter(item => !installedLanguageInstances.includes(item.id))***REMOVED***
            renderItem={renderLanguageInstanceItem***REMOVED***
         />
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#F7F7F7"
      //justifyContent: "flex-start"
   ***REMOVED***,
   languageInstanceItem: {
      flexDirection: "row",
      alignItems: "center",
      height: 60,
      margin: 5,
      borderWidth: 2,
      borderColor: "#9FA5AD"
   ***REMOVED***,
   languageInstanceText: {
      color: '#82868D',
      paddingLeft: 10,
      fontSize: 18,
      fontFamily: 'regular'
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
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
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddNewLanguageScreen);