import React, { useEffect, useState ***REMOVED*** from 'react'
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
import GroupAvatar from '../components/GroupAvatar'
import {
  colors,
  getLanguageFont,
  groupIcons,
  groupIconSources,
  scaleMultiplier
***REMOVED*** from '../constants'
import ModalScreen from '../modals/ModalScreen'
import {
  changeActiveGroup,
  createGroup,
  deleteGroup,
  editGroup,
  resetProgress
***REMOVED*** from '../redux/actions/groupsActions'
import { StandardTypography ***REMOVED*** from '../styles/typography'

function AddEditGroupModal (props) {
  //+ STATE

  // keeps track of the group name text input value
  const [groupName, setGroupName] = useState('')

  // the group that is being edited
  const [editingGroup, setEditingGroup] = useState({***REMOVED***)

  // keeps track of the source for the avatar image
  const [emoji, setEmoji] = useState('default')

  // keeps track of whether the group being editted is currently the active group
  const [isActive, setIsActive] = useState(
    props.activeGroup.name === props.groupName
  )

  //+ CONSTRUCTOR

  useEffect(() => {
    // props.navigation.setOptions(getNavOptions())
    setEditingGroup(
      props.groups.filter(item => item.name === props.groupName)[0]
    )
  ***REMOVED***, [props.activeGroup])

  //+ FUNCTIONS

  function checkForDuplicate () {
    var isDuplicate = false
    if (props.type === 'AddGroup') {
      props.groups.forEach(group => {
        if (group.name === groupName) {
          Alert.alert(
            props.translations.add_edit_group.popups.duplicate_group_name_title,
            props.translations.add_edit_group.popups
              .duplicate_group_name_message,
            [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
          )
          isDuplicate = true
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED*** else {
      props.groups.forEach(group => {
        if (group.name === groupName && props.groupName !== groupName) {
          Alert.alert(
            props.translations.add_edit_group.popups.duplicate_group_name_title,
            props.translations.add_edit_group.popups
              .duplicate_group_name_message,
            [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
          )
          isDuplicate = true
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED***
    return isDuplicate
  ***REMOVED***

  function checkForBlank () {
    if (groupName === '') {
      Alert.alert(
        props.translations.add_edit_group.popups.blank_group_name_title,
        props.translations.add_edit_group.popups.blank_group_name_message,
        [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
      )
      return true
    ***REMOVED***
    return false
  ***REMOVED***

  // adds a group to redux if it passes all error checking
  function addNewGroup () {
    if (checkForDuplicate() || checkForBlank()) return

    props.createGroup(groupName, props.languageID, emoji)
    props.changeActiveGroup(groupName)
    props.hideModal()
  ***REMOVED***

  // edits a group and sets it as active
  function editGroup () {
    if (checkForDuplicate() || checkForBlank()) return

    if (props.groupName === props.activeGroup.name)
      props.changeActiveGroup(groupName)
    props.editGroup(props.groupName, groupName, emoji)
    props.hideModal()
  ***REMOVED***

  //+ RENDER

  return (
    <ModalScreen
      isVisible={props.isVisible***REMOVED***
      hideModal={props.hideModal***REMOVED***
      topRightComponent={
        <TouchableOpacity
          onPress={props.type === 'AddGroup' ? addNewGroup : editGroup***REMOVED***
          style={{
            width: 45 * scaleMultiplier,
            height: 45 * scaleMultiplier
          ***REMOVED******REMOVED***
        >
          <Icon name='check' size={40 * scaleMultiplier***REMOVED*** color={colors.oslo***REMOVED*** />
        </TouchableOpacity>
      ***REMOVED***
      onCancelPress={() => {
        setGroupName('')
        setEmoji('default')
      ***REMOVED******REMOVED***
      onModalWillShow={
        props.type === 'AddGroup'
          ? () => {
              setGroupName('')
              setEmoji('default')
            ***REMOVED***
          : () => {
              setGroupName(props.groupName)
              setEmoji(editingGroup.emoji)
            ***REMOVED***
      ***REMOVED***
      title={
        props.type === 'AddGroup'
          ? props.translations.add_edit_group.header_add
          : props.translations.add_edit_group.header_edit
      ***REMOVED***
    >
      <View style={styles.photoContainer***REMOVED***>
        <GroupAvatar
          style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
          emoji={emoji***REMOVED***
          size={120***REMOVED***
          isChangeable={true***REMOVED***
        />
      </View>
      <View
        style={{
          marginHorizontal: 20
        ***REMOVED******REMOVED***
      >
        <Text
          style={StandardTypography(
            props,
            'p',
            'Regular',
            'left',
            colors.chateau
          )***REMOVED***
        >
          {props.translations.add_edit_group.group_name_form_label***REMOVED***
        </Text>
        <TextInput
          style={[
            styles.addNewGroupContainer,
            StandardTypography(props, 'h3', 'Regular', 'left', colors.shark)
            // {
            //   textAlign: props.isRTL ? 'right' : 'left',
            //   fontFamily: props.font + '-Regular'
            // ***REMOVED***
          ]***REMOVED***
          onChangeText={text => setGroupName(text)***REMOVED***
          value={groupName***REMOVED***
          autoCapitalize='words'
          autoCorrect={false***REMOVED***
          placeholder={
            props.translations.add_edit_group.group_name_form_placeholder
          ***REMOVED***
          placeholderTextColor={colors.chateau***REMOVED***
          maxLength={50***REMOVED***
          returnKeyType='done'
        />
      </View>
      <Text
        style={[
          StandardTypography(props, 'p', 'Regular', 'left', colors.chateau),
          {
            marginHorizontal: 20,
            marginTop: 20 * scaleMultiplier,
            marginBottom: 5
          ***REMOVED***
        ]***REMOVED***
      >
        {props.translations.add_edit_group.icon_form_label***REMOVED***
      </Text>
      <View
        style={{
          alignItems: 'center',
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
          renderItem={({ item ***REMOVED***) => (
            <TouchableOpacity
              style={{
                width: 50 * scaleMultiplier,
                height: 50 * scaleMultiplier,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                borderWidth: item === emoji ? 2 : 0,
                borderColor: item === emoji ? colors.blue : null,
                borderRadius: 10,
                backgroundColor: item === emoji ? colors.blue + '38' : null
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
            (Dimensions.get('window').width - 50) / (50 * scaleMultiplier)
          )***REMOVED***
        />
      </View>
    </ModalScreen>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  ***REMOVED***,
  photoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20 * scaleMultiplier
  ***REMOVED***,
  addNewGroupContainer: {
    borderBottomColor: colors.athens,
    borderBottomWidth: 2,
    height: 50 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    groups: state.groups,
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEditGroupModal)

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
