import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'
import Separator from '../standard/Separator'
import WahaButton from '../standard/WahaButton'

function LanguageStorageItem (props) {
  return (
    <View style={styles.storageContainer***REMOVED***>
      <View
        style={[
          styles.languageHeaderContainer,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={Typography(props, 'h3', 'regular', 'left', colors.chateau)***REMOVED***
        >
          {props.languageName +
            ' ' +
            props.translations.storage.downloads_label***REMOVED***
        </Text>
        <Image
          style={styles.languageLogo***REMOVED***
          source={{
            uri: FileSystem.documentDirectory + props.languageID + '-header.png'
          ***REMOVED******REMOVED***
        />
      </View>
      <Separator />
      <View
        style={[
          styles.itemContainer,
          {
            flexDirection: props.isRTL ? 'row-reverse' : 'row'
          ***REMOVED***
        ]***REMOVED***
      >
        <Text style={Typography(props, 'h3', 'medium', 'left', colors.tuna)***REMOVED***>
          {props.megabytes >= 0
            ? props.megabytes + ' ' + props.translations.storage.megabyte_label
            : props.translations.storage.megabyte_label***REMOVED***
        </Text>
        <Text
          style={[
            Typography(props, 'h3', 'regular', 'left', colors.tuna),
            {
              flex: 1,
              paddingHorizontal: 20
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.storage.storage_used_label***REMOVED***
        </Text>
        <WahaButton
          type='outline'
          color={colors.red***REMOVED***
          label={props.translations.storage.clear_button_label***REMOVED***
          width={92 * scaleMultiplier***REMOVED***
          onPress={props.clearDownloads***REMOVED***
          style={{ height: 45 * scaleMultiplier ***REMOVED******REMOVED***
          textStyle={{ fontFamily: props.font + '-regular' ***REMOVED******REMOVED***
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
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(LanguageStorageItem)
