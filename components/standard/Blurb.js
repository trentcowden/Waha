import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

function Blurb ({
  // Props passed from a parent component.
  text,
  // Props passed from redux.
  font,
  isRTL
***REMOVED***) {
  return (
    <View style={{ width: '100%', padding: 20 * scaleMultiplier ***REMOVED******REMOVED***>
      <Text
        style={StandardTypography(
          { font, isRTL ***REMOVED***,
          'p',
          'Regular',
          'center',
          colors.shark
        )***REMOVED***
      >
        {text***REMOVED***
      </Text>
    </View>
  )
***REMOVED***

export default connect(mapStateToProps)(Blurb)
