import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
function SmallDrawerItem (props) {
  //// RENDER

  return (
    <TouchableOpacity
      style={[
        styles.smallDrawerItemContainer,
        { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={props.onPress***REMOVED***
    >
      <Text
        style={[
          styles.smallDrawerItemText,
          {
            textAlign: props.isRTL ? 'right' : 'left',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ]***REMOVED***
      >
        {props.label***REMOVED***
      </Text>
    </TouchableOpacity>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  smallDrawerItemContainer: {
    paddingHorizontal: 10,
    // aspectRatio: 8,
    marginVertical: 5
  ***REMOVED***,
  smallDrawerItemText: {
    fontSize: 18 * scaleMultiplier,
    color: colors.chateau
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SmallDrawerItem)
