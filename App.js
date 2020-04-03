//standard stuff
import React, { useEffect, useState ***REMOVED*** from 'react';
import * as Font from 'expo-font'

//navigation
import WahaNavigator from './navigation/WahaNavigator';
import LoadingView from './components/LoadingView';

//redux
import { Provider ***REMOVED*** from 'react-redux'
import { persistor, store ***REMOVED*** from './redux/store'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react';

//only here because of wack errors, DON'T DELETE
import { encode, decode ***REMOVED*** from 'base-64';
if (!global.btoa) { global.btoa = encode ***REMOVED***
if (!global.atob) { global.atob = decode ***REMOVED***

export default function App() {
   useEffect(() => {
      loadFonts();
   ***REMOVED***, [])

   const [fontsLoaded, setFontsLoaded] = useState(false)

   async function loadFonts() {
      await Font.loadAsync({
         'black': require('./assets/fonts/Roboto-Black.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'bold': require('./assets/fonts/Roboto-Bold.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'medium': require('./assets/fonts/Roboto-Medium.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'regular': require('./assets/fonts/Roboto-Regular.ttf'),
      ***REMOVED***);
      await Font.loadAsync({
         'light': require('./assets/fonts/Roboto-Light.ttf'),
      ***REMOVED***);
      setFontsLoaded(true);
   ***REMOVED***

   if (fontsLoaded) {
      return (
         <Provider store={store***REMOVED***>
            <PersistGate loading={<LoadingView />***REMOVED*** persistor={persistor***REMOVED***>
               <WahaNavigator/>
            </PersistGate>
         </Provider>
      );
   ***REMOVED*** else {
      return null
   ***REMOVED***
***REMOVED***