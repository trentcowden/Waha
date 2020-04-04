//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import { connect ***REMOVED*** from 'react-redux'
import { deleteGroup, changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'

function GroupListItem(props) {

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////
   var deleteButton;
   if (props.isEditing && props.activeGroup != props.name) {
      deleteButton =
         <TouchableOpacity
            style={styles.iconContainer***REMOVED***
            onPress={() => props.deleteGroup(props.name)***REMOVED***
         >
            <MaterialCommunityIcons name='minus-circle' size={30***REMOVED*** color="#FF0800" />
         </TouchableOpacity>
   ***REMOVED*** else {
      deleteButton = null
   ***REMOVED***

   var rightButton;
   if (props.activeGroup === props.name) {
      rightButton = 
         <View style={styles.iconContainer***REMOVED***>
            <Ionicons
               name="md-checkmark"
               size={24***REMOVED***
               color="black"
            />
         </View>
   ***REMOVED*** else if (props.isEditing) {
      rightButton =
         <View
            style={styles.iconContainer***REMOVED***
            onPress={() => { ***REMOVED******REMOVED***
         >
            <Ionicons
               name={props.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'***REMOVED***
               size={50***REMOVED***
               color="gray"
            />
         </View>
   ***REMOVED*** else {
      rightButton = null;
   ***REMOVED***

   return (
      <TouchableOpacity 
         style={[styles.groupListItemContainer, { direction: props.isRTL ? "rtl" : "ltr" ***REMOVED***]***REMOVED***
         onPress={props.isEditing ? () => props.goToEditGroupScreen(props.name) : () => {props.changeActiveGroup(props.name)***REMOVED******REMOVED***
      >
         {deleteButton***REMOVED***
         <View style={styles.iconContainer***REMOVED***>
            <Ionicons name='ios-people' size={50***REMOVED*** />
         </View>
         <View style={styles.groupNameContainer***REMOVED***>
            <Text style={styles.groupNameText***REMOVED***>{props.name***REMOVED***</Text>
         </View>
         {rightButton***REMOVED***
      </TouchableOpacity>
   )
***REMOVED***

const styles = StyleSheet.create({
   groupListItemContainer: {
      height: 72 * scaleMultiplier,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      margin: 5,
   ***REMOVED***,
   iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 15,
      height: "100%"
   ***REMOVED***,
   groupNameContainer: {
      flex: 1, 
      height: "100%",
      justifyContent: "center"
   ***REMOVED***, 
   groupNameText: {
      color: "#3A3C3F",
      fontSize: 18,
      fontFamily: 'bold'
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      progress: state.appProgress,
      isRTL: state.database[activeGroup.language].isRTL,
      groups: state.groups,
      activeGroup: state.activeGroup
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      changeActiveGroup: name => { dispatch(changeActiveGroup(name))***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupListItem);