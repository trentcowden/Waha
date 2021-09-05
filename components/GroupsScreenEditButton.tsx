import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AGProps, CommonProps, TProps } from 'redux/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps {
  onPress: () => void
  isEditing: boolean
}

/**
 * The edit button that is displayed in the header on the Groups screen. Switches editingMode on or off when pressed.
 */
const GroupsScreenEditButton: FC<Props> = ({
  onPress,
  isEditing,
  isDark,
  activeGroup,
  t,
}): ReactElement => {
  return (
    <TouchableOpacity style={styles.editButtonContainer} onPress={onPress}>
      <Text
        style={{
          ...type(
            activeGroup.language,
            'h3',
            isEditing ? 'Bold' : 'Regular',
            'center',
            isEditing ? colors(isDark).textOnColor : colors(isDark).highlight
          ),
          // Underline the text for this button if we're in editing mode. This is standard for header buttons in material design.
          textDecorationLine: isEditing ? 'underline' : undefined,
        }}
      >
        {isEditing ? t.general.done : t.general.edit}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  editButtonContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})

export default GroupsScreenEditButton
