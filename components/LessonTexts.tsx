import React, { FC } from 'react'
import { LayoutRectangle, Text, View } from 'react-native'
import { gutterSize, scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../redux/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

// These props are used for all 3 below components.
interface LessonTextProps extends CommonProps, AGProps {
  text: string
  onLayout?: (layoutEvent: { layout: LayoutRectangle }) => void
}

/**
 * This file contains 3 separate components used to render the text in the <LessonTextContent /> component.
 */

export const HeaderBig: FC<LessonTextProps> = ({
  text,
  activeGroup,
  onLayout = () => {},
  isDark,
  isRTL,
}) => (
  <View
    style={{
      marginBottom: 10 * scaleMultiplier,
      paddingHorizontal: gutterSize,
    }}
    onLayout={({ nativeEvent }) => onLayout(nativeEvent)}
  >
    <Text
      style={type(
        activeGroup.language,
        'h2',
        'Black',
        'left',
        colors(isDark).icons
      )}
    >
      {text}
    </Text>
  </View>
)

export const HeaderSmall: FC<LessonTextProps> = ({
  text,
  activeGroup,
  isDark,
  isRTL,
}) => (
  <View>
    <Text
      style={{
        ...type(
          activeGroup.language,
          'h3',
          'Regular',
          'left',
          colors(isDark).disabled
        ),
        paddingHorizontal: gutterSize,
        marginVertical: 5 * scaleMultiplier,
      }}
    >
      {text}
    </Text>
  </View>
)

export const StandardText: FC<LessonTextProps> = ({
  text,
  activeGroup,
  isDark,
  isRTL,
}) => (
  <View>
    <Text
      style={{
        ...type(
          activeGroup.language,
          'h3',
          'Regular',
          'left',
          colors(isDark).text
        ),
        zIndex: 0,
        paddingHorizontal: gutterSize,
      }}
    >
      {text}
    </Text>
  </View>
)
