import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function KeyLabel (props) {
  // RENDER

  return (
    <View
      style={[
        styles.circle,
        { backgroundColor: props.backgroundColor ***REMOVED***,
        props.style
      ]***REMOVED***
    >
      <Text
        style={{
          fontFamily: props.font + '-medium',
          fontSize: 22 * scaleMultiplier,
          color: '#1D1E20'
        ***REMOVED******REMOVED***
      >
        {props.number***REMOVED***
      </Text>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  circle: {
    width: Dimensions.get('window').width / 10,
    height: Dimensions.get('window').width / 10,
    borderRadius: Dimensions.get('window').width / 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default connect(mapStateToProps)(KeyLabel)
