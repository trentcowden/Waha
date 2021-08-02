import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { activeGroupSelector } from '../redux/reducers/activeGroup'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    isDark: state.settings.isDarkModeEnabled
  }
}

/** A component that displays the logo for a language instance. Used in the headers for the Sets Screen and the Lessons Screen. */
const ScreenHeaderImage = ({
  // Props passed from redux.
  activeGroup,
  isDark
}) => (
  <Image
    style={{
      resizeMode: 'contain',
      width: 150,
      flex: 1,
      alignSelf: 'center'
      // backgroundColor: isDark ? colors(isDark).icons : null,
    }}
    source={{
      uri: isDark
        ? FileSystem.documentDirectory +
          activeGroup.language +
          '-header-dark.png'
        : FileSystem.documentDirectory + activeGroup.language + '-header.png'
    }}
  />
)

export default connect(mapStateToProps)(ScreenHeaderImage)
