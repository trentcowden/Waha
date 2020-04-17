import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, FlatList, Image ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import { scaleMultiplier, headerImages ***REMOVED*** from '../constants'
import * as FileSystem from 'expo-file-system';
import FlatListSeparator from '../components/FlatListSeparator'

function StorageScreen(props) {

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

   function getNavOptions() {
      return {
         headerRight: props.isRTL ?
            () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** /> :
            () => <View></View>,
         headerLeft: props.isRTL ?
            () => <View></View> :
            () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />,
      ***REMOVED***
   ***REMOVED***

   //// FUNCTIONS

   // gets the storage size in megabytes for all the downloaded chapter 2s for a specific language
   async function getStorageUsedByLanguage(language) {
      var storageUsed = 0
      var regex = new RegExp('[a-z]{2***REMOVED***[0-9]{3***REMOVED***\..*');
      return await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
         .then(async contents => {
            for (const item of contents) {
               var hasMatch = regex.exec(item);
               if (hasMatch) {
                  if (item.slice(0, 2) === language) {
                     await FileSystem.getInfoAsync(FileSystem.documentDirectory + item, {***REMOVED***)
                        .then(({ size ***REMOVED***) => { storageUsed += Math.round(size / 1000000) ***REMOVED***)
                  ***REMOVED***
               ***REMOVED***
            ***REMOVED***
         ***REMOVED***)
         .then(() => { return storageUsed ***REMOVED***)
   ***REMOVED***

   // get the storage size in megabytes of all downloaded chapter 2s
   function getAllStorageUsed() {
      setTotalStorage(0)
      setStorageObject({***REMOVED***)
      var languages = getInstalledLanguageInstances()
      for (const language of languages) {
         getStorageUsedByLanguage(language.languageID)
            .then(storageUsed => {
               setTotalStorage(oldStorage => oldStorage + storageUsed)
               setStorageObject(oldObject => ({ ...oldObject, [language.languageID]: storageUsed ***REMOVED***))
            ***REMOVED***)
      ***REMOVED***

   ***REMOVED***

   // deletes all downloaded chapter 2s for a specific language
   // note: if no language specified, deletes all chapter 2s
   async function deleteDownloadedLessons(language) {
      await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
         .then(contents => {
            var regex = new RegExp('[a-z]{2***REMOVED***[0-9]{3***REMOVED***\..*');
            for (const item of contents) {
               var hasMatch = regex.exec(item);
               if (hasMatch) {
                  if (!language) {
                     FileSystem.deleteAsync(FileSystem.documentDirectory + item)
                  ***REMOVED*** else if (item.slice(0, 2) === language) {
                     FileSystem.deleteAsync(FileSystem.documentDirectory + item)
                  ***REMOVED***
               ***REMOVED***
            ***REMOVED***
         ***REMOVED***)
         .then(() => { getAllStorageUsed() ***REMOVED***)
   ***REMOVED***

   // gets all the installed languages
   function getInstalledLanguageInstances() {
      var installedLanguageInstances = []
      for (key in props.database) {
         if (key.length === 2) {
            var languageObject = {***REMOVED***;
            languageObject['languageName'] = props.database[key].displayName
            languageObject['languageID'] = key
            installedLanguageInstances.push(languageObject)
         ***REMOVED***
      ***REMOVED***
      return installedLanguageInstances
   ***REMOVED***

   //// RENDER

   function renderLanguageInstance(languageInstanceList) {
      return (
         <TouchableOpacity style={styles.storageContainerFlatList***REMOVED*** onPress={
            () => Alert.alert(
               props.translations.alerts.deleteDownloadedLessonsPerLanguage.header,
               props.translations.alerts.deleteDownloadedLessonsPerLanguage.body,
               [{
                  text: props.translations.alerts.options.cancel,
                  onPress: () => { ***REMOVED***
               ***REMOVED***, {
                  text: props.translations.alerts.options.ok,
                  onPress: () => deleteDownloadedLessons(languageInstanceList.item.languageID)
               ***REMOVED***]
            )
         ***REMOVED***>
            <Text style={styles.mbText***REMOVED***>{languageInstanceList.item.languageName***REMOVED***</Text>
            <Image style={styles.languageLogo***REMOVED*** source={headerImages[languageInstanceList.item.languageID]***REMOVED*** />
            <Text style={styles.mbText***REMOVED***>{storageObject[languageInstanceList.item.languageID]***REMOVED***{props.translations.labels.mb***REMOVED***</Text>
         </TouchableOpacity>
      )
   ***REMOVED***

   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.storageList***REMOVED***>
            <FlatList
               data={getInstalledLanguageInstances()***REMOVED***
               renderItem={renderLanguageInstance***REMOVED***
               keyExtractor={item => item.languageID***REMOVED***
               ItemSeparatorComponent={FlatListSeparator***REMOVED***
               ListHeaderComponent={
                  <View style={styles.storageHeader***REMOVED***>
                     <View style={styles.headerItems***REMOVED***>
                        <View style={styles.headerItemContainer***REMOVED***>
                           <Text style={styles.storageUsedText***REMOVED***>{props.translations.labels.storageUsed***REMOVED***</Text>
                           <Text style={styles.mbText***REMOVED***>{totalStorage***REMOVED*** {props.translations.labels.mb***REMOVED***</Text>
                        </View>
                        <TouchableOpacity
                           style={[styles.headerItemContainer, { borderTopWidth: 0 ***REMOVED***]***REMOVED***
                           onPress={
                              () => Alert.alert(
                                 props.translations.alerts.deleteAllDownloadedLessons.header,
                                 props.translations.alerts.deleteAllDownloadedLessons.body,
                                 [{
                                    text: props.translations.alerts.options.cancel,
                                    onPress: () => {***REMOVED***
                                 ***REMOVED***, {
                                    text: props.translations.alerts.options.ok,
                                    onPress: () => deleteDownloadedLessons()
                                 ***REMOVED***]
                              )
                           ***REMOVED***>
                           <Text style={styles.deleteText***REMOVED***>{props.translations.labels.deleteAllDownloadedLessons***REMOVED***</Text>
                        </TouchableOpacity>
                     </View>
                     <Text style={styles.downloadedLessonsText***REMOVED***>{props.translations.labels.downloadedLessons***REMOVED***</Text>
                     <View style={{ height: 2, flex: 1, backgroundColor: "#9FA5AD" ***REMOVED******REMOVED*** />
                  </View>
               ***REMOVED***
               ListFooterComponent={<View style={{ height: 2, flex: 1, backgroundColor: "#9FA5AD" ***REMOVED******REMOVED*** />***REMOVED***
            />
         </View>
      </View>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#FFFFFF",
   ***REMOVED***,
   storageList: {
      flex: 1,
      marginHorizontal: 15
   ***REMOVED***,
   headerItems: {
      marginBottom: 40
   ***REMOVED***,
   headerItemContainer: {
      height: 55 * scaleMultiplier,
      borderWidth: 2,
      borderColor: '#9FA5AD',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
   ***REMOVED***,
   downloadedLessonsText: {
      color: '#9FA5AD',
      fontSize: 18 * scaleMultiplier,
      fontFamily: 'regular'
   ***REMOVED***,
   storageContainerFlatList: {
      height: 55 * scaleMultiplier,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderColor: '#9FA5AD',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
   ***REMOVED***,
   storageUsedText: {
      fontFamily: 'medium',
      fontSize: 18,
      color: '#3A3C3F'
   ***REMOVED***,
   mbText: {
      fontFamily: 'regular',
      fontSize: 18,
      color: '#82868D'
   ***REMOVED***,
   deleteText: {
      fontFamily: 'regular',
      fontSize: 18,
      color: '#E74D3D'
   ***REMOVED***,
   languageLogo: {
      resizeMode: "stretch",
      width: 96 * scaleMultiplier,
      height: 32 * scaleMultiplier,
      marginRight: 10
   ***REMOVED***
***REMOVED***)

////REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      isRTL: state.database[activeGroup.language].isRTL,
      database: state.database,
      translations: state.database[activeGroup.language].translations
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(StorageScreen);