//standard stuff
import React from 'react';
import { StyleSheet, Text, View ***REMOVED*** from 'react-native';

//only here because of wack errors, DON'T DELETE
import { encode, decode ***REMOVED*** from 'base-64';
if (!global.btoa) {  global.btoa = encode ***REMOVED***
if (!global.atob) { global.atob = decode ***REMOVED***

//navigation
import WahaNavigator from './navigation/Navigation';

//redux
import { Provider ***REMOVED*** from 'react-redux'



export default function App() {
  return (
    <Provider store={store***REMOVED***>
      <WahaNavigator/>
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
