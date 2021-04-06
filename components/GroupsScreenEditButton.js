import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
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
 * The edit button that is displayed in the header on the Groups screen. Switches editingMode on or off when pressed.
 */
const GroupsScreenEditButton = ({
  // Props passed from a parent component.
  onPress,
  isEditing,
  // Props passed from redux.
  isRTL,
  font,
  translations
***REMOVED***) => {
  return (
    <TouchableOpacity style={styles.editButtonContainer***REMOVED*** onPress={onPress***REMOVED***>
      <Text
        style={[
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            isEditing ? 'Bold' : 'Regular',
            'center',
            isEditing ? colors.white : colors.blue
          ),
          {
            // Underline the text for this button if we're in editing mode. This is standard for header buttons in material design.
            textDecorationLine: isEditing ? 'underline' : null
          ***REMOVED***
        ]***REMOVED***
      >
        {isEditing
          ? translations.groups.done_button_label
          : translations.groups.edit_button_label***REMOVED***
      </Text>
    </TouchableOpacity>
  )
***REMOVED***

const styles = StyleSheet.create({
  editButtonContainer: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(GroupsScreenEditButton)
