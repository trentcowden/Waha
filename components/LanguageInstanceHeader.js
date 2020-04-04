import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import GroupListItem from '../components/GroupListItem'
import {scaleMultiplier***REMOVED*** from '../constants'

function LanguageInstanceHeader(props) {
   function renderGroupItem(groups) {
      return (
         <GroupListItem
            name={groups.item.name***REMOVED***
            isEditing={props.isEditing***REMOVED***
            goToEditGroupScreen={props.goToEditGroupScreen***REMOVED***
         />
      )
   ***REMOVED***
   
   return (
      <View style={styles.languageHeaderContainer***REMOVED***>
         <Text style={styles.languageHeaderText***REMOVED***>{props.languageName***REMOVED***</Text>
         <FlatList
            data={props.groups.filter(group => group.language === props.languageID)***REMOVED***
            renderItem={renderGroupItem***REMOVED***
            keyExtractor={item => item.name***REMOVED***
         />
         <TouchableOpacity style={styles.addGroupContainer***REMOVED*** onPress={props.goToAddNewGroupScreen***REMOVED***>
            <Text style={styles.addGroupText***REMOVED***>Add new group</Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   languageHeaderContainer: {
      width: "100%",
   ***REMOVED***,
   languageHeaderText: {
      fontSize: 18,
      fontFamily: "regular",
      color: "#9FA5AD",
      marginLeft: 30
   ***REMOVED***,
   addGroupContainer: {
      height: 72 * scaleMultiplier,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      margin: 5
   ***REMOVED***,
   addGroupText: {
      color: "#2D9CDB",
      fontSize: 18,
      fontFamily: 'regular',
      marginLeft: 15
   ***REMOVED***
***REMOVED***)
function mapStateToProps(state) {
   return {
      colors: state.database[state.database.currentLanguage].colors,
      progress: state.appProgress,
      isRTL: state.database[state.database.currentLanguage].isRTL,
      groups: state.groups
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInstanceHeader);