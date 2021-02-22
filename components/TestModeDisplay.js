import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { analyticsMode, dbMode, reduxMode ***REMOVED*** from '../modeSwitch'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, SystemTypography ***REMOVED*** from '../styles/typography'

/**
 * This component displays some simple text that says "TEST MODE" whenever any of the modes in modeSwitch.js are set to "test". This is displayed in the corner on the opposite side of the group avatar on the StorySetTabs screen.
 */
function TestModeDisplay ({
  // Props passed from redux.
  font,
  isRTL
***REMOVED***) {
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

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: getLanguageFont(activeGroup.language),
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(TestModeDisplay)
