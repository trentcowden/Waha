//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { resetProgress ***REMOVED*** from '../redux/actions/appProgressActions';
import LanguageInstanceHeader from '../components/LanguageInstanceHeader';

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

   function renderLanguageInstanceItem(languageInstances) {
      return (
         <LanguageInstanceHeader
            languageInstance={languageInstances.item***REMOVED***
            goToAddNewGroupScreen={() => props.navigation.navigate('AddNewGroup', {languageInstance: languageInstances.item***REMOVED***)***REMOVED***
         />
      )
   ***REMOVED***

   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.languageList***REMOVED***>
         <FlatList
            data={Object.keys(props.database)***REMOVED***
            renderItem={renderLanguageInstanceItem***REMOVED***
            keyExtractor={item => item***REMOVED***
         />
         </View>
         <TouchableOpacity style={styles.addNewLanguageContainer***REMOVED*** onPress={() => props.addLanguage('TestLanguageOne')***REMOVED***>
            <Text style={styles.addNewLanguageText***REMOVED***>Add new language</Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#DEE3E9",
      //justifyContent: "flex-start"
   ***REMOVED***,
   languageList: {
      marginTop: 10,
      flex: 1
   ***REMOVED***,
   addNewLanguageContainer: {
      width: "100%",
      height: 50
   ***REMOVED***,
   addNewLanguageText: {
      fontFamily: 'regular',
      fontSize: 18,
      color: '#9FA5AD',
      marginHorizontal: 15
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   console.log(state.database)
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);