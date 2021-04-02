import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import {
  getLanguageFont,
  StandardTypography,
  SystemTypography
***REMOVED*** from '../../styles/typography'

function mapStateToProps (state) {
  return activeGroupSelector(state)
    ? {
        font: getLanguageFont(activeGroupSelector(state).language),
        isRTL: activeDatabaseSelector(state).isRTL,
        activeGroup: activeGroupSelector(state)
      ***REMOVED***
    : {***REMOVED***
***REMOVED***

function WahaButton ({
  // Props passed from a parent component.s
  type,
  color,
  label,
  style = {***REMOVED***,
  textStyle = {***REMOVED***,
  width = null,
  onPress,
  useDefaultFont = false,
  extraComponent = null,
  // Props passed from redux.
  font = null,
  isRTL = null,
  activeGroup = null
***REMOVED***) {
  switch (type) {
    case 'outline':
      return (
        <TouchableOpacity
          style={[
            { width: width ***REMOVED***,
            styles.buttonContainer,
            {
              borderWidth: 2,
              borderColor: color
            ***REMOVED***,
            style
          ]***REMOVED***
          onPress={onPress***REMOVED***
        >
          <Text
            style={[
              useDefaultFont
                ? SystemTypography(false, 'h3', 'Bold', 'center', color)
                : StandardTypography(
                    { font, isRTL ***REMOVED***,
                    'h3',
                    'Bold',
                    'center',
                    color
                  ),
              { fontWeight: font ? null : 'bold' ***REMOVED***,
              textStyle
            ]***REMOVED***
          >
            {label***REMOVED***
          </Text>
          {extraComponent***REMOVED***
        </TouchableOpacity>
      )
      break
    case 'filled':
      return (
        <TouchableOpacity
          style={[
            {
              width: width
            ***REMOVED***,
            styles.buttonContainer,
            {
              backgroundColor: color
            ***REMOVED***,
            style
          ]***REMOVED***
          onPress={onPress***REMOVED***
        >
          <Text
            style={[
              useDefaultFont
                ? SystemTypography(false, 'h3', 'Bold', 'center', colors.white)
                : StandardTypography(
                    { font, isRTL ***REMOVED***,
                    'h3',
                    'Bold',
                    'center',
                    colors.white
                  ),
              { fontWeight: font ? null : 'bold' ***REMOVED***,
              textStyle
            ]***REMOVED***
          >
            {label***REMOVED***
          </Text>
          {extraComponent***REMOVED***
        </TouchableOpacity>
      )
      break
    case 'inactive':
      return (
        <View
          style={[
            styles.buttonContainer,
            {
              width: width,
              backgroundColor: color
            ***REMOVED***,
            style
          ]***REMOVED***
        >
          <Text
            style={[
              useDefaultFont
                ? SystemTypography(
                    false,
                    'h3',
                    'Bold',
                    'center',
                    colors.chateau
                  )
                : StandardTypography(
                    { font, isRTL ***REMOVED***,
                    'h3',
                    'Bold',
                    'center',
                    colors.chateau
                  ),
              textStyle
            ]***REMOVED***
          >
            {label***REMOVED***
          </Text>
          {extraComponent***REMOVED***
        </View>
      )
      break
  ***REMOVED***
***REMOVED***

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    marginVertical: 20 * scaleMultiplier,
    // paddingVertical: 20 * scaleMultiplier,
    // paddingVertical: 10 * scaleMultiplier,
    height: 65 * scaleMultiplier,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(WahaButton)
