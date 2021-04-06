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
import { getLanguageFont, SystemTypography ***REMOVED*** from '../../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    database: state.database
  ***REMOVED***
***REMOVED***

/**
 * The header for the groups section list used on the Mobilization Tools screen. Displays the name of the language in the active group's language and the language instance's logo.
 * @param {string***REMOVED*** languageID - The ID for the language instance.
 */
const GroupListHeaderMT = ({
  // Props passed from a parent component.
  languageID,
  // Props passed from redux.
  isRTL,
  translations,
  font,
  database
***REMOVED***) => {
  return (
    <View
      style={[
        styles.groupListHeaderMTContainer,
        { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
    >
      <View>
        <Text
          style={SystemTypography(
            false,
            'h3',
            'Bold',
            'left',
            colors.chateau,
            getLanguageFont(languageID)
          )***REMOVED***
        >
          {database[languageID].displayName***REMOVED***
        </Text>
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

const styles = StyleSheet.create({
  groupListHeaderMTContainer: {
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
