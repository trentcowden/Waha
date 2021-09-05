import { LanguageID } from 'languages'
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
import { CommonProps } from '../redux/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

export enum WahaButtonMode {
  SUCCESS = 1,
  ERROR = 2,
  ERROR_SECONDARY = 3,
  DISABLED = 4,
}

interface Props extends CommonProps {
  mode: WahaButtonMode
  label?: string
  extraContainerStyles?: ViewStyle
  extraLabelStyles?: TextStyle
  onPress?: () => void
  // An extra RN component to put in the button. Usually an icon.
  extraComponent?: ReactElement
  // The Language to display the button in. Usually the Active Group's language but sometimes different, like when an Active Group hasn't been created yet.
  screenLanguage: LanguageID
}

/**
 * Standard button component used throughout Waha.
 */
const WahaButton: FC<Props> = ({
  mode,
  label,
  extraContainerStyles,
  extraLabelStyles,
  onPress,
  extraComponent,
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
