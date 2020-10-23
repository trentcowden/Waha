import React from 'react'
import { Dimensions, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import KeyLabel from '../components/KeyLabel'
import { colors, keyColors, scaleMultiplier ***REMOVED*** from '../constants'

function KeyLabels (props) {
  var keyLabel1 = props.keyOrder[1] ? (
    <KeyLabel
      backgroundColor={keyColors[props.keyOrder.substr(0, 2).replace(/^0/, '')]***REMOVED***
      number={props.keyOrder.substr(0, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel2 = props.keyOrder[3] ? (
    <KeyLabel
      backgroundColor={keyColors[props.keyOrder.substr(2, 2).replace(/^0/, '')]***REMOVED***
      number={props.keyOrder.substr(2, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel3 = props.keyOrder[5] ? (
    <KeyLabel
      backgroundColor={keyColors[props.keyOrder.substr(4, 2).replace(/^0/, '')]***REMOVED***
      number={props.keyOrder.substr(4, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel4 = props.keyOrder[7] ? (
    <KeyLabel
      backgroundColor={keyColors[props.keyOrder.substr(6, 2).replace(/^0/, '')]***REMOVED***
      number={props.keyOrder.substr(6, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel5 = props.keyOrder[9] ? (
    <KeyLabel
      backgroundColor={keyColors[props.keyOrder.substr(8, 2).replace(/^0/, '')]***REMOVED***
      number={props.keyOrder.substr(8, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel6 = props.keyOrder[11] ? (
    <KeyLabel
      backgroundColor={
        keyColors[props.keyOrder.substr(10, 2).replace(/^0/, '')]
      ***REMOVED***
      number={props.keyOrder.substr(10, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        flexDirection: props.isRTL ? 'row-reverse' : 'row'
      ***REMOVED******REMOVED***
    >
      <View style={styles.keyPlaceholder***REMOVED***>{keyLabel1***REMOVED***</View>
      <View style={styles.keyPlaceholder***REMOVED***>{keyLabel2***REMOVED***</View>
      <View style={styles.keyPlaceholder***REMOVED***>{keyLabel3***REMOVED***</View>
      <View style={styles.keyPlaceholder***REMOVED***>{keyLabel4***REMOVED***</View>
      <View style={styles.keyPlaceholder***REMOVED***>{keyLabel5***REMOVED***</View>
      <View style={styles.keyPlaceholder***REMOVED***>{keyLabel6***REMOVED***</View>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  keyPlaceholder: {
    width: Dimensions.get('window').width / 12 + 12,
    height: Dimensions.get('window').width / 12 + 12,
    borderRadius: Dimensions.get('window').width / 24 + 6,
    backgroundColor: colors.white,
    margin: 5 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    security: state.security,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(KeyLabels)
