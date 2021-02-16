import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'

function WahaItem ({
  // Props passed from a parent component.s
  onPress,
  style = {***REMOVED***,
  title,
  children = null,
  // Props passed from redux.
  font,
  isRTL,
  activeGroup
***REMOVED***) {
  return onPress ? (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row'
        ***REMOVED***,
        style
      ]***REMOVED***
      onPress={onPress***REMOVED***
    >
      <Text
        style={StandardTypography(
          { font, isRTL ***REMOVED***,
          'h3',
          'Bold',
          'left',
          colors.shark
        )***REMOVED***
      >
        {title***REMOVED***
      </Text>
      {children***REMOVED***
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.itemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row'
        ***REMOVED***,
        style
      ]***REMOVED***
    >
      <Text
        style={StandardTypography(
          { font, isRTL ***REMOVED***,
          'h3',
          'Bold',
          'left',
          colors.shark
        )***REMOVED***
      >
        {title***REMOVED***
      </Text>
      {children***REMOVED***
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    // aspectRatio: 5,
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
    font: getLanguageFont(activeGroup.language),
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaItem)
