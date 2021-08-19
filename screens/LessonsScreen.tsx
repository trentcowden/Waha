import { RouteProp, useIsFocused } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'
import { MainStackParams } from 'navigation/MainStack'
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view'
import { Lesson, StorySet } from 'redux/reducers/database'
import { SavedSet } from 'redux/reducers/groups'
import LessonItem from '../components/LessonItem'
import LessonSwipeBackdrop from '../components/LessonSwipeBackdrop'
import OptionsModalButton from '../components/OptionsModalButton'
import SetItem from '../components/SetItem'
import { itemHeights } from '../constants'
import { info } from '../functions/languageDataFunctions'
import {
  getDownloadedLessons,
  getLessonInfo,
  getLessonType,
} from '../functions/setAndLessonDataFunctions'
import {
  checkForAlmostCompleteSet,
  checkForFullyCompleteSet,
} from '../functions/setProgressFunctions'
import { selector, useAppDispatch } from '../hooks'
import { SetItemMode } from '../interfaces/components'
import { LessonType } from '../interfaces/setAndLessonInfo'
import MessageModal from '../modals/MessageModal'
import OptionsModal from '../modals/OptionsModal'
import ShareModal from '../modals/ShareModal'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import { downloadMedia, removeDownload } from '../redux/reducers/downloads'
import { addSet, toggleComplete } from '../redux/reducers/groups'
import { setShowTrailerHighlights } from '../redux/reducers/persistedPopups'
import { colors } from '../styles/colors'
import { getTranslations } from '../translations/translationsConfig'

type LessonsScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'Lessons'
>
type LessonsScreenRouteProp = RouteProp<MainStackParams, 'Lessons'>

interface Props {
  navigation: LessonsScreenNavigationProp
  route: LessonsScreenRouteProp
}

/**
 * Screen that displays a list of lessons for a specific Story Set.
 * @param {Object} thisSet - The object for the set that we're displaying.
 */
