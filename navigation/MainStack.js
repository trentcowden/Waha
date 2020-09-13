import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import i18n from 'i18n-js'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { AppState, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { setIsTimedOut, setTimer ***REMOVED*** from '../redux/actions/securityActions'
import AddEditGroupScreen from '../screens/AddEditGroupScreen'
import GameScreen from '../screens/GameScreen'
import GroupsScreen from '../screens/GroupsScreen'
import KeyOrderSetScreen from '../screens/KeyOrderSetScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import LessonListScreen from '../screens/LessonListScreen'
import MTScreen from '../screens/MTScreen'
import PasscodeScreen from '../screens/PasscodeScreen'
import PlayScreen from '../screens/PlayScreen'
import SecurityOnboardingScreen from '../screens/SecurityOnboardingScreen'
import SecurityScreen from '../screens/SecurityScreen'
import SplashScreen from '../screens/SplashScreen'
import StorageScreen from '../screens/StorageScreen'
import en from '../translations/en.json'
import SetsRoot from './SetsRoot'

i18n.translations = {
  en
***REMOVED***
const Stack = createStackNavigator()

function MainStack (props) {
  async function getTime () {
    return Date.now()
  ***REMOVED***

  const [appState, setAppState] = useState('')

  function handleAppStateChange (change) {
    setAppState(change)
  ***REMOVED***

  useEffect(() => {
    if (appState === 'inactive' || appState === 'background') {
      // hide screen during multitasking / going home
      props.navigation.navigate('Splash')

      // store current time for timeout checking later
      props.setTimer(Date.now())
    ***REMOVED***
    if (appState === 'active') {
      if (props.security.securityEnabled) {
        // if we've already timed out, go straight to game
        if (props.security.isTimedOut) {
          props.navigation.navigate('Game')
        ***REMOVED*** else {
          // check if we are now timed out
          // if we are, set isTimedOut to true and navigate to gamez
          if (
            Date.now() - props.security.timer >
            props.security.timeoutDuration
          ) {
            props.setIsTimedOut(true)
            props.navigation.navigate('Game')
            // otherwise, if we haven't timed out, just go back to normal screen
          ***REMOVED*** else {
            props.navigation.goBack()
          ***REMOVED***
        ***REMOVED***
        // default: go back from splash to whatever screen we were on before
      ***REMOVED*** else {
        props.navigation.goBack()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [appState])

  useEffect(() => {
    const appStateUnsubscribe = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return function cleanup () {
      AppState.removeEventListener('change', handleAppStateChange)
    ***REMOVED***
  ***REMOVED***, [props.security.securityEnabled, props.security.activateOnSwitch])

  const forFade = ({ current ***REMOVED***) => ({
    cardStyle: {
      opacity: current.progress
    ***REMOVED***
  ***REMOVED***)

  return (
    //global navigation options
    <Stack.Navigator
      initialRouteName={props.security.securityEnabled ? 'Game' : 'SetsRoot'***REMOVED***
      screenOptions={{
        gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
        gestureResponseDistance: {
          horizontal: 50 * scaleMultiplier,
          vertical: 135
        ***REMOVED***,
        headerTitleAlign: 'center'
      ***REMOVED******REMOVED***
      mode='card'
    >
      {/* Study Set Screen */***REMOVED***
      <Stack.Screen
        name='SetsRoot'
        component={SetsRoot***REMOVED***
        options={{ headerShown: false ***REMOVED******REMOVED***
      />

      {/* Lesson List Screen */***REMOVED***
      <Stack.Screen
        name='LessonList'
        component={LessonListScreen***REMOVED***
        options={{
          //gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleAlign: 'center'
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Play'
        component={PlayScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.chateau,
            fontFamily: props.font + '-medium'
          ***REMOVED***,
          gestureEnabled: false
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Groups'
        component={GroupsScreen***REMOVED***
        options={{
          headerTitle: props.translations.groups.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddGroup'
        component={AddEditGroupScreen***REMOVED***
        options={{
          gestureEnabled: false,
          headerTitle: props.translations.add_edit_group.header_add,
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddLanguage'
        component={LanguageSelectScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***,
          headerRight: props.isRTL
            ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
            : () => <View></View>,
          headerLeft: props.isRTL
            ? () => <View></View>
            : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='EditGroup'
        component={AddEditGroupScreen***REMOVED***
        options={{
          gestureEnabled: false,
          headerTitle: props.translations.add_edit_group.header_edit,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Storage'
        component={StorageScreen***REMOVED***
        options={{
          headerTitle: props.translations.storage.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='MT'
        component={MTScreen***REMOVED***
        options={{
          headerTitle: props.translations.mobilization_tools.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Passcode'
        component={PasscodeScreen***REMOVED***
        options={{
          headerTitle: props.translations.mobilization_tools.header,
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Security'
        component={SecurityScreen***REMOVED***
        options={{
          headerTitle: props.translations.security.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='SecurityOnboarding'
        component={SecurityOnboardingScreen***REMOVED***
        options={{
          headerTitle: props.translations.security.header,
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='KeyOrderSet_Initial'
        component={KeyOrderSetScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='KeyOrderSet_Confirm'
        component={KeyOrderSetScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='KeyOrderChange_Old'
        component={KeyOrderSetScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='KeyOrderChange_Initial'
        component={KeyOrderSetScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='KeyOrderChange_Confirm'
        component={KeyOrderSetScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Game'
        component={GameScreen***REMOVED***
        options={{
          gestureEnabled: false,
          headerShown: false,
          cardStyleInterpolator: forFade
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Splash'
        component={SplashScreen***REMOVED***
        options={{
          gestureEnabled: false,
          headerShown: false,
          // cardStyleInterpolator: forFade
          animationEnabled: false
        ***REMOVED******REMOVED***
      />
    </Stack.Navigator>
  )
***REMOVED***

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: 120,
    height: 40,
    alignSelf: 'center'
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup,
    security: state.security
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setTimer: ms => {
      dispatch(setTimer(ms))
    ***REMOVED***,
    setIsTimedOut: toSet => {
      dispatch(setIsTimedOut(toSet))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(MainStack)
