import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '../styles/colors'

function mapStateToProps (state) {
  return {
    isDark: state.settings.isDarkModeEnabled
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

/**
 * A simple component that renders a horizontal line. Used to separate list items, text, or whatever else.
 */
const WahaSeparator = ({ isDark }) => (
  <View
    style={{
      width: '100%',
      height: 2,
      backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg2
    }}
  />
)

export default connect(mapStateToProps, mapDispatchToProps)(WahaSeparator)
