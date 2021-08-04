import * as FileSystem from 'expo-file-system'
import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, LogBox, StyleSheet, Text, View } from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import TagGroup from 'react-native-tag-group'
import { connect } from 'react-redux'
import SetItem from '../components/SetItem'
import WahaBackButton from '../components/WahaBackButton'
import WahaSeparator from '../components/WahaSeparator'
import { getSetInfo, scaleMultiplier, setItemModes } from '../constants'
import { info } from '../functions/languageDataFunctions'
import SetInfoModal from '../modals/SetInfoModal'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'Warning: Cannot update'])

function mapStateToProps(state) {
  return {
    isDark: state.settings.isDarkModeEnabled,
    t: getTranslations(activeGroupSelector(state).language),
    isRTL: info(activeGroupSelector(state).language).isRTL,
    activeDatabase: activeDatabaseSelector(state),
    activeGroup: activeGroupSelector(state),
    font: info(activeGroupSelector(state).language).font,
  }
}

/**
 * Screen that shows a list of available Story Sets to add in a specific category.
 * @param {string} category - The category of Story Sets to display.
 */
const AddSetScreen = ({
  // Props passed from navigation.
  navigation: { setOptions, goBack },
  route: {
    // Props passed from previous screen.
    params: { category },
  },
  // Props passed from redux.
  font,
  t,
  isRTL,
  isDark,
  activeDatabase,
  activeGroup,
}) => {
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
  const [setInModal, setSetInModal] = useState({})

  /** Keeps track of all the downloaded question set mp3s. We need this to verify that all the required question set mp3s are installed for the various Story Sets.*/
  const [downloadedFiles, setDownloadedFiles] = useState([])

  /** useEffect function that sets the headerTitle state as well as fetching the tags if we're displaying Topical Story Sets. */
  useEffect(() => {
    switch (category) {
      case 'Foundational':
        setHeaderTitle(t.sets.add_foundational_set)
        break
      case 'Topical':
        setHeaderTitle(t.sets.add_topical_set)

        // Start off array of tags with the 'All' label since we always display that option.
        var tags = [t.general.all]

        // Go through each Topical Story Set and add all the various tags to our tag array.
        activeDatabase.sets
          .filter((set) => getSetInfo('category', set.id) === 'Topical')
          .forEach((topicalSet) => {
            topicalSet.tags &&
              topicalSet.tags.forEach((tag) => {
                // If we find a tag that hasn't been added yet, add it.
                if (!tags.includes(tag)) tags.push(tag)
              })
          })
        setTags(tags)
        break
      case 'MobilizationTools':
        setHeaderTitle(t.sets.add_mobilization_tool)
        break
    }
  }, [])

  /** useEffect function that checks what files are downloaded to local storage. */
  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      (contents) => {
        setDownloadedFiles(contents)
      }
    )
  }, [])

  /** useEffect function that hides the Snackbar if we leave the screen before it auto-dismisses. */
  useEffect(() => {
    return function cleanup() {
      setShowSnackbar(false)
    }
  }, [])

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      title: headerTitle,
      headerLeft: isRTL
        ? () => <View />
        : () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          ),
      headerRight: isRTL
        ? () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
        : () => <View />,
    })
  }, [headerTitle])

  /**
   * Goes through a set and verifies that all of the necessary question set mp3s have been downloaded for that set. This gets passed through the filter function below.
   * @param {Object} set - The object for the set that we're checking.
   * @return {boolean} - Whether every necessary file has been downloaded for the set.
   */
  const filterForDownloadedQuestionSets = (set) => {
    // Create an array to store the necessary question set mp3s for this set.
    var requiredQuestionSets = []

    // Go through each set and add all necessary question set mp3s to requiredQuestionSets array.
    set.lessons.forEach((lesson) => {
      // Only filter if the lessons have a fellowship/application chapter. For sets like 3.1 which only has video lessons, we don't want to filter.
      if (lesson.fellowshipType) {
        if (!requiredQuestionSets.includes(lesson.fellowshipType)) {
          requiredQuestionSets.push(lesson.fellowshipType)
        }
        if (!requiredQuestionSets.includes(lesson.applicationType)) {
          requiredQuestionSets.push(lesson.applicationType)
        }
      }
    })

    // If every required file is present, return true. Otherwise, return false.
    if (
      requiredQuestionSets.every((questionSet) =>
        downloadedFiles.includes(
          activeGroup.language + '-' + questionSet + '.mp3'
        )
      )
    )
      return true
    else return false
  }

  /**
   * Gets a list of sets to display on this screen depending on the category.
   * @return {Object[]} - An array of set objects to display.
   */
  const getSetData = () => {
    if (category === 'Topical')
      return (
        activeDatabase.sets
          // Filter for Topical Story Sets.
          .filter((set) => getSetInfo('category', set.id) === category)
          // Filter for Topical Story Sets that haven't already been added.
          .filter(
            (topicalSet) =>
              !activeGroup.addedSets.some(
                (addedSet) => addedSet.id === topicalSet.id
              )
          )
          // Filter for Topical Story Sets that match the currently selected tag (if there is one).
          .filter((topicalAddedSet) =>
            // If the selected tag is blank (meaning nothing has been selected) or 'All' is selected, show all the Topical Story Sets. Otherwise, filter by the selected tag.
            selectedTag === '' || selectedTag === t.general.all
              ? true
              : topicalAddedSet.tags.some((tag) => selectedTag === tag)
          )
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
          .filter((set) => getSetInfo('category', set.id) === category)
          // Filter for Foundational or Mobilization Tools Story Sets that haven't already been added.
          .filter(
            (set) =>
              !activeGroup.addedSets.some((addedSet) => addedSet.id === set.id)
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
  }

  /** Set data stored in a useMemo so we don't have to get it on every re-render. */
  const setData = useMemo(
    () => getSetData(),
    [activeGroup.addedSets, selectedTag, downloadedFiles]
  )

  /** Renders a <SetItem /> for the list of sets available to add. */
  const renderSetItem = ({ item }) => (
    <SetItem
      thisSet={item}
      mode={setItemModes.ADD_SET_SCREEN}
      onSetSelect={() => {
        setSetInModal(item)
        setShowSetInfoModal(true)
      }}
      font={font}
      isRTL={isRTL}
      isDark={isDark}
      activeGroup={activeGroup}
    />
  )

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      {category === 'Topical' && (
        <TagGroup
          source={tags}
          singleChoiceMode
          onSelectedTagChange={(selected) => setSelectedTag(selected)}
          style={styles.tagGroupContainer}
          tagStyle={{
            ...styles.tagContainer,
            borderColor: isDark ? colors(isDark).bg4 : colors(isDark).disabled,
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
          }}
          textStyle={type(
            activeGroup.language,
            'p',
            'Regular',
            'center',
            colors(isDark).secondaryText
          )}
          activeTagStyle={{
            backgroundColor: colors(isDark, activeGroup.language).accent,
            borderColor: colors(isDark, activeGroup.language).accent,
          }}
          activeTextStyle={type(
            activeGroup.language,
            'p',
            'Regular',
            'center',
            colors(isDark).bg4
          )}
        />
      )}
      <FlatList
        style={{ flex: 1 }}
        data={setData}
        ItemSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
        ListFooterComponent={() => <WahaSeparator isDark={isDark} />}
        ListHeaderComponent={() => <WahaSeparator isDark={isDark} />}
        renderItem={renderSetItem}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={type(
                activeGroup.language,
                'p',
                'Regular',
                'center',
                colors(isDark).secondaryText
              )}
            >
              {t.sets.no_more_sets}
            </Text>
          </View>
        )}
      />
      {/* Modals */}
      <SnackBar
        visible={showSnackbar}
        textMessage={t.sets.set_added}
        messageStyle={{
          color: colors(isDark).textOnColor,
          fontSize: 24 * scaleMultiplier,
          fontFamily: info(activeGroup.language).font + '-Black',
          textAlign: 'center',
        }}
        backgroundColor={colors(isDark).success}
      />
      <SetInfoModal
        isVisible={showSetInfoModal}
        hideModal={() => setShowSetInfoModal(false)}
        thisSet={setInModal}
        showSnackbar={() => {
          setShowSnackbar(true)
          setTimeout(() => setShowSnackbar(false), 2000)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tagGroupContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 2,
  },
  tagContainer: {
    borderRadius: 30,
    height: 35 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20 * scaleMultiplier,
  },
})

export default connect(mapStateToProps)(AddSetScreen)
