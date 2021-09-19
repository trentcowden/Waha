import React, { FC, ReactElement } from 'react'
import { Image } from 'react-native'
import { AGProps, CommonProps } from 'redux/common'
import { getFileSource } from '../constants'

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
    source={
      isDark
        ? getFileSource(activeGroup.language + '-header-dark.png')
        : getFileSource(activeGroup.language + '-header.png')
    }
  />
)

export default ScreenHeaderImage