const LessonsScreen: FC<Props> = ({
  navigation: { navigate },
  route: {
    params: { setID },
  },
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
  const areMobilizationToolsUnlocked = selector(
    (state) => state.areMobilizationToolsUnlocked
  )
  const showTrailerHighlights = selector(
    (state) => state.persistedPopups.showTrailerHighlights
  )
  const downloads = selector((state) => state.downloads)
  const isConnected = selector((state) => state.network.isConnected)
  const dispatch = useAppDispatch()

  // Gets whether the screen is focused or not.
  const isFocused = useIsFocused()

  // Keeps track of what lessons are downloaded to the file system.
  const [downloadedLessons, setDownloadedLessons] = useState<string[]>([])

  // Whenever we enable a lesson-specific modal, we also set this state to the specific lesson so we can use its information for whatever action we're doing.
  const [activeLessonInModal, setActiveLessonInModal] = useState<
    Lesson | undefined
  >()

  // Keeps track of the type of the active lesson in a modal.
  const [modalLessonType, setModalLessonType] = useState<LessonType>(
    LessonType.STANDARD_DBS
  )

  // A whole lot of modal states.
  const [showDownloadLessonModal, setShowDownloadLessonModal] = useState(false)
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSetCompleteModal, setShowSetCompleteModal] = useState(false)
  const [showNextSetUnlockedModal, setShowNextSetUnlockedModal] =
    useState(false)

  // The set to display the lessons for.
  const [thisSet] = useState<StorySet>(
    activeDatabase
      ? activeDatabase.sets.filter((set) => set.id === setID)[0]
      : {
          // Pass a dummy filler set in case activeDatabase returns undefined.
          id: 'en.1.1',
          languageID: 'en',
          lessons: [],
          title: '',
          subtitle: '',
          iconName: '',
        }
  )

  // The saved set, which includes the set's progress, to display the lessons for.
  const [thisSavedSet, setThisSavedSet] = useState(
    activeGroup.addedSets.filter(
      (savedSet: SavedSet) => savedSet.id === thisSet.id
    )[0]
  )

  // Keeps track of whether this lesson was just completed.
  const justCompleted = useRef(false)

  // Keeps track of whether the screen is in "info" mode or not. Info mode shows the scripture references for each lesson.
  const [isInInfoMode, setIsInInfoMode] = useState(false)

  // Used to refresh the downloaded lessons.
  const [refreshDownloadedLessons, setRefreshDownloadedLessons] =
    useState(false)

  // Get the currently downloaded lessons for this set.
  useEffect(() => {
    getDownloadedLessons(thisSet).then((whichLessonsDownloaded: string[]) => {
      setDownloadedLessons(whichLessonsDownloaded)
    })
  }, [Object.keys(downloads).length, refreshDownloadedLessons])

  // Update the thisSavedSet state whenever it changes in redux. This will likely happen when a lesson is marked as complete.
  useEffect(() => {
    setThisSavedSet(
      activeGroup.addedSets.filter(
        (savedSet: SavedSet) => savedSet.id === thisSet.id
      )[0]
    )
  }, [
    activeGroup.addedSets.filter(
      (savedSet: SavedSet) => savedSet.id === thisSet.id
    )[0],
  ])

  // Check if this set is mostly or fully complete.
  useEffect(() => {
    if (isFocused && justCompleted.current) {
      checkForAlmostCompleteSet(
        thisSet,
        thisSavedSet,
        activeGroup,
        activeDatabase,
        (groupName: string, groupID: number, set: StorySet) =>
          dispatch(addSet({ groupName, groupID, set })),
        setShowNextSetUnlockedModal
      )
      checkForFullyCompleteSet(thisSet, thisSavedSet, setShowSetCompleteModal)
    }
  }, [thisSavedSet.progress])

  const downloadLessonFromModal = () => {
    if (
      modalLessonType.includes('Audio') &&
      activeLessonInModal &&
      !downloadedLessons.includes(activeLessonInModal.id)
    )
      dispatch(
        downloadMedia(
          'audio',
          activeLessonInModal.id,
          getLessonInfo('audioSource', activeLessonInModal.id)
        )
      )

    if (
      modalLessonType.includes('Video') &&
      activeLessonInModal &&
      !downloadedLessons.includes(activeLessonInModal.id + 'v')
    )
      dispatch(
        downloadMedia(
          'video',
          activeLessonInModal.id,
          getLessonInfo('videoSource', activeLessonInModal.id)
        )
      )

    setShowDownloadLessonModal(false)
  }

  const deleteLessonFromModal = () => {
    // If a lesson contains audio, delete it and refresh the downloaded lessons.
    if (activeLessonInModal && modalLessonType.includes('Audio'))
      FileSystem.deleteAsync(
        FileSystem.documentDirectory + activeLessonInModal.id + '.mp3'
      ).then(() => setRefreshDownloadedLessons((current) => !current))

    // If a lesson contains video, delete it and refresh the downloaded lessons.
    if (activeLessonInModal && modalLessonType.includes('Video'))
      FileSystem.deleteAsync(
        FileSystem.documentDirectory + activeLessonInModal.id + 'v.mp4'
      ).then(() => setRefreshDownloadedLessons((current) => !current))

    setShowDeleteLessonModal(false)
  }

  // Navigates to the Play screen with some parameters.
  const handleLessonItemPress = (params: {
    thisLesson: Lesson
    isAudioAlreadyDownloaded: boolean
    isVideoAlreadyDownloaded: boolean
    isAlreadyDownloading: boolean
    lessonType: LessonType
  }) =>
    navigate('Play', {
      ...params,
      thisSet: thisSet,
    })

  // Whenever we start swiping a lesson, set the active lesson in modal.
  const handleLessonSwipeBegin = useCallback((data) => {
    setActiveLessonInModal(
      thisSet.lessons.filter(
        (lesson) => getLessonInfo('index', lesson.id) === parseInt(data)
      )[0]
    )
  }, [])

  const handleCompleteButtonPress = (
    lesson: Lesson,
    rowMap: RowMap<Lesson>
  ) => {
    dispatch(
      toggleComplete(
        activeGroup.name,
        thisSet,
        getLessonInfo('index', lesson.id)
      )
    )
    justCompleted.current = true
    rowMap[getLessonInfo('index', lesson.id)].closeRow()
  }

  const handleShareButtonPress = (lesson: Lesson, rowMap: RowMap<Lesson>) => {
    setShowShareModal(true)
    rowMap[getLessonInfo('index', lesson.id)].closeRow()
  }

  // Renders the backdrop for the lesson item. This appears when the user swipes the lesson.
  const renderLessonSwipeBackdrop = (
    data: { item: Lesson },
    rowMap: RowMap<Lesson>
  ) => (
    <LessonSwipeBackdrop
      isComplete={thisSavedSet.progress.includes(
        getLessonInfo('index', data.item.id)
      )}
      onCompleteButtonPress={() => handleCompleteButtonPress(data.item, rowMap)}
      onShareButtonPress={() => handleShareButtonPress(data.item, rowMap)}
      isRTL={isRTL}
      isDark={isDark}
    />
  )

  // Triggers an action when the user swipes a certain distance to the left.
  const handleLeftActionStatusChange = (data: {
    isActivated: boolean
    key: string
  }) => {
    if (!isRTL && data.isActivated) {
      dispatch(toggleComplete(activeGroup.name, thisSet, parseInt(data.key)))
      justCompleted.current = true
    } else if (isRTL && data.isActivated) setShowShareModal(true)
  }

  // Triggers an action when the user swipes a certain distance to the right.
  const handleRightActionStatusChange = (data: {
    isActivated: boolean
    key: string
  }) => {
    if (isRTL && data.isActivated) {
      dispatch(toggleComplete(activeGroup.name, thisSet, parseInt(data.key)))
      justCompleted.current = true
    } else if (!isRTL && data.isActivated) setShowShareModal(true)
  }

  // We know the height of these items ahead of time so we can use getItemLayout to make our FlatList perform better.
  const getItemLayout = (data: any, index: number) => ({
    length: itemHeights[font].LessonItem,
    offset: itemHeights[font].LessonItem * index,
    index,
  })

  const handleDownloadButtonPress = (lesson: Lesson) => {
    setActiveLessonInModal(lesson)
    setModalLessonType(getLessonType(lesson))
    setShowDownloadLessonModal(true)
  }

  const handleRemoveDownloadButtonPress = (lesson: Lesson) => {
    setActiveLessonInModal(lesson)
    setModalLessonType(getLessonType(lesson))
    setShowDeleteLessonModal(true)
  }

  /** Renders a lesson item. */
  const renderLessonItem = ({ item }: { item: Lesson }) => {
    var scriptureList = ''
    if (item.scripture) {
      scriptureList = item.scripture[0].header

      item.scripture.forEach((passage, index) => {
        if (index !== 0) scriptureList += ', ' + passage.header
      })
    }

    return (
      <LessonItem
        thisLesson={item}
        onLessonItemPress={handleLessonItemPress}
        isBookmark={thisSavedSet.bookmark === getLessonInfo('index', item.id)}
        lessonType={getLessonType(item)}
        isComplete={thisSavedSet.progress.includes(
          getLessonInfo('index', item.id)
        )}
        downloadedLessons={downloadedLessons}
        onDownloadButtonPress={handleDownloadButtonPress}
        onRemoveDownloadButtonPress={handleRemoveDownloadButtonPress}
        scriptureList={scriptureList}
        isInInfoMode={isInInfoMode}
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
        downloads={downloads}
        font={font}
        areMobilizationToolsUnlocked={areMobilizationToolsUnlocked}
        showTrailerHighlights={showTrailerHighlights}
        setShowTrailerHighlights={(toSet: boolean) =>
          dispatch(setShowTrailerHighlights({ toSet }))
        }
        removeDownload={(lessonID: string) =>
          dispatch(removeDownload({ lessonID: lessonID }))
        }
        isConnected={isConnected}
      />
    )
  }

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
      }}
    >
      <View style={{ height: itemHeights[font].SetItem, width: '100%' }}>
        <SetItem
          thisSet={thisSet}
          mode={SetItemMode.LESSONS_SCREEN}
          progressPercentage={
            thisSavedSet.progress.length / thisSet.lessons.length
          }
          setIsInInfoMode={setIsInInfoMode}
          isInInfoMode={isInInfoMode}
          font={font}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
      </View>
      <SwipeListView
        data={thisSet.lessons}
        renderItem={renderLessonItem}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => <View style={{ height: 30 }} />}
        keyExtractor={(item) => getLessonInfo('index', item.id).toString()}
        renderHiddenItem={renderLessonSwipeBackdrop}
        leftOpenValue={50}
        rightOpenValue={-50}
        leftActivationValue={Dimensions.get('screen').width / 2 - 10}
        rightActivationValue={-Dimensions.get('screen').width / 2 + 10}
        stopLeftSwipe={Dimensions.get('screen').width / 2}
        stopRightSwipe={-Dimensions.get('screen').width / 2}
        onLeftActionStatusChange={handleLeftActionStatusChange}
        onRightActionStatusChange={handleRightActionStatusChange}
        swipeGestureBegan={handleLessonSwipeBegin}
        disableRightSwipe={isInInfoMode}
        disableLeftSwipe={isInInfoMode}
      />

      {/* Modals */}
      <OptionsModal
        isVisible={showDownloadLessonModal}
        hideModal={() => setShowDownloadLessonModal(false)}
        closeText={t.general.cancel}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        <OptionsModalButton
          label={t.lessons.download_lesson}
          onPress={downloadLessonFromModal}
          isDark={isDark}
          activeGroup={activeGroup}
          isRTL={isRTL}
        />
      </OptionsModal>
      <OptionsModal
        isVisible={showDeleteLessonModal}
        hideModal={() => setShowDeleteLessonModal(false)}
        closeText={t.general.cancel}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        <OptionsModalButton
          label={t.lessons.remove_download}
          onPress={deleteLessonFromModal}
          isDark={isDark}
          activeGroup={activeGroup}
          isRTL={isRTL}
        />
      </OptionsModal>
      <ShareModal
        isVisible={showShareModal}
        hideModal={() => setShowShareModal(false)}
        closeText={t.general.close}
        lesson={activeLessonInModal}
        lessonType={getLessonType(activeLessonInModal)}
        t={t}
        downloads={downloads}
        activeGroup={activeGroup}
        isDark={isDark}
        isRTL={isRTL}
      />
      <MessageModal
        isVisible={showSetCompleteModal}
        hideModal={() => setShowSetCompleteModal(false)}
        title={t.sets.set_complete_title}
        message={t.sets.set_complete_message}
        confirmText={t.general.got_it}
        confirmOnPress={() => {
          setShowSetCompleteModal(false)
        }}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        <LottieView
          style={{ width: '100%', maxWidth: 500 }}
          autoPlay
          loop
          resizeMode='cover'
          source={require('../assets/lotties/set_complete.json')}
        />
      </MessageModal>
      <MessageModal
        isVisible={showNextSetUnlockedModal}
        hideModal={() => setShowNextSetUnlockedModal(false)}
        title={t.sets.new_story_set_unlocked_title}
        message={t.sets.new_story_set_unlocked_message}
        confirmText={t.general.got_it}
        confirmOnPress={() => setShowNextSetUnlockedModal(false)}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        <LottieView
          style={{ width: '100%', maxWidth: 500 }}
          autoPlay
          loop
          resizeMode='cover'
          source={require('../assets/lotties/new_set_unlocked.json')}
        />
      </MessageModal>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
})

export default LessonsScreen
