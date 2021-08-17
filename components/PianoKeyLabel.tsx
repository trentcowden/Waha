import React, { FC, ReactElement } from 'react'
import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props {
  backgroundColor: string
  style?: ViewStyle
  number: string
  isDark: boolean
}

/**
 * Component that displays a simple circle with a number. Used to label the various keys of the piano.
 */
const PianoKeyLabel: FC<Props> = ({
  backgroundColor,
  style,
  number,
  isDark,
}): ReactElement => {
  return (
    <View
      style={{ ...styles.circle, backgroundColor: backgroundColor, ...style }}
    >
      <Text
        style={type('en', 'h2', 'Bold', 'center', colors(isDark).textOnColor)}
        adjustsFontSizeToFit
      >
        {number}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: Dimensions.get('window').width / 12,
    height: Dimensions.get('window').width / 12,
    borderRadius: Dimensions.get('window').width / 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    zIndex: 3,
    marginBottom: 10,
    padding: 5,
  },
})

export default PianoKeyLabel
