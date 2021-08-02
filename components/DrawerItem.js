import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: info(activeGroupSelector(state).language).isRTL,
    isDark: state.settings.isDarkModeEnabled,
    activeGroup: activeGroupSelector(state)
  }
}

/**
 * A pressable item used in Waha's navigation drawer.
 * @param {Function} onPress - The function to call when the user presses the drawer item.
 * @param {string} icon - The name of the icon to display on the drawer item.
 * @param {string} label - The label to display on the drawer item.
 */
const DrawerItem = ({
  // Props passed from a parent component.
  onPress,
  icon,
  label,
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup
}) => (
  <TouchableOpacity
    style={{
      ...styles.drawerItemContainer,
      flexDirection: isRTL ? 'row-reverse' : 'row'
    }}
    onPress={onPress}
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
        paddingHorizontal: 10
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  drawerItemContainer: {
    // height: 50 * scaleMultiplier,
    paddingHorizontal: 10,
    paddingVertical: 10 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50 * scaleMultiplier
  }
})

export default connect(mapStateToProps)(DrawerItem)
