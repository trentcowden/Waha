import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as FileSystem from 'expo-file-system'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import { FlatList, LogBox, StyleSheet, Text, View } from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import TagGroup from 'react-native-tag-group'
import { StorySet } from 'redux/reducers/database'
import SetItem, { SetItemMode } from '../components/SetItem'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import {
  getSetData,
  getSetInfo,
  SetCategory,
} from '../functions/setAndLessonDataFunctions'
import SetInfoModal from '../modals/SetInfoModal'
import { selector } from '../redux/hooks'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'Warning: Cannot update'])

type AddSetScreenNavigationProp = StackNavigationProp<MainStackParams, 'AddSet'>
type AddSetScreenRouteProp = RouteProp<MainStackParams, 'AddSet'>

interface Props {
  navigation: AddSetScreenNavigationProp
  route: AddSetScreenRouteProp
}

/**
 * Screen that shows a list of available Story Sets to add in a specific category.
 */
const AddSetScreen: FC<Props> = ({
  navigation: { setOptions },
  route: {
    params: {
      // The category of Story Sets to display.
      category,
    },
  },
}): ReactElement => {
  // Redux state/dispatch.
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeDatabase = selector((state) => activeDatabaseSelector(state))
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const font = info(activeGroup.language).font

  /** Whether the snackbar that pops up upon adding a set is visible or not.  */
  const [showSnackbar, setShowSnackbar] = useState(false)

  /** State for header title. Stored as state because it changes depending on which category we're viewing the story sets for. */
  const [headerTitle, setHeaderTitle] = useState('')

  /** Keeps track of the Topical Story Set tags. Tags are retrieved from the database. */
  const [tags, setTags] = useState<string[]>([])

  /** Keeps track of the currently selected tag. */
  const [selectedTag, setSelectedTag] = useState('')

  /** Keeps track of whether the <SetInfoModal /> is visible. */
  const [showSetInfoModal, setShowSetInfoModal] = useState(false)

  /** Keeps track of the Story Set that the user selects and that populates the <SetInfoModal />. */
  const [setInModal, setSetInModal] = useState<StorySet>()

  /** Keeps track of all the downloaded question set mp3s. We need this to verify that all the required question set mp3s are installed for the various Story Sets.*/
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([])

  /** Sets the headerTitle state as well as fetching the tags if we're displaying Topical Story Sets. */
  useEffect(() => {
    switch (category) {
      case SetCategory.FOUNDATIONAL:
        setHeaderTitle(t.sets.add_foundational_set)
        break
      case SetCategory.TOPICAL:
        setHeaderTitle(t.sets.add_topical_set)

        // Start off array of tags with the 'All' label since we always display that option.
        var tags = [t.general.all]

        // Go through each Topical Story Set and add all the various tags to our tag array.
        if (activeDatabase !== undefined)
          activeDatabase.sets
            .filter(
              (set) => getSetInfo('category', set.id) === SetCategory.TOPICAL
            )
            .forEach((topicalSet) => {
              if (topicalSet.tags !== undefined) {
                topicalSet.tags.forEach((tag) => {
                  // If we find a tag that hasn't been added yet, add it.
                  if (!tags.includes(tag)) tags.push(tag)
                })
              }
            })
        setTags(tags)
        break
      case SetCategory.MOBILIZATION_TOOLS:
        setHeaderTitle(t.sets.add_mobilization_tool)
        break
    }
  }, [])

  /** Checks what files are downloaded to local storage. */
  useEffect(() => {
    if (FileSystem.documentDirectory !== null)
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
        (contents) => {
          setDownloadedFiles(contents)
        }
      )
  }, [])

  /**
   * Hides the Snackbar if we leave the screen before it auto-dismisses.
   */
  useEffect(() => {
    return function cleanup() {
      setShowSnackbar(false)
    }
  }, [])

  /**
   * Sets the navigation options for this screen.
   */
  useEffect(() => {
    setOptions({ title: headerTitle })
  }, [headerTitle])

  /** Set data stored in a useMemo so we don't have to get it on every re-render. */
  const setData = useMemo(
    () =>
      getSetData(
        activeDatabase,
        activeGroup,
        category,
        'unsaved',
        downloadedFiles,
        selectedTag,
        t
      ),
    [activeGroup.addedSets, selectedTag, downloadedFiles]
  )

  /**
   * Renders a <SetItem /> for the list of Story Sets available to add.
   */
  const renderSetItem = ({ item }: { item: StorySet }) => (
    <SetItem
      thisSet={item}
      mode={SetItemMode.ADD_SET_SCREEN}
      onSetItemSelect={() => {
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
      {category === SetCategory.TOPICAL && (
        <TagGroup
          source={tags}
          singleChoiceMode
          onSelectedTagChange={(selected: string) => setSelectedTag(selected)}
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
        thisSet={setInModal ? setInModal : undefined}
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

export default AddSetScreen
