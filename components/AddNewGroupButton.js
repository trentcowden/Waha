import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import Separator from '../components/standard/Separator'
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
 * A pressable component that is used to add a new group. It's styled after the Group item component and is rendered as the section footer for the Groups SectionList on the Groups screen.
 * @param {Object***REMOVED*** section - The section of the SectionList that this button is being rendered as the footer of.
 * @param {Function***REMOVED*** setLanguageID - Sets the languageID state variable on the Groups screen.
 * @param {Function***REMOVED*** setShowAddGroupModal - Shows the add group modal.
 */
const AddNewGroupButton = ({
  // Props passed from a parent component.
  section,
  setLanguageID,
  setShowAddGroupModal,
  // Props passed from redux.
  isRTL,
  font,
  translations
***REMOVED***) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.touchableAreaContainer,
          { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
        onPress={() => {
          // When adding a new group, set the languageID so that we can pass that to the CreateGroup function when we actually do create the group.
          setLanguageID(section.languageID)

          // Show the add group modal.
          setShowAddGroupModal(true)
        ***REMOVED******REMOVED***
      >
        <View style={styles.iconContainer***REMOVED***>
          <Icon
            name='group-add'
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
            colors.blue
          )***REMOVED***
        >
          {translations.groups.new_group_button_label***REMOVED***
        </Text>
      </TouchableOpacity>
      <Separator />
      <View style={{ height: 20 * scaleMultiplier, width: '100%' ***REMOVED******REMOVED*** />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  touchableAreaContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  ***REMOVED***,
  iconContainer: {
    width: 55 * scaleMultiplier,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(AddNewGroupButton)
