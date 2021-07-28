import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { StandardTypography } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,

    isDark: state.settings.isDarkModeEnabled,
    t: activeDatabaseSelector(state).translations,
    activeGroup: activeGroupSelector(state)
  }
}

/**
 * The edit button that is displayed in the header on the Groups screen. Switches editingMode on or off when pressed.
 */
const GroupsScreenEditButton = ({
  // Props passed from a parent component.
  onPress,
  isEditing,
  // Props passed from redux.
  isRTL,
  isDark,
  t,
  activeGroup
}) => {
  return (
    <TouchableOpacity style={styles.editButtonContainer} onPress={onPress}>
      <Text
        style={[
          StandardTypography(
            activeGroup.language,
            'h3',
            isEditing ? 'Bold' : 'Regular',
            'center',
            isEditing ? colors(isDark).textOnColor : colors(isDark).highlight
          ),
          {
            // Underline the text for this button if we're in editing mode. This is standard for header buttons in material design.
            textDecorationLine: isEditing ? 'underline' : null
          }
        ]}
      >
        {isEditing ? t.general && t.general.done : t.general && t.general.edit}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  editButtonContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
})

export default connect(mapStateToProps)(GroupsScreenEditButton)
