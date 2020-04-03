//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { createGroup ***REMOVED*** from '../redux/actions/groupsActions'

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

   ///////////////////////
   ////OTHER FUNCTIONS////
   ///////////////////////

   function addNewGroup() {
      props.createGroup(groupName, props.route.params.languageInstance)
      props.navigation.goBack()
   ***REMOVED***

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////


   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.photoContainer***REMOVED***>
            <Text>Todo: photo stuff</Text>
         </View>
         <View style={styles.bottomHalfContainer***REMOVED***>
            <View style={styles.inputContainer***REMOVED***>
               <Text style={styles.groupNameLabel***REMOVED***>Group Name</Text>
               <TextInput
                  style={styles.addNewGroupContainer***REMOVED***
                  onChangeText={text => setGroupName(text)***REMOVED*** value={groupName***REMOVED***
                  autoCapitalize='words'
                  autoCorrect={false***REMOVED***
                  placeholder='Group name here'
                  placeholderTextColor='#9FA5AD'
                  maxLength={50***REMOVED***
                  returnKeyType='done'
               />
            </View>
            <TouchableOpacity style={styles.saveButtonContainer***REMOVED*** onPress={addNewGroup***REMOVED***>
               <Text style={styles.saveButtonText***REMOVED***>Save</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#F7F7F7"
      //justifyContent: "flex-start"
   ***REMOVED***,
   photoContainer: {
      width: "100%",
      height: "30%",
      justifyContent: "center",
      alignItems: "center"
   ***REMOVED***,
   bottomHalfContainer: {
      flex: 1,
      justifyContent: "space-between",
   ***REMOVED***,
   inputContainer: {
      marginHorizontal: 25,
      padding: 3,
   ***REMOVED***,
   groupNameLabel: {
      fontFamily: "regular",
      fontSize: 14,
      color: '#9FA5AD'
   ***REMOVED***,
   addNewGroupContainer: {
      borderBottomColor: '#EFF2F4',
      borderBottomWidth: 2,
      height: 40,

      fontSize: 18,
      fontFamily: 'regular'
   ***REMOVED***,
   saveButtonContainer: {
      width: 127,
      height: 52,
      borderRadius: 5,
      backgroundColor: "#60C239",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-end",
      margin: 30
   ***REMOVED***,
   saveButtonText: {
      fontSize: 18,
      fontFamily: 'bold',
      color: "#FFFFFF"
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
      createGroup: (groupName, language) => dispatch(createGroup(groupName, language)),
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddNewLanguageScreen);