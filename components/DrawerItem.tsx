import { AGProps, CommonProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  onPress: Function
  icon: string
  label: string
}

/**
 * A pressable item used in Waha's navigation drawer.
 * @param {Function} onPress - The function to call when the user presses the drawer item.
 * @param {string} icon - The name of the icon to display on the drawer item.
 * @param {string} label - The label to display on the drawer item.
 */
const DrawerItem: FC<Props> = ({
  onPress,
  icon,
  label,
  isRTL,
  isDark,
  activeGroup,
}): ReactElement => (
  <TouchableOpacity
    style={{
      ...styles.drawerItemContainer,
      flexDirection: isRTL ? 'row-reverse' : 'row',
    }}
    onPress={() => onPress()}
  >
    <View style={styles.iconContainer}>
      <Icon
        name={icon}
        size={30 * scaleMultiplier}
        color={colors(isDark).icons}
      />
    </View>
    <Text
      style={{
        ...type(
          activeGroup.language,
          'h3',
          'Bold',
          'left',
          colors(isDark).text
        ),
        paddingHorizontal: 10,
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  drawerItemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50 * scaleMultiplier,
  },
})

export default DrawerItem
