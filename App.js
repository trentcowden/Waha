import { decode, encode ***REMOVED*** from 'base-64'
import * as Font from 'expo-font'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { StatusBar ***REMOVED*** from 'react-native'
import { Provider ***REMOVED*** from 'react-redux'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react'
import LoadingView from './components/LoadingView'
import { colors ***REMOVED*** from './constants'
import Root from './navigation/Root'
import { persistor, store ***REMOVED*** from './redux/store'

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
    loadFonts()
  ***REMOVED***, [])

  //+ FUNCTIONS

  // loads up all the fonts for all languages
  //! flag: update on new language family
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
