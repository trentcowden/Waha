import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AGProps, CommonProps } from 'redux/common'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  onPress?: () => void
  title: string
}

/**
 * A component used for standard list items/buttons throughout Waha.
 */
const WahaItem: FC<Props> = ({
  // Props passed from a parent component.s
  onPress,
  title,
  children,
  isRTL,
  isDark,
  activeGroup,
}): ReactElement =>
  onPress ? (
    <TouchableOpacity
      style={{
        ...styles.wahaItemContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
      }}
      onPress={() => onPress()}
    >
      <Text
        style={type(
          activeGroup.language,
          'h3',
          'Bold',
          'left',
          colors(isDark).text
        )}
      >
        {title}
      </Text>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={{
        ...styles.wahaItemContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
      }}
    >
      <Text
        style={type(
          activeGroup.language,
          'h3',
          'Bold',
          'left',
          colors(isDark).text
        )}
      >
        {title}
      </Text>
      {children}
    </View>
  )

const styles = StyleSheet.create({
  wahaItemContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
})

export default WahaItem
