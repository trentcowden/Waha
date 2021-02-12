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
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

function AddSetScreen (props) {
  const [setItemMode, setSetItemMode] = useState('')
  const [onPress, setOnPress] = useState(() => {***REMOVED***)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')
  const [tags, setTags] = useState([])
  const [activeTags, setActiveTags] = useState([])
  const [tagSelectRef, setTagSelectRef] = useState()
  const [refresh, setRefresh] = useState(false)

  const [showSetInfoModal, setShowSetInfoModal] = useState(false)
  const [setInModal, setSetInModal] = useState({***REMOVED***)

  const [downloadedFiles, setDownloadedFiles] = useState([])

  useEffect(() => {
    switch (props.route.params.category) {
      case 'foundational':
        setHeaderTitle(props.translations.add_set.header_foundational)
        break
      case 'topical':
        setHeaderTitle(props.translations.add_set.header_topical)
        var tempTags = [props.translations.add_set.all_tag_label]
        props.activeDatabase.sets
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
        setHeaderTitle(props.translations.add_set.header_mt)
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
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [headerTitle])

  function filterForDownloadedQuestionSets (set) {
    var requiredQuestionSets = []

    set.lessons.forEach(lesson => {
      if (!requiredQuestionSets.includes(lesson.fellowshipType)) {
        requiredQuestionSets.push(lesson.fellowshipType)
      ***REMOVED***
      if (!requiredQuestionSets.includes(lesson.applicationType)) {
        requiredQuestionSets.push(lesson.applicationType)
      ***REMOVED***
    ***REMOVED***)

    if (
      requiredQuestionSets.every(questionSet =>
        downloadedFiles.includes(
          props.activeGroup.language + '-' + questionSet + '.mp3'
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
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />,
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
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
      onSelectedTagChange={selected => setActiveTags(selected)***REMOVED***
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
      textStyle={{ color: colors.oslo, fontFamily: props.font + '-Regular' ***REMOVED******REMOVED***
      activeTagStyle={{
        borderRadius: 20,
        // make primary color
        backgroundColor: props.primaryColor,
        borderColor: props.primaryColor
      ***REMOVED******REMOVED***
      activeTextStyle={{
        color: colors.white,
        fontFamily: props.font + '-Regular'
      ***REMOVED******REMOVED***
    />
  )

  //+ RENDER
  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        isSmall={false***REMOVED***
        mode='addset'
        onSetSelect={() => {
          setSetInModal(setList.item)
          setShowSetInfoModal(true)
        ***REMOVED******REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      {props.route.params.category === 'topical' ? tagSelectComponent : null***REMOVED***
      <FlatList
        style={{ flex: 1 ***REMOVED******REMOVED***
        data={
          props.route.params.category === 'topical'
            ? props.activeDatabase.sets
                .filter(
                  set =>
                    getSetInfo('category', set.id) ===
                    props.route.params.category
                )
                .filter(
                  topicalSet =>
                    !props.activeGroup.addedSets.some(
                      addedSet => addedSet.id === topicalSet.id
                    )
                )
                .filter(topicalAddedSet => {
                  return activeTags.length === 0 ||
                    activeTags.includes(
                      props.translations.add_set.all_tag_label
                    )
                    ? true
                    : topicalAddedSet.tags.some(tag => activeTags.includes(tag))
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
            : props.activeDatabase.sets
                .filter(
                  set =>
                    getSetInfo('category', set.id) ===
                    props.route.params.category
                )
                .filter(
                  set =>
                    !props.activeGroup.addedSets.some(
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
          // NOT USED: for folders
          // // if we're displaying topical sets:
          // // 1. filter by all sets that are topical,
          // // 2. filter by topical sets in the specified folder, and then
          // // 3. filter to only display sets that haven't already been added
          // props.route.params.category === 'topical'
          //   ? props.activeDatabase.sets
          //       .filter(set => set.category === 'topical')
          //       .filter(set => set.folder === props.route.params.folder)
          //       .filter(
          //         set =>
          //           !props.activeGroup.addedSets.some(
          //             addedSet => addedSet.id === set.id
          //           )
          //       )
          //   : // if we're displaying core or folders:
          //     // 1. filter by cateogry (core or folder)
          //     // 2. filter to only display sets that haven't already been added
          //     props.activeDatabase.sets
          //       .filter(set => set.category === props.route.params.category)
          //       .filter(
          //         set =>
          //           !props.activeGroup.addedSets.some(
          //             addedSet => addedSet.id === set.id
          //           )
          //       )
        ***REMOVED***
        ItemSeparatorComponent={() => <Separator />***REMOVED***
        ListFooterComponent={() => <Separator />***REMOVED***
        ListHeaderComponent={() => <Separator />***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        ListEmptyComponent={
          <View style={{ width: '100%', margin: 10 ***REMOVED******REMOVED***>
            <Text
              style={StandardTypography(
                props,
                'p',
                'Regular',
                'center',
                colors.chateau
              )***REMOVED***
            >
              {props.translations.add_set.no_more_sets_text***REMOVED***
            </Text>
          </View>
        ***REMOVED***
      />
      <SnackBar
        visible={showSnackbar***REMOVED***
        textMessage={props.translations.add_set.set_added_message***REMOVED***
        messageStyle={{
          color: colors.white,
          fontSize: 24 * scaleMultiplier,
          fontFamily: props.font + '-Black',
          textAlign: 'center'
        ***REMOVED******REMOVED***
        backgroundColor={colors.apple***REMOVED***
      />
      <SetInfoModal
        isVisible={showSetInfoModal***REMOVED***
        hideModal={() => setShowSetInfoModal(false)***REMOVED***
        category={props.route.params.category***REMOVED***
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

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: getLanguageFont(activeGroup.language),
    translations: state.database[activeGroup.language].translations,
    isRTL: state.database[activeGroup.language].isRTL,
    activeDatabase: state.database[activeGroup.language],
    activeGroup: activeGroup,
    primaryColor: state.database[activeGroup.language].primaryColor
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddSetScreen)
