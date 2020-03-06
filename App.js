//standard stuff
import React from 'react';
import { StyleSheet, Text, View ***REMOVED*** from 'react-native';

//only here because of wack errors, DON'T DELETE
import { encode, decode ***REMOVED*** from 'base-64';
if (!global.btoa) {  global.btoa = encode ***REMOVED***
if (!global.atob) { global.atob = decode ***REMOVED***

//navigation
import WahaNavigator from './navigation/Navigation';
import LoadingView from './components/LoadingView';

//redux
import { Provider ***REMOVED*** from 'react-redux'
import {persistor, store***REMOVED*** from './redux/store'
import { PersistGate ***REMOVED*** from 'redux-persist/lib/integration/react';

export default function App() {
  return (
    <Provider store={store***REMOVED***>
      <PersistGate loading={<LoadingView />***REMOVED*** persistor={persistor***REMOVED***>
        <WahaNavigator />
      </PersistGate>
    </Provider>
  );
***REMOVED***

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  ***REMOVED***,
***REMOVED***);
