import NetInfo from '@react-native-community/netinfo'
import { createDrawerNavigator ***REMOVED*** from '@react-navigation/drawer'
import { NavigationContainer ***REMOVED*** from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import React, { useEffect ***REMOVED*** from 'react'
import { Alert ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import WahaDrawer from '../components/WahaDrawer'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { db, storeData ***REMOVED*** from '../redux/actions/databaseActions'
import {
  removeDownload,
  resumeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
import { updateConnectionStatus ***REMOVED*** from '../redux/actions/networkActions'
import MainStack from './MainStack'
const Drawer = createDrawerNavigator()

function MainDrawer (props) {
  //allows only accessing hamburger swipe from study set screen
  function getGestureEnabled (route) {
    console.log(route.state ? route.state.routes[0].name : '')
    // Access the tab navigator's state using `route.state`
    const routeName = route.state
      ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
      : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || props.security.securityEnabled
      ? 'Game'
      : 'SetsRoot'
    if (routeName === 'SetsRoot') return true
    else return false
  ***REMOVED***
  useEffect(() => {
    // add listener for connection status and update it accordingly
    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
      props.updateConnectionStatus(state.isConnected)
    ***REMOVED***)

    // add listener for receiving updates in firebase
    db.collection('languages')
      .doc(props.activeGroup.language)
      .onSnapshot(function (doc) {
        function downloadSomething (source, fileName) {
          var downloadResumable = FileSystem.createDownloadResumable(
            doc.data().sources[source],
            FileSystem.documentDirectory +
              props.activeGroup.language +
              '-' +
              fileName,
            {***REMOVED***
          )
          downloadResumable.downloadAsync().catch(error => {
            throw error
          ***REMOVED***)
        ***REMOVED***

        // check for new fellowship or application chapters
        Object.keys(doc.data().sources).forEach(source => {
          if (
            doc.data().sources[source] !== props.activeDatabase.sources[source]
          ) {
            // ALERT
            Alert.alert(
              props.translations.general.popups.new_chapter_downloading_title,
              props.translations.general.popups.new_chapter_downloading_message,
              [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
            )
            downloadSomething(source, source + '.mp3')
          ***REMOVED***
        ***REMOVED***)

        // store data
        props.storeData(doc.data(), props.activeGroup.language)

        // if
        // 1. all core story sets are completed
        // 2. a new core story set has been addded

        // 1. add it automatically to added sets for this group
        // 2. make it display the 'new' icon somehow

        // if
        // 1. mobilization tools is unlocked for this group
        // 2. a new mobilization tools set is added
        // if (props.activeGroup.showToolkit && )

        // 1. add it automatically to added sets for htis group
        // 2. make it dispaly the 'new' icon somehow
      ***REMOVED***)

    return function cleanup () {
      netInfoUnsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  // useEffect(() => {
  //   // add any new mt sets to active group
  //   props.activeDatabase.sets
  //     .filter(set => set.category === 'mt')
  //     .forEach(set => {
  //       if (
  //         !props.activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
  //       )
  //         props.addSet(props.activeGroup.name, set.id)
  //     ***REMOVED***)
  // ***REMOVED***, [props.activeDatabase, props.activeGroup])

  // if we connect to internet, check to see if we have any paused downloads
  useEffect(() => {
    if (props.isConnected) {
      checkPausedDownloads()
    ***REMOVED***
  ***REMOVED***, [props.isConnected])

  //// FUNCTIONS
  async function checkPausedDownloads () {
    // props.activeDatabase.lessons.forEach(async lesson => {
    //   await AsyncStorage.getItem(lesson.id)
    //     .then(async value => {
    //       if (value) {
    //         // error checking for if the async storage object was not deleted before
    //         // if we have a resumable download stored but the lesson is already downloaded,
    //         // we don't want to resume it
    //         FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
    //           contents => {
    //             if (!contents.includes(lesson.id + '.mp3')) {
    //               props.resumeDownload(lesson.id, value)
    //             ***REMOVED*** else {
    //               AsyncStorage.removeItem(lesson.id)
    //             ***REMOVED***
    //           ***REMOVED***
    //         )
    //       ***REMOVED***
    //     ***REMOVED***)
    //     .catch(err => props.removeDownload(lesson.id))
    //   await AsyncStorage.getItem(lesson.id + 'v')
    //     .then(async value => {
    //       if (value) {
    //         // error checking for if the async storage object was not deleted before
    //         // if we have a resumable download stored but the lesson is already downloaded,
    //         // we don't want to resume it
    //         FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
    //           contents => {
    //             if (!contents.includes(lesson.id + 'v.mp3')) {
    //               props.resumeDownload(lesson.id + 'v', value)
    //             ***REMOVED*** else {
    //               AsyncStorage.removeItem(lesson.id + 'v')
    //             ***REMOVED***
    //           ***REMOVED***
    //         )
    //       ***REMOVED***
    //     ***REMOVED***)
    //     .catch(err => props.removeDownload(lesson.id + 'v'))
    // ***REMOVED***)
  ***REMOVED***

  var direction = props.isRTL ? 'right' : 'left'
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition={direction***REMOVED***
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
    activeDatabase: state.database[activeGroup.language],
    isConnected: state.network.isConnected,
    translations: state.database[activeGroup.language].translations,
    activeGroup: activeGroup,
    toolkitEnabled: state.toolkitEnabled,
    groups: state.groups,
    security: state.security
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    updateConnectionStatus: status => {
      dispatch(updateConnectionStatus(status))
    ***REMOVED***,
    resumeDownload: (lessonID, downloadSnapshotJSON) => {
      dispatch(resumeDownload(lessonID, downloadSnapshotJSON))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***,
    storeData: (data, language) => {
      dispatch(storeData(data, language))
    ***REMOVED***,
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer)
