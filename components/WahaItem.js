import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function WahaItem (props) {
  return props.onPress ? (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row'
        ***REMOVED***,
        props.style
      ]***REMOVED***
      onPress={props.onPress***REMOVED***
    >
      <Text
        style={{
          fontFamily: props.font + '-medium',
          fontSize: 18 * scaleMultiplier,
          color: colors.shark
        ***REMOVED******REMOVED***
      >
        {props.title***REMOVED***
      </Text>
      {props.children***REMOVED***
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.itemContainer,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row'
        ***REMOVED***,
        props.style
      ]***REMOVED***
    >
      <Text
        style={{
          fontFamily: props.font + '-medium',
          fontSize: 18 * scaleMultiplier,
          color: colors.shark
        ***REMOVED******REMOVED***
      >
        {props.title***REMOVED***
      </Text>
      {props.children***REMOVED***
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    // height: 80 * scaleMultiplier,
    aspectRatio: 5,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaItem)
