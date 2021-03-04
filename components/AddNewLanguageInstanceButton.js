import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    translations: activeDatabaseSelector(state).translations
  ***REMOVED***
***REMOVED***

/**
 * A pressable component that is used to add a new language instance. It's rendered as the list footer for the Groups SectionList on the Groups screen.
 * @param {Function***REMOVED*** navigate - Copy of the navigation.navigate() function so we can use it in this component.
 * @param {Object[]***REMOVED*** languageAndGroupData - An array of all the installed language instances and their groups.
 */
function AddNewLanguageInstanceButton ({
  // Props passed from a parent component.
  navigate,
  languageAndGroupData,
  // Props passed from redux.
  isRTL,
  font,
  translations
***REMOVED***) {
  return (
    <TouchableOpacity
      style={[
        styles.addNewLanguageButtonContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
      onPress={() => {
        // Navigate to the LanguageInstanceInstall screen so that the user can install another language instance.
        navigate('SubsequentlLanguageInstanceInstall', {
          // Send over the currently installed language instances so that we can filter those out from the options.
          installedLanguageInstances: languageAndGroupData
        ***REMOVED***)
      ***REMOVED******REMOVED***
    >
      <View style={styles.iconContainer***REMOVED***>
        <Icon
          name='language-add'
          size={40 * scaleMultiplier***REMOVED***
          color={colors.chateau***REMOVED***
        />
      </View>
      <Text
        style={StandardTypography(
          { font, isRTL ***REMOVED***,
          'h3',
          'Bold',
          'left',
          colors.chateau
        )***REMOVED***
      >
        {translations.groups.new_language_button_label***REMOVED***
      </Text>
    </TouchableOpacity>
  )
***REMOVED***

const styles = StyleSheet.create({
  addNewLanguageButtonContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  ***REMOVED***,
  iconContainer: {
    width: 55 * scaleMultiplier,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(AddNewLanguageInstanceButton)
