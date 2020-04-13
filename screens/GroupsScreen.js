//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, ScrollView ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import LanguageInstanceHeader from '../components/LanguageInstanceHeader';

function GroupsScreen(props) {


   //////////////////////////////////////////
   ////STATE, CONSTRUCTOR, AND NAVIGATION////
   //////////////////////////////////////////

   const [isEditing, setIsEditing] = useState(false)

   //set language based on user's language vs user's location?
   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [isEditing, props])

   function getNavOptions() {
      return {
         headerRight: props.isRTL ? 
            () =>
               <BackButton
                  isRTL={props.isRTL***REMOVED***
                  onPress={() => props.navigation.goBack()***REMOVED***
               /> :
            () => 
               <TouchableOpacity style={styles.editButtonContainer***REMOVED*** onPress={() => setIsEditing(old => !old)***REMOVED***>
                  <Text style={styles.editButtonText***REMOVED***>{isEditing ? 'Done' : 'Edit'***REMOVED***</Text>
               </TouchableOpacity>,
         headerLeft: props.isRTL ? 
            () =>
               <TouchableOpacity style={styles.editButtonContainer***REMOVED*** onPress={() => setIsEditing(old => !old)***REMOVED***>
                  <Text style={styles.editButtonText***REMOVED***>{isEditing ? 'Done' : 'Edit'***REMOVED***</Text>
               </TouchableOpacity> :
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

   function getInstalledLanguageInstances() {
      var installedLanguageInstances = []
      for (key in props.database) {
         if (key.length === 2) {
            var languageObject = {***REMOVED***;
            languageObject['languageName'] = props.database[key].displayName
            languageObject['languageID'] = key
            installedLanguageInstances.push(languageObject)
         ***REMOVED***
      ***REMOVED***
      return installedLanguageInstances
   ***REMOVED***



   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   function renderLanguageInstanceItem(languageInstances) {
      return (
         <LanguageInstanceHeader
            languageName={languageInstances.item.languageName***REMOVED***
            languageID={languageInstances.item.languageID***REMOVED***
            goToAddNewGroupScreen={() => props.navigation.navigate('AddNewGroup', {languageID: languageInstances.item.languageID***REMOVED***)***REMOVED***
            goToEditGroupScreen={groupName => props.navigation.navigate('EditGroup', {groupName: groupName***REMOVED***)***REMOVED***
            isEditing={isEditing***REMOVED***
         />
      )
   ***REMOVED***

   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.languageList***REMOVED***>
            <FlatList
               data={getInstalledLanguageInstances()***REMOVED***
               renderItem={renderLanguageInstanceItem***REMOVED***
               keyExtractor={item => item.languageID***REMOVED***
               ListFooterComponent={
                  <TouchableOpacity style={[styles.addNewLanguageContainer, {direction: props.isRTL ? "rtl" : "ltr"***REMOVED***]***REMOVED*** onPress={() => props.navigation.navigate('AddNewLanguage', { installedLanguageInstances: getInstalledLanguageInstances() ***REMOVED***)***REMOVED***>
                     <Text style={[styles.addNewLanguageText, {textAlign: props.isRTL ? 'right' : 'left'***REMOVED***]***REMOVED***>+ New language</Text>
                  </TouchableOpacity>
               ***REMOVED***
            />
         </View>

      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#EFF2F4",
      //justifyContent: "flex-start"
   ***REMOVED***,
   languageList: {
      flex: 1
   ***REMOVED***,
   addNewLanguageContainer: {
      width: "100%",
      height: 80 * scaleMultiplier,
      justifyContent: "center",
      borderTopColor: '#EFF2F4'
   ***REMOVED***,
   addNewLanguageText: {
      fontFamily: 'medium',
      fontSize: 18  * scaleMultiplier,
      color: '#9FA5AD',
      marginHorizontal: 15,
      textAlign: "left"
   ***REMOVED***,
   editButtonContainer: {
      width: 80,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
   ***REMOVED***,
   editButtonText: {
      fontFamily: 'regular',
      fontSize: 18 * scaleMultiplier
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   //console.log(state.groups)
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      downloads: state.downloads,
      appProgress: state.appProgress,
      database: state.database,
      colors: state.database[activeGroup.language].colors,
      isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      addLanguage: language => dispatch(addLanguage(language)),
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);