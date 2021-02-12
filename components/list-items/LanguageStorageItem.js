import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'
import Separator from '../standard/Separator'
import WahaButton from '../standard/WahaButton'

function LanguageStorageItem ({
  // passed from parent
  languageName,
  languageID,
  megabytes,
  clearDownloads,
  // passed from redux
  font,
  isRTL,
  translations,
  activeGroup
***REMOVED***) {
  return (
    <View style={styles.storageContainer***REMOVED***>
      <View
        style={[
          styles.languageHeaderContainer,
          { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Regular',
            'left',
            colors.chateau
          )***REMOVED***
        >
          {languageName + ' ' + translations.storage.downloads_label***REMOVED***
        </Text>
        <Image
          style={styles.languageLogo***REMOVED***
          source={{
            uri: FileSystem.documentDirectory + languageID + '-header.png'
          ***REMOVED******REMOVED***
        />
      </View>
      <Separator />
      <View
        style={[
          styles.itemContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row'
          ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.tuna
          )***REMOVED***
        >
          {megabytes >= 0
            ? megabytes + ' ' + translations.storage.megabyte_label
            : translations.storage.megabyte_label***REMOVED***
        </Text>
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'h3',
              'Regular',
              'left',
              colors.tuna
            ),
            {
              flex: 1,
              paddingHorizontal: 20
            ***REMOVED***
          ]***REMOVED***
        >
          {translations.storage.storage_used_label***REMOVED***
        </Text>
        <WahaButton
          type='outline'
          color={colors.red***REMOVED***
          label={translations.storage.clear_button_label***REMOVED***
          width={92 * scaleMultiplier***REMOVED***
          onPress={clearDownloads***REMOVED***
          style={{ height: 45 * scaleMultiplier ***REMOVED******REMOVED***
          textStyle={{ fontFamily: font + '-Regular' ***REMOVED******REMOVED***
        />
      </View>
      <Separator />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  storageContainer: {
    width: '100%'
  ***REMOVED***,
  itemContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    // aspectRatio: 5,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  ***REMOVED***,
  languageHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40 * scaleMultiplier,
    // aspectRatio: 8.7,
    backgroundColor: colors.aquaHaze,
    paddingHorizontal: 20
  ***REMOVED***,
  languageLogo: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier
  ***REMOVED***,
  storageContainerFlatList: {
    height: 55 * scaleMultiplier,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.chateau,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: getLanguageFont(activeGroup.language),
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(LanguageStorageItem)
