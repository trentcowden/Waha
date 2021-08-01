import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { info } from '../functions/languageDataFunctions'
import { analyticsMode, dbMode, reduxMode } from '../modeSwitch'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isDark: state.settings.isDarkModeEnabled,
    activeGroup: activeGroupSelector(state),
    isRTL: info(activeGroupSelector(state).language).isRTL
  }
}

/**
 * This component displays some simple text that says "TEST MODE" whenever any of the modes in modeSwitch.js are set to "test". This is displayed in the corner on the opposite side of the group avatar on the SetsTabs screen.
 */
const TestModeDisplay = ({
  // Props passed from redux.
  isDark,
  activeGroup,
  isRTL
}) => {
  return (
    <View
      style={{
        backgroundColor: colors(isDark).error,
        paddingVertical: 5,
        borderRadius: 15,
        marginHorizontal: 20
      }}
    >
      {dbMode === 'test' || reduxMode === 'test' || analyticsMode === 'test' ? (
        <Text
          style={{
            ...type(
              activeGroup.language,
              'd',
              'Bold',
              'center',
              colors(isDark).textOnColor
            ),
            paddingHorizontal: 10
          }}
        >
          Test
        </Text>
      ) : null}
    </View>
  )
}

export default connect(mapStateToProps)(TestModeDisplay)
