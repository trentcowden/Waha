import React, { useState ***REMOVED*** from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { groupIcons, groupIconSources ***REMOVED*** from '../assets/groupIcons/_groupIcons'
import GroupAvatar from '../components/GroupAvatar'
import { scaleMultiplier ***REMOVED*** from '../constants'
import ModalScreen from '../modals/ModalScreen'
import { changeActiveGroup ***REMOVED*** from '../redux/actions/activeGroupActions'
import { incrementGlobalGroupCounter ***REMOVED*** from '../redux/actions/databaseActions'
import {
  createGroup,
  editGroup,
  resetProgress
***REMOVED*** from '../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    groups: state.groups,
    isRTL: activeDatabaseSelector(state).isRTL,
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state),
    globalGroupCounter: state.database.globalGroupCounter,
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    editGroup: (oldGroupName, newGroupName, emoji) =>
      dispatch(editGroup(oldGroupName, newGroupName, emoji)),
    createGroup: (groupName, language, emoji, groupID, groupNumber) =>
      dispatch(createGroup(groupName, language, emoji, groupID, groupNumber)),
    changeActiveGroup: groupName => dispatch(changeActiveGroup(groupName)),
    resetProgress: name => {
      dispatch(resetProgress(name))
    ***REMOVED***,
    incrementGlobalGroupCounter: () => dispatch(incrementGlobalGroupCounter())
  ***REMOVED***
***REMOVED***

/**
 * Modal that allows the user to add or edit a group. Uses the <ModalScreen /> component under the hood.
 * @param {boolean***REMOVED*** isVisible - Whether the modal is visible or not.
 * @param {Function***REMOVED*** hideModal - Function to hide the modal.
 * @param {string***REMOVED*** type - Whether the user is editing an existing group or adding a new group. Possible options are 'EditGroup' or 'AddGroup'.
 * @param {Object***REMOVED*** thisGroup - If editing a group, this is the object for that group. Otherwise, it defaults to null.
 * @param {string***REMOVED*** languageID - If creating a new group, we need the langaugeID for when we call the CreateGroup() redux function. Otherwise, langaugeID is null.
 */
const AddEditGroupModal = ({
  // Props passed from a parent component.
  isVisible,
  hideModal,
  type,
  thisGroup = null,
  languageID = null,
  // Props passed from redux.
  groups,
  isRTL,
  translations,
  font,
  activeGroup,
  globalGroupCounter,
  areMobilizationToolsUnlocked,
  editGroup,
  createGroup,
  changeActiveGroup,
  deleteGroup,
  resetProgress,
  incrementGlobalGroupCounter
***REMOVED***) => {
  /** Keeps track of the user input for the group name <TextInput />. */
  const [groupNameInput, setGroupNameInput] = useState('')

  /** Keeps track of the user selection for the group emoji. */
  const [emojiInput, setEmojiInput] = useState('default')

  /** If editing a group, keeps track of whether that group is the active group or not. */
  const [isActive, setIsActive] = useState(
    type === 'EditGroup' ? activeGroup.name === thisGroup.name : false
  )

  /**
   * Checks if a user-inputted group name is a duplicate of another group. The process for checking is different if we're editing vs. adding a group.
   * @return {boolean***REMOVED*** - Whether the group name is a duplicate or not.
   */
  function checkForDuplicate () {
    var isDuplicate = false

    // If we're adding a new group, simply check if the group name already exists in another group.
    if (type === 'AddGroup') {
      groups.forEach(group => {
        if (group.name === groupNameInput) {
          Alert.alert(
            translations.add_edit_group.popups.duplicate_group_name_title,
            translations.add_edit_group.popups.duplicate_group_name_message,
            [{ text: translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
          )
          isDuplicate = true
        ***REMOVED***
      ***REMOVED***)
      // If we're editing a group, check if any group has the same name but obvously don't count it as a duplicate for itself.
    ***REMOVED*** else {
      groups.forEach(group => {
        if (
          group.name === groupNameInput &&
          thisGroup.name !== groupNameInput
        ) {
          Alert.alert(
            translations.add_edit_group.popups.duplicate_group_name_title,
            translations.add_edit_group.popups.duplicate_group_name_message,
            [{ text: translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
          )
          isDuplicate = true
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED***
    return isDuplicate
  ***REMOVED***

  /**
   * Checks if a user-inputted group name is blank.
   * @return {boolean***REMOVED*** - Whether the group name is blank or not.
   */
  function checkForBlank () {
    if (groupNameInput === '') {
      Alert.alert(
        translations.add_edit_group.popups.blank_group_name_title,
        translations.add_edit_group.popups.blank_group_name_message,
        [{ text: translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
      )
      return true
    ***REMOVED***
    return false
  ***REMOVED***

  /** Creates a new group and sets it as the active group. */
  function createGroupHandler () {
    // If the name of the new group is a duplicate or blank, don't continue.
    if (checkForDuplicate() || checkForBlank()) return

    // Call createGroup() redux function.
    createGroup(
      groupNameInput,
      languageID,
      emojiInput,
      globalGroupCounter + 1,
      groups.length + 1
    )

    // Change the active group to the newly created group.
    changeActiveGroup(groupNameInput)

    // Increment the global group counter redux variable.
    incrementGlobalGroupCounter()

    // Hide this modal.
    hideModal()
  ***REMOVED***

  /** Edits a group and sets it as the active group. */
  function editGroupHandler () {
    // If the name of the new group is a duplicate or blank, don't continue.
    if (checkForDuplicate() || checkForBlank()) return

    // Change the active group to the newly edited group.
    if (thisGroup.name === activeGroup.name) changeActiveGroup(groupNameInput)

    // Call editGroup() redux function.
    editGroup(thisGroup.name, groupNameInput, emojiInput)

    // Hide this modal.
    hideModal()
  ***REMOVED***

  /** Renders an emoji for the emoji select <FlatList />. */
  const renderEmoji = ({ item ***REMOVED***) => (
    <TouchableOpacity
      style={{
        width: 50 * scaleMultiplier,
        height: 50 * scaleMultiplier,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderWidth: item === emojiInput ? 2 : 0,
        borderColor: item === emojiInput ? colors.blue : null,
        borderRadius: 10,
        backgroundColor: item === emojiInput ? colors.blue + '38' : null
      ***REMOVED******REMOVED***
      onPress={() => setEmojiInput(item)***REMOVED***
    >
      <Image
        style={{
          width: 40 * scaleMultiplier,
          height: 40 * scaleMultiplier
        ***REMOVED******REMOVED***
        source={groupIconSources[item]***REMOVED***
      />
    </TouchableOpacity>
  )

  return (
    <ModalScreen
      isVisible={isVisible***REMOVED***
      hideModal={hideModal***REMOVED***
      topRightComponent={
        <TouchableOpacity
          onPress={type === 'AddGroup' ? createGroupHandler : editGroupHandler***REMOVED***
          style={{
            width: 45 * scaleMultiplier,
            height: 45 * scaleMultiplier
          ***REMOVED******REMOVED***
        >
          <Icon name='check' size={40 * scaleMultiplier***REMOVED*** color={colors.oslo***REMOVED*** />
        </TouchableOpacity>
      ***REMOVED***
      onCancelPress={() => {
        // Clear out the inputs when we close the modal.
        setGroupNameInput('')
        setEmojiInput('default')
      ***REMOVED******REMOVED***
      onModalWillShow={
        type === 'AddGroup'
          ? () => {
              setGroupNameInput('')
              setEmojiInput('default')
            ***REMOVED***
          : () => {
              // If we're editing a group, populate our state with the name and emoji of that group.
              setGroupNameInput(thisGroup.name)
              setEmojiInput(thisGroup.emoji)
            ***REMOVED***
      ***REMOVED***
      title={
        type === 'AddGroup'
          ? translations.add_edit_group.header_add
          : translations.add_edit_group.header_edit
      ***REMOVED***
    >
      <View style={styles.groupAvatarContainer***REMOVED***>
        <GroupAvatar
          style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
          emoji={emojiInput***REMOVED***
          size={120***REMOVED***
        />
      </View>
      <View style={styles.groupNameAreaContainer***REMOVED***>
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'p',
            'Regular',
            'left',
            colors.chateau
          )***REMOVED***
        >
          {translations.add_edit_group.group_name_form_label***REMOVED***
        </Text>
        <TextInput
          style={[
            styles.groupNameTextInputContainer,
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'h3',
              'Regular',
              'left',
              colors.shark
            )
          ]***REMOVED***
          onChangeText={text => setGroupNameInput(text)***REMOVED***
          value={groupNameInput***REMOVED***
          autoCapitalize='words'
          autoCorrect={false***REMOVED***
          placeholder={translations.add_edit_group.group_name_form_placeholder***REMOVED***
          placeholderTextColor={colors.chateau***REMOVED***
          maxLength={50***REMOVED***
          returnKeyType='done'
        />
      </View>
      <Text
        style={[
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'p',
            'Regular',
            'left',
            colors.chateau
          ),
          {
            marginHorizontal: 20,
            marginTop: 20 * scaleMultiplier,
            marginBottom: 5
          ***REMOVED***
        ]***REMOVED***
      >
        {translations.add_edit_group.icon_form_label***REMOVED***
      </Text>
      <View
        style={{
          alignItems: 'center',
          // If phone screen is large, don't make the emoji select take up the whole rest of the screen.
          height:
            Dimensions.get('window').height > 700
              ? 250 * scaleMultiplier
              : null,
          flex: Dimensions.get('window').height > 700 ? null : 1,
          paddingHorizontal: 5,
          borderWidth: 2,
          borderRadius: 10,
          marginHorizontal: 20,
          borderColor: colors.athens,
          marginBottom: 20
        ***REMOVED******REMOVED***
      >
        <FlatList
          data={groupIcons***REMOVED***
          nestedScrollEnabled
          renderItem={renderEmoji***REMOVED***
          keyExtractor={item => item***REMOVED***
          numColumns={Math.floor(
            (Dimensions.get('window').width - 50) / (50 * scaleMultiplier)
          )***REMOVED***
        />
      </View>
    </ModalScreen>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  ***REMOVED***,
  groupAvatarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20 * scaleMultiplier
  ***REMOVED***,
  groupNameAreaContainer: { marginHorizontal: 20 ***REMOVED***,
  groupNameTextInputContainer: {
    borderBottomColor: colors.athens,
    borderBottomWidth: 2,
    height: 50 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(AddEditGroupModal)

// Someday we'll let the user set a custom photo as their group avatar...until then this code will remain sad and neglected.

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
