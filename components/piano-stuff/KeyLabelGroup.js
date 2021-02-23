import React from 'react'
import { Dimensions, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import { colors, keyColors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont ***REMOVED*** from '../../styles/typography'
import KeyLabel from './KeyLabel'

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: getLanguageFont(activeGroup.language),
    security: state.security,
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

function KeyLabelGroup ({
  // Props passed from a parent component.s
  keyOrder,
  // Props passed from redux.
  font,
  security,
  isRTL,
  activeGroup
***REMOVED***) {
  var keyLabel1 = keyOrder[1] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(0, 2).replace(/^0/, '')]***REMOVED***
      number={keyOrder.substr(0, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel2 = keyOrder[3] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(2, 2).replace(/^0/, '')]***REMOVED***
      number={keyOrder.substr(2, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel3 = keyOrder[5] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(4, 2).replace(/^0/, '')]***REMOVED***
      number={keyOrder.substr(4, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel4 = keyOrder[7] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(6, 2).replace(/^0/, '')]***REMOVED***
      number={keyOrder.substr(6, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel5 = keyOrder[9] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(8, 2).replace(/^0/, '')]***REMOVED***
      number={keyOrder.substr(8, 2).replace(/^0/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel6 = keyOrder[11] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(10, 2).replace(/^0/, '')]***REMOVED***
      number={keyOrder.substr(10, 2).replace(/^0/, '')***REMOVED***
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
        flexDirection: isRTL ? 'row-reverse' : 'row'
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

export default connect(mapStateToProps)(KeyLabelGroup)
