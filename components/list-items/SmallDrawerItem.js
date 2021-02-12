import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'

function SmallDrawerItem ({
  // passed from parents
  onPress,
  label,
  // passed from redux
  isRTL,
  font,
  activeGroup
***REMOVED***) {
  //+ RENDER

  return (
    <TouchableOpacity
      style={[
        styles.smallDrawerItemContainer,
        { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={onPress***REMOVED***
    >
      <Text
        style={StandardTypography(
          { font, isRTL ***REMOVED***,
          'h3',
          'Bold',
          'left',
          colors.chateau
        )***REMOVED***
      >
        {label***REMOVED***
      </Text>
    </TouchableOpacity>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  smallDrawerItemContainer: {
    paddingHorizontal: 10,
    // aspectRatio: 8,
    marginVertical: 5
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SmallDrawerItem)
