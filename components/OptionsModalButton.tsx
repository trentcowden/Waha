import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/**
 * A simple button component that is used inside the <OptionsModal /> component.
 * @param {Function} onPress - Function to fire when the button is pressed.
 * @param {string} label - The text to display on the button.
 * @param {Component} children - (Optional) An extra component to show on the right side of the button.
 */
const OptionsModalButton = ({
  // Props passed from a parent component.
  onPress,
  style,
  label,
  children = null,
  isDark,
  activeGroup
}) => (
  <TouchableOpacity
    style={styles.optionsModalButtonContainer}
    onPress={onPress}
  >
    <Text
      style={type(
        activeGroup.language,
        'h3',
        'Regular',
        'center',
        colors(isDark).text
      )}
    >
      {label}
    </Text>
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  optionsModalButtonContainer: {
    width: '100%',
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default OptionsModalButton
