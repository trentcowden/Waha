import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'
import React, { useEffect, useMemo, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { StorySet } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import SetItem from '../components/SetItem'
import {
  getSetInfo,
  itemHeights,
  scaleMultiplier,
  setItemModes,
} from '../constants'
import { info } from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../hooks'
// import en from '../locales/en.json'
import MessageModal from '../modals/MessageModal'
import { setShowTrailerHighlights } from '../redux/actions/persistedPopupsActions'
import { setShowMTTabAddedSnackbar } from '../redux/actions/popupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

/*
  Screen that shows the list of currently added story sets of a specific category. Used three times for the three different set tabs.
*/
const SetsScreen = ({
  // Props passed from navigation.
  navigation: { navigate },
  // Props passed from the navigation route.
  route: { name: category },
}) => {
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const activeDatabase = selector((state) => activeDatabaseSelector(state))
  const font = selector(
    (state) => info(activeGroupSelector(state).language).font
  )
  const showMTTabAddedSnackbar = selector(
    (state) => state.popups.showMTTabAddedSnackbar
  )
  const areMobilizationToolsUnlocked = selector(
    (state) => state.areMobilizationToolsUnlocked
  )
  const showTrailerHighlights = selector(
    (state) => state.persistedPopups.showTrailerHighlights
  )

  const dispatch = useAppDispatch()

  /** Keeps track of the text displayed on the add set button. Changes depending on what category we're in. */
  const [addNewSetLabel, setAddNewSetLabel] = useState('')

  useEffect(() => {
    setAddNewSetLabel(
      category === 'Foundational'
        ? t.sets.add_foundational_set
        : category === 'Topical'
        ? t.sets.add_topical_set
        : t.sets.add_mobilization_tool
    )
  }, [activeGroup])

  /** Keeps track of all of the files the user has downloaded to the user's device. This is used to verify that all the required question set mp3s are downloaded for the sets that have been added. */
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([])

  /** useEffect function that sets the downloaded files state. It's also used to log some various information to the console for testing. */
  useEffect(() => {
    if (FileSystem.documentDirectory)
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
        (contents) => setDownloadedFiles(contents)
      )
  }, [])

  /**
   * Goes through a set and verifies that all of the necessary question set mp3s have been downloaded for that set. This gets passed through the filter function below.
   * @param {Object} set - The object for the set that we're checking.
   * @return {boolean} - Whether every necessary file has been downloaded for the set.
   */
  const filterForDownloadedQuestionSets = (set: StorySet) => {
    // Create an array to store the necessary question set mp3s for this set.
    var requiredQuestionSets: string[] = []

    // Go through each set and add all necessary question set mp3s to requiredQuestionSets array.
    set.lessons.forEach((lesson) => {
      // Only filter if the lessons have a fellowship/application chapter. For sets like 3.1 which only has video lessons, we don't want to filter.
      if (
        lesson.fellowshipType &&
        !requiredQuestionSets.includes(lesson.fellowshipType)
      )
        requiredQuestionSets.push(lesson.fellowshipType)
      if (
        lesson.applicationType &&
        !requiredQuestionSets.includes(lesson.applicationType)
      )
        requiredQuestionSets.push(lesson.applicationType)
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
   * Gets an array of sets to display to populate the sets FlatList below. The sets to display vary depending on the category.
   * @return {Object[]} - An array of sets.
   */
  const getSetData = (): StorySet[] => {
    if (activeDatabase !== undefined) {
      // If we're displaying Foundational Story Sets...
      if (category === 'Foundational')
        return (
          activeDatabase.sets
            // 1. Filter for Foundational sets from the array of all sets.
            .filter((set) => getSetInfo('category', set.id) === category)
            // 2. Filter for sets that have been added to this group.
            .filter((set) =>
              activeGroup.addedSets.some((savedSet) => savedSet.id === set.id)
            )
        )
      // If we're displaying Topical Story Sets...
      else if (category === 'Topical') {
        return (
          activeDatabase.sets
            // 1. Filter for either Topical sets from the array of all sets depending on the category we want to display.
            .filter((set) => getSetInfo('category', set.id) === category)
            // 2. Filter for sets that have been added to this group.
            .filter((set) =>
              activeGroup.addedSets.some((savedSet) => savedSet.id === set.id)
            )
            // 3. For these sets, we want to sort based on the order they were added, not in the default order (which is order of index).
            .sort((a, b) => {
              return (
                activeGroup.addedSets.indexOf(
                  activeGroup.addedSets.filter(
                    (savedSet) => savedSet.id === a.id
                  )[0]
                ) -
                activeGroup.addedSets.indexOf(
                  activeGroup.addedSets.filter(
                    (savedSet) => savedSet.id === b.id
                  )[0]
                )
              )
            })
          // Note: we don't need to filter for sets that have necessary files downloaded because all Topical Story Sets use the standard Fellowship/Application question sets that all languages must have at launch.
        )
      }
      // If we're displaying Mobilization Tools Sets...
      else
        return (
          activeDatabase.sets
            // 1. Filter for either Topical or Mobilization Tools sets from the array of all sets depending on the category we want to display.
            .filter((set) => getSetInfo('category', set.id) === category)
            // 2. Filter for sets that have been added to this group.
            .filter((set) =>
              activeGroup.addedSets.some((savedSet) => savedSet.id === set.id)
            )
            // 3. Filter for sets that have all necessary files downloaded.
            .filter(filterForDownloadedQuestionSets)
            // 4. For these sets, we want to sort based on the order they were added, not in the default order (which is order of index).
            .sort((a, b) => {
              return (
                activeGroup.addedSets.indexOf(
                  activeGroup.addedSets.filter(
                    (savedSet) => savedSet.id === a.id
                  )[0]
                ) -
                activeGroup.addedSets.indexOf(
                  activeGroup.addedSets.filter(
                    (savedSet) => savedSet.id === b.id
                  )[0]
                )
              )
            })
        )
    } else return []
  }

  /** Memoize the set data so that the expensive function isn't run on every re-render. */
  const setData = useMemo(
    () => getSetData(),
    [activeGroup.addedSets, downloadedFiles]
  )

  // A button that goes at the bottom of each list of sets that allows the user to add a new set.
  const renderAddSetButton = () => (
    <TouchableOpacity
      style={{
        ...styles.addSetButtonContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
      onPress={() => navigate('AddSet', { category: category })}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80 * scaleMultiplier,
          height: 80 * scaleMultiplier,
        }}
      >
        <Icon
          name='plus'
          size={60 * scaleMultiplier}
          color={colors(isDark).disabled}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          marginRight: isRTL ? 20 : 0,
          marginLeft: isRTL ? 0 : 20,
        }}
      >
        <Text
          style={type(
            activeGroup.language,
            'h4',
            'Bold',
            'left',
            colors(isDark).secondaryText
          )}
        >
          {addNewSetLabel}
        </Text>
      </View>
    </TouchableOpacity>
  )

  // A label that shows when a language has no Mobilization Tools sets.
  const renderNoMTLabel = () => (
    <View style={{ width: '100%', height: 80 * scaleMultiplier, padding: 20 }}>
      <Text
        style={type(
          activeGroup.language,
          'p',
          'Regular',
          'center',
          colors(isDark).secondaryText
        )}
      >
        {t.sets.no_mobilization_tools_content}
      </Text>
    </View>
  )

  /**
   * Renders a setItem component.
   * @param {Object} set - The object of the set to render.
   * @return {Component} - The setItem component.
   */
  const renderSetItem = ({ item }: { item: StorySet }) => {
    return (
      <SetItem
        thisSet={item}
        mode={setItemModes.SETS_SCREEN}
        onSetSelect={() => {
          if (
            areMobilizationToolsUnlocked &&
            showTrailerHighlights &&
            !item.id.includes('3.1')
          ) {
            dispatch(setShowTrailerHighlights(false))
          }
          navigate('Lessons', { setID: item.id })
        }}
        progressPercentage={
          activeGroup.addedSets.filter((savedSet) => savedSet.id === item.id)[0]
            .progress.length / item.lessons.length
        }
        font={font}
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
        areMobilizationToolsUnlocked={areMobilizationToolsUnlocked}
        showTrailerHighlights={showTrailerHighlights}
      />
    )
  }

  // We know the height of these items ahead of time so we can use getItemLayout to make our FlatList perform better.
  const getItemLayout = (data: any, index: number) => ({
    length: itemHeights[font].SetItem,
    offset: itemHeights[font].SetItem * index,
    index,
  })

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg1,
      }}
    >
      <FlatList
        data={setData}
        renderItem={renderSetItem}
        keyExtractor={(item) => item.id}
        // For performance optimization.
        getItemLayout={getItemLayout}
        ListFooterComponent={
          // If we're in the Mobilization Tab AND this language doesn't have any MT content, display a "No MT Content" component. Otherwise, show the add Story Set button.
          category === 'MobilizationTools' &&
          activeDatabase !== undefined &&
          !activeDatabase.sets.some((set) => /[a-z]{2}.3.[0-9]+/.test(set.id))
            ? renderNoMTLabel
            : renderAddSetButton
        }
      />
      <MessageModal
        isVisible={showMTTabAddedSnackbar}
        hideModal={() => dispatch(setShowMTTabAddedSnackbar(false))}
        title={t.mobilization_tools.unlock_successful_title}
        message={t.mobilization_tools.unlock_successful_message}
        confirmText={t.general.got_it}
        confirmOnPress={() => dispatch(setShowMTTabAddedSnackbar(false))}
        isDark={isDark}
        activeGroup={activeGroup}
      >
        <LottieView
          autoPlay
          loop
          resizeMode='cover'
          source={require('../assets/lotties/mob_tools_unlocked.json')}
          style={{ width: '100%' }}
        />
      </MessageModal>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  addSetButtonContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20,
  },
})

export default SetsScreen
