import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import SetItem from '../components/list-items/SetItem'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeDatabase: activeDatabaseSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL,
    activeGroup: activeGroupSelector(state),
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    // For testing.
    languageCoreFilesToUpdate: state.database.languageCoreFilesToUpdate,
    languageCoreFilesCreatedTimes: state.database.languageCoreFilesCreatedTimes,
    globalGroupCounter: state.database.globalGroupCounter
  ***REMOVED***
***REMOVED***

/**
 * Screen that shows the list of currently added story sets in a tab. Used three times for the three different set tabs.
 */
function SetsScreen ({
  // Props passed from navigation.
  navigation: { navigate ***REMOVED***,
  route: { name: routeName ***REMOVED***,
  // Props passed from redux.
  activeDatabase,
  isRTL,
  activeGroup,
  translations,
  font,
  languageCoreFilesToUpdate,
  languageCoreFilesCreatedTimes,
  globalGroupCounter
***REMOVED***) {
  /** Keeps track of the text displayed on the add set button. Changes depending on what tab we're on. */
  const [addNewSetLabel, setAddNewSetLabel] = useState('')

  /** Keeps track of the category (or tab) of sets we're displaying. */
  const [setCategory, setSetCategory] = useState('')

  /** Keeps track of all of the files the user has downloaded to the user's device. This is used to verify that all the required question set mp3s are downloaded for the sets that have been added. */
  const [downloadedFiles, setDownloadedFiles] = useState([])

  /** useEffect function that sets the setCategory state and the addNewSetLabel state based off the route name. Updates whenever the activeGroup changes. */
  useEffect(() => {
    if (routeName === 'Foundational') {
      setAddNewSetLabel(
        translations.sets.add_foundational_story_set_button_label
      )
      setSetCategory('foundational')
    ***REMOVED*** else if (routeName === 'Topical') {
      setAddNewSetLabel(translations.sets.add_topical_set_button_label)
      setSetCategory('topical')
    ***REMOVED*** else {
      setAddNewSetLabel(translations.sets.add_mobilization_tool_button_label)
      setSetCategory('mobilization tools')
    ***REMOVED***
  ***REMOVED***, [activeGroup, translations])

  //+ NAV OPTIONS

  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        console.log('Files:')
        console.log(contents)
        setDownloadedFiles(contents)
      ***REMOVED***
    )
    // console.log(`Groups:`)
    // groups.forEach(group => console.log(group.language))

    // console.log(
    //   `Languages in DB: ${Object.keys(database).filter(
    //     key => key.length === 2
    //   )***REMOVED***`
    // )
    // console.log(`Language core files to update: ${languageCoreFilesToUpdate***REMOVED***\n`)
    // console.log(
    //   `Language core files created times: ${JSON.stringify(
    //     languageCoreFilesCreatedTimes
    //   )***REMOVED***\n`
    // )
  ***REMOVED***, [languageCoreFilesToUpdate])

  function filterForDownloadedQuestionSets (set) {
    var requiredQuestionSets = []

    set.lessons.forEach(lesson => {
      if (lesson.fellowshipType) {
        if (!requiredQuestionSets.includes(lesson.fellowshipType)) {
          requiredQuestionSets.push(lesson.fellowshipType)
        ***REMOVED***
        if (!requiredQuestionSets.includes(lesson.applicationType)) {
          requiredQuestionSets.push(lesson.applicationType)
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***)

    if (
      requiredQuestionSets.every(questionSet =>
        downloadedFiles.includes(
          activeGroup.language + '-' + questionSet + '.mp3'
        )
      )
    )
      return true
    else return false
  ***REMOVED***

  // get the sets for whatever tab we're on
  function getSetData () {
    // if we're adding core sets, display them in numerical order
    return routeName === 'Foundational'
      ? activeDatabase.sets
          .filter(set => getSetInfo('category', set.id) === setCategory)
          .filter(set =>
            activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
          .filter(filterForDownloadedQuestionSets)
      : // if we're displaying topical/mt sets, display them in the order added
        activeDatabase.sets
          .filter(set => getSetInfo('category', set.id) === setCategory)
          .filter(set =>
            activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
          .filter(filterForDownloadedQuestionSets)
          .sort((a, b) => {
            return a.index - b.index
          ***REMOVED***)
          .sort((a, b) => {
            return (
              activeGroup.addedSets.indexOf(
                activeGroup.addedSets.filter(
                  addedSet => addedSet.id === a.id
                )[0]
              ) -
              activeGroup.addedSets.indexOf(
                activeGroup.addedSets.filter(
                  addedSet => addedSet.id === b.id
                )[0]
              )
            )
          ***REMOVED***)
  ***REMOVED***

  //+ RENDER

  function renderStudySetItem ({ item ***REMOVED***) {
    return (
      <SetItem
        thisSet={item***REMOVED***
        mode='shown'
        onSetSelect={() =>
          navigate('Lessons', {
            thisSet: item
          ***REMOVED***)
        ***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={getSetData()***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        extraData={activeGroup***REMOVED***
        ListFooterComponent={
          <TouchableOpacity
            style={[
              styles.addNewSetContainer,
              { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
            ]***REMOVED***
            onPress={() =>
              navigate('AddSet', {
                category: setCategory
              ***REMOVED***)
            ***REMOVED***
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: 80 * scaleMultiplier,
                height: 80 * scaleMultiplier
              ***REMOVED******REMOVED***
            >
              <Icon
                name='plus'
                size={60 * scaleMultiplier***REMOVED***
                color={colors.chateau***REMOVED***
                style={styles.addNewSetIcon***REMOVED***
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                marginRight: isRTL ? 20 : 0,
                marginLeft: isRTL ? 0 : 20
              ***REMOVED******REMOVED***
            >
              <Text
                style={StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'p',
                  'Regular',
                  'left',
                  colors.chateau
                )***REMOVED***
              >
                {addNewSetLabel***REMOVED***
              </Text>
            </View>
          </TouchableOpacity>
        ***REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.porcelain
  ***REMOVED***,
  headerImage: {
    resizeMode: 'contain',
    width: 120,
    height: 40,
    alignSelf: 'center'
  ***REMOVED***,
  addNewSetContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(SetsScreen)
