import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  Dimensions
***REMOVED*** from 'react-native'
import BackButton from '../components/BackButton'
import { scaleMultiplier, groupIcons, groupIconSources ***REMOVED*** from '../constants'
import * as ImagePicker from 'expo-image-picker'
import { connect ***REMOVED*** from 'react-redux'
import {
  createGroup,
  changeActiveGroup,
  editGroup,
  deleteGroup,
  resetProgress
***REMOVED*** from '../redux/actions/groupsActions'
import OptionsModal from '../components/OptionsModal'
import ModalButton from '../components/ModalButton'
import AvatarImage from '../components/AvatarImage'
import EmojiSelector from 'react-native-emoji-selector'
import Modal from 'react-native-modal'

function AddEditGroupScreen (props) {
  //// STATE

  // keeps track of the group name text input value
  const [groupName, setGroupName] =
    props.route.name === 'AddGroup'
      ? useState('')
      : useState(props.route.params.groupName)

  // the group that is being edited
  const [editingGroup, setEditingGroup] = useState(
    props.groups.filter(item => item.name === props.route.params.groupName)[0]
  )

  // keeps track of the source for the avatar image
  const [emoji, setEmoji] =
    props.route.name === 'AddGroup'
      ? useState('default')
      : useState(editingGroup.emoji)

  // keeps track of whether the group being editted is currently the active group
  const [isActive, setIsActive] = useState(
    props.activeGroup.name === props.route.params.groupName
  )

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
        props.translations.alerts.sameGroupName.text,
        [{ text: props.translations.alerts.options.ok, onPress: () => {***REMOVED*** ***REMOVED***]
      )
      return
    ***REMOVED***

    if (groupName === '') {
      Alert.alert(
        props.translations.alerts.blankGroupName.header,
        props.translations.alerts.blankGroupName.text,
        [{ text: props.translations.alerts.options.ok, onPress: () => {***REMOVED*** ***REMOVED***]
      )
      return
    ***REMOVED***

    props.createGroup(groupName, props.route.params.languageID, emoji)
    props.changeActiveGroup(groupName)
    props.navigation.goBack()
  ***REMOVED***

  // edits a group and sets it as active
  function editGroup () {
    if (props.route.params.groupName === props.activeGroup.name)
      props.changeActiveGroup(groupName)
    props.editGroup(props.route.params.groupName, groupName, emoji)
    props.navigation.goBack()
  ***REMOVED***

  //// RENDER

  // renders the delete group button conditionally because the currently active group can't be deleted
  var deleteButton = isActive ? (
    <Text
      style={[
        styles.cantDeleteText,
        {
          textAlign: props.isRTL ? 'right' : 'left',
          fontFamily: props.font + '-regular'
        ***REMOVED***
      ]***REMOVED***
    >
      {props.translations.labels.cantDeleteGroup***REMOVED***
    </Text>
  ) : (
    <TouchableOpacity
      style={styles.deleteGroupButtonContainer***REMOVED***
      onPress={() => {
        props.deleteGroup(props.route.params.groupName)
        props.navigation.goBack()
      ***REMOVED******REMOVED***
    >
      <Text
        style={[
          styles.deleteGroupButtonText,
          {
            textAlign: props.isRTL ? 'right' : 'left',
            fontFamily: props.font + '-regular'
          ***REMOVED***
        ]***REMOVED***
      >
        {props.translations.labels.deleteGroup***REMOVED***
      </Text>
    </TouchableOpacity>
  )

  var editControls =
    props.route.name === 'EditGroup' ? (
      <View style={{ paddingHorizontal: 20 ***REMOVED******REMOVED***>
        <TouchableOpacity
          style={styles.resetProgressButtonContainer***REMOVED***
          onPress={() =>
            Alert.alert(
              props.translations.alerts.resetProgress.header,
              props.translations.alerts.resetProgress.text,
              [
                {
                  text: props.translations.alerts.options.cancel,
                  onPress: () => {***REMOVED***
                ***REMOVED***,
                {
                  text: props.translations.alerts.options.ok,
                  onPress: () => {
                    props.resetProgress(props.route.params.groupName)
                    props.navigation.goBack()
                  ***REMOVED***
                ***REMOVED***
              ]
            )
          ***REMOVED***
        >
          <Text
            style={[
              styles.resetProgressButtonText,
              {
                textAlign: props.isRTL ? 'right' : 'left',
                fontFamily: props.font + '-regular'
              ***REMOVED***
            ]***REMOVED***
          >
            {props.translations.labels.resetProgress***REMOVED***
          </Text>
        </TouchableOpacity>
        {deleteButton***REMOVED***
      </View>
    ) : null

  return (
    <View style={styles.screen***REMOVED***>
      <View>
        <View style={styles.photoContainer***REMOVED***>
          <AvatarImage emoji={emoji***REMOVED*** size={120***REMOVED*** isChangeable={true***REMOVED*** />
        </View>
        <View
          style={{
            marginHorizontal: 20
          ***REMOVED******REMOVED***
        >
          <Text
            style={{
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-regular',
              fontSize: 14 * scaleMultiplier,
              color: '#9FA5AD'
            ***REMOVED******REMOVED***
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
        <Text
          style={{
            fontSize: 14 * scaleMultiplier,
            color: '#9FA5AD',
            textAlign: props.isRTL ? 'right' : 'left',
            fontFamily: props.font + '-regular',
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 5
          ***REMOVED******REMOVED***
        >
          {props.translations.labels.icon***REMOVED***
        </Text>
        <View
          style={{
            alignItems: 'center',
            height: 150 * scaleMultiplier,
            padding: 5,
            borderWidth: 2,
            borderRadius: 10,
            marginHorizontal: 20,
            borderColor: '#EFF2F4'
          ***REMOVED******REMOVED***
        >
          <FlatList
            data={groupIcons***REMOVED***
            renderItem={({ item ***REMOVED***) => (
              <TouchableOpacity
                style={{
                  width: 50 * scaleMultiplier,
                  height: 50 * scaleMultiplier,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  borderWidth: item === emoji ? 2 : 0,
                  borderColor: item === emoji ? '#2D9CDB' : null,
                  borderRadius: 10,
                  backgroundColor: item === emoji ? '#2D9CDB38' : null
                ***REMOVED******REMOVED***
                onPress={() => setEmoji(item)***REMOVED***
              >
                <Image
                  style={{
                    width: 40 * scaleMultiplier,
                    height: 40 * scaleMultiplier
                  ***REMOVED******REMOVED***
                  source={groupIconSources[item]***REMOVED***
                />
              </TouchableOpacity>
            )***REMOVED***
            keyExtractor={item => item***REMOVED***
            numColumns={Math.floor(
              (Dimensions.get('window').width - 40) / (50 * scaleMultiplier)
            )***REMOVED***
          />
        </View>
        {editControls***REMOVED***
      </View>
      <TouchableOpacity
        style={[
          styles.saveButtonContainer,
          { alignSelf: props.isRTL ? 'flex-start' : 'flex-end' ***REMOVED***
        ]***REMOVED***
        onPress={props.route.name === 'AddGroup' ? addNewGroup : editGroup***REMOVED***
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
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between'
  ***REMOVED***,
  photoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20 * scaleMultiplier
  ***REMOVED***,
  addNewGroupContainer: {
    borderBottomColor: '#EFF2F4',
    borderBottomWidth: 2,
    height: 40 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  resetProgressButtonContainer: {
    width: '100%',
    borderColor: '#FF0800',
    borderWidth: 1,
    borderRadius: 10,
    height: 55 * scaleMultiplier,
    marginVertical: 20,
    justifyContent: 'center',
    paddingHorizontal: 15
  ***REMOVED***,
  resetProgressButtonText: {
    color: '#FF0800',
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  deleteGroupButtonContainer: {
    width: '100%',
    borderRadius: 10,
    height: 55 * scaleMultiplier,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FF0800'
  ***REMOVED***,
  deleteGroupButtonText: {
    color: '#FFFFFF',
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  cantDeleteText: {
    fontSize: 14 * scaleMultiplier,
    color: '#9FA5AD'
  ***REMOVED***,
  saveButtonContainer: {
    width: 127 * scaleMultiplier,
    height: 52 * scaleMultiplier,
    borderRadius: 10,
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
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    editGroup: (oldGroupName, newGroupName, emoji) =>
      dispatch(editGroup(oldGroupName, newGroupName, emoji)),
    createGroup: (groupName, language, emoji) =>
      dispatch(createGroup(groupName, language, emoji)),
    changeActiveGroup: groupName => dispatch(changeActiveGroup(groupName)),
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***,
    resetProgress: name => {
      dispatch(resetProgress(name))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddEditGroupScreen)

// opens image library after checking for permission, then set the avatarSource state
// to the uri of the image the user selected
// async function openImageLibraryHandler () {
//   var permissionGranted = false
//   await ImagePicker.getCameraRollPermissionsAsync().then(
//     permissionResponse => {
//       if (permissionResponse.status !== 'granted') {
//         ImagePicker.requestCameraRollPermissionsAsync().then(
//           permissionResponse => {
//             if (permissionResponse.status === 'granted') {
//               openImageLibraryHandler()
//             ***REMOVED***
//           ***REMOVED***
//         )
//       ***REMOVED*** else {
//         permissionGranted = true
//       ***REMOVED***
//     ***REMOVED***
//   )
//   if (permissionGranted) {
//     ImagePicker.launchImageLibraryAsync({***REMOVED***).then(returnObject => {
//       if (returnObject.cancelled !== true) {
//         setAvatarSource(returnObject.uri)
//       ***REMOVED***
//       setShowImagePickerModal(false)
//     ***REMOVED***)
//   ***REMOVED***
// ***REMOVED***

// opens camera  after checking for permission, then set the avatarSource state
// to the uri of the picture the user takes
// async function openCameraHandler () {
//   var permissionGranted = false
//   await ImagePicker.getCameraPermissionsAsync().then(permissionResponse => {
//     if (permissionResponse.status !== 'granted') {
//       ImagePicker.requestCameraPermissionsAsync().then(permissionResponse => {
//         if (permissionResponse.status === 'granted') {
//           openCameraHandler()
//         ***REMOVED***
//       ***REMOVED***)
//     ***REMOVED*** else {
//       permissionGranted = true
//     ***REMOVED***
//   ***REMOVED***)
//   if (permissionGranted) {
//     ImagePicker.launchCameraAsync({***REMOVED***).then(returnObject => {
//       if (returnObject.cancelled !== true) {
//         setAvatarSource(returnObject.uri)
//       ***REMOVED***
//       setShowImagePickerModal(false)
//     ***REMOVED***)
//   ***REMOVED***
// ***REMOVED***
