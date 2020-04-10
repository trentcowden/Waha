import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, Alert, Image ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import GroupListItem from '../components/GroupListItem'
import { scaleMultiplier, headerImages ***REMOVED*** from '../constants'
import { deleteGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { deleteLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import * as FileSystem from 'expo-file-system';

function LanguageInstanceHeader(props) {

   function deleteLanguageInstance() {

      //1. delete all groups w/ this language
      props.groups.map(group => {
         if (group.language === props.languageID) {
            props.deleteGroup(group.name)
         ***REMOVED***
      ***REMOVED***)

      //2. delete all downloaded files for this language
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
         //only delete the lessons which are 6 digit ids
         for (var i = 0; i < contents.length; i++) {
            if (contents[i].slice(0, 2) === props.database[props.languageID].studySets[0].id.slice(0,2) ||
            contents[i].slice(0, 2) === props.languageID)
            FileSystem.deleteAsync(FileSystem.documentDirectory + contents[i])
         ***REMOVED***
      ***REMOVED***);

      //3. delete section of database for this language
      props.deleteLanguage(props.languageID)
   ***REMOVED***

   function renderGroupItem(groups) {
      return (
         <GroupListItem
            name={groups.item.name***REMOVED***
            isEditing={props.isEditing***REMOVED***
            goToEditGroupScreen={props.goToEditGroupScreen***REMOVED***
            avatarSource={groups.item.imageSource***REMOVED***
         />
      )
   ***REMOVED***

   var trashButton = (props.isEditing && !(props.activeLanguage === props.languageID)) ?
      <TouchableOpacity
         style={styles.trashButtonContainer***REMOVED***
         onPress={
            () => Alert.alert(
               'Warning',
               "Are you sure you'd like to delete all data for this language instance? This includes, downloaded lessons, groups, and progress.",
               [{
                  text: 'Cancel',
                  onPress: () => { ***REMOVED***
               ***REMOVED***,
               {
                  text: 'OK',
                  onPress: deleteLanguageInstance
               ***REMOVED***]
            )
         ***REMOVED***
      >
         <Icon name='trash' size={25 * scaleMultiplier***REMOVED*** color='#FF0800'/>
      </TouchableOpacity> : null
   
   return (
      <View style={styles.languageHeaderListContainer***REMOVED***>
         <View style={[styles.languageHeaderContainer, {direction: props.isRTL ? 'rtl' : 'ltr'***REMOVED***]***REMOVED***>
            {trashButton***REMOVED***
            <Text style={styles.languageHeaderText***REMOVED***>{props.languageName***REMOVED***</Text>
            <Image style={styles.languageLogo***REMOVED*** source={headerImages[props.languageID]***REMOVED*** />
         </View>
         <FlatList
            data={props.groups.filter(group => group.language === props.languageID)***REMOVED***
            renderItem={renderGroupItem***REMOVED***
            keyExtractor={item => item.name***REMOVED***
         />
         <TouchableOpacity style={[styles.addGroupContainer, {direction: props.isRTL ? "rtl" : "ltr"***REMOVED***]***REMOVED*** onPress={props.goToAddNewGroupScreen***REMOVED***>
            <Icon name='group-add' size={35 * scaleMultiplier***REMOVED*** color='#DEE3E9' style={{marginHorizontal: 15***REMOVED******REMOVED***/>
            <Text style={styles.addGroupText***REMOVED***>New group</Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   languageHeaderListContainer: {
      width: "100%",
      marginBottom: 15,
      marginTop: 3
   ***REMOVED***,
   languageHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 30,
   ***REMOVED***, 
   trashButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      marginRight: -15
   ***REMOVED***, 
   languageHeaderText: {
      fontSize: 18 * scaleMultiplier,
      fontFamily: "regular",
      color: "#9FA5AD",
      marginHorizontal: 30,
      flex: 1,
      textAlign: 'left'
   ***REMOVED***,
   languageLogo: {
      resizeMode: "stretch",
      width: 96 * scaleMultiplier,
      height: 32 * scaleMultiplier,
      alignSelf: "flex-end",
      marginRight: 10
   ***REMOVED***,
   addGroupContainer: {
      height: 80 * scaleMultiplier,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      margin: 3,
   ***REMOVED***,
   addGroupText: {
      color: "#2D9CDB",
      fontSize: 18 * scaleMultiplier,
      fontFamily: 'medium-italic',
      textAlign: 'left'
   ***REMOVED***,
***REMOVED***)
function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      progress: state.appProgress,
      isRTL: state.database[activeGroup.language].isRTL,
      groups: state.groups,
      activeLanguage: activeGroup.language,
      database: state.database,
      activeGroupLanguage: activeGroup.language
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      deleteLanguage: language => { dispatch(deleteLanguage(language))***REMOVED***,
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInstanceHeader);