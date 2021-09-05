import * as FileSystem from 'expo-file-system'
import React, { FC, ReactElement } from 'react'
import { Image } from 'react-native'
import { AGProps, CommonProps } from 'redux/common'

interface Props extends CommonProps, AGProps {}

/**
 * A component that displays the header (or logo) for a Language. Used in the headers for the <SetsScreen /> and the <LessonsScreen />.
 */
const ScreenHeaderImage: FC<Props> = ({
  activeGroup,
  isDark,
}): ReactElement => (
  <Image
    style={{
      resizeMode: 'contain',
      width: 150,
      flex: 1,
      alignSelf: 'center',
    }}
    source={{
      uri: isDark
        ? FileSystem.documentDirectory +
          activeGroup.language +
          '-header-dark.png'
        : FileSystem.documentDirectory + activeGroup.language + '-header.png',
    }}
  />
)

export default ScreenHeaderImage
