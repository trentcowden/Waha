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
import {
  editGroup,
  deleteGroup,
  resetProgress,
  changeActiveGroup,
  setBookmark
***REMOVED*** from '../redux/actions/groupsActions'
import OptionsModal from '../components/OptionsModal'
import ModalButton from '../components/ModalButton'
import AvatarImage from '../components/AvatarImage'
import EmojiSelector from 'react-native-emoji-selector'
import Modal from 'react-native-modal'

function EditGroupScreen (props) {
  //// STATE

  // keeps track of the group name text input value (starts as the group being editted's name)
  const [groupName, setGroupName] = useState(props.route.params.groupName)

  // keeps track of whether the group being editted is currently the active group
  const [isActive, setIsActive] = useState(
    props.activeGroup.name === props.route.params.groupName
  )

  // the group that is being edited
  const [editingGroup, setEditingGroup] = useState(
    props.groups.filter(item => item.name === props.route.params.groupName)[0]
  )

  // keeps track of the source for the avatar image (starts as the group being editted's avatar)
  const [emoji, setEmoji] = useState(editingGroup.emoji)
  const [showEmojiPickerModal, setShowEmojiPickerModal] = useState(false)

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

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.photoContainer***REMOVED***>
        <AvatarImage
          emoji={emoji***REMOVED***
          onPress={() => setShowEmojiPickerModal(true)***REMOVED***
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
            placeholderTextColor='#9FA5AD'
            maxLength={50***REMOVED***
            returnKeyType='done'
          />
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
        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            { alignSelf: props.isRTL ? 'flex-start' : 'flex-end' ***REMOVED***
          ]***REMOVED***
          onPress={editGroup***REMOVED***
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
      <Modal
        isVisible={showEmojiPickerModal***REMOVED***
        hasBackdrop={true***REMOVED***
        onBackdropPress={() => setShowEmojiPickerModal(false)***REMOVED***
        backdropOpacity={0.3***REMOVED***
        style={{
          justifyContent: 'flex-end',
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          marginBottom: -20
        ***REMOVED******REMOVED***
      >
        <View>
          <TouchableOpacity onPress={() => setShowEmojiPickerModal(false)***REMOVED***>
            <Icon name='cancel' size={45 * scaleMultiplier***REMOVED*** color='#3A3C3F' />
          </TouchableOpacity>
        </View>
        <EmojiSelector
          onEmojiSelected={emoji => {
            setEmoji(emoji)
            setShowEmojiPickerModal(false)
          ***REMOVED******REMOVED***
        />
      </Modal>
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
  resetProgressButtonContainer: {
    width: '100%',
    borderColor: '#FF0800',
    borderWidth: 1,
    borderRadius: 5,
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
    borderRadius: 5,
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
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    editGroup: (oldGroupName, newGroupName, emoji) =>
      dispatch(editGroup(oldGroupName, newGroupName, emoji)),
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***,
    resetProgress: name => {
      dispatch(resetProgress(name))
    ***REMOVED***,
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***,
    setBookmark: groupName => {
      dispatch(setBookmark(groupName))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupScreen)
