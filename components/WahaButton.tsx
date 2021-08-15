import React, { FC, ReactElement } from 'react'
import {
  Dimensions,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { scaleMultiplier } from '../constants'
import { CommonProps } from '../interfaces/common'
import { WahaButtonMode } from '../interfaces/components'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps {
  mode: WahaButtonMode
  label?: string
  extraContainerStyles?: ViewStyle
  extraLabelStyles?: TextStyle
  onPress?: () => void
  extraComponent?: ReactElement
  screenLanguage: string
}
/**
 * Standard button component used throughout Waha.
 * @param {string} type - The type of the button. Possible options are 'filled' which renders a fully filled button, 'outline' which renders a butotn with a transparent background and a border, or 'inactive' which renders a filled un-clickable button with grayed out text.
 * @param {string} color - The color of the button.
 * @param {string} label - The label to display on the button.
 * @param {Object} style - (Optional) Extra style to apply to the button container.
 * @param {Object} textStyle - (Optional) Extra style to apply to the label of the button.
 * @param {number} width - (Optional) How wide the button should be.
 * @param {Function} onPress - Function to call when the button gets pressed.
 * @param {boolean} useDefaultFont - (Optional) Whether the button label should use the Standard or System typography. Defaults to false.
 * @param {Component} extraComponent - (Optional) An extra RN component to put in the button. Usually an icon.
 */
const WahaButton: FC<Props> = ({
  // Props passed from a parent component.s
  mode,
  label,
  extraContainerStyles,
  extraLabelStyles,
  onPress,
  extraComponent,
  // Props passed from redux.
  isDark,
  isRTL,
  screenLanguage,
}): ReactElement => {
  const containerStyles: ViewStyle = {
    borderRadius: 15,
    height: 65 * scaleMultiplier,
    // Default width but can be overridden.
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20 * scaleMultiplier,
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 15,
    ...extraContainerStyles,
  }

  const labelStyles: TextStyle = {
    ...type(screenLanguage, 'h3', 'Bold', 'center', colors(isDark).textOnColor),
    ...extraLabelStyles,
  }

  switch (mode) {
    case WahaButtonMode.SUCCESS:
      return (
        <TouchableOpacity
          onPress={onPress !== undefined ? onPress : undefined}
          style={{
            ...containerStyles,
            backgroundColor: colors(isDark).success,
          }}
        >
          <Text style={labelStyles}>{label}</Text>
          {extraComponent}
        </TouchableOpacity>
      )
    case WahaButtonMode.ERROR:
      return (
        <TouchableOpacity
          onPress={onPress !== undefined ? onPress : undefined}
          style={{
            ...containerStyles,
            backgroundColor: colors(isDark).error,
          }}
        >
          <Text style={labelStyles}>{label}</Text>
          {extraComponent}
        </TouchableOpacity>
      )
    case WahaButtonMode.ERROR_SECONDARY:
      return (
        <TouchableOpacity
          onPress={onPress !== undefined ? onPress : undefined}
          style={{
            ...containerStyles,
            borderColor: colors(isDark).error,
            borderWidth: 2,
          }}
        >
          <Text style={{ ...labelStyles, color: colors(isDark).error }}>
            {label}
          </Text>
          {extraComponent}
        </TouchableOpacity>
      )
    case WahaButtonMode.DISABLED:
      return (
        <View
          style={{
            ...containerStyles,
            backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          }}
        >
          <Text style={{ ...labelStyles, color: colors(isDark).disabled }}>
            {label}
          </Text>
          {extraComponent}
        </View>
      )
    default:
      return <View />
  }
}

export default WahaButton
