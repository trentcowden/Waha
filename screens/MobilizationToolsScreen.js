import React, { useEffect, useState ***REMOVED*** from 'react'
import { Alert, Clipboard, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import GroupListHeaderMT from '../components/list-headers/GroupListHeaderMT'
import GroupItemMT from '../components/list-items/GroupItemMT'
import BackButton from '../components/standard/BackButton'
import Blurb from '../components/standard/Blurb'
import Hero from '../components/standard/Hero'
import Separator from '../components/standard/Separator'
import WahaItem from '../components/standard/WahaItem'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: activeDatabaseSelector(state).isRTL,
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    groups: state.groups
  ***REMOVED***
***REMOVED***

/**
 * Screen that shows information about the Mobilization Tools and, after they've been globally unlocked, a list of groups with the option to enable them for a group.
 */
function MobilizationToolsScreen ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate ***REMOVED***,
  // Props passed from redux.
  database,
  isRTL,
  translations,
  font,
  areMobilizationToolsUnlocked,
  groups
***REMOVED***) {
  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***)
  ***REMOVED***, [])

  /** Keeps track of whether the how MTs work modal is visible. */
  const [showHowMTsWorkModal, setShowHowMTsWorkModal] = useState(false)

  /**
   * Gets an array of all the installed language instances and their groups. This is used as the data for the section list of all the groups on this screen and on the MobilizationTools screen.
   * @return {Object[]***REMOVED*** - A list of the installed language instances and their groups.
   * @return {Object[].title***REMOVED*** - The name of the language.
   * @return {Object[].languageID***REMOVED*** - The ID of the language instance.
   * @return {Object[].data[]***REMOVED*** - An array of the groups that are a part of this language instance.
   */
  function getLanguageAndGroupData () {
    var installedLanguageInstances = []
    for (key in database) {
      // Because there are other redux variables stored in the database object, filter for just the language objects (which all have a length of 2).
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['languageName'] = database[key].displayName
        languageObject['languageID'] = key

        // Get all the groups that are a part of this language instance.
        languageObject['data'] = groups.filter(group => group.language === key)

        // Add all of this to the installedLanguageInstances array.
        installedLanguageInstances.push(languageObject)
      ***REMOVED***
    ***REMOVED***
    return installedLanguageInstances
  ***REMOVED***

  function checkForMTContent (section) {
    var hasMTContent = database[section.languageID].sets.some(set => {
      return /[a-z]{2***REMOVED***.3.[0-9]+/.test(set.id)
    ***REMOVED***)
    return hasMTContent
  ***REMOVED***

  // The header component for the SectionList.
  var headerComponent = (
    <View>
      {areMobilizationToolsUnlocked ? (
        <Hero source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED*** />
      ) : null***REMOVED***
      <Blurb text={translations.mobilization_tools.mobilization_tools_vision***REMOVED*** />
      <Separator />
      <WahaItem
        title={
          areMobilizationToolsUnlocked
            ? translations.mobilization_tools.view_code_button_label
            : translations.mobilization_tools.unlock_mt_button_label
        ***REMOVED***
        onPress={
          areMobilizationToolsUnlocked
            ? () =>
                Alert.alert(
                  translations.mobilization_tools.mt_code_title,
                  '281820',
                  [
                    {
                      text: translations.general.copy_to_clipboard,
                      onPress: () => Clipboard.setString('281820')
                    ***REMOVED***,
                    {
                      text: translations.general.close,
                      onPress: () => {***REMOVED***
                    ***REMOVED***
                  ]
                )
            : () => navigate('MobilizationToolsUnlock')
        ***REMOVED***
      >
        <Icon
          name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator />
      <View style={{ width: '100%', height: 40 * scaleMultiplier ***REMOVED******REMOVED*** />
      <View style={{ width: '100%', paddingHorizontal: 20 ***REMOVED******REMOVED***>
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h2',
            'Black',
            'left',
            colors.shark
          )***REMOVED***
        >
          {translations.mobilization_tools.mobilization_tools_status_label***REMOVED***
        </Text>
      </View>
    </View>
  )

  // A component that displays a simple message that there's no MT content available for a language instance. Used as a section footer for language instances that have no MT content.
  var noMTContentComponent = (
    <View>
      <Separator />
      <View
        style={{
          height: 80 * scaleMultiplier,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          justifyContent: 'center',
          paddingHorizontal: 20
        ***REMOVED******REMOVED***
      >
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'p',
            'Regular',
            'center',
            colors.chateau
          )***REMOVED***
        >
          {translations.mobilization_tools.no_mobilization_tools_content_text***REMOVED***
        </Text>
      </View>
      <Separator />
      <View style={{ width: '100%', height: 20 ***REMOVED******REMOVED*** />
    </View>
  )

  /**
   * Renders the GroupListHeaderMT component used for the SectionList section header.
   * @param {Object***REMOVED*** languageInstance - The object for the language instance to render.
   * @return {Component***REMOVED*** - The GroupListHeaderMT component.
   */
  function renderLanguageInstanceItem (languageInstance) {
    return (
      <GroupListHeaderMT
        languageName={languageInstance.languageName***REMOVED***
        languageID={languageInstance.languageID***REMOVED***
        areMobilizationToolsUnlocked={areMobilizationToolsUnlocked***REMOVED***
      />
    )
  ***REMOVED***

  /**
   * Renders the GroupItemMT component used for the Groups SectionList item.
   * @param {Object***REMOVED*** group - The object for the group to render.
   * @return {Component***REMOVED*** - The GroupItemMT component.
   */
  function renderGroupItem (group) {
    return <GroupItemMT thisGroup={group***REMOVED*** />
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      {/* Before the Mobilization Tools are unlocked, we want to show a simple blurb and a button to navigate to the unlocking screen. Once the Mobilization Tools are unlocked, we don't show these. */***REMOVED***
      {/* {areMobilizationToolsUnlocked ? null : ( */***REMOVED***
      {/* <View style={{ width: '100%' ***REMOVED******REMOVED***> */***REMOVED***
      <Hero source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED*** />
      <Blurb
        text={
          areMobilizationToolsUnlocked
            ? translations.mobilization_tools.mobilization_tools_vision
            : translations.mobilization_tools.mobilization_tools_pre_unlock
        ***REMOVED***
      />
      <Separator />
      <WahaItem
        title={
          areMobilizationToolsUnlocked
            ? translations.mobilization_tools.view_code_button_label
            : translations.mobilization_tools.unlock_mt_button_label
        ***REMOVED***
        onPress={
          areMobilizationToolsUnlocked
            ? () =>
                Alert.alert(
                  translations.mobilization_tools.mt_code_title,
                  '281820',
                  [
                    {
                      text: translations.general.copy_to_clipboard,
                      onPress: () => Clipboard.setString('281820')
                    ***REMOVED***,
                    {
                      text: translations.general.close,
                      onPress: () => {***REMOVED***
                    ***REMOVED***
                  ]
                )
            : () => navigate('MobilizationToolsUnlock')
        ***REMOVED***
      >
        <Icon
          name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator />
      {/* </View> */***REMOVED***
      {/* )***REMOVED*** */***REMOVED***
      {/* Once the Mobilization Tools are unlocked, we want to show a SectionList of all the groups with the option to enable the Mobilization Tools tab for that group. We also want to render a large header section with a hero, blurb, and button to view the unlock code. The reason this is a list header and not separate from the list is so that the entire screen can scroll. Otherwise, small phones would have a tiny window to view the section list.*/***REMOVED***
      {/* <View style={{ width: '100%', flex: 1 ***REMOVED******REMOVED***>
        {areMobilizationToolsUnlocked ? (
          <SectionList
            bounces={false***REMOVED***
            sections={getLanguageAndGroupData()***REMOVED***
            renderSectionHeader={({ section ***REMOVED***) =>
              renderLanguageInstanceItem(section)
            ***REMOVED***
            renderItem={({ item, section ***REMOVED***) =>
              // If a language instance has no Mobilization Tools sets, don't render any group items. We show a placeholder message in the section footer in that case. Otherwise, render the group item as normal.
              checkForMTContent(section) ? renderGroupItem(item) : null
            ***REMOVED***
            ListHeaderComponent={() => headerComponent***REMOVED***
            renderSectionFooter={({ section ***REMOVED***) =>
              // Similarly, if a language instance has no Mobilization Tools sets, render the filler component that tells the user they can't enable Mobilization Tools for any groups in this language instance.
              checkForMTContent(section) ? (
                <View style={{ width: '100%', height: 20 ***REMOVED******REMOVED*** />
              ) : (
                noMTContentComponent
              )
            ***REMOVED***
            keyExtractor={item => item.name***REMOVED***
            SectionSeparatorComponent={({ section ***REMOVED***) =>
              checkForMTContent(section) ? <Separator /> : null
            ***REMOVED***
            ItemSeparatorComponent={({ section ***REMOVED***) =>
              checkForMTContent(section) ? <Separator /> : null
            ***REMOVED***
          />
        ) : null***REMOVED***
      </View> */***REMOVED***
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(MobilizationToolsScreen)
