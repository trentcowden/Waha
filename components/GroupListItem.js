//imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import { deleteGroup, changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AvatarImage from '../components/AvatarImage'

function GroupListItem(props) {
   function getBookmarkText() {
      // var thisGroup = props.groups.filter(item => item.name === props.name)[0]
      // var thisGroupDatabase = props.database[thisGroup.language]
      // var bookmarkInt = 0;
      // var thisGroupProgress = props.groups.filter(item => item.name === props.name)[0].progress

      // //if a group has no progress, return the first lesson in the first study set
      // if (thisGroupProgress.length === 0) {
      //    var firstLesson = thisGroupDatabase.studySets[0].lessons[0]
      //    return (firstLesson.subtitle + ' ' + firstLesson.title)
      // ***REMOVED***
      // thisGroupProgress.map(lessonID => {
      //    if (parseInt(lessonID.slice(-4)) > bookmarkInt)
      //       bookmarkInt = parseInt(lessonID.slice(-4))
      //    return null;
      // ***REMOVED***)

      // //string of the id of the last completed lesson 
      // var bookmarkString = bookmarkInt.toString();
      // var extraZero = ''
      // if (bookmarkString.length < 4)
      //    extraZero = '0'
      // bookmarkString = extraZero + bookmarkString

      // var lessonListOfBookmarkStudySet = thisGroupDatabase.studySets.filter(
      //    studySet => (studySet.id).slice(2, 4) === bookmarkString.slice(0, 2)
      // )[0].lessons

      // //edge case: the last completed lesson is the last in a study set
      // if (parseInt(bookmarkString.slice(-2)) === lessonListOfBookmarkStudySet.length) {
      //    //edge case: the last completed lesson is the last available lesson in any study set
      //    if (parseInt(bookmarkString.slice(0, 2)) === thisGroupDatabase.studySets.length) {
      //       return ('Contact us for more study sets!')
      //    ***REMOVED*** else {
      //       bookmarkString = (extraZero + (parseInt(bookmarkString.slice(0, 2)) + 1)).toString().concat(bookmarkString.slice(-2))
      //       lessonListOfBookmarkStudySet = thisGroupDatabase.studySets.filter(
      //          studySet => (studySet.id).slice(2, 4) === bookmarkString.slice(0, 2)
      //       )[0].lessons
      //       bookmarkLesson = lessonListOfBookmarkStudySet.filter(
      //          lesson => lesson.id === (lesson.id).slice(0, 2).concat(bookmarkString.slice(0, 2), '01')
      //       )
      //    ***REMOVED***

      //    //normal case
      // ***REMOVED*** else {
      //    //get the lesson AFTER the last completed lesson 
      //    bookmarkLesson = lessonListOfBookmarkStudySet.filter(
      //       lesson => lesson.id === (lesson.id).slice(0, 2).concat(extraZero, (parseInt(bookmarkString) + 1).toString())
      //    )
      // ***REMOVED***
      // return (bookmarkLesson[0].subtitle + ' ' + bookmarkLesson[0].title)
      return 'dummy text'
   ***REMOVED***

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////
   var deleteButton;
   if (props.isEditing && props.activeGroup != props.name) {
      deleteButton =
         <TouchableOpacity
            style={[styles.minusButtonContainer, { marginLeft: props.isRTL ? -5 : 10, marginRight: props.isRTL ? 10 : -5,***REMOVED***]***REMOVED***
            onPress={() => props.deleteGroup(props.name)***REMOVED***
         >
            <Icon name='minus-filled' size={24 * scaleMultiplier***REMOVED*** color="#FF0800" />
         </TouchableOpacity>
   ***REMOVED*** else if (props.isEditing && props.activeGroup === props.name) {
      deleteButton =
         <View style={[styles.minusButtonContainer, { marginLeft: props.isRTL ? -5 : 10, marginRight: props.isRTL ? 10 : -5,***REMOVED***]***REMOVED***>
            <Icon
               name="check"
               size={24 * scaleMultiplier***REMOVED***
               color="#2D9CDB"
            />
         </View>
   ***REMOVED***

   var rightButton;
   if (props.isEditing) {
      rightButton =
         <View
            style={styles.iconContainer***REMOVED***
            onPress={() => { ***REMOVED******REMOVED***
         >
            <Icon
               name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
               size={36 * scaleMultiplier***REMOVED***
               color="gray"
            />
         </View>
   ***REMOVED*** else if (props.activeGroup === props.name) {
      rightButton =
         <View style={styles.iconContainer***REMOVED***>
            <Icon
               name="check"
               size={24 * scaleMultiplier***REMOVED***
               color="#2D9CDB"
            />
         </View>
   ***REMOVED*** else {
      rightButton = null;
   ***REMOVED***

   return (
      <View style={[styles.groupListItemContainer, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED***>
      {deleteButton***REMOVED***
      <TouchableOpacity
         style={[styles.touchableContainer, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED***
         onPress={props.isEditing ? () => props.goToEditGroupScreen(props.name) : () => { props.changeActiveGroup(props.name) ***REMOVED******REMOVED***
      >
         <AvatarImage size={50 * scaleMultiplier***REMOVED*** onPress={() => {***REMOVED******REMOVED*** source={props.avatarSource***REMOVED*** isActive={props.activeGroup === props.name***REMOVED***/>
         <View style={styles.groupNameContainer***REMOVED***>
            <Text style={[styles.groupNameText, {textAlign: props.isRTL ? 'right' :'left'***REMOVED***]***REMOVED***>{props.name***REMOVED***</Text>
            <Text style={[styles.checkpointText, {textAlign: props.isRTL ? 'right' :'left'***REMOVED***]***REMOVED***>{getBookmarkText()***REMOVED***</Text>
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
      margin: 2
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
      height: "100%",
      width: 30
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
      database: state.database
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      changeActiveGroup: name => { dispatch(changeActiveGroup(name)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupListItem);