import * as FileSystem from 'expo-file-system'
import React, { useEffect ***REMOVED*** from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, getLanguageFont, scaleMultiplier ***REMOVED*** from '../../constants'
import { deleteLanguageData ***REMOVED*** from '../../redux/actions/databaseActions'
import { removeDownload ***REMOVED*** from '../../redux/actions/downloadActions'
import { deleteGroup ***REMOVED*** from '../../redux/actions/groupsActions'
import { StandardTypography ***REMOVED*** from '../../styles/typography'
function GroupListHeader (props) {
  //+ FUNCTIONS

  useEffect(() => {
    // check if there was a failed language add, i.e. if the app crashed/user quit during a fetch
    // and clear out the already downloaded content if there was
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        props.database[props.languageID].files.forEach(fileName => {
          // SLICE
          if (
            !contents.includes(`${props.languageID***REMOVED***-${fileName***REMOVED***.mp3`) &&
            !contents.includes(`${props.languageID***REMOVED***-${fileName***REMOVED***.png`)
          )
            deleteLanguageInstance()
        ***REMOVED***)
      ***REMOVED***
    )
  ***REMOVED***, [])

  // deletes all material for a language
  function deleteLanguageInstance () {
    // delete all groups w/ this language
    props.groups.map(group => {
      if (group.language === props.languageID) {
        props.deleteGroup(group.name)
      ***REMOVED***
    ***REMOVED***)

    // delete all downloaded files for this language
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        for (const item of contents) {
          if (item.slice(0, 2) === props.languageID) {
            FileSystem.deleteAsync(FileSystem.documentDirectory + item)
            props.removeDownload(item.slice(0, 5))
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    )

    // delete section of database for this language
    props.deleteLanguageData(props.languageID)
  ***REMOVED***

  // render trash button conditionally because it's only shown when editing mode is active
  var trashButton
  // if we're editing and not in the active group, we can delete, so show trash can
  if (props.isEditing && !(props.activeGroup.language === props.languageID)) {
    trashButton = (
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          width: 24 * scaleMultiplier
        ***REMOVED******REMOVED***
        onPress={() =>
          Alert.alert(
            props.translations.groups.popups.delete_language_title,
            props.translations.groups.popups.delete_language_message,
            [
              {
                text: props.translations.general.cancel,
                onPress: () => {***REMOVED***
              ***REMOVED***,
              {
                text: props.translations.general.ok,
                onPress: deleteLanguageInstance
              ***REMOVED***
            ]
          )
        ***REMOVED***
      >
        <Icon name='trash' size={25 * scaleMultiplier***REMOVED*** color={colors.red***REMOVED*** />
      </TouchableOpacity>
    )
    // if we're editing and active, show an empty view
  ***REMOVED*** else if (
    props.isEditing &&
    props.activeGroup.language === props.languageID
  ) {
    trashButton = <View style={{ height: '100%', width: 20 ***REMOVED******REMOVED*** />
    // otherwise, make it nothin
  ***REMOVED*** else {
    trashButton = null
  ***REMOVED***

  return (
    <View
      style={[
        styles.languageHeaderContainer,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
    >
      {trashButton***REMOVED***
      <Text
        style={[
          StandardTypography(
            {
              font: getLanguageFont(props.languageID),
              isRTL: props.isRTL
            ***REMOVED***,
            'h3',
            'Regular',
            'left',
            colors.chateau
          ),
          {
            flex: 1,
            marginLeft: props.isRTL ? 0 : props.isEditing ? 0 : 20,
            marginRight: props.isRTL ? (props.isEditing ? 0 : 20) : 0
          ***REMOVED***
        ]***REMOVED***
      >
        {props.languageName***REMOVED***
      </Text>
      <Image
        style={styles.languageLogo***REMOVED***
        source={{
          uri: FileSystem.documentDirectory + props.languageID + '-header.png'
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  languageHeaderContainer: {
    alignItems: 'center',
    width: '100%',
    height: 40 * scaleMultiplier,
    // aspectRatio: 8.7,
    backgroundColor: colors.aquaHaze
  ***REMOVED***,
  languageLogo: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier,
    marginHorizontal: 20
  ***REMOVED***
***REMOVED***)

// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    groups: state.groups,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***,
    deleteLanguageData: language => {
      dispatch(deleteLanguageData(language))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupListHeader)
