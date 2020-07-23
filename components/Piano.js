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
function Piano (props) {
  // RENDER

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
          onPress={() => props.setPattern(pattern => pattern + '02')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['2']***REMOVED*** number='2' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '04')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['4']***REMOVED*** number='4' />
        </TouchableOpacity>
        <View style={{ flex: 1 ***REMOVED******REMOVED*** />
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '07')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['7']***REMOVED*** number='7' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '09')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['9']***REMOVED*** number='9' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blackKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '11')***REMOVED***
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
          onPress={() => props.setPattern(pattern => pattern + '01')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['1']***REMOVED*** number='1' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '03')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['3']***REMOVED*** number='3' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '05')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['5']***REMOVED*** number='5' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '06')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['6']***REMOVED*** number='6' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '08')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['8']***REMOVED*** number='8' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '10')***REMOVED***
        >
          <KeyLabel backgroundColor={keyColors['10']***REMOVED*** number='10' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteKey***REMOVED***
          onPress={() => props.setPattern(pattern => pattern + '12')***REMOVED***
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
