import React, { useState ***REMOVED*** from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import {
  colors,
  getLanguageFont,
  getLessonInfo,
  scaleMultiplier
***REMOVED*** from '../../constants'
import {
  changeActiveGroup,
  deleteGroup
***REMOVED*** from '../../redux/actions/groupsActions'
import { StandardTypography ***REMOVED*** from '../../styles/typography'
import GroupAvatar from '../GroupAvatar'
function GroupItem (props) {
  // FUNCTIONS

  const [thisGroup, setThisGroup] = useState(
    props.groups.filter(group => group.name === props.groupName)[0]
  )

  // gets a formatted string of this the bookmark lesson for this group
  // the bookmark lesson is the earliest uncompleted lesson of the active set
  //  for this group, and the text displays the subtitle and the name
  function getBookmarkText () {
    if (thisGroup) {
      // get the currently bookmarked set object
      var bookmarkSet = props.database[thisGroup.language].sets.filter(
        set => set.id === thisGroup.setBookmark
      )[0]

      // get the id of the bookmarked lesson from the bookmarked set
      var bookmarkSetBookmarkLesson = thisGroup.addedSets.filter(
        addedSet => addedSet.id === bookmarkSet.id
      )[0].bookmark

      // get the bookmrarked lesson object
      var bookmarkLesson = bookmarkSet.lessons.filter(
        lesson =>
          getLessonInfo('index', lesson.id) === bookmarkSetBookmarkLesson
      )[0]

      // if both those exist, return them to display the bookmarks
      if (bookmarkLesson && bookmarkSet) {
        return {
          lesson:
            getLessonInfo('subtitle', bookmarkLesson.id) +
            ' ' +
            bookmarkLesson.title,
          set: bookmarkSet.subtitle
        ***REMOVED***
      ***REMOVED*** else {
        return ''
      ***REMOVED***
    ***REMOVED*** else return ''
  ***REMOVED***

  // RENDER

  // render the delete button
  var deleteButton
  // if we're editing and not in the active group, show tappable delete button
  if (props.isEditing && props.activeGroup.name != props.groupName) {
    deleteButton = (
      <TouchableOpacity
        style={styles.minusButtonContainer***REMOVED***
        onPress={() => {
          Alert.alert(
            props.translations.groups.popups.delete_group_title,
            props.translations.groups.popups.delete_group_message,
            [
              {
                text: props.translations.general.cancel,
                onPress: () => {***REMOVED***
              ***REMOVED***,
              {
                text: props.translations.general.ok,
                onPress: () => props.deleteGroup(props.groupName)
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
  ***REMOVED*** else if (props.isEditing && props.activeGroup.name === props.groupName) {
    deleteButton = (
      <View style={styles.minusButtonContainer***REMOVED***>
        <Icon name='check' size={24 * scaleMultiplier***REMOVED*** color={colors.blue***REMOVED*** />
      </View>
    )
  ***REMOVED***

  // render right button conditionally; can be either right arrow when in edit mode,
  // checkmark if in edit mode and this group is active, or an empty view
  var rightButton
  if (props.isEditing) {
    rightButton = (
      <View style={styles.iconContainer***REMOVED*** onPress={() => {***REMOVED******REMOVED***>
        <Icon
          name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          size={36 * scaleMultiplier***REMOVED***
          color={colors.chateau***REMOVED***
        />
      </View>
    )
  ***REMOVED*** else if (props.activeGroup.name === props.groupName) {
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
          flexDirection: props.isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
    >
      {deleteButton***REMOVED***
      {/* main tappable area */***REMOVED***
      <TouchableOpacity
        style={[
          styles.touchableContainer,
          {
            flexDirection: props.isRTL ? 'row-reverse' : 'row',
            paddingLeft: props.isEditing ? 0 : 20
          ***REMOVED***
        ]***REMOVED***
        onPress={
          props.isEditing
            ? () => props.goToEditGroupScreen(props.groupName)
            : () => {
                props.changeActiveGroup(props.groupName)
              ***REMOVED***
        ***REMOVED***
      >
        <GroupAvatar
          style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
          size={50 * scaleMultiplier***REMOVED***
          emoji={props.emoji***REMOVED***
          isActive={props.activeGroup.name === props.groupName***REMOVED***
        />
        {/* text portion includes group name and bookmark text */***REMOVED***
        <View
          style={[
            styles.groupNameContainer,
            {
              marginLeft: props.isRTL ? 0 : 20,
              marginRight: props.isRTL ? 20 : 0
            ***REMOVED***
          ]***REMOVED***
        >
          <Text
            style={StandardTypography(
              {
                font: getLanguageFont(thisGroup.language),
                isRTL: props.isRTL
              ***REMOVED***,
              'h3',
              'Black',
              'left',
              colors.shark
            )***REMOVED***
            numberOfLines={1***REMOVED***
          >
            {props.groupName***REMOVED***
          </Text>
          {/* {getBookmarkText() === '' ? null : (
            <Text
              maxFontSizeMultiplier={1.2***REMOVED***
              style={StandardTypography(
                {
                  font: props.database[thisGroup.language].font,
                  isRTL: props.isRTL
                ***REMOVED***,
                'd',
                'Regular',
                'left',
                colors.chateau
              )***REMOVED***
              numberOfLines={1***REMOVED***
            >
              {getBookmarkText().set***REMOVED***
            </Text>
          )***REMOVED*** */***REMOVED***
          {getBookmarkText() === '' ? null : (
            <Text
              style={[
                StandardTypography(
                  {
                    font: getLanguageFont(thisGroup.language),
                    isRTL: props.isRTL
                  ***REMOVED***,
                  'd',
                  'Regular',
                  'left',
                  colors.chateau
                ),
                {
                  // lineHeight: 12 * scaleMultiplier
                ***REMOVED***
              ]***REMOVED***
              numberOfLines={1***REMOVED***
            >
              {getBookmarkText().lesson***REMOVED***
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

// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    groups: state.groups,
    activeGroup: activeGroup,
    font: getLanguageFont(activeGroup.language),
    translations: state.database[activeGroup.language].translations
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem)
