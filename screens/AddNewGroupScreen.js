import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
***REMOVED*** from 'react-native'
import BackButton from '../components/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as ImagePicker from 'expo-image-picker'
import { connect ***REMOVED*** from 'react-redux'
import { createGroup ***REMOVED*** from '../redux/actions/groupsActions'
import OptionsModal from '../components/OptionsModal'
import ModalButton from '../components/ModalButton'
import AvatarImage from '../components/AvatarImage'

function AddNewGroupScreen (props) {
  //// STATE

  // keeps track of the group name text input value
  const [groupName, setGroupName] = useState('')

  // keeps track of the source for the avatar image
  const [avatarSource, setAvatarSource] = useState('')

  // shows the image picker modal
  const [showImagePickerModal, setShowImagePickerModal] = useState(false)

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [props.isRTL])

  //// NAV OPTIONS

  function getNavOptions () {
    return {
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //// FUNCTIONS

  // adds a group to redux if it passes all error checking
  function addNewGroup () {
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
        props.translations.alerts.sameGroupName.header,
        props.translations.alerts.sameGroupName.body,
        [{ text: props.translations.alerts.options.ok, onPress: () => {***REMOVED*** ***REMOVED***]
      )
      return
    ***REMOVED***

    if (groupName === '') {
      Alert.alert(
        props.translations.alerts.blankGroupName.header,
        props.translations.alerts.blankGroupName.body,
        [{ text: props.translations.alerts.options.ok, onPress: () => {***REMOVED*** ***REMOVED***]
      )
      return
    ***REMOVED***

    props.createGroup(groupName, props.route.params.languageID, avatarSource)
    props.navigation.goBack()
  ***REMOVED***

  // opens image library after checking for permission, then set the avatarSource state
  // to the uri of the image the user selected
  async function openImageLibraryHandler () {
    var permissionGranted = false
    await ImagePicker.getCameraRollPermissionsAsync().then(
      permissionResponse => {
        if (permissionResponse.status !== 'granted') {
          ImagePicker.requestCameraRollPermissionsAsync().then(
            permissionResponse => {
              if (permissionResponse.status === 'granted') {
                openImageLibraryHandler()
              ***REMOVED***
            ***REMOVED***
          )
        ***REMOVED*** else {
          permissionGranted = true
        ***REMOVED***
      ***REMOVED***
    )
    if (permissionGranted) {
      ImagePicker.launchImageLibraryAsync({***REMOVED***).then(returnObject => {
        if (returnObject.cancelled !== true) {
          setAvatarSource(returnObject.uri)
        ***REMOVED***
        setShowImagePickerModal(false)
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***

  // opens camera  after checking for permission, then set the avatarSource state
  // to the uri of the picture the user takes
  async function openCameraHandler () {
    var permissionGranted = false
    await ImagePicker.getCameraPermissionsAsync().then(permissionResponse => {
      if (permissionResponse.status !== 'granted') {
        ImagePicker.requestCameraPermissionsAsync().then(permissionResponse => {
          if (permissionResponse.status === 'granted') {
            openCameraHandler()
          ***REMOVED***
        ***REMOVED***)
      ***REMOVED*** else {
        permissionGranted = true
      ***REMOVED***
    ***REMOVED***)
    if (permissionGranted) {
      ImagePicker.launchCameraAsync({***REMOVED***).then(returnObject => {
        if (returnObject.cancelled !== true) {
          setAvatarSource(returnObject.uri)
        ***REMOVED***
        setShowImagePickerModal(false)
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***

  //// RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.photoContainer***REMOVED***>
        <AvatarImage
          source={avatarSource***REMOVED***
          onPress={() => setShowImagePickerModal(true)***REMOVED***
          size={120***REMOVED***
          isChangeable={true***REMOVED***
        />
      </View>
      <View style={styles.bottomHalfContainer***REMOVED***>
        <View style={styles.inputContainer***REMOVED***>
          <Text
            style={[
              styles.groupNameLabel,
              {
                textAlign: props.isRTL ? 'right' : 'left',
                fontFamily: props.font + '-regular'
              ***REMOVED***
            ]***REMOVED***
          >
            {props.translations.labels.groupName***REMOVED***
          </Text>
          <TextInput
            style={[
              styles.addNewGroupContainer,
              {
                textAlign: props.isRTL ? 'right' : 'left',
                fontFamily: props.font + '-regular'
              ***REMOVED***
            ]***REMOVED***
            onChangeText={text => setGroupName(text)***REMOVED***
            value={groupName***REMOVED***
            autoCapitalize='words'
            autoCorrect={false***REMOVED***
            placeholder={props.translations.labels.groupNamePlaceholder***REMOVED***
            placeholderTextColor='#9FA5AD'
            maxLength={50***REMOVED***
            returnKeyType='done'
          />
        </View>
        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            { alignSelf: props.isRTL ? 'flex-start' : 'flex-end' ***REMOVED***
          ]***REMOVED***
          onPress={addNewGroup***REMOVED***
        >
          <Text
            style={[
              styles.saveButtonText,
              { fontFamily: props.font + '-medium' ***REMOVED***
            ]***REMOVED***
          >
            {props.translations.labels.save***REMOVED***
          </Text>
        </TouchableOpacity>
      </View>
      <OptionsModal
        isVisible={showImagePickerModal***REMOVED***
        hideModal={() => setShowImagePickerModal(false)***REMOVED***
        closeText={props.translations.modals.cameraOptions.cancel***REMOVED***
      >
        <ModalButton
          title={props.translations.modals.cameraOptions.takePhoto***REMOVED***
          onPress={openCameraHandler***REMOVED***
        />
        <ModalButton
          isLast={true***REMOVED***
          title={props.translations.modals.cameraOptions.chooseFromLibrary***REMOVED***
          onPress={openImageLibraryHandler***REMOVED***
        />
      </OptionsModal>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  ***REMOVED***,
  photoContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  bottomHalfContainer: {
    flex: 1,
    justifyContent: 'space-between'
  ***REMOVED***,
  inputContainer: {
    marginHorizontal: 20,
    padding: 3
  ***REMOVED***,
  groupNameLabel: {
    fontSize: 14 * scaleMultiplier,
    color: '#9FA5AD'
  ***REMOVED***,
  addNewGroupContainer: {
    borderBottomColor: '#EFF2F4',
    borderBottomWidth: 2,
    height: 40 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  saveButtonContainer: {
    width: 127 * scaleMultiplier,
    height: 52 * scaleMultiplier,
    borderRadius: 5,
    backgroundColor: '#60C239',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 20
  ***REMOVED***,
  saveButtonText: {
    fontSize: 18 * scaleMultiplier,
    color: '#FFFFFF'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    groups: state.groups,
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    createGroup: (groupName, language, imageSource) =>
      dispatch(createGroup(groupName, language, imageSource))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddNewGroupScreen)
