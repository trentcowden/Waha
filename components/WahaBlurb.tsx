import React, { FC, ReactElement } from 'react'
import { Text, View } from 'react-native'
import { AGProps, CommonProps } from 'redux/common'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  text: string
}

/**
 * A component to show a nicely styled blurb (section of text).
 */
const WahaBlurb: FC<Props> = ({ text, isDark, activeGroup }): ReactElement => (
  <View
    style={{
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 20 * scaleMultiplier,
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
