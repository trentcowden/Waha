import { decode, encode ***REMOVED*** from 'base-64'
import { Audio ***REMOVED*** from 'expo-av'
import * as Font from 'expo-font'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { StatusBar, Text ***REMOVED*** from 'react-native'
import { Provider ***REMOVED*** from 'react-redux'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react'
import LoadingView from './components/LoadingView'
import Root from './navigation/Root'
import { persistor, store ***REMOVED*** from './redux/store'
import { colors ***REMOVED*** from './styles/colors'

// set the max font scaling allowed
Text.defaultProps = {
  ...Text.defaultProps,
  maxFontSizeMultiplier: 1.2
***REMOVED***
// only here because of wack errors, DON'T DELETE
if (!global.btoa) {
  global.btoa = encode
***REMOVED***
if (!global.atob) {
  global.atob = decode
***REMOVED***

export default function App () {
  //+ STATE

  // keeps track of whether fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false)

  //+ CONSTRUCTOR

  useEffect(() => {
    // load up fonts
    loadFonts()

    // lock orientation
    ScreenOrientation.supportsOrientationLockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    ).then(isSupported => {
      if (isSupported) {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      ***REMOVED*** else {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        )
      ***REMOVED***
    ***REMOVED***)

    // set audio mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    ***REMOVED***)
  ***REMOVED***, [])

  //+ FUNCTIONS

  // loads up all the fonts for all languages
  //! flag: update on new language family
  async function loadFonts () {
    await Font.loadAsync({
      waha: require('./assets/fonts/waha.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Medium.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'NotoSansArabic-Black': require('./assets/fonts/NotoSansArabic/NotoSansArabic-SemiCondensedBlack.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'NotoSansArabic-Bold': require('./assets/fonts/NotoSansArabic/NotoSansArabic-SemiCondensedSemiBold.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'NotoSansArabic-Regular': require('./assets/fonts/NotoSansArabic/NotoSansArabic-SemiCondensed.ttf')
    ***REMOVED***)
    setFontsLoaded(true)
  ***REMOVED***

  //+ RENDER

  if (fontsLoaded) {
    return (
      <Provider store={store***REMOVED***>
        <PersistGate loading={<LoadingView />***REMOVED*** persistor={persistor***REMOVED***>
          <StatusBar
            backgroundColor={colors.aquaHaze***REMOVED***
            barStyle='dark-content'
          />
          <Root />
        </PersistGate>
      </Provider>
    )
  ***REMOVED*** else {
    return null
  ***REMOVED***
***REMOVED***
