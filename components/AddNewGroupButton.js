import { locale, t } from 'i18n-js'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { info } from '../languages'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: info(activeGroupSelector(state).language).isRTL,
    isDark: state.settings.isDarkModeEnabled
    // activeGroup: activeGroupSelector(state)
  }
}

/**
 * A pressable component that is used to add a new group. It's styled after the Group item component and is rendered as the section footer for the Groups SectionList on the Groups screen.
 * @param {Object} section - The section of the SectionList that this button is being rendered as the footer of.
 * @param {Function} setLanguageID - Sets the languageID state variable on the Groups screen.
 * @param {Function} setShowAddGroupModal - Shows the add group modal.
 */
const AddNewGroupButton = ({
  // Props passed from a parent component.
  section,
  setLanguageID,
  setShowAddGroupModal,
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.touchableAreaContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
          }
        ]}
        onPress={() => {
          // When adding a new group, set the languageID so that we can pass that to the CreateGroup function when we actually do create the group.
          setLanguageID(section.languageID)

          // Show the add group modal.
          setShowAddGroupModal(true)
        }}
      >
        <View style={styles.iconContainer}>
          <Icon
            name='group-add'
            size={40 * scaleMultiplier}
            color={colors(isDark).disabled}
          />
        </View>
        <Text
          style={type(locale, 'h3', 'Bold', 'left', colors(isDark).highlight)}
        >
          {t('groups.new_group')}
        </Text>
      </TouchableOpacity>
      <WahaSeparator />
      <View style={{ height: 20 * scaleMultiplier, width: '100%' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  touchableAreaContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 55 * scaleMultiplier,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  }
})

export default connect(mapStateToProps)(AddNewGroupButton)
