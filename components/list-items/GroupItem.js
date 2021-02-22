import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { getLessonInfo, scaleMultiplier ***REMOVED*** from '../../constants'
import { changeActiveGroup ***REMOVED*** from '../../redux/actions/activeGroupActions'
import { deleteGroup ***REMOVED*** from '../../redux/actions/groupsActions'
import {
  activeGroupLanguageSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'
import GroupAvatar from '../GroupAvatar'

function mapStateToProps (state) {
  return {
    database: state.database,
    activeDatabase: state.database[activeGroupLanguageSelector(state)],
    isRTL: state.database[activeGroupLanguageSelector(state)].isRTL,
    groups: state.groups,
    activeGroup: activeGroupSelector(state),
    font: getLanguageFont(activeGroupLanguageSelector(state)),
    translations:
      state.database[activeGroupLanguageSelector(state)].translations
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***,
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

/**
 * A pressable item used on the GroupScreen to display a group. It shows the name of the group, the icon, whether it's active or not, and the current bookmark, and allows for editing and deleting.
 * @param {Object***REMOVED*** thisGroup - The object for the group that we're displaying in this component.
 * @param {boolean***REMOVED*** isEditing - Whether we're in "editing" mode or not.
 * @param {Function***REMOVED*** openEditModal - A function that opens the modal that allows us to edit the information for a group.
 */
function GroupItem ({
  // Props passed from a parent component.
  thisGroup,
  isEditing,
  openEditModal,
  // Props passed from redux.
  database,
  activeDatabase,
  isRTL,
  groups,
  activeGroup,
  font,
  translations,
  deleteGroup,
  changeActiveGroup
***REMOVED***) {
  // gets a formatted string of this the bookmark lesson for this group
  // the bookmark lesson is the earliest uncompleted lesson of the active set
  //  for this group, and the text displays the subtitle and the name

  /**
   * Gets the bookmark for this group and returns it in a nicely formatted string.
   * @return {string***REMOVED*** - The bookmarked lesson.
   */
  function getBookmarkLesson () {
    // If for some reason no group got passed, return an empty string.
    if (thisGroup) {
      // Get the object for the currently bookmarked set.
      var bookmarkSet = database[thisGroup.language].sets.filter(
        set => set.id === thisGroup.setBookmark
      )[0]

      // Get the index of the bookmarked lesson within the bookmarked set.
      var bookmarkSetBookmarkLesson = thisGroup.addedSets.filter(
        addedSet => addedSet.id === bookmarkSet.id
      )[0].bookmark

      // Finally, get the object for the bookmarked lesson. This will be the most useful information to see on the group item.
      var bookmarkLesson = bookmarkSet.lessons.filter(
        lesson =>
          getLessonInfo('index', lesson.id) === bookmarkSetBookmarkLesson
      )[0]

      // If everything is good, return the bookmark lesson. Otherwise, return an empty string.
      return bookmarkLesson && bookmarkSet
        ? `${getLessonInfo('subtitle', bookmarkLesson.id)***REMOVED*** ${
            bookmarkLesson.title
          ***REMOVED***`
        : ''
    ***REMOVED*** else return ''
  ***REMOVED***

  var deleteButton
  // if we're editing and not in the active group, show tappable delete button
  if (isEditing && activeGroup.name != thisGroup.name) {
    deleteButton = (
      <TouchableOpacity
        style={styles.minusButtonContainer***REMOVED***
        onPress={() => {
          Alert.alert(
            translations.groups.popups.delete_group_title,
            translations.groups.popups.delete_group_message,
            [
              {
                text: translations.general.cancel,
                onPress: () => {***REMOVED***
              ***REMOVED***,
              {
                text: translations.general.ok,
                onPress: () => deleteGroup(thisGroup.name)
              ***REMOVED***
            ]
          )
        ***REMOVED******REMOVED***
      >
        <Icon
          name='minus-filled'
          size={24 * scaleMultiplier***REMOVED***
          color={colors.red***REMOVED***
        />
      </TouchableOpacity>
    )
    // if we're editing and in the active group, show an untappable check
  ***REMOVED*** else if (isEditing && activeGroup.name === thisGroup.name) {
    deleteButton = (
      <View style={styles.minusButtonContainer***REMOVED***>
        <Icon name='check' size={24 * scaleMultiplier***REMOVED*** color={colors.blue***REMOVED*** />
      </View>
    )
  ***REMOVED***

  // render right button conditionally; can be either right arrow when in edit mode,
  // checkmark if in edit mode and this group is active, or an empty view
  var rightButton
  if (isEditing) {
    rightButton = (
      <View style={styles.iconContainer***REMOVED*** onPress={() => {***REMOVED******REMOVED***>
        <Icon
          name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          size={36 * scaleMultiplier***REMOVED***
          color={colors.chateau***REMOVED***
        />
      </View>
    )
  ***REMOVED*** else if (activeGroup.name === thisGroup.name) {
    rightButton = (
      <View style={styles.iconContainer***REMOVED***>
        <Icon name='check' size={24 * scaleMultiplier***REMOVED*** color={colors.blue***REMOVED*** />
      </View>
    )
  ***REMOVED*** else {
    rightButton = (
      <View style={[styles.iconContainer, { width: 24 * scaleMultiplier ***REMOVED***]***REMOVED*** />
    )
  ***REMOVED***

  return (
    <View
      style={[
        styles.groupListItemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
    >
      {deleteButton***REMOVED***
      {/* main tappable area */***REMOVED***
      <TouchableOpacity
        style={[
          styles.touchableContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            paddingLeft: isEditing ? 0 : 20
          ***REMOVED***
        ]***REMOVED***
        onPress={
          isEditing
            ? () => openEditModal()
            : () => {
                changeActiveGroup(thisGroup.name)
              ***REMOVED***
        ***REMOVED***
      >
        <GroupAvatar
          style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
          size={50 * scaleMultiplier***REMOVED***
          emoji={thisGroup.emoji***REMOVED***
          isActive={activeGroup.name === thisGroup.name***REMOVED***
        />
        {/* text portion includes group name and bookmark text */***REMOVED***
        <View
          style={[
            styles.groupNameContainer,
            {
              marginLeft: isRTL ? 0 : 20,
              marginRight: isRTL ? 20 : 0
            ***REMOVED***
          ]***REMOVED***
        >
          <Text
            style={StandardTypography(
              {
                font: getLanguageFont(thisGroup.language),
                isRTL: isRTL
              ***REMOVED***,
              'h3',
              'Black',
              'left',
              colors.shark
            )***REMOVED***
            numberOfLines={1***REMOVED***
          >
            {thisGroup.name***REMOVED***
          </Text>
          {getBookmarkLesson() === '' ? null : (
            <Text
              style={[
                StandardTypography(
                  {
                    font: getLanguageFont(thisGroup.language),
                    isRTL: isRTL
                  ***REMOVED***,
                  'd',
                  'Regular',
                  'left',
                  colors.chateau
                )
              ]***REMOVED***
              numberOfLines={1***REMOVED***
            >
              {getBookmarkLesson()***REMOVED***
            </Text>
          )***REMOVED***
        </View>
        {rightButton***REMOVED***
      </TouchableOpacity>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  groupListItemContainer: {
    height: 80 * scaleMultiplier,
    // aspectRatio: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  ***REMOVED***,
  touchableContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20
  ***REMOVED***,
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  ***REMOVED***,
  minusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 20
  ***REMOVED***,
  groupNameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem)
