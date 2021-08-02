import React from 'react'
import { View } from 'react-native'
import { colors } from '../styles/colors'

/**
 * A simple component that renders a horizontal line. Used to separate list items, text, or whatever else.
 */
const WahaSeparator = ({ isDark }) => (
  <View
    style={{
      width: '100%',
      height: 2,
      backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg2
    }}
  />
)

export default WahaSeparator
