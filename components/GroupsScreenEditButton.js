import { t } from 'i18n-js'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { info } from '../languages'
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
 * The edit button that is displayed in the header on the Groups screen. Switches editingMode on or off when pressed.
 */
const GroupsScreenEditButton = ({
  // Props passed from a parent component.
  onPress,
  isEditing,
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup
}) => {
  return (
    <TouchableOpacity style={styles.editButtonContainer} onPress={onPress}>
      <Text
        style={[
          type(
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
        {isEditing ? t('general.done') : t('general.edit')}
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
