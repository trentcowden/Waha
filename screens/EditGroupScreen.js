//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { editGroup, deleteGroup, resetProgress ***REMOVED*** from '../redux/actions/groupsActions'

function EditGroupScreen(props) {


   //////////////////////////////////////////
   ////STATE, CONSTRUCTOR, AND NAVIGATION////
   //////////////////////////////////////////

   const [groupName, setGroupName] = useState(props.route.params.groupName)

   const [isActive, setIsActive] = useState(props.activeGroupName === props.route.params.groupName)

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

   function editGroup() {
      props.editGroup(props.route.params.groupName, groupName)
      props.navigation.goBack()
   ***REMOVED***

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   var deleteButton = isActive ? <Text style={styles.cantDeleteText***REMOVED***>Can't delete currently selected group</Text> :
   <TouchableOpacity style={styles.deleteGroupButtonContainer***REMOVED*** onPress={() => {props.deleteGroup(props.route.params.groupName); props.navigation.goBack();***REMOVED******REMOVED***>
      <Text style={styles.deleteGroupButtonText***REMOVED***>Delete Group</Text>
   </TouchableOpacity> 

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
                  placeholderTextColor='#9FA5AD'
                  maxLength={50***REMOVED***
                  returnKeyType='done'
               />
               <TouchableOpacity 
                  style={styles.resetProgressButtonContainer***REMOVED*** 
                  onPress={
                     () => Alert.alert(
                        'Warning',
                        "Are you sure you'd like to reset your progress for this group?",
                        [{
                           text: 'Cancel',
                           onPress: () => { ***REMOVED***
                        ***REMOVED***,
                        {
                           text: 'OK',
                           onPress: () => {props.resetProgress(props.route.params.groupName); props.navigation.goBack()***REMOVED***
                        ***REMOVED***]
                     )
                  ***REMOVED***
               >
                  <Text style={styles.resetProgressButtonText***REMOVED***>Reset Progress</Text>
               </TouchableOpacity>
               {deleteButton***REMOVED***
            </View>
            <TouchableOpacity style={styles.saveButtonContainer***REMOVED*** onPress={editGroup***REMOVED***>
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
   resetProgressButtonContainer: {
      width: "100%",
      borderColor: '#FF0800',
      borderWidth: 1,
      borderRadius: 5,
      height: 55,
      marginVertical: 20,
      justifyContent: "center",
      paddingLeft: 15
   ***REMOVED***,
   resetProgressButtonText: {
      color: '#FF0800',
      fontFamily: 'regular',
      fontSize: 18
   ***REMOVED***,
   deleteGroupButtonContainer: {
      width: "100%",
      borderRadius: 5,
      height: 55,
      justifyContent: "center",
      paddingLeft: 15,
      backgroundColor: '#FF0800'
   ***REMOVED***,
   deleteGroupButtonText: {
      color: '#FFFFFF',
      fontFamily: 'regular',
      fontSize: 18
   ***REMOVED***,
   cantDeleteText: {
      fontFamily: 'regular',
      fontSize: 14,
      color: '#9FA5AD'
   ***REMOVED***,
   saveButtonContainer: {
      width: 127,
      height: 52,
      borderRadius: 5,
      backgroundColor: "#60C239",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-end",
      margin: 30,
   ***REMOVED***,
   saveButtonText: {
      fontSize: 18,
      fontFamily: 'bold',
      color: "#FFFFFF",
   ***REMOVED***,
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroupName: activeGroup.name
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      editGroup: (oldGroupName, newGroupName) => dispatch(editGroup(oldGroupName, newGroupName)),
      deleteGroup: name => { dispatch(deleteGroup(name)) ***REMOVED***,
      resetProgress: name => { dispatch(resetProgress(name)) ***REMOVED***,
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupScreen);