import NetInfo from '@react-native-community/netinfo'
import { createDrawerNavigator ***REMOVED*** from '@react-navigation/drawer'
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer
***REMOVED*** from '@react-navigation/native'
import React, { useEffect ***REMOVED*** from 'react'
import { connect ***REMOVED*** from 'react-redux'
import WahaDrawer from '../components/WahaDrawer'
import { scaleMultiplier ***REMOVED*** from '../constants'
import db from '../firebase/db'
import {
  storeLanguageData,
  storeLanguageSets
***REMOVED*** from '../redux/actions/databaseActions'
import { updateConnectionStatus ***REMOVED*** from '../redux/actions/networkActions'
import MainStack from './MainStack'

// Create our drawer navigator.
const Drawer = createDrawerNavigator()

function MainDrawer ({
  isRTL,
  activeDatabase,
  isConnected,
  translations,
  activeGroup,
  security,
  updateConnectionStatus,
  storeLanguageData
***REMOVED***) {
  /**
   * Determines whether a screen should be able to access the navigation drawer via gesture. Should only return true on the StorySetTabs navigator because this is the only spot we should be able to swipe to open the drawer.
   * @param {string***REMOVED*** route - The route passed from the navigator.
   * @return {shouldGestureBeEnabled***REMOVED***
   */
  function getGestureEnabled (route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'StorySetTabs'
    if (routeName === 'StorySetTabs') return true
    else return false
  ***REMOVED***

  useEffect(() => {
    // Add a listener for connection status and update the redux state accordingly.
    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
      updateConnectionStatus(state.isConnected)
    ***REMOVED***)

    //+ FIRESTORE LISTENERS

    var localLanguageInfo = {***REMOVED***
    var localSets = []

    db.collection('languages')
      .doc(activeGroup.language)
      .onSnapshot(function (doc) {
        if (doc.data()) {
          storeLanguageData(doc.data(), activeGroup.language)
          localLanguageInfo = doc.data()
        ***REMOVED***
      ***REMOVED***)

    db.collection('sets')
      .where('languageID', '==', activeGroup.language)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot.empty) {
          var sets = []
          querySnapshot.forEach(doc => {
            sets.push({
              id: doc.id,
              ...doc.data()
            ***REMOVED***)
          ***REMOVED***)
          storeLanguageSets(sets, activeGroup.language)
        ***REMOVED***
      ***REMOVED***)

    return function cleanup () {
      netInfoUnsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition={isRTL ? 'right' : 'left'***REMOVED***
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
    security: state.security
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
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer)
