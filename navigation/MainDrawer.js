import React, { useState, useEffect ***REMOVED*** from 'react'
import NetInfo from '@react-native-community/netinfo'
import { AsyncStorage ***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'
import WahaDrawer from '../components/WahaDrawer'
import { updateConnectionStatus ***REMOVED*** from '../redux/actions/networkActions'
import MainStack from './MainStack'
import { NavigationContainer ***REMOVED*** from '@react-navigation/native'
import { createDrawerNavigator ***REMOVED*** from '@react-navigation/drawer'
import { connect ***REMOVED*** from 'react-redux'
import {
  resumeDownload,
  removeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import * as FileSystem from 'expo-file-system'
import { db, storeData ***REMOVED*** from '../redux/actions/databaseActions'

const Drawer = createDrawerNavigator()

//allows only accessing hamburger swipe from study set screen
function getGestureEnabled (route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || 'SetsRoot'
  if (routeName === 'SetsRoot') return true
  else return false
***REMOVED***

function MainDrawer (props) {
  useEffect(() => {
    // add listener for connection status and update it accordingly
    const unsubscribe = NetInfo.addEventListener(state => {
      props.updateConnectionStatus(state.isConnected)
    ***REMOVED***)

    // add listener for receiving updates in firebase
    db.collection('languages')
      .doc(props.activeGroup.language)
      .onSnapshot(function (doc) {
        props.storeData(doc.data(), props.activeGroup.language)
      ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  // if we connect to internet, check to see if we have any paused downloads
  useEffect(() => {
    if (props.isConnected) {
      checkPausedDownloads()
    ***REMOVED***
  ***REMOVED***, [props.isConnected])

  //// FUNCTIONS
  async function checkPausedDownloads () {
    props.activeDatabase.lessons.forEach(async lesson => {
      await AsyncStorage.getItem(lesson.id)
        .then(async value => {
          if (value) {
            // error checking for if the async storage object was not deleted before
            // if we have a resumable download stored but the lesson is already downloaded,
            // we don't want to resume it
            FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
              contents => {
                if (!contents.includes(lesson.id + '.mp3')) {
                  props.resumeDownload(lesson.id, value)
                ***REMOVED*** else {
                  AsyncStorage.removeItem(lesson.id)
                ***REMOVED***
              ***REMOVED***
            )
          ***REMOVED***
        ***REMOVED***)
        .catch(err => props.removeDownload(lesson.id))
    ***REMOVED***)
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
        edgeWidth={300 * scaleMultiplier***REMOVED***
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
    activeGroup: activeGroup
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
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer)
