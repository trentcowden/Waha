import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
  Clipboard,
  Alert,
  Switch,
  SafeAreaView
***REMOVED*** from 'react-native'
import Piano from '../components/Piano'
import { connect ***REMOVED*** from 'react-redux'

function GameScreen (props) {
  //// STATE

  const [pattern, setPattern] = useState('')

  //// CONSTRUCTOR

  useEffect(() => {
    console.log(pattern)
    if (pattern.includes(props.security.code))
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'SetsRoot' ***REMOVED***]
      ***REMOVED***)
  ***REMOVED***, [pattern])

  //// RENDER

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <View
        style={{
          height: '25%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Image source={require('../assets/wahaIcon.png')***REMOVED*** />
      </View>
      <Piano setPattern={setPattern***REMOVED*** />
    </SafeAreaView>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'flex-start'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  return {
    security: state.security
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(GameScreen)
