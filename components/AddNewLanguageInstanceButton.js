import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { languages } from '../languages'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { getLanguageFont, StandardTypography } from '../styles/typography'
function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    t: activeDatabaseSelector(state).translations,
    installedLanguageInstances: Object.keys(state.database).filter(
      key => key.length === 2
    )
  }
}

/**
 * A pressable component that is used to add a new language instance. It's rendered as the list footer for the Groups SectionList on the Groups screen.
 * @param {Function} navigate - Copy of the navigation.navigate() function so we can use it in this component.
 * @param {Object[]} languageAndGroupData - An array of all the installed language instances and their groups.
 */
const AddNewLanguageInstanceButton = ({
  // Props passed from a parent component.
  navigate,
  languageAndGroupData,
  // Props passed from redux.
  isRTL,
  font,
  installedLanguageInstances,
  t
}) => {
  const [numberOfLanguages, setNumberOfLanguages] = useState(0)

  useEffect(() => {
    setNumberOfLanguages(getNumberOfLanguages())
  }, [])

  const getNumberOfLanguages = () => {
    var numLanguages = 0
    languages.forEach(languageFamily => {
      languageFamily.data.forEach(language => {
        if (language.versions === null) numLanguages += 1
        else numLanguages += language.versions.length
      })
    })
    return numLanguages
  }
  return (
    installedLanguageInstances.length !== numberOfLanguages && (
      <TouchableOpacity
        style={[
          styles.addNewLanguageButtonContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }
        ]}
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
            color={colors.chateau}
          />
        </View>
        <Text
          style={StandardTypography(
            { font, isRTL },
            'h3',
            'Bold',
            'left',
            colors.chateau
          )}
        >
          {t.groups && t.groups.add_language}
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

export default connect(mapStateToProps)(AddNewLanguageInstanceButton)
