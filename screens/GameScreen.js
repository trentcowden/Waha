import { Audio ***REMOVED*** from 'expo-av'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { Image, SafeAreaView, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import Piano from '../components/Piano'

function GameScreen (props) {
  //// STATE

  const [pattern, setPattern] = useState('')

  //// CONSTRUCTOR

  useEffect(() => {
    console.log(pattern)
    if (pattern.includes(props.security.code)) {
      var note = new Audio.Sound()
      note
        .loadAsync(require('../assets/notes/Success.mp3'))
        .then(() => note.playAsync())
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'SetsRoot' ***REMOVED***]
      ***REMOVED***)
    ***REMOVED***
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
    backgroundColor: colors.aquaHaze,
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
