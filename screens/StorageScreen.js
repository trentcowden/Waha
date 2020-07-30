import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { Alert, Dimensions, FlatList, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import LanguageStorageItem from '../components/LanguageStorageItem'
import WahaButton from '../components/WahaButton'
import { colors ***REMOVED*** from '../constants'
import { removeDownload ***REMOVED*** from '../redux/actions/downloadActions'

function StorageScreen (props) {
  //// STATE

  // keeps track of storage size of each language's downloaded chapter 2s
  const [storageObject, setStorageObject] = useState({***REMOVED***)

  // keeps track of total storage for all downloaded chapter 2s
  const [totalStorage, setTotalStorage] = useState(0)

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
    getAllStorageUsed()
  ***REMOVED***, [])

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

  // gets the storage size in megabytes for all the downloaded chapter 2s for a specific language
  async function getStorageUsedByLanguage (language) {
    var storageUsed = 0
    var regex = new RegExp('[a-z]{2***REMOVED***[0-9]{3***REMOVED***..*')
    return await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then(async contents => {
        for (const item of contents) {
          var hasMatch = regex.exec(item)
          if (hasMatch) {
            if (item.slice(0, 2) === language) {
              await FileSystem.getInfoAsync(
                FileSystem.documentDirectory + item,
                {***REMOVED***
              ).then(({ size ***REMOVED***) => {
                storageUsed += Math.round(size / 1000000)
              ***REMOVED***)
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***)
      .then(() => {
        return storageUsed
      ***REMOVED***)
  ***REMOVED***

  // get the storage size in megabytes of all downloaded chapter 2s
  function getAllStorageUsed () {
    setTotalStorage(0)
    setStorageObject({***REMOVED***)
    var languages = getInstalledLanguageInstances()
    for (const language of languages) {
      getStorageUsedByLanguage(language.languageID).then(storageUsed => {
        setTotalStorage(oldStorage => oldStorage + storageUsed)
        setStorageObject(oldObject => ({
          ...oldObject,
          [language.languageID]: storageUsed
        ***REMOVED***))
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***

  // deletes all downloaded chapter 2s for a specific language
  // note: if no language specified, deletes all chapter 2s
  async function deleteDownloadedLessons (language) {
    await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then(contents => {
        var regex = new RegExp('[a-z]{2***REMOVED***[0-9]{3***REMOVED***..*')
        for (const item of contents) {
          var hasMatch = regex.exec(item)
          if (hasMatch) {
            if (!language) {
              FileSystem.deleteAsync(FileSystem.documentDirectory + item)
              props.removeDownload(item.slice(0, 5))
            ***REMOVED*** else if (item.slice(0, 2) === language) {
              FileSystem.deleteAsync(FileSystem.documentDirectory + item)
              props.removeDownload(item.slice(0, 5))
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***)
      .then(() => {
        getAllStorageUsed()
      ***REMOVED***)
  ***REMOVED***

  // gets all the installed languages
  function getInstalledLanguageInstances () {
    var installedLanguageInstances = []
    for (key in props.database) {
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['languageName'] = props.database[key].displayName
        languageObject['languageID'] = key
        installedLanguageInstances.push(languageObject)
      ***REMOVED***
    ***REMOVED***
    return installedLanguageInstances
  ***REMOVED***

  //// RENDER

  function renderLanguageStorageItem (languageList) {
    return (
      <LanguageStorageItem
        languageName={languageList.item.languageName***REMOVED***
        languageID={languageList.item.languageID***REMOVED***
        megabytes={storageObject[languageList.item.languageID]***REMOVED***
        clearDownloads={() => {
          Alert.alert(
            props.translations.storage.popups
              .clear_all_downloaded_lessons_for_a_language_title,
            props.translations.storage.popups
              .clear_all_downloaded_lessons_for_a_language_message,
            [
              {
                text: props.translations.general.cancel,
                onPress: () => {***REMOVED***
              ***REMOVED***,
              {
                text: props.translations.general.ok,
                onPress: () =>
                  deleteDownloadedLessons(languageList.item.languageID)
              ***REMOVED***
            ]
          )
        ***REMOVED******REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={getInstalledLanguageInstances()***REMOVED***
        renderItem={renderLanguageStorageItem***REMOVED***
        keyExtractor={item => item.languageID***REMOVED***
        ItemSeparatorComponent={() => (
          <View style={{ height: 20, width: '100%' ***REMOVED******REMOVED*** />
        )***REMOVED***
      />
      <WahaButton
        type='filled'
        color={colors.cinnabar***REMOVED***
        label={
          props.translations.storage.clear_all_downloaded_lessons_button_label +
          ' (' +
          totalStorage +
          ' ' +
          props.translations.storage.megabyte_label +
          ')'
        ***REMOVED***
        width={Dimensions.get('window').width - 40***REMOVED***
        onPress={() =>
          Alert.alert(
            props.translations.storage.popups
              .clear_all_downloaded_lessons_title,
            props.translations.storage.popups
              .clear_all_downloaded_lessons_message,
            [
              {
                text: props.translations.general.cancel,
                onPress: () => {***REMOVED***
              ***REMOVED***,
              {
                text: props.translations.general.ok,
                onPress: () => deleteDownloadedLessons()
              ***REMOVED***
            ]
          )
        ***REMOVED***
        style={{ alignSelf: 'center' ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze
  ***REMOVED***
***REMOVED***)

////REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    database: state.database,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(StorageScreen)
