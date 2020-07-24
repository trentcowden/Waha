import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier, keyColors ***REMOVED*** from '../constants'
import KeyLabel from '../components/KeyLabel'
import { Audio ***REMOVED*** from 'expo-av'

function Piano (props) {
  // RENDER

  // require keyboard notes
  var C = require('../assets/notes/C.mp3')
  var Db = require('../assets/notes/Db.mp3')
  var D = require('../assets/notes/D.mp3')
  var Eb = require('../assets/notes/Eb.mp3')
  var E = require('../assets/notes/E.mp3')
  var F = require('../assets/notes/F.mp3')
  var Gb = require('../assets/notes/Gb.mp3')
  var G = require('../assets/notes/G.mp3')
  var Ab = require('../assets/notes/Ab.mp3')
  var A = require('../assets/notes/A.mp3')
  var Bb = require('../assets/notes/Bb.mp3')
  var B = require('../assets/notes/B.mp3')

  function playNote (number) {
    var note = new Audio.Sound()
    switch (number) {
      case 1:
        note.loadAsync(C).then(() => note.playAsync())
        break
      case 2:
        note.loadAsync(Db).then(() => note.playAsync())
        break
      case 3:
        note.loadAsync(D).then(() => note.playAsync())
        break
      case 4:
        note.loadAsync(Eb).then(() => note.playAsync())
        break
      case 5:
        note.loadAsync(E).then(() => note.playAsync())
        break
      case 6:
        note.loadAsync(F).then(() => note.playAsync())
        break
      case 7:
        note.loadAsync(Gb).then(() => note.playAsync())
        break
      case 8:
        note.loadAsync(G).then(() => note.playAsync())
        break
      case 9:
        note.loadAsync(Ab).then(() => note.playAsync())
        break
      case 10:
        note.loadAsync(A).then(() => note.playAsync())
        break
      case 11:
        note.loadAsync(Bb).then(() => note.playAsync())
        break
      case 12:
        note.loadAsync(B).then(() => note.playAsync())
        break
    ***REMOVED***
  ***REMOVED***

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'flex-start'
      ***REMOVED******REMOVED***
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          position: 'absolute',
          zIndex: 2
        ***REMOVED******REMOVED***
      >
        <View style={{ flex: 0.5 ***REMOVED******REMOVED*** />
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '02')
            playNote(2)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['2']***REMOVED*** number='2' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '04')
            playNote(4)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['4']***REMOVED*** number='4' />
        </TouchableOpacity>
        <View style={{ flex: 1 ***REMOVED******REMOVED*** />
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '07')
            playNote(7)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['7']***REMOVED*** number='7' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '09')
            playNote(9)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['9']***REMOVED*** number='9' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '11')
            playNote(11)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['11']***REMOVED*** number='11' />
        </TouchableOpacity>
        <View style={{ flex: 0.5 ***REMOVED******REMOVED*** />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%'
        ***REMOVED******REMOVED***
      >
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '01')
            playNote(1)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['1']***REMOVED*** number='1' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '03')
            playNote(3)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['3']***REMOVED*** number='3' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '05')
            playNote(5)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['5']***REMOVED*** number='5' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '06')
            playNote(6)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['6']***REMOVED*** number='6' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '08')
            playNote(8)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['8']***REMOVED*** number='8' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '10')
            playNote(10)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['10']***REMOVED*** number='10' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => {
            props.setPattern(pattern => pattern + '12')
            playNote(12)
          ***REMOVED******REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['12']***REMOVED*** number='12' />
        </TouchableOpacity>
      </View>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  whiteKey: {
    flex: 1,
    height: Dimensions.get('window').height / 2.5,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    zIndex: 0
  ***REMOVED***,
  blackKey: {
    flex: 1,
    height: Dimensions.get('window').height / 4,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    zIndex: 1,
    backgroundColor: '#000000'
  ***REMOVED***,
  circle: {
    width: Dimensions.get('window').width / 10,
    height: Dimensions.get('window').width / 10,
    borderRadius: Dimensions.get('window').width / 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    zIndex: 3,
    marginBottom: 10
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(Piano)
