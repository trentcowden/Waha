import React, { useEffect, useState ***REMOVED*** from 'react';
import * as Font from 'expo-font'
import WahaNavigator from './navigation/WahaNavigator';
import LoadingView from './components/LoadingView';
import { Provider ***REMOVED*** from 'react-redux'
import { persistor, store ***REMOVED*** from './redux/store'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react';

// only here because of wack errors, DON'T DELETE
import { encode, decode ***REMOVED*** from 'base-64';
if (!global.btoa) { global.btoa = encode ***REMOVED***
if (!global.atob) { global.atob = decode ***REMOVED***

export default function App() {

   //// STATE

   // keeps track of whether fonts are loaded
   const [fontsLoaded, setFontsLoaded] = useState(false)

   
   //// CONSTRUCTOR

   useEffect(() => {
      loadFonts();
   ***REMOVED***, [])

   //// FUNCTIONS

   // loads up all the fonts
   async function loadFonts() {
      await Font.loadAsync({
         'icomoon': require('./assets/fonts/icomoon.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'black': require('./assets/fonts/Roboto-Black.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'medium': require('./assets/fonts/Roboto-Medium.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'regular': require('./assets/fonts/Roboto-Regular.ttf'),
      ***REMOVED***);
      setFontsLoaded(true);
   ***REMOVED***

   //// RENDER

   if (fontsLoaded) {
      return (
         <Provider store={store***REMOVED***>
            <PersistGate loading={<LoadingView />***REMOVED*** persistor={persistor***REMOVED***>
               <WahaNavigator />
            </PersistGate>
         </Provider>
      );
   ***REMOVED*** else {
      return null
   ***REMOVED***
***REMOVED***