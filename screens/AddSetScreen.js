import * as FileSystem from 'expo-file-system'
import React, { useEffect, useMemo, useState ***REMOVED*** from 'react'
import { FlatList, LogBox, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import TagGroup from 'react-native-tag-group'
import { connect ***REMOVED*** from 'react-redux'
import SetItem from '../components/list-items/SetItem'
import BackButton from '../components/standard/BackButton'
import Separator from '../components/standard/Separator'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../constants'
import SetInfoModal from '../modals/SetInfoModal'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'Warning: Cannot update'])

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    translations: activeDatabaseSelector(state).translations,
    isRTL: activeDatabaseSelector(state).isRTL,
    activeDatabase: activeDatabaseSelector(state),
    activeGroup: activeGroupSelector(state),
    primaryColor: activeDatabaseSelector(state).primaryColor
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

/**
 * Screen that shows a list of available Story Sets to add in a specific category.
 * @param {string***REMOVED*** category - The category of Story Sets to display.
 */
const AddSetScreen = ({
  // Props passed from navigation.
  navigation: { setOptions, goBack ***REMOVED***,
  route: {
    // Props passed from previous screen.
    params: { category ***REMOVED***
  ***REMOVED***,
  // Props passed from redux.
  font,
  translations,
  isRTL,
  activeDatabase,
  activeGroup,
  primaryColor,
  addSet
***REMOVED***) => {
  /** Whether the snackbar that pops up upon adding a set is visible or not.  */
  const [showSnackbar, setShowSnackbar] = useState(false)

  /** State for header title. Stored as state because it changes depending on which category we're viewing the story sets for. */
  const [headerTitle, setHeaderTitle] = useState('')

  /** Keeps track of the Topical Story Set tags. Tags are retrieved from the database. */
  const [tags, setTags] = useState([])

  /** Keeps track of the currently selected tag. */
  const [selectedTag, setSelectedTag] = useState('')

  /** Keeps track of whether the <SetInfoModal /> is visible. */
  const [showSetInfoModal, setShowSetInfoModal] = useState(false)

  /** Keeps track of the Story Set that the user selects and that populates the <SetInfoModal />. */
  const [setInModal, setSetInModal] = useState({***REMOVED***)

  /** Keeps track of all the downloaded question set mp3s. We need this to verify that all the required question set mp3s are installed for the various Story Sets.*/
  const [downloadedFiles, setDownloadedFiles] = useState([])

  const setData = useMemo(() => getSetData(), [
    activeGroup.addedSets,
    selectedTag,
    downloadedFiles
  ])

  /** useEffect function that sets the headerTitle state as well as fetching the tags if we're displaying Topical Story Sets. */
  useEffect(() => {
    switch (category) {
      case 'Foundational':
        setHeaderTitle(translations.add_set.header_foundational)
        break
      case 'Topical':
        setHeaderTitle(translations.add_set.header_topical)

        // Start off array of tags with the 'All' label since we always display that option.
        var tags = [translations.add_set.all_tag_label]

        // Go through each Topical Story Set and add all the various tags to our tag array.
        activeDatabase.sets
          .filter(set => getSetInfo('category', set.id) === 'Topical')
          .forEach(topicalSet => {
            topicalSet.tags.forEach(tag => {
              // If we find a tag that hasn't been added yet, add it.
              if (!tags.includes(tag)) tags.push(tag)
            ***REMOVED***)
          ***REMOVED***)
        setTags(tags)
        break
      case 'MobilizationTools':
        setHeaderTitle(translations.add_set.header_mt)
        break
    ***REMOVED***
  ***REMOVED***, [])

  /** useEffect function that checks what files are downloaded to local storage. */
  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        setDownloadedFiles(contents)
      ***REMOVED***
    )
  ***REMOVED***, [])

  /** useEffect function that hides the Snackbar if we leave the screen before it auto-dismisses. */
  useEffect(() => {
    return function cleanup () {
      setShowSnackbar(false)
    ***REMOVED***
  ***REMOVED***, [])

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      title: headerTitle,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />,
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>
    ***REMOVED***)
  ***REMOVED***, [headerTitle])

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

  function getSetData () {
    if (category === 'topical')
      return (
        activeDatabase.sets
          // Filter for Topical Story Sets.
          .filter(set => getSetInfo('category', set.id) === category)
          // Filter for Topical Story Sets that haven't already been added.
          .filter(
            topicalSet =>
              !activeGroup.addedSets.some(
                addedSet => addedSet.id === topicalSet.id
              )
          )
          // Filter for Topical Story Sets that match the currently selected tag (if there is one).
          .filter(topicalAddedSet => {
            // If the selected tag is blank (meaning nothing has been selected) or 'All' is selected, show all the Topical Story Sets. Otherwise, filter by the selected tag.
            return selectedTag === '' ||
              selectedTag === translations.add_set.all_tag_label
              ? true
              : topicalAddedSet.tags.some(tag => selectedTag === tag)
          ***REMOVED***)
          // Filter for Topical Sets that have all the necessary question set mp3s downloaded.
          .filter(filterForDownloadedQuestionSets)
          // Sort by ID, just in case they aren't added in order in the database.
          .sort((a, b) =>
            parseInt(a.id.match(/[0-9]*$/)[0]) -
              parseInt(b.id.match(/[0-9]*$/)[0]) <
            0
              ? -1
              : 1
          )
      )
    else
      return (
        activeDatabase.sets
          // Filter for Foundational or Mobilization Tools Story Sets.
          .filter(set => getSetInfo('category', set.id) === category)
          // Filter for Foundational or Mobilization Tools Story Sets that haven't already been added.
          .filter(
            set =>
              !activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
          // Filter for Foundational or Mobilization Tools Story Sets that have all the necessary question set mp3s downloaded.
          .filter(filterForDownloadedQuestionSets)
          // Sort by ID, just in case they aren't added in order in the database.
          .sort((a, b) =>
            parseInt(a.id.match(/[0-9]*$/)[0]) -
              parseInt(b.id.match(/[0-9]*$/)[0]) <
            0
              ? -1
              : 1
          )
      )
  ***REMOVED***

  // The component for the list of tags. Uses the <TagGroup /> component.
  const tagsComponent = (
    <TagGroup
      source={tags***REMOVED***
      singleChoiceMode
      onSelectedTagChange={selected => setSelectedTag(selected)***REMOVED***
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 2
      ***REMOVED******REMOVED***
      tagStyle={{
        borderRadius: 30,
        borderColor: colors.oslo,
        height: 35 * scaleMultiplier,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20 * scaleMultiplier
      ***REMOVED******REMOVED***
      textStyle={{ color: colors.oslo, fontFamily: font + '-Regular' ***REMOVED******REMOVED***
      activeTagStyle={{
        borderRadius: 20,
        backgroundColor: primaryColor,
        borderColor: primaryColor
      ***REMOVED******REMOVED***
      activeTextStyle={{
        color: colors.white,
        fontFamily: font + '-Regular'
      ***REMOVED******REMOVED***
    />
  )

  /** Renders a <SetItem /> for the list of sets available to add. */
  const renderSetItem = ({ item ***REMOVED***) => (
    <SetItem
      thisSet={item***REMOVED***
      screen='AddSet'
      onSetSelect={() => {
        setSetInModal(item)
        setShowSetInfoModal(true)
      ***REMOVED******REMOVED***
    />
  )

  return (
    <View style={styles.screen***REMOVED***>
      {category === 'topical' ? tagsComponent : null***REMOVED***
      <FlatList
        style={{ flex: 1 ***REMOVED******REMOVED***
        data={setData***REMOVED***
        ItemSeparatorComponent={() => <Separator />***REMOVED***
        ListFooterComponent={() => <Separator />***REMOVED***
        ListHeaderComponent={() => <Separator />***REMOVED***
        renderItem={renderSetItem***REMOVED***
        ListEmptyComponent={() => (
          <View style={{ width: '100%', marginVertical: 20 ***REMOVED******REMOVED***>
            <Text
              style={StandardTypography(
                { font, isRTL ***REMOVED***,
                'p',
                'Regular',
                'center',
                colors.chateau
              )***REMOVED***
            >
              {translations.add_set.no_more_sets_text***REMOVED***
            </Text>
          </View>
        )***REMOVED***
      />
      {/* Modals */***REMOVED***
      <SnackBar
        visible={showSnackbar***REMOVED***
        textMessage={translations.add_set.set_added_message***REMOVED***
        messageStyle={{
          color: colors.white,
          fontSize: 24 * scaleMultiplier,
          fontFamily: font + '-Black',
          textAlign: 'center'
        ***REMOVED******REMOVED***
        backgroundColor={colors.apple***REMOVED***
      />
      <SetInfoModal
        isVisible={showSetInfoModal***REMOVED***
        hideModal={() => setShowSetInfoModal(false)***REMOVED***
        thisSet={setInModal***REMOVED***
        showSnackbar={() => {
          setShowSnackbar(true)
          setTimeout(() => setShowSnackbar(false), 2000)
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(AddSetScreen)
