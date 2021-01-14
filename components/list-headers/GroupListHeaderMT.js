import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, getLanguageFont, scaleMultiplier ***REMOVED*** from '../../constants'
import { StandardTypography ***REMOVED*** from '../../styles/typography'

function GroupListHeaderMT ({
  // passed from parent
  languageID,
  // passed from redux
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

// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    groups: state.groups,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language)
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(GroupListHeaderMT)
