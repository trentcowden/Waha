import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { getLanguageInfo } from '../languages'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isDark: state.settings.isDarkModeEnabled,

    isRTL: getLanguageInfo(activeGroupSelector(state).language).isRTL,
    activeGroup: activeGroupSelector(state)
  }
}

/**
 * A component used for standard list items/buttons throughout Waha.
 * @param {Function} onPress - (Optional) Function to fire when the item is pressed.
 * @param {Object} style - (Optional) Any extra style props to attach to the component.
 * @param {string} title - The text to display in the item.
 * @param {Component} children - Child components to display on the opposite side of the item from the title.
 */
const WahaItem = ({
  // Props passed from a parent component.s
  onPress = null,
  style = {},
  title,
  children,
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup
}) =>
  onPress ? (
    <TouchableOpacity
      style={[
        styles.wahaItemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
        },
        style
      ]}
      onPress={onPress}
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
      style={[
        styles.wahaItemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
        },
        style
      ]}
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
    justifyContent: 'space-between'
  }
})

export default connect(mapStateToProps)(WahaItem)
