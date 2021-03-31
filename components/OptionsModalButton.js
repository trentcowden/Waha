import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    isRTL: activeDatabaseSelector(state).isRTL,
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

// button rendered on the options modal component
function OptionsModalButton ({
  onPress,
  style,
  title,
  children = null,
  font,
  isRTL,
  activeGroup
***REMOVED***) {
  return (
    <TouchableOpacity style={styles.modalButtonStyle***REMOVED*** onPress={onPress***REMOVED***>
      <Text
        style={[
          style,
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Regular',
            'center',
            colors.shark
          )
        ]***REMOVED***
      >
        {title***REMOVED***
      </Text>
      {children***REMOVED***
    </TouchableOpacity>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  modalButtonStyle: {
    width: '100%',
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    borderBottomColor: colors.athens,
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(OptionsModalButton)
