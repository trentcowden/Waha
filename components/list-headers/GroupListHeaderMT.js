import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'

function mapStateToProps (state) {
  return {
    activeDatabase: activeDatabaseSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL,
    groups: state.groups,
    activeGroup: activeGroupSelector(state),
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language)
  ***REMOVED***
***REMOVED***

function GroupListHeaderMT ({
  // Props passed from a parent component.
  languageID,
  // Props passed from redux.
  activeDatabase,
  isRTL,
  groups,
  activeGroup,
  translations,
  font
***REMOVED***) {
  //+ FUNCTIONS

  //+ RENDER

  return (
    <View
      style={[
        styles.languageHeaderContainer,
        { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
    >
      <View>
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.chateau
          )***REMOVED***
        >
          {
            translations.general.brands[languageID]
            // +
            //   ' ' +
            //   translations.mobilization_tools.groups_label
          ***REMOVED***
        </Text>
        {/* <Text
          style={StandardTypography(
            props,
            'h3',
            'Regular',
            'left',
            colors.chateau
          )***REMOVED***
        >
          {
            translations.mobilization_tools
              .mobilization_tools_status_label
          ***REMOVED***
        </Text> */***REMOVED***
      </View>
      <Image
        style={styles.languageLogo***REMOVED***
        source={{
          uri: FileSystem.documentDirectory + languageID + '-header.png'
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  languageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55 * scaleMultiplier,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.aquaHaze
  ***REMOVED***,
  languageLogo: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(GroupListHeaderMT)
