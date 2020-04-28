import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import { deleteGroup, changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AvatarImage from '../components/AvatarImage'

function GroupListItem(props) {

   //// FUNCTIONS

   // gets a formatted string of this group's bookmark lesson
   function getBookmarkText() {
      var thisGroup = props.groups.filter(group => group.name === props.groupName)[0]
      if (thisGroup.bookmark === props.database[thisGroup.language].lessons.length + 1) 
         return 'Contact us for more study sets!'
      var bookmarkLesson = props.database[thisGroup.language].lessons.filter(lesson => lesson.index === thisGroup.bookmark)[0]
      return bookmarkLesson.subtitle + ' ' + bookmarkLesson.title
   ***REMOVED***

   //// RENDER

   // render the delete button conditionally as we can only delete in edit mode and 
   // can't delete the active group
   var deleteButton;
   if (props.isEditing && props.activeGroup != props.groupName) {
      deleteButton =
         <TouchableOpacity
            style={[styles.minusButtonContainer, { marginLeft: props.isRTL ? -5 : 10, marginRight: props.isRTL ? 10 : -5,***REMOVED***]***REMOVED***
            onPress={() => props.deleteGroup(props.groupName)***REMOVED***
         >
            <Icon name='minus-filled' size={24 * scaleMultiplier***REMOVED*** color="#FF0800" />
         </TouchableOpacity>
   ***REMOVED*** else if (props.isEditing && props.activeGroup === props.groupName) {
      deleteButton =
         <View style={[styles.minusButtonContainer, { marginLeft: props.isRTL ? -5 : 10, marginRight: props.isRTL ? 10 : -5,***REMOVED***]***REMOVED***>
            <Icon
               name="check"
               size={24 * scaleMultiplier***REMOVED***
               color="#2D9CDB"
            />
         </View>
   ***REMOVED***

   // render right button conditionally; can be either right arrow when in edit mode, 
   // checkmark if in edit mode and this group is active, or nothing
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
   ***REMOVED*** else if (props.activeGroup === props.groupName) {
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
         onPress={props.isEditing ? () => props.goToEditGroupScreen(props.groupName) : () => { props.changeActiveGroup(props.groupName) ***REMOVED******REMOVED***
      >
         <AvatarImage size={50 * scaleMultiplier***REMOVED*** onPress={() => {***REMOVED******REMOVED*** source={props.avatarSource***REMOVED*** isActive={props.activeGroup === props.groupName***REMOVED***/>
         <View style={styles.groupNameContainer***REMOVED***>
            <Text style={[styles.groupNameText, {textAlign: props.isRTL ? 'right' :'left'***REMOVED***]***REMOVED***>{props.groupName***REMOVED***</Text>
            <Text style={[styles.checkpointText, {textAlign: props.isRTL ? 'right' :'left'***REMOVED***]***REMOVED***>{getBookmarkText()***REMOVED***</Text>
         </View>
         {rightButton***REMOVED***
      </TouchableOpacity>
      </View>
   )
***REMOVED***

//// STYLES

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
      fontFamily: 'black',
      textAlign: "left"
   ***REMOVED***,
   checkpointText: {
      fontFamily: 'regular',
      fontSize: 12 * scaleMultiplier,
      color: '#9FA5AD',
      textAlign: "left"
   ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      database: state.database,
      isRTL: state.database[activeGroup.language].isRTL,
      groups: state.groups,
      activeGroup: state.activeGroup,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      changeActiveGroup: name => { dispatch(changeActiveGroup(name)) ***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupListItem);