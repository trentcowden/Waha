import { CommonProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'

interface Props extends CommonProps {
  onPress: () => void
  color?: string
}

/**
 * A simple pressable component with a backwards arrow that acts as a back button. Used in almost every header in Waha.
 * @param {Function} onPress - Function to call when the back button is pressed. Almost always navigation.goBack().
 * @param {string} color - The color of the back button icon. Not required.
 */
const WahaBackButton: FC<Props> = ({
  // Props passed from a parent component.
  onPress,
  color,
  isRTL,
  isDark,
}): ReactElement => (
  <TouchableOpacity
    style={{
      ...styles.backButtonContainer,
      justifyContent: isRTL ? 'flex-end' : 'flex-start',
    }}
    onPress={onPress}
  >
    <Icon
      name={isRTL ? 'arrow-right' : 'arrow-left'}
      size={45 * scaleMultiplier}
      color={color ? color : colors(isDark).icons}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: 'row',
    width: 100,
  },
})

export default WahaBackButton
