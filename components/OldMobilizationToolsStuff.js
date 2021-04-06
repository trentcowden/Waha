// Some old stuff down here. May delete later.

// <View style={{ width: '100%', flex: 1 ***REMOVED******REMOVED***>
//   {areMobilizationToolsUnlocked ? (
//     <SectionList
//       bounces={false***REMOVED***
//       sections={getLanguageAndGroupData()***REMOVED***
//       renderSectionHeader={({ section ***REMOVED***) => renderLanguageInstanceItem(section)***REMOVED***
//       renderItem={({ item, section ***REMOVED***) =>
//         // If a language instance has no Mobilization Tools sets, don't render any group items. We show a placeholder message in the section footer in that case. Otherwise, render the group item as normal.
//         checkForMTContent(section) ? renderGroupItem(item) : null
//       ***REMOVED***
//       ListHeaderComponent={() => headerComponent***REMOVED***
//       renderSectionFooter={({ section ***REMOVED***) =>
//         // Similarly, if a language instance has no Mobilization Tools sets, render the filler component that tells the user they can't enable Mobilization Tools for any groups in this language instance.
//         checkForMTContent(section) ? (
//           <View style={{ width: '100%', height: 20 ***REMOVED******REMOVED*** />
//         ) : (
//           noMTContentComponent
//         )
//       ***REMOVED***
//       keyExtractor={item => item.name***REMOVED***
//       SectionSeparatorComponent={({ section ***REMOVED***) =>
//         checkForMTContent(section) ? <Separator /> : null
//       ***REMOVED***
//       ItemSeparatorComponent={({ section ***REMOVED***) =>
//         checkForMTContent(section) ? <Separator /> : null
//       ***REMOVED***
//     />
//   ) : null***REMOVED***
// </View>

// /**
//  * Renders the GroupListHeaderMT component used for the SectionList section header.
//  * @param {Object***REMOVED*** languageInstance - The object for the language instance to render.
//  * @return {Component***REMOVED*** - The GroupListHeaderMT component.
//  */
// function renderLanguageInstanceItem (languageInstance) {
//   return (
//     <GroupListHeaderMT
//       languageName={languageInstance.languageName***REMOVED***
//       languageID={languageInstance.languageID***REMOVED***
//       areMobilizationToolsUnlocked={areMobilizationToolsUnlocked***REMOVED***
//     />
//   )
// ***REMOVED***

// /**
//  * Renders the GroupItemMT component used for the Groups SectionList item.
//  * @param {Object***REMOVED*** group - The object for the group to render.
//  * @return {Component***REMOVED*** - The GroupItemMT component.
//  */
// function renderGroupItem (group) {
//   return <GroupItemMT thisGroup={group***REMOVED*** />
// ***REMOVED***

// The header component for the SectionList.
// var headerComponent = (
//   <View>
//     {areMobilizationToolsUnlocked ? (
//       <Hero source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED*** />
//     ) : null***REMOVED***
//     <Blurb text={translations.mobilization_tools.mobilization_tools_vision***REMOVED*** />
//     <Separator />
//     <WahaItem
//       title={
//         areMobilizationToolsUnlocked
//           ? translations.mobilization_tools.view_code_button_label
//           : translations.mobilization_tools.unlock_mt_button_label
//       ***REMOVED***
//       onPress={
//         areMobilizationToolsUnlocked
//           ? () =>
//               Alert.alert(
//                 translations.mobilization_tools.mt_code_title,
//                 '281820',
//                 [
//                   {
//                     text: translations.general.copy_to_clipboard,
//                     onPress: () => Clipboard.setString('281820')
//                   ***REMOVED***,
//                   {
//                     text: translations.general.close,
//                     onPress: () => {***REMOVED***
//                   ***REMOVED***
//                 ]
//               )
//           : () => navigate('MobilizationToolsUnlock')
//       ***REMOVED***
//     >
//       <Icon
//         name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
//         color={colors.tuna***REMOVED***
//         size={50 * scaleMultiplier***REMOVED***
//       />
//     </WahaItem>
//     <Separator />
//     <View style={{ width: '100%', height: 40 * scaleMultiplier ***REMOVED******REMOVED*** />
//     <View style={{ width: '100%', paddingHorizontal: 20 ***REMOVED******REMOVED***>
//       <Text
//         style={StandardTypography(
//           { font, isRTL ***REMOVED***,
//           'h2',
//           'Black',
//           'left',
//           colors.shark
//         )***REMOVED***
//       >
//         {translations.mobilization_tools.mobilization_tools_status_label***REMOVED***
//       </Text>
//     </View>
//   </View>
// )

// /**
//    * Gets an array of all the installed language instances and their groups. This is used as the data for the section list of all the groups on this screen and on the MobilizationTools screen.
//    * @return {Object[]***REMOVED*** - A list of the installed language instances and their groups.
//    * @return {Object[].title***REMOVED*** - The name of the language.
//    * @return {Object[].languageID***REMOVED*** - The ID of the language instance.
//    * @return {Object[].data[]***REMOVED*** - An array of the groups that are a part of this language instance.
//    */
// function getLanguageAndGroupData () {
//   var installedLanguageInstances = []
//   for (key in database) {
//     // Because there are other redux variables stored in the database object, filter for just the language objects (which all have a length of 2).
//     if (key.length === 2) {
//       var languageObject = {***REMOVED***
//       languageObject['languageName'] = database[key].displayName
//       languageObject['languageID'] = key

