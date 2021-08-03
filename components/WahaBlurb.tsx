import React from 'react'
import { Text, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/**
 * A component to show a nicely styled blurb (section of text). Used on the Mobilization Tools and Security Mode screens.
 * @param {string} text - The text of the blurb to display.
 */
const WahaBlurb = ({
  // Props passed from a parent component.
  text,
  isDark,
  activeGroup
}) => (
  <View
    style={{
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 20 * scaleMultiplier
    }}
  >
    <Text
      style={type(
        activeGroup.language,
        'p',
        'Regular',
        'center',
        colors(isDark).text
      )}
    >
      {text}
    </Text>
  </View>
)

export default WahaBlurb
