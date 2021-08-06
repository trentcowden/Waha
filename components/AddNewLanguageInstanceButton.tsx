import { InfoAndGroupsForAllLanguages } from 'interfaces/languages'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { getTotalNumberOfLanguages } from '../functions/languageDataFunctions'
import { AGProps, CommonProps, TProps } from '../interfaces/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps {
  navigate: Function
  languageAndGroupData: InfoAndGroupsForAllLanguages
}

/**
 * A pressable component that is used to add a new language instance. It's rendered as the list footer for the Groups SectionList on the Groups screen.
 */
const AddNewLanguageInstanceButton: FC<Props> = ({
  // Props passed from a parent component.
  navigate,
  languageAndGroupData,
  isRTL,
  isDark,
  t,
  activeGroup,
}): ReactElement => {
  // Hide this button if every language has already been added.
  return languageAndGroupData.length !== getTotalNumberOfLanguages() ? (
    <TouchableOpacity
      style={{
        ...styles.addNewLanguageButtonContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
      onPress={() => {
        // Navigate to the LanguageInstanceInstall screen so that the user can install another language instance.
        navigate('SubsequentLanguageSelect', {
          // Send over the currently installed language instances so that we can filter those out from the options.
          installedLanguageInstances: languageAndGroupData,
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
  ) : (
    <View />
  )
}

const styles = StyleSheet.create({
  addNewLanguageButtonContainer: {
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

export default AddNewLanguageInstanceButton
