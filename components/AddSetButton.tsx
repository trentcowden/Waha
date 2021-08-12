import { AGProps, CommonProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  label: string
  onPress: () => void
}

const AddNewGroupButton: FC<Props> = ({
  // Props passed from a parent component.
  label,
  onPress,
  isRTL,
  isDark,
  activeGroup,
}): ReactElement => {
  return (
    <TouchableOpacity
      style={{
        ...styles.addSetButtonContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80 * scaleMultiplier,
          height: 80 * scaleMultiplier,
        }}
      >
        <Icon
          name='plus'
          size={60 * scaleMultiplier}
          color={colors(isDark).disabled}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          marginRight: isRTL ? 20 : 0,
          marginLeft: isRTL ? 0 : 20,
        }}
      >
        <Text
          style={type(
            activeGroup.language,
            'h4',
            'Bold',
            'left',
            colors(isDark).secondaryText
          )}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addSetButtonContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20,
  },
})

export default AddNewGroupButton
