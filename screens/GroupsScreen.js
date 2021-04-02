import React, { useEffect, useState ***REMOVED*** from 'react'
import { SectionList, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import AddNewGroupButton from '../components/AddNewGroupButton'
import AddNewLanguageInstanceButton from '../components/AddNewLanguageInstanceButton'
import GroupsScreenEditButton from '../components/GroupsScreenEditButton'
import GroupListHeader from '../components/list-headers/GroupListHeader'
import GroupItem from '../components/list-items/GroupItem'
import BackButton from '../components/standard/BackButton'
import Separator from '../components/standard/Separator'
import AddEditGroupModal from '../modals/AddEditGroupModal'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: activeDatabaseSelector(state).isRTL,
    translations: activeDatabaseSelector(state).translations,
    isConnected: state.network.isConnected,
    font: getLanguageFont(activeGroupSelector(state).language),
    groups: state.groups,
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

/**
 * A screen that displays all of the installed language instances and the groups in those language instances. Allows for switching the active group and  editing, deleting, and adding groups & languages.
 */
function GroupsScreen ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate ***REMOVED***,
  // Props passed from redux.
  database,
  isRTL,
  translations,
  isConnected,
  font,
  groups,
  activeGroup
***REMOVED***) {
  /** Keeps track of whether the screen is in editing mode or not. Editing mode is enabled via a button in the header and switches a lot of functionality on the screen. */
  const [isEditing, setIsEditing] = useState(false)

  /** useEffect function that sets the navigation options for this screen. Unlock similar functions in other screens, this one is updated more often since the header must update whenever the active group changes and when editingMode changes. */
  useEffect(() => {
    setOptions({
      headerStyle: {
        // Switch the background color of the header in editing mode to reflect that we're in a non-standard screen view.
        backgroundColor: isEditing ? colors.blue : colors.aquaHaze
      ***REMOVED***,
      headerTitleStyle: {
        // Update the header text color to go with the background color changes.
        color: isEditing ? colors.white : colors.shark,
        fontFamily: font + '-Bold'
      ***REMOVED***,
      headerRight: isRTL
        ? () => (
            <BackButton
              color={isEditing ? colors.white : null***REMOVED***
              onPress={() => goBack()***REMOVED***
            />
          )
        : () => (
            <GroupsScreenEditButton
              onPress={() => setIsEditing(old => !old)***REMOVED***
              isEditing={isEditing***REMOVED***
            />
          ),
      headerLeft: isRTL
        ? () => (
            <GroupsScreenEditButton
              onPress={() => setIsEditing(old => !old)***REMOVED***
              isEditing={isEditing***REMOVED***
            />
          )
        : () => (
            <BackButton
              color={isEditing ? colors.white : null***REMOVED***
              onPress={() => goBack()***REMOVED***
            />
          )
    ***REMOVED***)
  ***REMOVED***, [isEditing, isRTL, activeGroup])

  /** When adding a new group, this state keeps track of the language instance that the user is adding a group in so it can be passed into the CreateGroup() function. */
  const [languageID, setLanguageID] = useState(activeGroup.languageID)

  /** When editing a specific group, this component stores the object for the group that is being edited. */
  const [editingGroup, setEditingGroup] = useState(activeGroup)

  /** Keeps track of whether the add group modal is visible. */
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)

  /** Keeps track of whether the edit gruop modal is visible. */
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

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

    // (TEMP) If we have the install times stored, sort the languages by the time installed.
    return installedLanguageInstances.some(
      key => database[key.languageID].installTime === null
    )
      ? installedLanguageInstances
      : installedLanguageInstances.sort(
          (a, b) =>
            database[a.languageID].installTime -
            database[b.languageID].installTime
        )
  ***REMOVED***

  /**
   * Renders a GroupListHeader component used for the Groups SectionList section header.
   * @param {Object***REMOVED*** languageInstance - The object for the language instance to render.
   * @return {Component***REMOVED*** - The GroupListHeader component.
   */
  function renderGroupListHeader (languageInstance) {
    return (
      <GroupListHeader
        languageName={languageInstance.languageName***REMOVED***
        languageID={languageInstance.languageID***REMOVED***
        isEditing={isEditing***REMOVED***
      />
    )
  ***REMOVED***

  /**
   * Renders a GroupItem component used for the Groups SectionList item.
   * @param {Object***REMOVED*** group - The object for the group to render.
   * @return {Component***REMOVED*** - The GroupItem component.
   */
  function renderGroupItem (group) {
    return (
      <GroupItem
        thisGroup={group***REMOVED***
        isEditing={isEditing***REMOVED***
        openEditModal={() => {
          setEditingGroup(group)
          setShowEditGroupModal(true)
        ***REMOVED******REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <SectionList
        sections={getLanguageAndGroupData()***REMOVED***
        renderItem={({ item ***REMOVED***) => renderGroupItem(item)***REMOVED***
        renderSectionHeader={({ section ***REMOVED***) => renderGroupListHeader(section)***REMOVED***
        keyExtractor={item => item.name***REMOVED***
        extraData={isRTL***REMOVED***
        ItemSeparatorComponent={() => <Separator />***REMOVED***
        SectionSeparatorComponent={() => <Separator />***REMOVED***
        renderSectionFooter={({ section ***REMOVED***) => (
          <AddNewGroupButton
            section={section***REMOVED***
            setLanguageID={languageID => setLanguageID(languageID)***REMOVED***
            setShowAddGroupModal={toSet => setShowAddGroupModal(toSet)***REMOVED***
          />
        )***REMOVED***
        ListHeaderComponent={() => (
          <View style={{ height: 10, width: '100%' ***REMOVED******REMOVED*** />
        )***REMOVED***
        ListFooterComponent={
          <AddNewLanguageInstanceButton
            navigate={(screen, params) => navigate(screen, params)***REMOVED***
            languageAndGroupData={getLanguageAndGroupData()***REMOVED***
          />
        ***REMOVED***
      />
      {/* Modals */***REMOVED***
      <AddEditGroupModal
        isVisible={showAddGroupModal***REMOVED***
        hideModal={() => setShowAddGroupModal(false)***REMOVED***
        type='AddGroup'
        languageID={languageID***REMOVED***
      />
      <AddEditGroupModal
        isVisible={showEditGroupModal***REMOVED***
        hideModal={() => setShowEditGroupModal(false)***REMOVED***
        type='EditGroup'
        group={editingGroup***REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(GroupsScreen)
