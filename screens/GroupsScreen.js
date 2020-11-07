import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import GroupListHeader from '../components/list-headers/GroupListHeader'
import GroupItem from '../components/list-items/GroupItem'
import BackButton from '../components/standard/BackButton'
import Separator from '../components/standard/Separator'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import AddEditGroupModal from '../modals/AddEditGroupModal'

function GroupsScreen (props) {
  //+ STATE

  const [isEditing, setIsEditing] = useState(false)
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)
  const [groupName, setGroupName] = useState(props.activeGroup.name)
  const [languageID, setLanguageID] = useState(props.activeGroup.languageID)

  //+ CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [isEditing, props])

  //+ NAV OPTIONS

  function getNavOptions () {
    return {
      headerStyle: {
        backgroundColor: isEditing ? colors.blue : colors.aquaHaze
      ***REMOVED***,
      headerTitleStyle: {
        color: isEditing ? colors.white : colors.shark
      ***REMOVED***,
      headerRight: props.isRTL
        ? () => (
            <BackButton
              color={isEditing ? colors.white : null***REMOVED***
              onPress={() => props.navigation.goBack()***REMOVED***
            />
          )
        : () => (
            <TouchableOpacity
              style={styles.editButtonContainer***REMOVED***
              onPress={() => setIsEditing(old => !old)***REMOVED***
            >
              <Text
                style={[
                  Typography(
                    props,
                    'h3',
                    isEditing ? 'medium' : 'regular',
                    'center',
                    isEditing ? colors.white : colors.shark
                  ),
                  {
                    textDecorationLine: isEditing ? 'underline' : null
                  ***REMOVED***
                ]***REMOVED***
              >
                {isEditing
                  ? props.translations.groups.done_button_label
                  : props.translations.groups.edit_button_label***REMOVED***
              </Text>
            </TouchableOpacity>
          ),
      headerLeft: props.isRTL
        ? () => (
            <TouchableOpacity
              style={styles.editButtonContainer***REMOVED***
              onPress={() => setIsEditing(old => !old)***REMOVED***
            >
              <Text
                style={Typography(
                  props,
                  'h3',
                  props.isEditing ? 'medium' : 'regular',
                  'center',
                  isEditing ? colors.white : colors.shark
                )***REMOVED***
              >
                {isEditing
                  ? props.translations.groups.done_button_label
                  : props.translations.groups.edit_button_label***REMOVED***
              </Text>
            </TouchableOpacity>
          )
        : () => (
            <BackButton
              color={isEditing ? colors.white : null***REMOVED***
              onPress={() => props.navigation.goBack()***REMOVED***
            />
          )
    ***REMOVED***
  ***REMOVED***

  //+ FUNCTIONS

  // get the list of installed languages and all the groups with that language
  //  to populate section list
  function getLanguageAndGroupData () {
    var installedLanguageInstances = []
    for (key in props.database) {
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['title'] = props.database[key].displayName
        languageObject['languageID'] = key

        // get groups for that language
        languageObject['data'] = props.groups.filter(
          group => group.language === key
        )
        installedLanguageInstances.push(languageObject)
      ***REMOVED***
    ***REMOVED***
    return installedLanguageInstances
  ***REMOVED***

  //+ RENDER

  function renderLanguageInstanceItem (section) {
    return (
      <GroupListHeader
        languageName={section.title***REMOVED***
        languageID={section.languageID***REMOVED***
        isEditing={isEditing***REMOVED***
      />
    )
  ***REMOVED***

  function renderGroupItem (group) {
    return (
      <GroupItem
        groupName={group.name***REMOVED***
        isEditing={isEditing***REMOVED***
        goToEditGroupScreen={groupName => {
          setGroupName(groupName)
          setShowEditGroupModal(true)
          // props.navigation.navigate('EditGroup', { groupName: groupName ***REMOVED***)
        ***REMOVED******REMOVED***
        emoji={group.emoji***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <SectionList
        sections={getLanguageAndGroupData()***REMOVED***
        renderItem={({ item ***REMOVED***) => renderGroupItem(item)***REMOVED***
        renderSectionHeader={({ section ***REMOVED***) =>
          renderLanguageInstanceItem(section)
        ***REMOVED***
        keyExtractor={item => item.name***REMOVED***
        ItemSeparatorComponent={() => <Separator />***REMOVED***
        SectionSeparatorComponent={() => <Separator />***REMOVED***
        renderSectionFooter={({ section ***REMOVED***) => (
          <View>
            <TouchableOpacity
              style={[
                styles.addGroupContainer,
                { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
              ]***REMOVED***
              onPress={
                () => {
                  setLanguageID(section.languageID)
                  setShowAddGroupModal(true)
                ***REMOVED***
                // props.navigation.navigate('AddGroup', {
                //   languageID: section.languageID
                // ***REMOVED***)
              ***REMOVED***
            >
              <View
                style={{
                  width: 55 * scaleMultiplier,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20
                ***REMOVED******REMOVED***
              >
                <Icon
                  name='group-add'
                  size={40 * scaleMultiplier***REMOVED***
                  color={colors.chateau***REMOVED***
                />
              </View>
              <Text
                style={Typography(props, 'h3', 'medium', 'left', colors.blue)***REMOVED***
              >
                {props.translations.groups.new_group_button_label***REMOVED***
              </Text>
            </TouchableOpacity>
            <Separator />
            <View style={{ height: 20 * scaleMultiplier, width: '100%' ***REMOVED******REMOVED*** />
          </View>
        )***REMOVED***
        ListHeaderComponent={() => (
          <View style={{ height: 10, width: '100%' ***REMOVED******REMOVED*** />
        )***REMOVED***
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addNewLanguageContainer***REMOVED***
            onPress={() =>
              props.navigation.navigate('AddLanguage', {
                installedLanguageInstances: getLanguageAndGroupData()
              ***REMOVED***)
            ***REMOVED***
          >
            <Text
              style={Typography(props, 'h3', 'medium', 'left', colors.chateau)***REMOVED***
            >
              {props.translations.groups.new_language_button_label***REMOVED***
            </Text>
          </TouchableOpacity>
        ***REMOVED***
      />
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
        groupName={groupName***REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze
  ***REMOVED***,
  addNewLanguageContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'center',
    paddingHorizontal: 20
  ***REMOVED***,
  editButtonContainer: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  addGroupContainer: {
    height: 80 * scaleMultiplier,
    // aspectRatio: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    isConnected: state.network.isConnected,
    font: state.database[activeGroup.language].font,
    groups: state.groups,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(GroupsScreen)
