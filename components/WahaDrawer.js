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
import { appVersion ***REMOVED*** from '../modeSwitch'
import {
  setHasFetchedLanguageData,
  updateLanguageCoreFiles
***REMOVED*** from '../redux/actions/databaseActions'
import { setIsInstallingLanguageInstance ***REMOVED*** from '../redux/actions/isInstallingLanguageInstanceActions'
import { storeDownloads ***REMOVED*** from '../redux/actions/storedDownloadsActions'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'
import Separator from './standard/Separator'

function WahaDrawer (props) {
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

  //+ FUNCTIONS

  // opens a local browser
  async function openBrowser (url) {
    await WebBrowser.openBrowserAsync(url, { dismissButtonStyle: 'cancel' ***REMOVED***)
  ***REMOVED***

  function onUpdatePress () {
    // Replace our downloads object with an empty array.
    // props.storeDownloads([])

    // Set setIsInstallingLanguageInstance redux variable to true so that the app knows to switch to the loading screen.
    props.setIsInstallingLanguageInstance(true)

    // Even though we're not fetching any Firebase data here, set this variable to true anyways just to allow the user to cancel the update if they want.
    props.setHasFetchedLanguageData(true)

    // Update the language core files.
    props.updateLanguageCoreFiles()
  ***REMOVED***

  //+ RENDER

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: props.primaryColor ***REMOVED***]***REMOVED***
      forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' ***REMOVED******REMOVED***
    >
      <View style={styles.drawerHeaderContainer***REMOVED***>
        <View style={styles.groupIconContainer***REMOVED***>
          <GroupAvatar
            style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
            emoji={props.activeGroup.emoji***REMOVED***
            size={120***REMOVED***
            onPress={() => setShowEditGroupModal(true)***REMOVED***
          />
        </View>
        <Text
          style={StandardTypography(
            props,
            'h2',
            'Black',
            'center',
            colors.white
          )***REMOVED***
          numberOfLines={2***REMOVED***
        >
          {props.activeGroup.name***REMOVED***
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1
        ***REMOVED******REMOVED***
      >
        <ScrollView bounces={false***REMOVED*** style={{ flex: 1 ***REMOVED******REMOVED***>
          {/* Show an update button if we have any core files to update. */***REMOVED***
          {props.languageCoreFilesToUpdate.length !== 0 ? (
            <WahaButton
              type={props.isConnected ? 'filled' : 'inactive'***REMOVED***
              color={props.isConnected ? colors.apple : colors.geyser***REMOVED***
              onPress={() => {
                Alert.alert(
                  'A new update is available to download.',
                  'Would you like to download it now?',
                  [
                    {
                      text: props.translations.general.cancel,
                      onPress: () => {***REMOVED***
                    ***REMOVED***,
                    {
                      text: props.translations.general.ok,
                      onPress: onUpdatePress
                    ***REMOVED***
                  ]
                )
              ***REMOVED******REMOVED***
              label='Download Update'
              extraComponent={
                props.isConnected ? (
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
                flexDirection: props.isRTL ? 'row' : 'row-reverse',
                justifyContent: 'flex-end',
                paddingHorizontal: 5
              ***REMOVED******REMOVED***
              textStyle={[
                { paddingHorizontal: 10 ***REMOVED***,
                StandardTypography(
                  props,
                  'h3',
                  'Bold',
                  'center',
                  props.isConnected ? colors.white : colors.chateau
                )
              ]***REMOVED***
            />
          ) : null***REMOVED***
          <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** />
          <DrawerItem
            iconName='group'
            text={props.translations.groups.header***REMOVED***
            onPress={() => props.navigation.navigate('Groups')***REMOVED***
          />
          <DrawerItem
            iconName='security'
            text={props.translations.security.header***REMOVED***
            onPress={() => props.navigation.navigate('Security')***REMOVED***
          />
          <DrawerItem
            iconName='boat'
            text={props.translations.mobilization_tools.header***REMOVED***
            onPress={() => props.navigation.navigate('MobilizationTools')***REMOVED***
          />
          <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** />
          <Separator />
          <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** />
          <DrawerItem
            iconName='storage'
            text={props.translations.storage.header***REMOVED***
            onPress={() => props.navigation.navigate('Storage')***REMOVED***
          />
          <DrawerItem
            iconName='email'
            text={props.translations.general.feedback***REMOVED***
            onPress={() =>
              openBrowser('https://coda.io/form/Waha-Bug-Report_dyWvuvL6WTx')
            ***REMOVED***
          />
          <DrawerItem
            iconName='language'
            onPress={() =>
              openBrowser(
                'https://kingdomstrategies.givingfuel.com/general-giving'
              )
            ***REMOVED***
            text={props.translations.general.donate_to_waha***REMOVED***
          />
          <DrawerItem
            iconName='info'
            onPress={() => openBrowser('https://waha.app/privacy-policy/')***REMOVED***
            text={props.translations.general.privacy***REMOVED***
          />
          <View style={{ width: '100%', height: 5 ***REMOVED******REMOVED*** />
          <Text
            style={StandardTypography(
              props,
              'd',
              'Regular',
              'center',
              colors.chateau
            )***REMOVED***
          >
            {'v' + appVersion***REMOVED***
          </Text>
          {/* <DrawerItem
            iconName='info'
            text={'You are using ' + appVersion***REMOVED***
            onPress={() => {***REMOVED******REMOVED***
          /> */***REMOVED***
        </ScrollView>
        {/* <SafeAreaView
          style={[
            styles.smallDrawerItemsContainer,
            {
              flexDirection:
                Dimensions.get('window').height < 550
                  ? props.isRTL
                    ? 'row-reverse'
                    : 'row'
                  : 'column'
            ***REMOVED***
          ]***REMOVED***
        >
          <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://kingdomstrategies.givingfuel.com/general-giving'
              )
            ***REMOVED***
            label={props.translations.general.donate_to_waha***REMOVED***
          />
          <SmallDrawerItem
            onPress={() => openBrowser('https://waha.app/privacy-policy/')***REMOVED***
            label={props.translations.general.privacy***REMOVED***
          />
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 10,
              marginVertical: 5
            ***REMOVED******REMOVED***
          >
            <Text
              style={StandardTypography(
                props,
                'd',
                'Regular',
                'left',
                colors.chateau
              )***REMOVED***
            >
              {appVersion***REMOVED***
            </Text>
          </View>
        </SafeAreaView> */***REMOVED***
      </View>
      <AddEditGroupModal
        isVisible={showEditGroupModal***REMOVED***
        hideModal={() => setShowEditGroupModal(false)***REMOVED***
        type='EditGroup'
        groupName={props.activeGroup.name***REMOVED***
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

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor,
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
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

export default connect(mapStateToProps, mapDispatchToProps)(WahaDrawer)
