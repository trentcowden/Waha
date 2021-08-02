import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/**
 * Component that displays a simple circle with a number. Used to label the various keys of the piano.
 * @param {string} backgroundColor - The background color of the label.
 * @param {string} style - Extra styles to apply to the label.
 * @param {string} number - The number to display on the label.
 */
const PianoKeyLabel = ({
  // Props passed from a parent component.
  backgroundColor,
  style,
  number,
  isDark
}) => {
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
    padding: 5
  }
})

export default PianoKeyLabel
