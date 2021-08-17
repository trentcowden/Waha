import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../interfaces/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  onPress: () => void
  label: string
}

/**
 * A simple button component that is used inside the <OptionsModal /> component.
 */
const OptionsModalButton: FC<Props> = ({
  onPress,
  label,
  children,
  isDark,
  activeGroup,
}): ReactElement => (
  <TouchableOpacity
    style={styles.optionsModalButtonContainer}
    onPress={() => onPress()}
  >
    <Text
      style={type(
        activeGroup.language,
        'h3',
        'Regular',
        'center',
        colors(isDark).text
      )}
    >
      {label}
    </Text>
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  optionsModalButtonContainer: {
    width: '100%',
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OptionsModalButton
