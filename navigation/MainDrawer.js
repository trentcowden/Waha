import NetInfo from '@react-native-community/netinfo'
import { createDrawerNavigator ***REMOVED*** from '@react-navigation/drawer'
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer
***REMOVED*** from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import firebase from 'firebase'
import React, { useEffect ***REMOVED*** from 'react'
import { connect ***REMOVED*** from 'react-redux'
import WahaDrawer from '../components/WahaDrawer'
import { scaleMultiplier ***REMOVED*** from '../constants'
import db from '../firebase/db'
import { appVersion ***REMOVED*** from '../modeSwitch'
import {
  addLanguageCoreFileToUpdate,
  storeLanguageData,
  storeLanguageSets
***REMOVED*** from '../redux/actions/databaseActions'
import { changeActiveGroup, deleteGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { updateConnectionStatus ***REMOVED*** from '../redux/actions/networkActions'
import MainStack from './MainStack'
const Drawer = createDrawerNavigator()

function MainDrawer (props) {
  //- allows only accessing hamburger swipe from study set screen
  function getGestureEnabled (route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'SetTabs'
    if (routeName === 'SetTabs') return true
    else return false
  ***REMOVED***

  useEffect(() => {
    // Add listener for connection status and update the redux isConnected variable accordingly.
    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
      props.updateConnectionStatus(state.isConnected)
    ***REMOVED***)

    return function cleanup () {
      // Cancel our connection status listener.
      netInfoUnsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  // Check for database updates. This function gets triggered whenever a user downloads a new lesson and whenever the active group changes.
  useEffect(() => {
    // Whether the app should write the new Firestore changes to redux or not. The only reason that it wouldn't is if the app version is behind the database version.
    var shouldWrite = false

    // Fetch data from the languages Firestore collection.
    db.collection('languages')
      .doc(props.activeGroup.language)
      .get()
      .then(async doc => {
        // If we get some legitimate data back...
        if (doc.exists && doc.data()) {
          // If the Waha version is greater than or equal to the app version in the database...
          if (doc.data().appVersion <= appVersion) {
            // Set shouldWrite to true. This way, when we fetch data for the Story Sets for this language, we know we're safe to write to redux.
            shouldWrite = true

            // Store our language info in redux.
            props.storeLanguageData(doc.data(), props.activeGroup.language)

            // Check if we need replacements for already downloaded core files by comparing the created times of downloaded core files in redux with the created times of the current Firebase storage core files. If the created times don't match, it means a core file has been updated and we need to queue the new core file to download.
            doc.data().files.forEach(fileName => {
              // Set the file extension for the core file we're currently checking.
              var fileExtension = fileName.includes('header') ? 'png' : 'mp3'

              // PRODUCTION FIREBASE URL
              // Always have this uncommented when it's time to build a new version.
              var url = `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${props.activeGroup.language***REMOVED***%2Fother%2F${fileName***REMOVED***.${fileExtension***REMOVED***?alt=media`

              // TEST FIREBASE URL
              // Use this for test Firebase storage.
              // var url = `https://firebasestorage.googleapis.com/v0/b/waha-app-test-db.appspot.com/o/${props.activeGroup.language***REMOVED***%2Fother%2F${fileName***REMOVED***.${fileExtension***REMOVED***?alt=media`

              // Check the timeCreated of this core file in Firebase storage.
              firebase
                .storage()
                .refFromURL(url)
                .getMetadata()
                .then(({ timeCreated ***REMOVED***) => {
                  // If the created time of this core file has already been stored previously AND the created time of the core file in Firebase is different from the created time that's stored in redux...
                  if (
                    props.languageCoreFilesCreatedTimes[
                      `${props.activeGroup.language***REMOVED***-${fileName.slice(0, -3)***REMOVED***`
                    ] &&
                    timeCreated !==
                      props.languageCoreFilesCreatedTimes[
                        `${props.activeGroup.language***REMOVED***-${fileName.slice(0, -3)***REMOVED***`
                      ]
                  ) {
                    // Add the core file to our redux array of files to update, assuming that it hasn't already been added.
                    if (
                      !props.languageCoreFilesToUpdate.includes(
                        `${props.activeGroup.language***REMOVED***-${fileName.slice(0, -3)***REMOVED***`
                      )
                    ) {
                      // console.log(`${fileName***REMOVED*** needs to be replaced.\n`)
                      props.addLanguageCoreFileToUpdate(
                        `${props.activeGroup.language***REMOVED***-${fileName.slice(0, -3)***REMOVED***`
                      )
                    ***REMOVED***
                  ***REMOVED***
                ***REMOVED***)
            ***REMOVED***)

            // Read the contents of Waha's file directory to check which core files are downloaded.
            FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
              contents => {
                // For each core file listed in Firestore, verify that it's already downloaded.
                doc.data().files.forEach(fileName => {
                  var fileExtension = fileName.includes('header')
                    ? 'png'
                    : 'mp3'
                  // If it isn't downloaded...
                  if (
                    !contents.includes(
                      `${props.activeGroup.language***REMOVED***-${fileName.slice(
                        0,
                        -3
                      )***REMOVED***.${fileExtension***REMOVED***`
                    )
                  ) {
                    // Add the core file to our redux array of files to download, assuming that it hasn't already been added.
                    if (
                      !props.languageCoreFilesToUpdate.includes(
                        `${props.activeGroup.language***REMOVED***-${fileName.slice(0, -3)***REMOVED***`
                      )
                    ) {
                      console.log(`${fileName***REMOVED*** needs to be added.\n`)
                      props.addLanguageCoreFileToUpdate(
                        `${props.activeGroup.language***REMOVED***-${fileName.slice(0, -3)***REMOVED***`
                      )
                    ***REMOVED***
                  ***REMOVED***
                ***REMOVED***)
              ***REMOVED***
            )
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***)
      .catch(error => {
        console.log('Error retrieving data from Firestore.')
      ***REMOVED***)

    // Fetch data from the Story Sets Firestore collection. Get all Story Sets of the current language.
    db.collection('sets')
      .where('languageID', '==', props.activeGroup.language)
      .get()
      .then(querySnapshot => {
        // If the data is valid and the current Waha version is greater than or equal to the version in Firebase (we set the shouldWrite variable earlier)...
        if (!querySnapshot.empty) {
          if (shouldWrite) {
            // Add each Story Set to a temporary set array...
            var sets = []
            querySnapshot.forEach(doc => {
              sets.push({
                id: doc.id,
                ...doc.data()
              ***REMOVED***)
            ***REMOVED***)
            /// ...and write all of them to redux.
            props.storeLanguageSets(sets, props.activeGroup.language)
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***)
      .catch(error => {
        console.log('Error retrieving data from Firestore.')
      ***REMOVED***)
  ***REMOVED***, [Object.keys(props.downloads).length, props.activeGroup])

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition={props.isRTL ? 'right' : 'left'***REMOVED***
        drawerType='back'
        drawerContent={props => <WahaDrawer {...props***REMOVED*** />***REMOVED***
        drawerStyle={{
          width: '80%'
        ***REMOVED******REMOVED***
        edgeWidth={75 * scaleMultiplier***REMOVED***
      >
        <Drawer.Screen
          options={({ route ***REMOVED***) => ({
            gestureEnabled: getGestureEnabled(route)
          ***REMOVED***)***REMOVED***
          name='MainStack'
          component={MainStack***REMOVED***
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
***REMOVED***
function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]

  return {
    isRTL: state.database[activeGroup.language].isRTL,
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    isConnected: state.network.isConnected,
    translations: state.database[activeGroup.language].translations,
    activeGroup: activeGroup,
    security: state.security,
    languageCoreFilesCreatedTimes: state.database.languageCoreFilesCreatedTimes,
    languageCoreFilesToUpdate: state.database.languageCoreFilesToUpdate,
    mtUnlockAttempts: state.mtUnlockAttempts,
    downloads: state.downloads,
    groups: state.groups
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    updateConnectionStatus: status => {
      dispatch(updateConnectionStatus(status))
    ***REMOVED***,
    storeLanguageData: (data, language) => {
      dispatch(storeLanguageData(data, language))
    ***REMOVED***,
    storeLanguageSets: (sets, language) => {
      dispatch(storeLanguageSets(sets, language))
    ***REMOVED***,
    addLanguageCoreFileToUpdate: fileName => {
      dispatch(addLanguageCoreFileToUpdate(fileName))
    ***REMOVED***,
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***,
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer)