//       // Get all the groups that are a part of this language instance.
//       languageObject['data'] = groups.filter(group => group.language === key)

//       // Add all of this to the installedLanguageInstances array.
//       installedLanguageInstances.push(languageObject)
//     ***REMOVED***
//   ***REMOVED***
//   return installedLanguageInstances
// ***REMOVED***

// function checkForMTContent (section) {
//   var hasMTContent = database[section.languageID].sets.some(set => {
//     return /[a-z]{2***REMOVED***.3.[0-9]+/.test(set.id)
//   ***REMOVED***)
//   return hasMTContent
// ***REMOVED***

// // A component that displays a simple message that there's no MT content available for a language instance. Used as a section footer for language instances that have no MT content.
// var noMTContentComponent = (
//   <View>
//     <Separator />
//     <View
//       style={{
//         height: 80 * scaleMultiplier,
//         justifyContent: 'flex-start',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: colors.white,
//         justifyContent: 'center',
//         paddingHorizontal: 20
//       ***REMOVED******REMOVED***
//     >
//       <Text
//         style={StandardTypography(
//           { font, isRTL ***REMOVED***,
//           'p',
//           'Regular',
//           'center',
//           colors.chateau
//         )***REMOVED***
//       >
//         {translations.mobilization_tools.no_mobilization_tools_content_text***REMOVED***
//       </Text>
//     </View>
//     <Separator />
//     <View style={{ width: '100%', height: 20 ***REMOVED******REMOVED*** />
//   </View>
// )

import * as FileSystem from 'expo-file-system'
import { default as React, default as React ***REMOVED*** from 'react'
import { Image, StyleSheet, Switch, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../../constants'
import { logEnableMobilizationToolsForAGroup ***REMOVED*** from '../../LogEventFunctions'
import {
  addSet,
  setShouldShowMobilizationToolsTab
***REMOVED*** from '../../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import {
  getLanguageFont,
  StandardTypography,
  SystemTypography
***REMOVED*** from '../../styles/typography'
import GroupAvatar from '../GroupAvatar'

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

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: activeDatabaseSelector(state).isRTL,
    groups: state.groups,
    font: getLanguageFont(activeGroupSelector(state).language),
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setShouldShowMobilizationToolsTab: (groupName, toSet) => {
      dispatch(setShouldShowMobilizationToolsTab(groupName, toSet))
    ***REMOVED***,
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

/**
 * A pressable item used on the MobilizationTools screen to display a group. Similar to the GroupItem component, but a lot simpler. It still displays the group name, but just allows the user to enable the Mobilization Tools for a specific group.
 * @param {Object***REMOVED*** thisGroup - The object for the group that we're displaying in this component.
 */
const GroupItemMT = ({
  // Props passed from a parent component.
  thisGroup,
  // Props passed from redux.
  database,
  isRTL,
  groups,
  font,
  areMobilizationToolsUnlocked,
  activeGroup,
  setShouldShowMobilizationToolsTab,
  addSet
***REMOVED***) => {
  return (
    <View
      style={[
        styles.groupListItemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
    >
      <View
        style={{
          marginHorizontal: 20
        ***REMOVED******REMOVED***
      >
        <GroupAvatar
          style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
          size={50 * scaleMultiplier***REMOVED***
          emoji={thisGroup.emoji***REMOVED***
          isActive={activeGroup.name === thisGroup.name***REMOVED***
        />
      </View>
      <View style={styles.groupNameContainer***REMOVED***>
        <Text
          style={StandardTypography(
            {
              font: getLanguageFont(thisGroup.language),
              isRTL: isRTL
            ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.shark
          )***REMOVED***
        >
          {thisGroup.name***REMOVED***
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
        <Switch
          trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
          thumbColor={colors.white***REMOVED***
          ios_backgroundColor={colors.chateau***REMOVED***
          onValueChange={() => {
            // Toggle the visibility of the Mobilization Tools tab for this group on or off.
            setShouldShowMobilizationToolsTab(
              thisGroup.name,
              !thisGroup.shouldShowMobilizationToolsTab
            )

            // If we're toggling the Mobilization Tools on for this group, log the event and add the first 2 Mobilization Tools sets to this group.
            if (!thisGroup.shouldShowMobilizationToolsTab) {
              logEnableMobilizationToolsForAGroup(
                activeGroup.language,
                thisGroup.id,
                groups.indexOf(thisGroup) + 1
              )
              for (const set of database[thisGroup.language].sets) {
                if (
                  getSetInfo('category', set.id) === 'mobilization tools' &&
                  (getSetInfo('index', set.id) === 1 ||
                    getSetInfo('index', set.id) === 2)
                ) {
                  addSet(thisGroup.name, thisGroup.id, set)
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED******REMOVED***
          value={thisGroup.shouldShowMobilizationToolsTab***REMOVED***
          disabled={areMobilizationToolsUnlocked ? false : true***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  groupListItemContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  ***REMOVED***,
  groupNameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemMT)
