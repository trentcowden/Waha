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
    languageCoreFilesCreatedTimes: state.database.languageCoreFilesCreatedTimes,
    globalGroupCounter: state.database.globalGroupCounter,
    languageCoreFilesToUpdate: state.database.languageCoreFilesToUpdate
  ***REMOVED***
***REMOVED***

/**
 * Screen that shows the list of currently added story sets of a specific category. Used three times for the three different set tabs.
 */
function SetsScreen ({
  // Props passed from navigation.
  navigation: { navigate ***REMOVED***,
  // Props passed from the navigation route.
  route: { name: category ***REMOVED***,
  // Props passed from redux.
  activeDatabase,
  isRTL,
  activeGroup,
  translations,
  font,
  languageCoreFilesCreatedTimes,
  globalGroupCounter,
  languageCoreFilesToUpdate
***REMOVED***) {
  /** Keeps track of the text displayed on the add set button. Changes depending on what category we're in. */
  const [addNewSetLabel, setAddNewSetLabel] = useState('')

  /** Keeps track of the category (or tab) of sets we're displaying. */
  const [setCategory, setSetCategory] = useState('')

  /** Keeps track of all of the files the user has downloaded to the user's device. This is used to verify that all the required question set mp3s are downloaded for the sets that have been added. */
  const [downloadedFiles, setDownloadedFiles] = useState([])

  /** useEffect function that sets the setCategory state and the addNewSetLabel state based off the category (which is passed via the route name declared in SetTabs.js). Updates whenever the activeGroup changes. */
  useEffect(() => {
    if (category === 'Foundational') {
      setAddNewSetLabel(
        translations.sets.add_foundational_story_set_button_label
      )
      setSetCategory('foundational')
    ***REMOVED*** else if (category === 'Topical') {
      setAddNewSetLabel(translations.sets.add_topical_set_button_label)
      setSetCategory('topical')
    ***REMOVED*** else {
      setAddNewSetLabel(translations.sets.add_mobilization_tool_button_label)
      setSetCategory('mobilization tools')
    ***REMOVED***
  ***REMOVED***, [activeGroup, translations])

  /** useEffect function that sets the downloaded files state. It's also used to log some various information to the console for testing. */
  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        // console.log('Files:')
        // console.log(contents)
        setDownloadedFiles(contents)
      ***REMOVED***
    )
    // Below are some logs for testing.

    // Log the groups to the console.
    // console.log(`Groups:`)
    // groups.forEach(group => console.log(group.language))

    // Log the installed language instances to the console.
    // console.log(
    //   `Languages in DB: ${Object.keys(database).filter(
    //     key => key.length === 2
    //   )***REMOVED***`
    // )

    // Log the language core files to update to the console.
    // console.log(`Language core files to update: ${languageCoreFilesToUpdate***REMOVED***\n`)

    // Log the language core file created times to the console.
    // console.log(
    //   `Language core files created times: ${JSON.stringify(
    //     languageCoreFilesCreatedTimes
    //   )***REMOVED***\n`
    // )
  ***REMOVED***, [])

  /**
   * Goes through a set and verifies that all of the necessary question set mp3s have been downloaded for that set. This gets passed through the filter function below.
   * @param {Object***REMOVED*** set - The object for the set that we're checking.
   * @return {boolean***REMOVED*** - Whether every necessary file has been downloaded for the set.
   */
  function filterForDownloadedQuestionSets (set) {
    // Create an array to store the necessary question set mp3s for this set.
    var requiredQuestionSets = []

    // Go through each set and add all necessary question set mp3s to requiredQuestionSets array.
    set.lessons.forEach(lesson => {
      // Only filter if the lessons have a fellowship/application chapter. For sets like 3.1 which only has video lessons, we don't want to filter.
      if (lesson.fellowshipType) {
        if (!requiredQuestionSets.includes(lesson.fellowshipType)) {
          requiredQuestionSets.push(lesson.fellowshipType)
        ***REMOVED***
        if (!requiredQuestionSets.includes(lesson.applicationType)) {
          requiredQuestionSets.push(lesson.applicationType)
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***)

    // If every required file is present, return true. Otherwise, return false.
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

  /**
   * Gets an array of sets to display to populate the sets FlatList below. The sets to display vary depending on the category.
   * @return {Object[]***REMOVED*** - An array of sets.
   */
  function getSetData () {
    // If we're displaying Foundational sets...
    if (category === 'Foundational')
      return (
        activeDatabase.sets
          // 1. Filter for Foundational sets from the array of all sets.
          .filter(set => getSetInfo('category', set.id) === setCategory)
          // 2. Filter for sets that have been added to this group.
          .filter(set =>
            activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
          // 3. Filter for sets that have all necessary files downloaded.
          .filter(filterForDownloadedQuestionSets)
      )
    // If we're displaying Topical or Mobilization Tools sets...
    else
      return (
        activeDatabase.sets
          // 1. Filter for either Topical or Mobilization Tools sets from the array of all sets depending on the category we want to display.
          .filter(set => getSetInfo('category', set.id) === setCategory)
          // 2. Filter for sets that have been added to this group.
          .filter(set =>
            activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
          // 3. Filter for sets that have all necessary files downloaded.
          .filter(filterForDownloadedQuestionSets)
          // 4. For these sets, we want to sort based on the order they were added, not in the default order (which is order of index).
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
      )
  ***REMOVED***

  // A button that goes at the bottom of each list of sets that allows the user to add a new set.
  var addSetButton = (
    <TouchableOpacity
      style={[
        styles.addSetButtonContainer,
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
  )

  /**
   * Renders a setItem component.
   * @param {Object***REMOVED*** set - The object of the set to render.
   * @return {Component***REMOVED*** - The setItem component.
   */
  function renderSetItem (set) {
    return (
      <SetItem
        thisSet={set***REMOVED***
        screen='Sets'
        onSetSelect={() =>
          navigate('Lessons', {
            thisSet: set
          ***REMOVED***)
        ***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={getSetData()***REMOVED***
        renderItem={({ item ***REMOVED***) => renderSetItem(item)***REMOVED***
        // Re-render the FlatList whenever the active group changes.
        extraData={activeGroup***REMOVED***
        ListFooterComponent={addSetButton***REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.porcelain
  ***REMOVED***,
  addSetButtonContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(SetsScreen)
