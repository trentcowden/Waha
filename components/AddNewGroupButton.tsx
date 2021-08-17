import { AGProps, CommonProps, TProps } from 'interfaces/common'
import { LanguageID } from 'languages'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { InfoAndGroupsForLanguage } from '../languages'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps {
  // The section of the SectionList that this button is being rendered as the footer of.
  section: InfoAndGroupsForLanguage
  // Sets the languageID state variable on the Groups screen.
  setLanguageID: (languageID: LanguageID) => void
  setShowAddGroupModal: (toShow: boolean) => void
}

/**
 * A pressable component that is used to add a new group. It's styled after the Group item component and is rendered as the section footer for the Groups SectionList on the Groups screen.
 */
const AddNewGroupButton: FC<Props> = ({
  section,
  setLanguageID,
  setShowAddGroupModal,
  isRTL,
  isDark,
  t,
  activeGroup,
}): ReactElement => {
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.touchableAreaContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        }}
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
          style={type(
            activeGroup.language,
            'h3',
            'Bold',
            'left',
            colors(isDark).highlight
          )}
        >
          {t.groups.new_group}
        </Text>
      </TouchableOpacity>
      <WahaSeparator isDark={isDark} />
      <View style={{ height: 20 * scaleMultiplier, width: '100%' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  touchableAreaContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 55 * scaleMultiplier,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
})

export default AddNewGroupButton
