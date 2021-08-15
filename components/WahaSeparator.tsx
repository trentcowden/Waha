import React, { FC, ReactElement } from 'react'
import { View } from 'react-native'
import { colors } from '../styles/colors'

interface Props {
  isDark: boolean
}

/**
 * A simple component that renders a horizontal line. Used to separate list items, text, or whatever else.
 */
const WahaSeparator: FC<Props> = ({ isDark }): ReactElement => (
  <View
    style={{
      width: '100%',
      height: 2,
      backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg2,
    }}
  />
)

export default WahaSeparator
