import React, { useEffect, useState ***REMOVED*** from 'react'
import * as Font from 'expo-font'
import Root from './navigation/Root'
import LoadingView from './components/LoadingView'
import { Provider ***REMOVED*** from 'react-redux'
import { persistor, store ***REMOVED*** from './redux/store'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react'

// only here because of wack errors, DON'T DELETE
import { encode, decode ***REMOVED*** from 'base-64'
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

  /// / FUNCTIONS

  // loads up all the fonts
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
      'playfairdisplay-black': require('./assets/fonts/PlayfairDisplay/PlayfairDisplay-Black.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'playfairdisplay-medium': require('./assets/fonts/PlayfairDisplay/PlayfairDisplay-Medium.ttf')
    ***REMOVED***)
    await Font.loadAsync({
      'playfairdisplay-regular': require('./assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf')
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
