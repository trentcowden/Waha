import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { appVersion } from '../modeSwitch'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

const InformationItem = ({
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup,
  label,
  secondaryLabel,
  icon,
  onPress
}) => (
  <TouchableOpacity
    style={{
      ...styles.informationItem,
      flexDirection: isRTL ? 'row-reverse' : 'row'
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
    paddingHorizontal: 20
  }
})

export default InformationItem
