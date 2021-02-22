import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { AppState, LogBox, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import GroupAvatar from '../components/GroupAvatar'
import ScreenHeaderImage from '../components/ScreenHeaderImage'
import BackButton from '../components/standard/BackButton'
import TestModeDisplay from '../components/TestModeDisplay'
import { scaleMultiplier ***REMOVED*** from '../constants'
import StorySetTabs from '../navigation/StorySetTabs'
import { setIsTimedOut, setTimer ***REMOVED*** from '../redux/actions/securityActions'
import AddSetScreen from '../screens/AddSetScreen'
import GroupsScreen from '../screens/GroupsScreen'
import KeyOrderSetScreen from '../screens/KeyOrderSetScreen'
import LanguageInstanceInstallScreen from '../screens/LanguageInstanceInstallScreen'
import LessonsScreen from '../screens/LessonsScreen'
import LoadingScreen from '../screens/LoadingScreen'
import MobilizationToolsScreen from '../screens/MobilizationToolsScreen'
import MobilizationToolsUnlockScreen from '../screens/MobilizationToolsUnlockScreen'
import PianoAppScreen from '../screens/PianoAppScreen'
import PlayScreen from '../screens/PlayScreen'
import SecurityModeScreen from '../screens/SecurityModeScreen'
import SecurityOnboardingSlidesScreen from '../screens/SecurityOnboardingSlidesScreen'
import SplashScreen from '../screens/SplashScreen'
import StorageScreen from '../screens/StorageScreen'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, SystemTypography ***REMOVED*** from '../styles/typography'

// Ignore the Android timer warning because it's annoying.
LogBox.ignoreLogs(['Setting a timer'])

// Create the stack navigator.
const Stack = createStackNavigator()

/**
 * This component renders the main navigation stack used for almost all the screens in Waha. It also contains some logic related to things that happen globally in the background. The reason some logic would be here instead of in MainDrawer.js is because this component has access to the navigation prop.
 */
function MainStack ({
  // Props passed from navigation.
  navigation: { navigate, goBack, toggleDrawer ***REMOVED***,
  // Props passed from redux.
  isRTL,
  translations,
  font,
  activeGroup,
  security,
  languageCoreFilesToUpdate,
  setTimer,
  setIsTimedOut
***REMOVED***) {
  /** Keeps track of the current app state. Can be "active", "inactive", or "background". Set by the app state listener function. */
  const [appState, setAppState] = useState('')

  /**
   * useEffect function that acts as a constructor. It starts up the app state listener and cleans it up as well.
   * @function
   */
  useEffect(() => {
    const appStateUnsubscribe = AppState.addEventListener('change', change =>
      setAppState(change)
    )

    return function cleanup () {
      AppState.removeEventListener('change', change => setAppState(change))
    ***REMOVED***
  ***REMOVED***, [])

  /**
   * useEffect function that reacts to changes in app state changes. This is used to display the splash screen to hide the app preview in multitasking as well as keeping track of security mode timeouts.
   * @function
   */
  useEffect(() => {
    if (appState === 'inactive' || appState === 'background') {
      // Hide screen during multitasking or going to the home screen on iOS.
      if (Platform.OS === 'ios') navigate('Splash')

      // Store the current time for security mode timeout checking later.
      setTimer(Date.now())
    ***REMOVED*** else if (appState === 'active') {
      if (security.securityEnabled) {
        // If we've already timed out...
        if (security.isTimedOut) {
          // ...then go straight to the piano screen.
          navigate('PianoApp')
        ***REMOVED*** else {
          // If we are now timed out, set isTimedOut to true and navigate to the piano screen.
          if (Date.now() - security.timer > security.timeoutDuration) {
            setIsTimedOut(true)
            navigate('PianoApp')
            // Otherwise, if we haven't timed out yet, on Android, do nothing. On iOS, we will have navigated to the splash screen upon coming back into the app so we have to go back to get back to the screen we were on before.
          ***REMOVED*** else {
            if (Platform.OS === 'ios') goBack()
          ***REMOVED***
        ***REMOVED***
        // Similarly, on iOS, we have to go back when we get back into the app since we previously navigated to the splash screen.
      ***REMOVED*** else {
        if (Platform.OS === 'ios') goBack()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [appState])

  /**
   * Function for fading out from the piano screen into the normal navigator.
   */
  const forFade = ({ current ***REMOVED***) => ({
    cardStyle: {
      opacity: current.progress
    ***REMOVED***
  ***REMOVED***)

  return (
    <Stack.Navigator
      // Set the initial screen based on whether security is enabled or not. If it is, our initial screen should be the pianp app. Otherwise, it should be the StorySetTabs.
      initialRouteName={security.securityEnabled ? 'PianoApp' : 'StorySetTabs'***REMOVED***
      screenOptions={{
        // The drawer must open from the opposite side if the active group's language is RTL.
        gestureDirection: isRTL ? 'horizontal-inverted' : 'horizontal',
        gestureResponseDistance: {
          horizontal: 50 * scaleMultiplier,
          vertical: 135
        ***REMOVED***,
        headerTitleAlign: 'center'
      ***REMOVED******REMOVED***
      mode='card'
    >
      <Stack.Screen
        name='StorySetTabs'
        component={StorySetTabs***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.aquaHaze,
            // Remove the header shadow on Android.
            elevation: 0
          ***REMOVED***,
          headerTitle: () => <ScreenHeaderImage />,
          headerLeft: isRTL
            ? () => <TestModeDisplay />
            : () => (
                <View style={{ paddingHorizontal: 10 ***REMOVED******REMOVED***>
                  <GroupAvatar
                    style={{ backgroundColor: colors.white, zIndex: 0 ***REMOVED******REMOVED***
                    emoji={activeGroup.emoji***REMOVED***
                    size={35***REMOVED***
                    onPress={() => toggleDrawer()***REMOVED***
                    isActive={true***REMOVED***
                  />
                  {languageCoreFilesToUpdate.length !== 0 ? (
                    // <View
                    //   style={{
                    //     width: '100%',
                    //     height: 12,
                    //     position: 'absolute',
                    //     alignSelf: 'flex-start'
                    //   ***REMOVED******REMOVED***
                    // >
                    <View
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        paddingHorizontal: 10
                      ***REMOVED******REMOVED***
                    >
                      <View
                        style={{
                          width: 13 * scaleMultiplier,
                          height: 13 * scaleMultiplier,
                          borderRadius: 6.5 * scaleMultiplier,
                          backgroundColor: colors.apple,
                          alignSelf: 'flex-end',
                          zIndex: 100
                        ***REMOVED******REMOVED***
                      />
                      <View style={{ width: 5 ***REMOVED******REMOVED*** />
                    </View>
                  ) : null***REMOVED***
                </View>
              ),
          headerRight: isRTL
            ? () => (
                <View style={{ paddingHorizontal: 10 ***REMOVED******REMOVED***>
                  <GroupAvatar
                    style={{ backgroundColor: colors.white ***REMOVED******REMOVED***
                    emoji={activeGroup.emoji***REMOVED***
                    size={35***REMOVED***
                    onPress={() => toggleDrawer()***REMOVED***
                    isActive={true***REMOVED***
                  />
                  {languageCoreFilesToUpdate.length !== 0 ? (
                    // <View
                    //   style={{
                    //     width: '100%',
                    //     height: 12,
                    //     position: 'absolute',
                    //     alignSelf: 'flex-start'
                    //   ***REMOVED******REMOVED***
                    // >
                    <View
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10
                      ***REMOVED******REMOVED***
                    >
                      <View
                        style={{
                          width: 13 * scaleMultiplier,
                          height: 13 * scaleMultiplier,
                          borderRadius: 6.5 * scaleMultiplier,
                          backgroundColor: colors.apple,
                          alignSelf: 'flex-end',
                          zIndex: 100
                        ***REMOVED******REMOVED***
                      />
                      <View style={{ width: 5 ***REMOVED******REMOVED*** />
                    </View>
                  ) : null***REMOVED***
                </View>
              )
            : () => <TestModeDisplay />
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Lessons'
        component={LessonsScreen***REMOVED***
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
            fontFamily: 'Roboto-Bold'
          ***REMOVED***,
          // Disable gestures on this screen because there are already horizontally-swipable elements on it.
          gestureEnabled: false
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Groups'
        component={GroupsScreen***REMOVED***
        options={{
          headerTitle: translations.groups.header,
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
            fontFamily: font + '-Bold'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='SubsequentlLanguageInstanceInstall'
        component={LanguageInstanceInstallScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          // Use the system font for this header since this title is displayed in the phone's language, not the active group's language.
          headerTitleStyle: SystemTypography(
            true,
            '',
            'Bold',
            'center',
            colors.shark
          ),
          headerRight: isRTL
            ? () => <BackButton onPress={() => goBack()***REMOVED*** />
            : () => {***REMOVED***,
          headerLeft: isRTL
            ? () => {***REMOVED***
            : () => <BackButton onPress={() => goBack()***REMOVED*** />
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Storage'
        component={StorageScreen***REMOVED***
        options={{
          headerTitle: translations.storage.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: font + '-Bold'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='MobilizationTools'
        component={MobilizationToolsScreen***REMOVED***
        options={{
          headerTitle: translations.mobilization_tools.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: font + '-Bold'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='MobilizationToolsUnlock'
        component={MobilizationToolsUnlockScreen***REMOVED***
        options={{
          headerTitle: translations.mobilization_tools.header,
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: font + '-Bold'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='SecurityMode'
        component={SecurityModeScreen***REMOVED***
        options={{
          headerTitle: translations.security.header,
          headerStyle: {
            backgroundColor: colors.aquaHaze
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: font + '-Bold'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='SecurityOnboardingSlides'
        component={SecurityOnboardingSlidesScreen***REMOVED***
        options={{
          headerTitle: translations.security.header,
          headerStyle: {
            backgroundColor: colors.white
          ***REMOVED***,
          headerTitleStyle: {
            color: colors.shark,
            fontFamily: font + '-Bold'
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
            fontFamily: font + '-Bold'
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
            fontFamily: font + '-Bold'
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
            fontFamily: font + '-Bold'
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
            fontFamily: font + '-Bold'
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
            fontFamily: font + '-Bold'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='PianoApp'
        component={PianoAppScreen***REMOVED***
        options={{
          gestureEnabled: false,
          headerShown: false,
          // Set the transition out of the piano screen to be a fade instead of a swipe.
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
      <Stack.Screen
        name='Updating'
        component={LoadingScreen***REMOVED***
        options={{
          gestureEnabled: false,
          headerShown: false,
          animationEnabled: false
        ***REMOVED******REMOVED***
      />
      {/* <Stack.Screen
        name='Video'
        component={VideoScreen***REMOVED***
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade
        ***REMOVED******REMOVED***
      /> */***REMOVED***
    </Stack.Navigator>
  )
***REMOVED***

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup,
    security: state.security,
    languageCoreFilesToUpdate: state.database.languageCoreFilesToUpdate
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
