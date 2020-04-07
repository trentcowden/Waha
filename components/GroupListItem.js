//imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons ***REMOVED*** from '@expo/vector-icons';
import { connect ***REMOVED*** from 'react-redux'
import { deleteGroup, changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AvatarImage from '../components/AvatarImage'

function GroupListItem(props) {
   function getBookmarkText() {
      var bookmarkInt = 0;
      var thisGroupProgress = props.groups.filter(item => item.name === props.name)[0].progress
      //if a group has no progress, return the first lesson in the first study set
      if (thisGroupProgress.length === 0) {
         var firstLesson = props.currentDatabase.studySets[0].lessons[0]
         return (firstLesson.subtitle + ' ' + firstLesson.title)
      ***REMOVED***
      thisGroupProgress.map(lessonID => {
         if (parseInt(lessonID) > bookmarkInt)
            bookmarkInt = parseInt(lessonID)
         return null;
      ***REMOVED***)


      //string of the id of the last completed lesson 
      var bookmarkString = bookmarkInt.toString();
      var extraZero = ''
      if (bookmarkString.length < 6)
         extraZero = '0'
      bookmarkString = extraZero + bookmarkString

      var lessonListOfBookmarkStudySet = props.currentDatabase.studySets.filter(
         studySet => studySet.id === bookmarkString.slice(-6, -2)
      )[0].lessons

      //edge case: the last completed lesson is the last in a study set
      if (parseInt(bookmarkString.slice(-2)) === lessonListOfBookmarkStudySet.length) {
         //edge case: the last completed lesson is the last available lesson in any study set
         if (parseInt(bookmarkString.slice(-4, -2)) === props.currentDatabase.studySets.length) {
            return ('Contact us for more study sets!')
         ***REMOVED*** else {
            bookmarkString = (bookmarkString.slice(-6, -4).concat((extraZero + (parseInt(bookmarkString.slice(-4, -2)) + 1)).toString(), bookmarkString.slice(-2)))
            lessonListOfBookmarkStudySet = props.currentDatabase.studySets.filter(
               studySet => studySet.id === bookmarkString.slice(-6, -2)
            )[0].lessons
            bookmarkLesson = lessonListOfBookmarkStudySet.filter(
               lesson => lesson.id === bookmarkString.slice(-6, -2).concat('01')
            )
         ***REMOVED***

         //normal case
      ***REMOVED*** else {
         //get the lesson AFTER the last completed lesson 
         bookmarkLesson = lessonListOfBookmarkStudySet.filter(
            lesson => lesson.id === '0'.concat((parseInt(bookmarkString) + 1).toString())
         )
      ***REMOVED***
      return (bookmarkLesson[0].subtitle + ' ' + bookmarkLesson[0].title)
   ***REMOVED***

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////
   var deleteButton;
   if (props.isEditing && props.activeGroup != props.name) {
      deleteButton =
         <TouchableOpacity
            style={styles.minusButtonContainer***REMOVED***
            onPress={() => props.deleteGroup(props.name)***REMOVED***
         >
            <MaterialCommunityIcons name='minus-circle' size={24 * scaleMultiplier***REMOVED*** color="#FF0800" />
         </TouchableOpacity>
   ***REMOVED*** else if (props.isEditing && props.activeGroup === props.name) {
      deleteButton =
         <View
            style={styles.minusButtonContainer***REMOVED***
            onPress={() => props.deleteGroup(props.name)***REMOVED***
         >
            <MaterialCommunityIcons name='minus-circle' size={24 * scaleMultiplier***REMOVED*** color="#DEE3E9" />
         </View>
   ***REMOVED***

   var rightButton;
   if (props.isEditing) {
      rightButton =
         <View
            style={styles.iconContainer***REMOVED***
            onPress={() => { ***REMOVED******REMOVED***
         >
            <Ionicons
               name={props.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'***REMOVED***
               size={36 * scaleMultiplier***REMOVED***
               color="gray"
            />
         </View>
   ***REMOVED*** else if (props.activeGroup === props.name) {
      rightButton =
         <View style={styles.iconContainer***REMOVED***>
            <Ionicons
               name="md-checkmark"
               size={24 * scaleMultiplier***REMOVED***
               color="#2D9CDB"
            />
         </View>
   ***REMOVED*** else {
      rightButton = null;
   ***REMOVED***

   return (
      <View style={[styles.groupListItemContainer, { direction: props.isRTL ? "rtl" : "ltr" ***REMOVED***]***REMOVED***>
      {deleteButton***REMOVED***
      <TouchableOpacity
         style={[styles.touchableContainer, { direction: props.isRTL ? "rtl" : "ltr" ***REMOVED***]***REMOVED***
         onPress={props.isEditing ? () => props.goToEditGroupScreen(props.name) : () => { props.changeActiveGroup(props.name) ***REMOVED******REMOVED***
      >
         <AvatarImage size={50***REMOVED*** onPress={() => {***REMOVED******REMOVED*** source={props.avatarSource***REMOVED*** isActive={props.activeGroup === props.name***REMOVED***/>
        
         <View style={styles.groupNameContainer***REMOVED***>
            <Text style={styles.groupNameText***REMOVED***>{props.name***REMOVED***</Text>
            <Text style={styles.checkpointText***REMOVED***>{getBookmarkText()***REMOVED***</Text>
         </View>
         {rightButton***REMOVED***
      </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   groupListItemContainer: {
      height: 80 * scaleMultiplier,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      margin: 3
   ***REMOVED***,
   touchableContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
   ***REMOVED***,
   iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 15,
      height: "100%",
   ***REMOVED***,
   minusButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
      marginRight: -5,
      height: "100%"
   ***REMOVED***,
   groupNameContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      flexWrap: 'nowrap'
   ***REMOVED***,
   groupNameText: {
      color: "#3A3C3F",
      fontSize: 18 * scaleMultiplier,
      fontFamily: 'bold',
      textAlign: "left"
   ***REMOVED***,
   checkpointText: {
      fontFamily: 'regular',
      fontSize: 12 * scaleMultiplier,
      color: '#9FA5AD',
      textAlign: "left"
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      currentProgress: activeGroup.progress,
      isRTL: state.database[activeGroup.language].isRTL,
      groups: state.groups,
      activeGroup: state.activeGroup,
      currentDatabase: state.database[activeGroup.language]
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      changeActiveGroup: name => { dispatch(changeActiveGroup(name)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupListItem);