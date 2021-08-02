import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image } from 'react-native'

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

export default ScreenHeaderImage
