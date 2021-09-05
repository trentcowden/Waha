import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs/lib/typescript/src/types'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { StorySet } from 'redux/reducers/database'
import AddSetButton from '../components/AddSetButton'
import SetItem, { SetItemMode } from '../components/SetItem'
import { itemHeights, scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { getSetData, SetCategory } from '../functions/setAndLessonDataFunctions'
import MessageModal from '../modals/MessageModal'
import { SetsTabsParams } from '../navigation/SetsTabs'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import { setShowTrailerHighlights } from '../redux/reducers/persistedPopups'
import { setShowMTTabAddedSnackbar } from '../redux/reducers/popups'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

export type SetsScreenNavigationProp =
  | CompositeNavigationProp<
      MaterialTopTabNavigationProp<SetsTabsParams, SetCategory.FOUNDATIONAL>,
      StackNavigationProp<MainStackParams>
    >
  | CompositeNavigationProp<
      MaterialTopTabNavigationProp<SetsTabsParams, SetCategory.TOPICAL>,
      StackNavigationProp<MainStackParams>
    >
  | CompositeNavigationProp<
      MaterialTopTabNavigationProp<
        SetsTabsParams,
        SetCategory.MOBILIZATION_TOOLS
      >,
      StackNavigationProp<MainStackParams>
    >

export type SetsScreenRouteProp =
  | RouteProp<SetsTabsParams, SetCategory.FOUNDATIONAL>
  | RouteProp<SetsTabsParams, SetCategory.TOPICAL>
  | RouteProp<SetsTabsParams, SetCategory.MOBILIZATION_TOOLS>

interface Props {
  navigation: SetsScreenNavigationProp
  route: SetsScreenRouteProp
}

/*
  Screen that shows the list of currently added story sets of a specific category. Used three times for the three different set tabs.
*/
const SetsScreen: FC<Props> = ({
  navigation: { navigate },
  route: { name: category },
}): ReactElement => {
  // Redux state/dispatch.
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

  /** Keeps track of all of the files the user has downloaded to the user's device. This is used to verify that all the required question set mp3s are downloaded for the sets that have been added. */
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([])

  /** Memoize the set data so that the expensive function isn't run on every re-render. */
  const setData = useMemo(
    () =>
      getSetData(
        activeDatabase,
        activeGroup,
        category,
        'saved',
        downloadedFiles
      ),
    [activeGroup.addedSets, downloadedFiles]
  )

  /**
   * Updates the <AddNewSetButton /> label whenever the active group changes.
   */
  useEffect(() => {
    setAddNewSetLabel(
      category === 'Foundational'
        ? t.sets.add_foundational_set
        : category === SetCategory.TOPICAL
        ? t.sets.add_topical_set
        : t.sets.add_mobilization_tool
    )
  }, [activeGroup])

  /**
   * Retrieves all downloaded files and store in state.
   */
  useEffect(() => {
    if (FileSystem.documentDirectory)
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
        (contents) => {
          setDownloadedFiles(contents)
        }
      )
  }, [])

  /**
   * Handles pressing a <SetItem />.
   */
  const handleSetItemSelect = (set: StorySet) => {
    if (
      areMobilizationToolsUnlocked &&
      showTrailerHighlights &&
      !set.id.includes('3.1')
    ) {
      dispatch(setShowTrailerHighlights({ toSet: false }))
    }
    navigate('Lessons', { setID: set.id })
  }

  /**
   * Renders a <SetItem /> component.
   */
  const renderSetItem = ({ item }: { item: StorySet }) => {
    return (
      <SetItem
        thisSet={item}
        mode={SetItemMode.SETS_SCREEN}
        onSetItemSelect={handleSetItemSelect}
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

  /**
   * We know the height of these items ahead of time so we can use getItemLayout to make our FlatList perform better.
   */
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
          category === SetCategory.MOBILIZATION_TOOLS &&
          activeDatabase !== undefined &&
          !activeDatabase.sets.some((set) =>
            /[a-z]{2}.3.[0-9]+/.test(set.id)
          ) ? (
            <View
              style={{
                width: '100%',
                height: 80 * scaleMultiplier,
                padding: 20,
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
                {t.sets.no_mobilization_tools_content}
              </Text>
            </View>
          ) : (
            <AddSetButton
              label={addNewSetLabel}
              onPress={() => navigate('AddSet', { category: category })}
              isRTL={isRTL}
              isDark={isDark}
              activeGroup={activeGroup}
            />
          )
        }
      />
      <MessageModal
        isVisible={showMTTabAddedSnackbar}
        hideModal={() => dispatch(setShowMTTabAddedSnackbar({ toSet: false }))}
        title={t.mobilization_tools.unlock_successful_title}
        message={t.mobilization_tools.unlock_successful_message}
        confirmText={t.general.got_it}
        confirmOnPress={() =>
          dispatch(setShowMTTabAddedSnackbar({ toSet: false }))
        }
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        <LottieView
          autoPlay
          loop
          resizeMode='cover'
          source={require('../assets/lotties/mob_tools_unlocked.json')}
          style={{ width: '100%', maxWidth: 500 }}
        />
      </MessageModal>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default SetsScreen
