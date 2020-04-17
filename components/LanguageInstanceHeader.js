import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, Alert, Image ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import GroupListItem from '../components/GroupListItem'
import { scaleMultiplier, headerImages ***REMOVED*** from '../constants'
import { deleteGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { deleteLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import * as FileSystem from 'expo-file-system';

function LanguageInstanceHeader(props) {

   //// FUNCTIONS
   
   // deletes all material for a language
   function deleteLanguageInstance() {
      // delete all groups w/ this language
      props.groups.map(group => {
         if (group.language === props.languageID) {
            props.deleteGroup(group.name)
         ***REMOVED***
      ***REMOVED***)

      // delete all downloaded files for this language
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
         for (const item of contents) {
            if (item.slice(0, 2) === props.activeGroup.language)
               FileSystem.deleteAsync(FileSystem.documentDirectory + item)
         ***REMOVED***
      ***REMOVED***)

      // delete section of database for this language
      props.deleteLanguage(props.languageID)
   ***REMOVED***

   //// RENDER

   function renderGroupItem(groups) {
      return (
         <GroupListItem
            groupName={groups.item.name***REMOVED***
            isEditing={props.isEditing***REMOVED***
            goToEditGroupScreen={props.goToEditGroupScreen***REMOVED***
            avatarSource={groups.item.imageSource***REMOVED***
         />
      )
   ***REMOVED***

   // render trash button conditionally because it's only shown when editting mode is active
   var trashButton = (props.isEditing && !(props.activeGroup.language === props.languageID)) ?
      <TouchableOpacity
         style={[styles.trashButtonContainer, { marginRight: props.isRTL ? 15 : -15, marginLeft: props.isRTL ? -15 : 15 ***REMOVED***]***REMOVED***
         onPress={() => Alert.alert(
            props.translations.alerts.deleteLanguage.header,
            props.translations.alerts.deleteLanguage.body,
            [{
               text: props.translations.alerts.options.cancel,
               onPress: () => { ***REMOVED***
            ***REMOVED***, {
               text: props.translations.alerts.options.ok,
               onPress: deleteLanguageInstance
            ***REMOVED***]
         )***REMOVED***
      >
         <Icon name='trash' size={25 * scaleMultiplier***REMOVED*** color='#FF0800' />
      </TouchableOpacity> : null

   return (
      <View style={styles.languageHeaderListContainer***REMOVED***>
         <View style={[styles.languageHeaderContainer, { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***]***REMOVED***>
            {trashButton***REMOVED***
            <Text style={[styles.languageHeaderText, { textAlign: props.isRTL ? 'right' : 'left' ***REMOVED***]***REMOVED***>{props.languageName***REMOVED***</Text>
            <Image style={styles.languageLogo***REMOVED*** source={headerImages[props.languageID]***REMOVED*** />
         </View>
         <FlatList
            data={props.groups.filter(group => group.language === props.languageID)***REMOVED***
            renderItem={renderGroupItem***REMOVED***
            keyExtractor={item => item.name***REMOVED***
         />
         <TouchableOpacity style={[styles.addGroupContainer, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED*** onPress={props.goToAddNewGroupScreen***REMOVED***>
            <Icon name='group-add' size={35 * scaleMultiplier***REMOVED*** color='#DEE3E9' style={{ marginHorizontal: 15 ***REMOVED******REMOVED*** />
            <Text style={[styles.addGroupText, { textAlign: props.isRTL ? 'right' : 'left' ***REMOVED***]***REMOVED***>{props.translations.labels.newGroup***REMOVED***</Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

//// STYLES

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
   ***REMOVED***,
   languageHeaderText: {
      fontSize: 18 * scaleMultiplier,
      fontFamily: "regular",
      color: "#9FA5AD",
      marginHorizontal: 30,
      flex: 1,
   ***REMOVED***,
   languageLogo: {
      resizeMode: "stretch",
      width: 96 * scaleMultiplier,
      height: 32 * scaleMultiplier,
      alignSelf: "flex-end",
      marginHorizontal: 10
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

// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      isRTL: state.database[activeGroup.language].isRTL,
      groups: state.groups,
      activeGroup: activeGroup,
      translations: state.database[activeGroup.language].translations
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      deleteLanguage: language => { dispatch(deleteLanguage(language)) ***REMOVED***,
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInstanceHeader);