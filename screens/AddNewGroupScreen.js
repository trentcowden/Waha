//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert ***REMOVED*** from 'react-native';

import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as ImagePicker from 'expo-image-picker';

//redux imports
import { connect ***REMOVED*** from 'react-redux'
import { createGroup ***REMOVED*** from '../redux/actions/groupsActions'
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'
import AvatarImage from '../components/AvatarImage'

function AddNewGroupScreen(props) {


   //////////////////////////////////////////
   ////STATE, CONSTRUCTOR, AND NAVIGATION////
   //////////////////////////////////////////

   const [groupName, setGroupName] = useState('')

   const [avatarSource, setAvatarSource] = useState('')
   const [showImagePickerModal, setShowImagePickerModal] = useState(false)

   //set language based on user's language vs user's location?
   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [props.isRTL])

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
      var isDuplicate = false
      props.groups.map(group => {
         if (group.name === groupName) {
            isDuplicate = true
            return
         ***REMOVED***
         return
      ***REMOVED***)
      if (isDuplicate) {
         Alert.alert(
            'Error',
            "Group name cannot be the same as another group's",
            [{
               text: 'OK',
               onPress: () => { ***REMOVED***
            ***REMOVED***]
         )
         return
      ***REMOVED***
      if (groupName === '') {
         Alert.alert(
            'Error',
            "Group name cannot be blank",
            [{
               text: 'OK',
               onPress: () => { ***REMOVED***
            ***REMOVED***]
         )
         return
      ***REMOVED***
      props.createGroup(groupName, props.route.params.languageID, avatarSource)
      props.navigation.goBack()
   ***REMOVED***

   async function openImageLibraryHandler() {
      var permissionGranted = false
      await ImagePicker.getCameraRollPermissionsAsync()
         .then((permissionResponse) => {
            //console.log(permissionResponse)
            if (permissionResponse.status !== 'granted') {
               console.log('not granted')
               // console.log('not granted')
               ImagePicker.requestCameraRollPermissionsAsync()
                  .then(permissionResponse => {
                     if (permissionResponse.status === 'granted') {
                        openImageLibraryHandler()
                     ***REMOVED***
                  ***REMOVED***)
            ***REMOVED***
            else {
               permissionGranted = true
            ***REMOVED***
         ***REMOVED***)
      if (permissionGranted) {
         ImagePicker.launchImageLibraryAsync({***REMOVED***)
            .then(returnObject => {
               if (returnObject.cancelled !== true) {
                  setAvatarSource(returnObject.uri)
               ***REMOVED***
               setShowImagePickerModal(false)
            ***REMOVED***)
      ***REMOVED***
   ***REMOVED***

   async function openCameraHandler() {
      var permissionGranted = false
      await ImagePicker.getCameraPermissionsAsync()
         .then((permissionResponse) => {
            //console.log(permissionResponse)
            if (permissionResponse.status !== 'granted') {
               console.log('not granted')
               // console.log('not granted')
               ImagePicker.requestCameraPermissionsAsync()
                  .then(permissionResponse => {
                     if (permissionResponse.status === 'granted') {
                        openCameraHandler()
                     ***REMOVED***
                  ***REMOVED***)
            ***REMOVED***
            else {
               permissionGranted = true
            ***REMOVED***
         ***REMOVED***)
      if (permissionGranted) {
         ImagePicker.launchCameraAsync({***REMOVED***)
            .then(returnObject => {
               if (returnObject.cancelled !== true) {
                  setAvatarSource(returnObject.uri)
               ***REMOVED***
               setShowImagePickerModal(false)
            ***REMOVED***)
      ***REMOVED***
   ***REMOVED***
   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////




   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.photoContainer***REMOVED***>
            <AvatarImage source={avatarSource***REMOVED*** onPress={() => setShowImagePickerModal(true)***REMOVED*** size={120***REMOVED*** isChangeable={true***REMOVED***/>
         </View>
         <View style={styles.bottomHalfContainer***REMOVED***>
            <View style={styles.inputContainer***REMOVED***>
               <Text style={[styles.groupNameLabel, {textAlign: props.isRTL ? 'right' : 'left'***REMOVED***]***REMOVED***>Group Name</Text>
               <TextInput
                  style={[styles.addNewGroupContainer, {textAlign: props.isRTL ? 'right' : 'left'***REMOVED***]***REMOVED***
                  onChangeText={text => setGroupName(text)***REMOVED*** value={groupName***REMOVED***
                  autoCapitalize='words'
                  autoCorrect={false***REMOVED***
                  placeholder='Group name here'
                  placeholderTextColor='#9FA5AD'
                  maxLength={50***REMOVED***
                  returnKeyType='done'
               />
            </View>
            <TouchableOpacity style={[styles.saveButtonContainer, {alignSelf: props.isRTL ? 'flex-start' : "flex-end",***REMOVED***]***REMOVED*** onPress={addNewGroup***REMOVED***>
               <Text style={styles.saveButtonText***REMOVED***>Save</Text>
            </TouchableOpacity>
         </View>
         <WahaModal isVisible={showImagePickerModal***REMOVED***>
            <ModalButton title='Take Photo' onPress={openCameraHandler***REMOVED*** />
            <ModalButton title='Choose from Library...' onPress={openImageLibraryHandler***REMOVED*** />
            <ModalButton title='Cancel' onPress={() => setShowImagePickerModal(false)***REMOVED*** />
         </WahaModal>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#FFFFFF"
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
      fontSize: 14 * scaleMultiplier,
      color: '#9FA5AD'
   ***REMOVED***,
   addNewGroupContainer: {
      borderBottomColor: '#EFF2F4',
      borderBottomWidth: 2,
      height: 40 * scaleMultiplier,
      fontSize: 18 * scaleMultiplier,
      fontFamily: 'regular'
   ***REMOVED***,
   saveButtonContainer: {
      width: 127 * scaleMultiplier,
      height: 52 * scaleMultiplier,
      borderRadius: 5,
      backgroundColor: "#60C239",
      justifyContent: "center",
      alignItems: "center",
      margin: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 ***REMOVED***,
      shadowOpacity: 0.8,
      shadowRadius: 2,
   ***REMOVED***,
   saveButtonText: {
      fontSize: 18 * scaleMultiplier,
      fontFamily: 'bold',
      color: "#FFFFFF"
   ***REMOVED***,
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      groups: state.groups,
      colors: state.database[activeGroup.language].colors,
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroupName: activeGroup.name,
      activeGroupImageSource: activeGroup.imageSource
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      createGroup: (groupName, language, imageSource) => dispatch(createGroup(groupName, language, imageSource)),
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddNewGroupScreen);