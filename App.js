// only here because of wack errors, DON'T DELETE
import { decode, encode ***REMOVED*** from 'base-64'
import * as Font from 'expo-font'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { Provider ***REMOVED*** from 'react-redux'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react'
import LoadingView from './components/LoadingView'
import Root from './navigation/Root'
import { persistor, store ***REMOVED*** from './redux/store'

if (!global.btoa) {
  global.btoa = encode
***REMOVED***
if (!global.atob) {
  global.atob = decode
***REMOVED***

export default function App () {
  /// STATE

  // keeps track of whether fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false)

  /// / CONSTRUCTOR

  useEffect(() => {
    loadFonts()
  ***REMOVED***, [])

  //+ FUNCTIONS

  // lock orientation to portrait or upside down
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  // loads up all the fonts for all languages
  async function loadFonts () {
    await Font.loadAsync({
      waha: require('./assets/fonts/waha.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'roboto-black': require('./assets/fonts/Roboto/Roboto-Black.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'roboto-medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'merriweather-black': require('./assets/fonts/Merriweather/Merriweather-Black.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'merriweather-medium': require('./assets/fonts/Merriweather/Merriweather-Bold.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'merriweather-regular': require('./assets/fonts/Merriweather/Merriweather-Regular.ttf')
    ***REMOVED***)
    setFontsLoaded(true)
  ***REMOVED***

  /// / RENDER

  if (fontsLoaded) {
    return (
      <Provider store={store***REMOVED***>
        <PersistGate loading={<LoadingView />***REMOVED*** persistor={persistor***REMOVED***>
          <Root />
        </PersistGate>
      </Provider>
    )
  ***REMOVED*** else {
    return null
  ***REMOVED***
***REMOVED***
