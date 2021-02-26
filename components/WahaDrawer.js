import * as WebBrowser from 'expo-web-browser'
import React, { useState ***REMOVED*** from 'react'
import { Alert, ScrollView, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { connect ***REMOVED*** from 'react-redux'
import GroupAvatar from '../components/GroupAvatar'
import DrawerItem from '../components/list-items/DrawerItem'
import WahaButton from '../components/standard/WahaButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AddEditGroupModal from '../modals/AddEditGroupModal'
import {
  setHasFetchedLanguageData,
  updateLanguageCoreFiles
***REMOVED*** from '../redux/actions/databaseActions'
import { setIsInstallingLanguageInstance ***REMOVED*** from '../redux/actions/isInstallingLanguageInstanceActions'
import { storeDownloads ***REMOVED*** from '../redux/actions/storedDownloadsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'
import Separator from './standard/Separator'

function mapStateToProps (state) {
  return {
    primaryColor: activeDatabaseSelector(state).primaryColor,
    isRTL: activeDatabaseSelector(state).isRTL,
    activeGroup: activeGroupSelector(state),
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    isConnected: state.network.isConnected,
    languageCoreFilesToUpdate: state.database.languageCoreFilesToUpdate
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    updateLanguageCoreFiles: () => dispatch(updateLanguageCoreFiles()),
    setIsInstallingLanguageInstance: toSet =>
      dispatch(setIsInstallingLanguageInstance(toSet)),
    storeDownloads: downloads => dispatch(storeDownloads(downloads)),
    setHasFetchedLanguageData: hasFetchedLanguageData =>
      dispatch(setHasFetchedLanguageData(hasFetchedLanguageData))
  ***REMOVED***
***REMOVED***

function WahaDrawer ({
  // Props passed from navigation.
  navigation: { navigate ***REMOVED***,
  // Props passed from redux.
  primaryColor,
  isRTL,
  activeGroup,
  translations,
  font,
  isConnected,
  languageCoreFilesToUpdate = [],
  updateLanguageCoreFiles,
  storeDownloads,
  setHasFetchedLanguageData
***REMOVED***) {
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

  //+ FUNCTIONS

  // opens a local browser
  async function openBrowser (url) {
    await WebBrowser.openBrowserAsync(url, { dismissButtonStyle: 'cancel' ***REMOVED***)
  ***REMOVED***

  function onUpdatePress () {
    // Replace our downloads object with an empty array.
    // storeDownloads([])

    // Set setIsInstallingLanguageInstance redux variable to true so that the app knows to switch to the loading screen.
    setIsInstallingLanguageInstance(true)

    // Even though we're not fetching any Firebase data here, set this variable to true anyways just to allow the user to cancel the update if they want.
    setHasFetchedLanguageData(true)

    // Update the language core files.
    updateLanguageCoreFiles()
  ***REMOVED***

  //+ RENDER

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: primaryColor ***REMOVED***]***REMOVED***
      forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' ***REMOVED******REMOVED***
    >
      <View style={styles.drawerHeaderContainer***REMOVED***>
        <View style={styles.groupIconContainer***REMOVED***>
          <GroupAvatar
            style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
            emoji={activeGroup.emoji***REMOVED***
            size={120***REMOVED***
            onPress={() => setShowEditGroupModal(true)***REMOVED***
          />
        </View>
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h2',
            'Black',
            'center',
            colors.white
          )***REMOVED***
          numberOfLines={2***REMOVED***
        >
          {activeGroup.name***REMOVED***
        </Text>
      </View>
      <ScrollView
        bounces={false***REMOVED***
        style={{ backgroundColor: colors.white, flex: 1 ***REMOVED******REMOVED***
      >
        {/* Show an update button if we have any core files to update. */***REMOVED***
        {languageCoreFilesToUpdate.length !== 0 ? (
          <WahaButton
            type={isConnected ? 'filled' : 'inactive'***REMOVED***
            color={isConnected ? colors.apple : colors.geyser***REMOVED***
            onPress={() => {
              Alert.alert(
                'A new update is available to download.',
                'Would you like to download it now?',
                [
                  {
                    text: translations.general.cancel,
                    onPress: () => {***REMOVED***
                  ***REMOVED***,
                  {
                    text: translations.general.ok,
                    onPress: onUpdatePress
                  ***REMOVED***
                ]
              )
            ***REMOVED******REMOVED***
            label='Download Update'
            extraComponent={
              isConnected ? (
                <View
                  style={{
                    width: 50 * scaleMultiplier,
                    alignItems: 'center'
                  ***REMOVED******REMOVED***
                >
                  <Icon
                    name='error-filled'
                    size={30 * scaleMultiplier***REMOVED***
                    color={colors.white***REMOVED***
                  />
                </View>
              ) : (
                <View style={{ width: 50 * scaleMultiplier ***REMOVED******REMOVED***>
                  <Icon
                    name='cloud-slash'
                    size={30 * scaleMultiplier***REMOVED***
                    color={colors.chateau***REMOVED***
                  />
                </View>
              )
            ***REMOVED***
            style={{
              marginHorizontal: 5,
              marginTop: 5,
              marginBottom: 0,
              height: 50 * scaleMultiplier,
              flexDirection: isRTL ? 'row' : 'row-reverse',
              justifyContent: 'flex-end',
              paddingHorizontal: 5
            ***REMOVED******REMOVED***
            textStyle={[
              { paddingHorizontal: 10 ***REMOVED***,
              StandardTypography(
                { font, isRTL ***REMOVED***,
                'h3',
                'Bold',
                'center',
                isConnected ? colors.white : colors.chateau
              )
            ]***REMOVED***
          />
        ) : null***REMOVED***
        <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** />
        <DrawerItem
          icon='group'
          label={translations.groups.header***REMOVED***
          onPress={() => navigate('Groups')***REMOVED***
        />
        <DrawerItem
          icon='security'
          label={translations.security.header***REMOVED***
          onPress={() => navigate('SecurityMode')***REMOVED***
        />
        <DrawerItem
          icon='boat'
          label={translations.mobilization_tools.header***REMOVED***
          onPress={() => navigate('MobilizationTools')***REMOVED***
        />
        <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** />
        <Separator />
        {/* <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** /> */***REMOVED***
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'p',
              'Regular',
              'left',
              colors.chateau
            ),
            {
              marginHorizontal: 20,
              marginTop: 20 * scaleMultiplier,
              marginBottom: 15 * scaleMultiplier
            ***REMOVED***
          ]***REMOVED***
        >
          {translations.general.other***REMOVED***
        </Text>
        <DrawerItem
          icon='storage'
          label={translations.storage.header***REMOVED***
          onPress={() => navigate('Storage')***REMOVED***
        />
        <DrawerItem
          icon='email'
          label={translations.general.feedback***REMOVED***
          onPress={
            () =>
              openBrowser('https://coda.io/form/Waha-Bug-Report_dyWvuvL6WTx')
            // New "contact us form" testing
            // openBrowser(
            //   `https://coda.io/form/Contact-Us_dOsPhfw4nDB?Language=${activeGroup.language***REMOVED***`
            // )
          ***REMOVED***
        />
        <DrawerItem
          icon='info'
          onPress={() => navigate('Information')***REMOVED***
          label={translations.general.information***REMOVED***
        />
      </ScrollView>
      <AddEditGroupModal
        isVisible={showEditGroupModal***REMOVED***
        hideModal={() => setShowEditGroupModal(false)***REMOVED***
        type='EditGroup'
        group={activeGroup***REMOVED***
      />
    </SafeAreaView>
  )
***REMOVED***

//+ REDUX

const styles = StyleSheet.create({
  container: {
    flex: 1
  ***REMOVED***,
  drawerHeaderContainer: {
    width: '100%',
    height: 225 * scaleMultiplier,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 35
  ***REMOVED***,
  groupIconContainer: {
    alignItems: 'center',
    marginVertical: 10
  ***REMOVED***,
  pencilIconContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    height: '100%'
  ***REMOVED***,
  smallDrawerItemsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end'
  ***REMOVED***
***REMOVED***)

//+ REDUX

export default connect(mapStateToProps, mapDispatchToProps)(WahaDrawer)
