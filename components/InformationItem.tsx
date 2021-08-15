import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../interfaces/common'
import { appVersion } from '../modeSwitch'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  label: string
  secondaryLabel?: string
  icon: string
  onPress: () => void
}

const InformationItem: FC<Props> = ({
  isRTL,
  isDark,
  activeGroup,
  label,
  secondaryLabel,
  icon,
  onPress,
}): ReactElement => (
  <TouchableOpacity
    style={{
      ...styles.informationItem,
      flexDirection: isRTL ? 'row-reverse' : 'row',
    }}
    onPress={onPress}
  >
    <View>
      <Text
        style={type(
          activeGroup.language,
          'h3',
          'Bold',
          'left',
          colors(isDark).text
        )}
      >
        {label}
      </Text>
      {secondaryLabel && (
        <Text
          style={type(
            activeGroup.language,
            'h4',
            'Bold',
            'left',
            colors(isDark).secondaryText
          )}
        >
          {appVersion}
        </Text>
      )}
    </View>
    <Icon
      name={icon}
      color={colors(isDark).icons}
      size={25 * scaleMultiplier}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  informationItem: {
    width: '100%',
    height: 60 * scaleMultiplier,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})

export default InformationItem
