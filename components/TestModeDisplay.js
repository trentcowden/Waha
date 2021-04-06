import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { analyticsMode, dbMode, reduxMode ***REMOVED*** from '../modeSwitch'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, SystemTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

/**
 * This component displays some simple text that says "TEST MODE" whenever any of the modes in modeSwitch.js are set to "test". This is displayed in the corner on the opposite side of the group avatar on the SetsTabs screen.
 */
const TestModeDisplay = ({
  // Props passed from redux.
  font,
  isRTL
***REMOVED***) => {
  return (
    <View
      style={{
        backgroundColor: colors.red,
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 5
      ***REMOVED******REMOVED***
    >
      {dbMode === 'test' || reduxMode === 'test' || analyticsMode === 'test' ? (
        <Text
          style={[
            SystemTypography(false, 'p', 'Bold', 'center', colors.white),
            {
              paddingHorizontal: 10
            ***REMOVED***
          ]***REMOVED***
        >
          TEST MODE
        </Text>
      ) : null***REMOVED***
    </View>
  )
***REMOVED***

export default connect(mapStateToProps)(TestModeDisplay)
