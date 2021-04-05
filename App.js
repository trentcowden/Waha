import { decode, encode ***REMOVED*** from 'base-64'
import { Audio ***REMOVED*** from 'expo-av'
import * as Font from 'expo-font'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { StatusBar ***REMOVED*** from 'react-native'
import { Provider ***REMOVED*** from 'react-redux'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react'
import LoadingView from './components/LoadingView'
import { lockPortrait ***REMOVED*** from './constants'
import Root from './navigation/Root'
import { persistor, store ***REMOVED*** from './redux/store'
import { colors ***REMOVED*** from './styles/colors'

// These are only here because of some wack errors. Please do not delete.
if (!global.btoa) {
  global.btoa = encode
***REMOVED***
if (!global.atob) {
  global.atob = decode
***REMOVED***

/**
 * App.js is the most root level component and is the start of all rendering for Waha.
 */
export default function App () {
  /**  Keeps track of whether all the fonts are loaded. */
  const [fontsLoaded, setFontsLoaded] = useState(false)

  /**
   * useEffect function that acts as a constructor and takes care of a few tasks we always need to do when we start up the app.
   * @function
   */
  useEffect(() => {
    // Load up all the fonts.
    loadFonts()

    // Lock our orientation to portrait.
    lockPortrait(() => {***REMOVED***)

    // Set up some config options for app audio.
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    ***REMOVED***)
  ***REMOVED***)

  /**
   * Loads all of the fonts to be used across all languages in Waha.
   */
  async function loadFonts () {
    // Load the icon font.
    await Font.loadAsync({
      waha: require('./assets/fonts/waha_icon_font.ttf')
    ***REMOVED***)

    // Load the language-specific fonts.
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

    // Once we finish loading every font, set our fontsLoaded state to true so we know we can render the app now.
    setFontsLoaded(true)
  ***REMOVED***

  if (fontsLoaded) {
    return (
      // The provider passes the redux store to every component in Waha.
      <Provider store={store***REMOVED***>
        {/* The persist gate allows the redux data to persist across restarts. */***REMOVED***
        <PersistGate loading={<LoadingView />***REMOVED*** persistor={persistor***REMOVED***>
          {/* Set a few settings related to the status bar. */***REMOVED***
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
