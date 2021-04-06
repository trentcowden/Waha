import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'

const SmallDrawerItem = ({
  // Props passed from a parent component.s
  onPress,
  label,
  // Props passed from redux.
  isRTL,
  font,
  activeGroup
***REMOVED***) => {
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
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SmallDrawerItem)
