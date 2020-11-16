import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  AppState,
  Image,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import GroupAvatar from '../components/GroupAvatar'
import BackButton from '../components/standard/BackButton'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { analyticsMode, dbMode, reduxMode ***REMOVED*** from '../modeSwitch'
import SetTabs from '../navigation/SetTabs'
import { setIsTimedOut, setTimer ***REMOVED*** from '../redux/actions/securityActions'
import AddSetScreen from '../screens/AddSetScreen'
import GroupsScreen from '../screens/GroupsScreen'
import KeyOrderSetScreen from '../screens/KeyOrderSetScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import LessonListScreen from '../screens/LessonListScreen'
import MobilizationToolsScreen from '../screens/MobilizationToolsScreen'
import PasscodeScreen from '../screens/PasscodeScreen'
import PianoAppScreen from '../screens/PianoAppScreen'
import PlayScreen from '../screens/PlayScreen'
import SecurityOnboardingSlidesScreen from '../screens/SecurityOnboardingSlidesScreen'
import SecurityScreen from '../screens/SecurityScreen'
import SplashScreen from '../screens/SplashScreen'
import StorageScreen from '../screens/StorageScreen'
import { BrandTypography, SystemTypography ***REMOVED*** from '../styles/typography'

LogBox.ignoreLogs(['Setting a timer'])

const Stack = createStackNavigator()

function MainStack (props) {
  async function getTime () {
    return Date.now()
  ***REMOVED***

  //+ APP STATE STUFF

  const [appState, setAppState] = useState('')

  function handleAppStateChange (change) {
    setAppState(change)
  ***REMOVED***

  useEffect(() => {
    if (appState === 'inactive' || appState === 'background') {
      // hide screen during multitasking / going home
      if (Platform.OS === 'ios') props.navigation.navigate('Splash')

      // store current time for timeout checking later
      props.setTimer(Date.now())
    ***REMOVED***
    if (appState === 'active') {
      if (props.security.securityEnabled) {
        // if we've already timed out, go straight to game
        if (props.security.isTimedOut) {
          props.navigation.navigate('PianoApp')
        ***REMOVED*** else {
          // check if we are now timed out
          // if we are, set isTimedOut to true and navigate to gamez
          if (
            Date.now() - props.security.timer >
            props.security.timeoutDuration
          ) {
            props.setIsTimedOut(true)
            props.navigation.navigate('PianoApp')
            // otherwise, if we haven't timed out, just go back to normal screen
          ***REMOVED*** else {
            if (Platform.OS === 'ios') props.navigation.goBack()
          ***REMOVED***
        ***REMOVED***
        // default: go back from splash to whatever screen we were on before
      ***REMOVED*** else {
        if (Platform.OS === 'ios') props.navigation.goBack()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [appState])

  // start up app state listeners
  useEffect(() => {
    const appStateUnsubscribe = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return function cleanup () {
      AppState.removeEventListener('change', handleAppStateChange)
    ***REMOVED***
  ***REMOVED***, [])

  //- function for fading in/out game screen
  const forFade = ({ current ***REMOVED***) => ({
    cardStyle: {
      opacity: current.progress
    ***REMOVED***
  ***REMOVED***)

  //+ RENDER

  return (
    <Stack.Navigator
      // set the initial screen based on whether security is enabled or not
      initialRouteName={props.security.securityEnabled ? 'PianoApp' : 'SetTabs'***REMOVED***
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
      <Stack.Screen
        name='SetTabs'
        component={SetTabs***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitle: () => (
            <Image
              style={styles.headerImage***REMOVED***
              source={{
                uri:
                  FileSystem.documentDirectory +
                  props.activeGroup.language +
                  '-header.png'
              ***REMOVED******REMOVED***
            />
          ),
          headerLeft: props.isRTL
            ? () => (
                <View>
                  {dbMode === 'test' ||
                  reduxMode === 'test' ||
                  analyticsMode === 'test' ? (
                    <Text
                      style={[
                        BrandTypography(
                          props,
                          'p',
                          'regular',
                          'center',
                          colors.red
                        ),
                        {
                          paddingHorizontal: 20
                        ***REMOVED***
                      ]***REMOVED***
                    >
                      TEST MODE
                    </Text>
                  ) : null***REMOVED***
                </View>
              )
            : () => (
                <View style={{ paddingHorizontal: 10 ***REMOVED******REMOVED***>
                  <GroupAvatar
                    style={{ backgroundColor: colors.white ***REMOVED******REMOVED***
                    emoji={props.activeGroup.emoji***REMOVED***
                    size={35***REMOVED***
                    onPress={() => props.navigation.toggleDrawer()***REMOVED***
                    isActive={true***REMOVED***
                  />
                </View>
              ),
          headerRight: props.isRTL
            ? () => (
                <View style={{ paddingHorizontal: 10 ***REMOVED******REMOVED***>
                  <GroupAvatar
                    style={{ backgroundColor: colors.white ***REMOVED******REMOVED***
                    emoji={props.activeGroup.emoji***REMOVED***
                    size={35***REMOVED***
                    onPress={() => props.navigation.toggleDrawer()***REMOVED***
                    isActive={true***REMOVED***
                  />
                </View>
              )
            : () => (
                <View>
                  {dbMode === 'test' ||
                  reduxMode === 'test' ||
                  analyticsMode === 'test' ? (
                    <Text
                      style={[
                        BrandTypography(
                          props,
                          'p',
                          'regular',
                          'center',
                          colors.red
                        ),
                        {
                          paddingHorizontal: 20
                        ***REMOVED***
                      ]***REMOVED***
                    >
                      TEST MODE
                    </Text>
                  ) : null***REMOVED***
                </View>
              )
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='LessonList'
        component={LessonListScreen***REMOVED***
        options={{
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
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddSet'
        component={AddSetScreen***REMOVED***
        options={{
          title: '',
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
          headerTitleStyle: SystemTypography(
            true,
            '',
            'medium',
            'center',
            colors.shark
          ),
          headerRight: props.isRTL
            ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
            : () => <View></View>,
          headerLeft: props.isRTL
            ? () => <View></View>
            : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
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
        name='MobilizationTools'
        component={MobilizationToolsScreen***REMOVED***
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
        name='SecurityOnboardingSlides'
        component={SecurityOnboardingSlidesScreen***REMOVED***
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
        name='PianoApp'
        component={PianoAppScreen***REMOVED***
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
          animationEnabled: false
        ***REMOVED******REMOVED***
      />
    </Stack.Navigator>
  )
***REMOVED***

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: 150,
    flex: 1,
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
