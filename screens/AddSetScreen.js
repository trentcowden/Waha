import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState ***REMOVED*** from 'react'
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

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

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
 * Component for the add set screen, which shows a list of available story sets to add in a specific category.
 * @param {****REMOVED*** props
 */
function AddSetScreen ({
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
***REMOVED***) {
  /** Whether the snackbar that pops up upon adding a set is visible or not.  */
  const [showSnackbar, setShowSnackbar] = useState(false)

  /** State for header title. Stored in state because it changes depending on which category we're viewing the story sets for. */
  const [headerTitle, setHeaderTitle] = useState('')

  /** Keeps track of the tags we have. Only for adding topical sets. Tags are retrieved from the database. */
  const [tags, setTags] = useState([])

  /** Keeps tra */
  const [activeTag, setActiveTag] = useState([])
  const [tagSelectRef, setTagSelectRef] = useState()
  const [refresh, setRefresh] = useState(false)

  const [showSetInfoModal, setShowSetInfoModal] = useState(false)
  const [setInModal, setSetInModal] = useState({***REMOVED***)

  const [downloadedFiles, setDownloadedFiles] = useState([])

  useEffect(() => {
    switch (category) {
      case 'foundational':
        setHeaderTitle(translations.add_set.header_foundational)
        break
      case 'topical':
        setHeaderTitle(translations.add_set.header_topical)
        var tempTags = [translations.add_set.all_tag_label]
        activeDatabase.sets
          .filter(set => getSetInfo('category', set.id) === 'topical')
          .forEach(topicalSet => {
            topicalSet.tags.forEach(tag => {
              if (!tempTags.some(tempTag => tempTag === tag)) {
                tempTags = [...tempTags, tag]
              ***REMOVED***
            ***REMOVED***)
          ***REMOVED***)
        setTags(tempTags)
        break
      case 'mobilization tools':
        setHeaderTitle(translations.add_set.header_mt)
        break
    ***REMOVED***
  ***REMOVED***, [])

  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        setDownloadedFiles(contents)
      ***REMOVED***
    )
  ***REMOVED***, [])

  useEffect(() => {
    setOptions(getNavOptions())
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

  // useEffect(() => {
  //   if (tagSelectRef) {
  //     tagSelectRef.select(0)
  //   ***REMOVED***
  // ***REMOVED***, [tagSelectRef])

  function getNavOptions () {
    return {
      title: headerTitle,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />,
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>
    ***REMOVED***
  ***REMOVED***

  // var activeTags = []
  // if (tagSelectRef.itemsSelected !== null) {
  //   con  sole.log(tagSelectRef.itemsSelected)
  // ***REMOVED***

  var tagSelectComponent = (
    <TagGroup
      source={tags***REMOVED***
      singleChoiceMode
      onSelectedTagChange={selected => setActiveTag(selected)***REMOVED***
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
        // make primary color
        backgroundColor: primaryColor,
        borderColor: primaryColor
      ***REMOVED******REMOVED***
      activeTextStyle={{
        color: colors.white,
        fontFamily: font + '-Regular'
      ***REMOVED******REMOVED***
    />
  )

  //+ RENDER
  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        screen='AddSet'
        onSetSelect={() => {
          setSetInModal(setList.item)
          setShowSetInfoModal(true)
        ***REMOVED******REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      {category === 'topical' ? tagSelectComponent : null***REMOVED***
      <FlatList
        style={{ flex: 1 ***REMOVED******REMOVED***
        data={
          category === 'topical'
            ? activeDatabase.sets
                .filter(set => getSetInfo('category', set.id) === category)
                .filter(
                  topicalSet =>
                    !activeGroup.addedSets.some(
                      addedSet => addedSet.id === topicalSet.id
                    )
                )
                .filter(topicalAddedSet => {
                  return activeTag.length === 0 ||
                    activeTag.includes(translations.add_set.all_tag_label)
                    ? true
                    : topicalAddedSet.tags.some(tag => activeTag.includes(tag))
                ***REMOVED***)
                .filter(filterForDownloadedQuestionSets)
                .sort((a, b) => {
                  if (
                    parseInt(a.id.match(/[0-9]*$/)[0]) -
                      parseInt(b.id.match(/[0-9]*$/)[0]) <
                    0
                  ) {
                    return -1
                  ***REMOVED*** else {
                    return 1
                  ***REMOVED***
                ***REMOVED***)
            : activeDatabase.sets
                .filter(set => getSetInfo('category', set.id) === category)
                .filter(
                  set =>
                    !activeGroup.addedSets.some(
                      addedSet => addedSet.id === set.id
                    )
                )
                .filter(filterForDownloadedQuestionSets)
                .sort((a, b) => {
                  if (
                    parseInt(a.id.match(/[0-9]*$/)[0]) -
                      parseInt(b.id.match(/[0-9]*$/)[0]) <
                    0
                  ) {
                    return -1
                  ***REMOVED*** else {
                    return 1
                  ***REMOVED***
                ***REMOVED***)
        ***REMOVED***
        ItemSeparatorComponent={() => <Separator />***REMOVED***
        ListFooterComponent={() => <Separator />***REMOVED***
        ListHeaderComponent={() => <Separator />***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        ListEmptyComponent={
          <View style={{ width: '100%', margin: 10 ***REMOVED******REMOVED***>
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
        ***REMOVED***
      />
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
        category={category***REMOVED***
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
