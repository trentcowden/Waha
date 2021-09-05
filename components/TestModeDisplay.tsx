import React, { FC, ReactElement } from 'react'
import { Text, View } from 'react-native'
import { AGProps, CommonProps } from 'redux/common'
import { analyticsMode, dbMode, reduxMode } from '../modeSwitch'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {}

/**
 * This component displays some simple text that says "TEST MODE" whenever any of the modes in modeSwitch.ts are set to "test". This is displayed in the corner on the opposite side of the group avatar on the SetsTabs screen.
 */
const TestModeDisplay: FC<Props> = ({
  isDark,
  isRTL,
  activeGroup,
}): ReactElement => {
  return (
    <View
      style={{
        backgroundColor: colors(isDark).error,
        paddingVertical: 5,
        borderRadius: 15,
        marginHorizontal: 20,
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
            paddingHorizontal: 10,
          }}
        >
          Test
        </Text>
      ) : null}
    </View>
  )
}

export default TestModeDisplay
