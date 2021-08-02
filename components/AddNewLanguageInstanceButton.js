import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { languages } from '../languages'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/**
 * A pressable component that is used to add a new language instance. It's rendered as the list footer for the Groups SectionList on the Groups screen.
 * @param {Function} navigate - Copy of the navigation.navigate() function so we can use it in this component.
 * @param {Object[]} languageAndGroupData - An array of all the installed language instances and their groups.
 */
const AddNewLanguageInstanceButton = ({
  // Props passed from a parent component.
  navigate,
  languageAndGroupData,
  isRTL,
  isDark,
  t,
  activeGroup
}) => {
  return (
    // Hide this button if every language has already been added.
    languageAndGroupData.length !== languages.length && (
      <TouchableOpacity
        style={{
          ...styles.addNewLanguageButtonContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}
        onPress={() => {
          // Navigate to the LanguageInstanceInstall screen so that the user can install another language instance.
          navigate('SubsequentLanguageSelect', {
            // Send over the currently installed language instances so that we can filter those out from the options.
            installedLanguageInstances: languageAndGroupData
          })
        }}
      >
        <View style={styles.iconContainer}>
          <Icon
            name='language-add'
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
            colors(isDark).secondaryText
          )}
        >
          {t.groups.add_language}
        </Text>
      </TouchableOpacity>
    )
  )
}

const styles = StyleSheet.create({
  addNewLanguageButtonContainer: {
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

export default AddNewLanguageInstanceButton
