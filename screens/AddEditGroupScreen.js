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
import AvatarImage from '../components/AvatarImage'
import BackButton from '../components/BackButton'
import WahaButton from '../components/WahaButton'
import {
  colors,
  groupIcons,
  groupIconSources,
  scaleMultiplier
***REMOVED*** from '../constants'
import {
  changeActiveGroup,
  createGroup,
  deleteGroup,
  editGroup,
  resetProgress
***REMOVED*** from '../redux/actions/groupsActions'

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
  ***REMOVED***, [props.isRTL, groupName, emoji])

  //// NAV OPTIONS

  function getNavOptions () {
    return {
      headerRight: props.isRTL
        ? () => (
            <BackButton
              onPress={() => {
                if (props.route.name === 'EditGroup') {
                  if (!checkForDuplicate() && !checkForBlank()) editGroup()
                ***REMOVED*** else props.navigation.goBack()
              ***REMOVED******REMOVED***
            />
          )
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => (
            <BackButton
              onPress={() => {
                if (props.route.name === 'EditGroup') {
                  if (!checkForDuplicate() && !checkForBlank()) editGroup()
                ***REMOVED*** else props.navigation.goBack()
              ***REMOVED******REMOVED***
            />
          )
    ***REMOVED***
  ***REMOVED***

  //// FUNCTIONS

  function checkForDuplicate () {
    var isDuplicate = false
    if (props.route.name === 'AddGroup') {
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
        if (
          group.name === groupName &&
          props.route.params.groupName !== groupName
        ) {
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

  var editControls =
    props.route.name === 'EditGroup' ? (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          flexDirection:
            Dimensions.get('window').height < 700
              ? props.isRTL
                ? 'row-reverse'
                : 'row'
              : 'column'
        ***REMOVED******REMOVED***
      >
        <WahaButton
          type='outline'
          color={colors.red***REMOVED***
          width={
            Dimensions.get('window').height < 700
              ? Dimensions.get('window').width / 2 - 30
              : Dimensions.get('window').width - 40
          ***REMOVED***
          onPress={() =>
            Alert.alert(
              props.translations.add_edit_group.popups.reset_progress_title,
              props.translations.add_edit_group.popups.reset_progress_message,
              [
                {
                  text: props.translations.general.cancel,
                  onPress: () => {***REMOVED***
                ***REMOVED***,
                {
                  text: props.translations.general.ok,
                  onPress: () => {
                    props.resetProgress(props.route.params.groupName)
                    props.navigation.goBack()
                  ***REMOVED***
                ***REMOVED***
              ]
            )
          ***REMOVED***
          label={props.translations.add_edit_group.reset_progress_button_label***REMOVED***
          style={{ marginVertical: 10 ***REMOVED******REMOVED***
          textStyle={{
            fontFamily: props.font + '-regular'
          ***REMOVED******REMOVED***
        />
        <View style={{ width: 20, height: '100%' ***REMOVED******REMOVED*** />
        {/* delete group button */***REMOVED***
        {isActive ? (
          <WahaButton
            type='inactive'
            width={
              Dimensions.get('window').height < 700
                ? Dimensions.get('window').width / 2 - 30
                : Dimensions.get('window').width - 40
            ***REMOVED***
            label={props.translations.add_edit_group.cant_delete_group_text***REMOVED***
            color={colors.chateau***REMOVED***
            style={{ marginVertical: 10 ***REMOVED******REMOVED***
            textStyle={{
              fontFamily: props.font + '-regular'
            ***REMOVED******REMOVED***
          />
        ) : (
          <WahaButton
            type='filled'
            onPress={() => {
              props.deleteGroup(props.route.params.groupName)
              props.navigation.goBack()
            ***REMOVED******REMOVED***
            width={
              Dimensions.get('window').height < 550
                ? Dimensions.get('window').width / 2 - 30
                : Dimensions.get('window').width - 40
            ***REMOVED***
            color={colors.red***REMOVED***
            label={props.translations.add_edit_group.delete_group_button_label***REMOVED***
            style={{ marginVertical: 10 ***REMOVED******REMOVED***
            textStyle={{
              fontFamily: props.font + '-regular'
            ***REMOVED******REMOVED***
          />
        )***REMOVED***
      </View>
    ) : null

  return (
    <View style={styles.screen***REMOVED***>
      <View>
        <View style={styles.photoContainer***REMOVED***>
          <AvatarImage
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
            style={{
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-regular',
              fontSize: 14 * scaleMultiplier,
              color: colors.chateau
            ***REMOVED******REMOVED***
          >
            {props.translations.add_edit_group.group_name_form_label***REMOVED***
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
            placeholder={
              props.translations.add_edit_group.group_name_form_placeholder
            ***REMOVED***
            placeholderTextColor={colors.chateau***REMOVED***
            maxLength={50***REMOVED***
            returnKeyType='done'
          />
        </View>
        <Text
          style={{
            fontSize: 14 * scaleMultiplier,
            color: colors.chateau,
            textAlign: props.isRTL ? 'right' : 'left',
            fontFamily: props.font + '-regular',
            marginHorizontal: 20,
            marginTop: 20 * scaleMultiplier,
            marginBottom: 5
          ***REMOVED******REMOVED***
        >
          {props.translations.add_edit_group.icon_form_label***REMOVED***
        </Text>
        <View
          style={{
            alignItems: 'center',
            height: 150 * scaleMultiplier,
            padding: 5,
            borderWidth: 2,
            borderRadius: 10,
            marginHorizontal: 20,
            borderColor: colors.athens
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
              (Dimensions.get('window').width - 40) / (50 * scaleMultiplier)
            )***REMOVED***
          />
        </View>
        {editControls***REMOVED***
      </View>
      {/* save button */***REMOVED***
      {props.route.name === 'AddGroup' ? (
        <WahaButton
          type='filled'
          color={colors.apple***REMOVED***
          width={127 * scaleMultiplier***REMOVED***
          style={{
            alignSelf: props.isRTL ? 'flex-start' : 'flex-end',
            marginHorizontal: 20
          ***REMOVED******REMOVED***
          onPress={addNewGroup***REMOVED***
          label={props.translations.add_edit_group.save_button_label***REMOVED***
        />
      ) : null***REMOVED***
    </View>
  )
***REMOVED***

//// STYLES

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
    height: 40 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  resetProgressButtonContainer: {
    flex: 1,
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 10,
    height: 55 * scaleMultiplier,
    marginVertical: 20 * scaleMultiplier,
    justifyContent: 'center',
    paddingHorizontal: 15
  ***REMOVED***,
  buttonText: {
    textAlign: 'center',
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  buttonContainer: {
    width:
      Dimensions.get('window').height < 550
        ? Dimensions.get('window').width / 2 - 30
        : Dimensions.get('window').width - 40,
    marginVertical: 10,
    borderRadius: 10,
    height: 55 * scaleMultiplier,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center'
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
