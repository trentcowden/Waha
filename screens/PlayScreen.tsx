import { RouteProp } from '@react-navigation/native'
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import { Audio, Video } from 'expo-av'
import { AVPlaybackStatus } from 'expo-av/build/AV'
import * as FileSystem from 'expo-file-system'
import { useKeepAwake } from 'expo-keep-awake'
import LottieView from 'lottie-react-native'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import { StorySet } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import { Media, MediaSource } from '../classes/media'
import ChapterSelector from '../components/ChapterSelector'
import { SectionOffset } from '../components/LessonTextContent'
import PlaybackControls from '../components/PlaybackControls'
import PlayScreenSwiper from '../components/PlayScreenSwiper'
import Scrubber from '../components/Scrubber'
import VideoPlayer from '../components/VideoPlayer'
import WahaBackButton from '../components/WahaBackButton'
import {
  getFileSource,
  gutterSize,
  isInOfflineMode,
  isTablet,
  scaleMultiplier,
} from '../constants'
import { logCompleteLesson } from '../functions/analyticsFunctions'
import { info } from '../functions/languageDataFunctions'
import { lockPortrait } from '../functions/orientationFunctions'
import {
  Chapter,
  getLessonInfo,
  LessonType,
} from '../functions/setAndLessonDataFunctions'
import {
  checkForAlmostCompleteSet,
  checkForFullyCompleteSet,
} from '../functions/setProgressFunctions'
import CopyrightsModal from '../modals/CopyrightsModal'
import MessageModal from '../modals/MessageModal'
import ShareModal from '../modals/ShareModal'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import { downloadMedia, removeDownload } from '../redux/reducers/downloads'
import { addSet, toggleComplete } from '../redux/reducers/groups'
import {
  setHasUsedPlayScreen,
  setLessonCounter,
  setNumLessonsTilReview,
  setReviewTimeout,
} from '../redux/reducers/persistedPopups'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

type PlayScreenNavigationProp = StackNavigationProp<MainStackParams, 'Play'>
type PlayScreenRouteProp = RouteProp<MainStackParams, 'Play'>

interface Props {
  navigation: PlayScreenNavigationProp
  route: PlayScreenRouteProp
}

// Controls whether a piece of content in the middle area is visible or not.
const middleAreaVisibility = {
  HIDE: 0,
  SHOW: 1,
}

/**
 * A screen where the user listens to (or watches) the different parts of a lesson. Because of its size, this file is organized into some sections. The sections are as follows:
 * 1. STATE - The various state variables for this screen.
 * 2. SETUP - Functions related to setting up the play screen for the lesson, like setting the media sources and downloading necessary files.
 * 3. CHAPTER CHANGES / LOADING - Functions related to switching chapters and loading up the correct media.
 * 4. PLAYBACK STATUS UPDATES - Functions related to the onPlaybackStatusUpdate function which is called by the media with its current status. This is mostly used to handle when a chapter finishes.
 * 5. PLAYBACK CONTROL - Functions related to controlling the playback of the media, like playing, pausing, and skipping.
 * 6. DOWNLOADS - Functions related to checking the downloading/downloaded status of the lesson.
 * 7. PROGRESS UPDATING - Functions related to updating the progress of the lesson.
 * 8. MISC - A few small miscellaneous items.
 * @param {Object} thisLesson - The object for the lesson that the user has selected to do.
 * @param {Object} thisSet - The object for the set that thisLesson is a part of.
 * @param {boolean} isAudioAlreadyDownloaded - Whether this lesson has its Story audio file already downloaded or not.
 * @param {boolean} isVideoAlreadyDownloaded - Whether this lesson has its Training video file already downloaded or not.
 * @param {boolean} isAlreadyDownloading - Whether any content for this lesson is currently downloading.
 */
const PlayScreen: FC<Props> = ({
  navigation: { goBack, setOptions, isFocused },
  route: {
    params: {
      thisLesson,
      thisSet,
      isAudioAlreadyDownloaded,
      isVideoAlreadyDownloaded,
      isAlreadyDownloading,
      lessonType,
    },
  },
}) => {
  // Redux state/dispatch.
  const activeGroup = selector((state) => activeGroupSelector(state))
  const activeDatabase = selector((state) => activeDatabaseSelector(state))
  const downloads = selector((state) => state.downloads)
  const isRTL = info(activeGroup.language).isRTL
  const t = getTranslations(activeGroup.language)
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const isConnected = selector((state) => state.network.isConnected)
  const hasUsedPlayScreen = selector(
    (state) => state.persistedPopups.hasUsedPlayScreen
  )
  const reviewTimeout = selector((state) => state.persistedPopups.reviewTimeout)
  const lessonCounter = selector((state) => state.persistedPopups.lessonCounter)
  const numLessonsTilReview = selector(
    (state) => state.persistedPopups.numLessonsTilReview
  )
  const dispatch = useAppDispatch()

  /*
    STATE
  */

  /** Keeps track of the potential sources for every chapter. */
  type Sources = Record<string, MediaSource>
  const [potentialSources] = useState<Sources>({
    fellowshipLocal: getFileSource(
      `${activeGroup.language}-${thisLesson.fellowshipType}.mp3`
    ),
    applicationLocal: getFileSource(
      `${activeGroup.language}-${thisLesson.applicationType}.mp3`
    ),
    storyLocal: getFileSource(`${thisLesson.id}.mp3`),
    storyStream: { uri: getLessonInfo('audioSource', thisLesson.id) },
    storyDummy: getFileSource(`${activeGroup.language}-dummy-story.mp3`),
    trainingLocal: getFileSource(`${thisLesson.id}v.mp4`),
    trainingStream: { uri: getLessonInfo('videoSource', thisLesson.id) },
  })

  /** State for the audio and video refs. */
  const videoRef = useRef<Video>(null)

  const [media] = useState(new Media(new Audio.Sound()))

  /** Stores the length of the current media file in ms. */
  const [mediaLength, setMediaLength] = useState<number>()

  /** Keeps track of whether the media file is loaded. */
  const [isMediaLoaded, setIsMediaLoaded] = useState(false)

  /** Keeps track of whether the media file is currently playing or paused. */
  const [isMediaPlaying, setIsMediaPlaying] = useState(false)

  /** Keeps track of whether audio should automatically start playing upon switching chapters. */
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)

  /** Keeps track of the current position of the seeker in ms. */
  const [mediaProgress, setMediaProgress] = useState(0)

  /** Keeps track of whether the seeker should update every second. Note: only time it shouldn't is during seeking, skipping, or loading a new chapter. */
  const shouldThumbUpdate = useRef(false)

  /** Keeps track of the current fullscreen status for videos. */
  const fullscreenStatus = useRef(Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS)

  /** Keeps track of the currently playing chapter. Options are 'fellowship', 'story', 'training', or 'application'. */
  const [activeChapter, setActiveChapter] = useState<Chapter>()

  /** Keeps track of the chapter that should trigger a lesson as complete when getting 50% or more through it. */
  const [completionChapter, setCompletionChapter] = useState<Chapter>()

  /** Keeps track of the sources for the various chapters used to load their audio. */
  const [chapterSources, setChapterSources] = useState<Object>()

  /** Animation states. */
  const [playFeedbackOpacity] = useState(new Animated.Value(0))
  const [playFeedbackZIndex, setPlayFeedbackZIndex] = useState(0)
  const [videoPlayerOpacity] = useState(new Animated.Value(0))
  const [playScreenSwiperOpacity] = useState(new Animated.Value(0))

  /** Ref for the PlayScreenSwiper component. */
  const playScreenSwiperRef = useRef<PagerView>(null)

  /** Keeps track of whether the various modals are visible. */
  const [showShareLessonModal, setShowShareLessonModal] = useState(false)
  const [showSetCompleteModal, setShowSetCompleteModal] = useState(false)
  const [showNextSetUnlockedModal, setShowNextSetUnlockedModal] =
    useState(false)
  const [showCopyrightsModal, setShowCopyrightsModal] = useState(false)

  /** Keeps track of whether the audio and video files for this lesson are downloaded. */
  const [isAudioDownloaded, setIsAudioDownloaded] = useState(
    isAudioAlreadyDownloaded
  )
  const [isVideoDownloaded, setIsVideoDownloaded] = useState(
    isVideoAlreadyDownloaded
  )

  /** Keeps track of whether the audio and video files for this lesson are currently downloading. */
  const isAudioDownloading = useRef(false)
  const isVideoDownloading = useRef(false)

  /** Ref for the lesson text content ScrollView. */
  const lessonTextContentRef = useRef<ScrollView>(null)

  /** Keeps track of the scroll positions of the different lesson sections. Includes END at the beginning because we need an upper bound to make checking the positions possible. */
  const sectionOffsets = useRef<SectionOffset[]>([
    {
      title: 'END',
      globalOffset: 1000000,
    },
  ])

  /** Keeps track of whether this lesson is complete or not. */
  const isThisLessonComplete = useRef(
    activeGroup.addedSets
      .filter((set) => set.id === thisSet.id)[0]
      .progress.includes(getLessonInfo('index', thisLesson.id))
  )

  /** Keeps track of whether this lesson was just completed. */
  const justCompleted = useRef(false)

  /** useEffect function that updates the added set local state whenever it changes in redux. */
  useEffect(() => {
    setOptions(getNavOptions())
  }, [activeGroup.addedSets.filter((set) => set.id === thisSet.id)[0]])

  /** Sets the navigation options for this screen. */
  const getNavOptions = (): StackNavigationOptions => ({
    headerTitle: () => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View>
          {isThisLessonComplete.current && (
            <Icon
              name='check-outline'
              size={20}
              color={colors(isDark).secondaryText}
            />
          )}
        </View>
        <Text
          style={{
            ...type(
              activeGroup.language,
              'h3',
              'Bold',
              'center',
              colors(isDark).secondaryText
            ),
            marginHorizontal: 2,
          }}
        >
          {getLessonInfo('subtitle', thisLesson.id)}
        </Text>
      </View>
    ),
    headerRight: isRTL
      ? () => (
          <WahaBackButton
            onPress={onBackButtonPress}
            isRTL={isRTL}
            isDark={isDark}
          />
        )
      : () => (
          <TouchableOpacity
            style={{ marginHorizontal: gutterSize }}
            onPress={() => setShowShareLessonModal(true)}
          >
            <Icon
              name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
              size={32 * scaleMultiplier}
              color={colors(isDark).icons}
            />
          </TouchableOpacity>
        ),
    headerLeft: isRTL
      ? () => (
          <TouchableOpacity
            style={{ marginHorizontal: gutterSize }}
            onPress={() => setShowShareLessonModal(true)}
          >
            <Icon
              name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
              size={32 * scaleMultiplier}
              color={colors(isDark).icons}
            />
          </TouchableOpacity>
        )
      : () => (
          <WahaBackButton
            onPress={onBackButtonPress}
            isRTL={isRTL}
            isDark={isDark}
          />
        ),
  })

  /*
    SETUP
  */

  /** useEffect function that acts as a constructor to set the sources for the various chapters and download any necessary audio files. */
  useEffect(() => {
    // If this is the first time on the play screen, we'll want to request an app review soon.
    if (
      (!hasUsedPlayScreen || hasUsedPlayScreen === null) &&
      reviewTimeout === null
    ) {
      dispatch(setHasUsedPlayScreen({ toSet: true }))
      dispatch(setReviewTimeout({ timeout: Date.now() + 1800000 }))
    }

    // Start downloading any necessary lesson files.
    if (isConnected) downloadLessonFiles()

    // Set the sources for the various chapters.
    setSources()

    // Mark audiobook and book lessons as complete as soon as you enter into the play screen.
    if (lessonType.includes('BookText') && !isThisLessonComplete.current)
      markLessonAsComplete()

    // Update the navigation options.
    setOptions(getNavOptions())
  }, [])

  /** useEffect function that adds video to the media object if this lesson has video. */
  useEffect(() => {
    if (videoRef.current) media.addVideo(videoRef.current)
  }, [videoRef.current])

  /** Downloads any necessary files for this lesson if they aren't downloaded/downloading already. */
  const downloadLessonFiles = () => {
    // Download audio for the Story chapter if necessary.
    if (
      lessonType === LessonType.STANDARD_DBS ||
      lessonType === LessonType.STANDARD_DMC
    )
      if (!isAudioDownloaded && !isAlreadyDownloading)
        dispatch(
          downloadMedia(
            'audio',
            thisLesson.id,
            getLessonInfo('audioSource', thisLesson.id)
          )
        )

    // Download video for the Training chapter if necessary.
    if (lessonType === LessonType.STANDARD_DMC)
      if (!isVideoDownloaded && !isAlreadyDownloading)
        dispatch(
          downloadMedia(
            'video',
            thisLesson.id,
            getLessonInfo('videoSource', thisLesson.id)
          )
        )
  }

  /** Sets all the source state files appropriately based on the lesson type and what is downloaded. */
  const setSources = () => {
    var fellowshipSource
    var storySource
    var trainingSource
    var applicationSource

    switch (lessonType) {
      case LessonType.STANDARD_DBS:
        fellowshipSource = potentialSources.fellowshipLocal
        storySource = potentialSources.storyLocal
        trainingSource = null
        applicationSource = potentialSources.applicationLocal
        break
      case LessonType.STANDARD_DMC:
        fellowshipSource = potentialSources.fellowshipLocal
        storySource = potentialSources.storyLocal
        trainingSource = potentialSources.trainingLocal
        applicationSource = potentialSources.applicationLocal
        break
      case LessonType.VIDEO_ONLY:
        fellowshipSource = null
        storySource = null
        trainingSource = isVideoAlreadyDownloaded
          ? potentialSources.trainingLocal
          : potentialSources.trainingStream
        applicationSource = null
        break
      case LessonType.STANDARD_NO_AUDIO:
        fellowshipSource = potentialSources.fellowshipLocal
        storySource = potentialSources.storyDummy
        trainingSource = null
        applicationSource = potentialSources.applicationLocal
        break
      case LessonType.AUDIOBOOK:
        fellowshipSource = null
        storySource = isAudioAlreadyDownloaded
          ? potentialSources.storyLocal
          : potentialSources.storyStream

        trainingSource = null
        applicationSource = null
        break
    }

    setChapterSources({
      [Chapter.FELLOWSHIP]: fellowshipSource,
      [Chapter.STORY]: storySource,
      [Chapter.TRAINING]: trainingSource,
      [Chapter.APPLICATION]: applicationSource,
    })
  }

  /*
    CHAPTER CHANGES / LOADING
  */

  /** useEffect function that sets our starting chapter as soon as the chapter sources are set. */
  useEffect(() => {
    chapterSources && setStartingChapter()
  }, [chapterSources])

  /** Sets the starting chapter and completion chapter for the lesson. */
  const setStartingChapter = () => {
    switch (lessonType) {
      // For standard lessons, we always start at Fellowship.
      case LessonType.STANDARD_DBS:
      case LessonType.STANDARD_DMC:
      case LessonType.STANDARD_NO_AUDIO:
        setActiveChapter(Chapter.FELLOWSHIP)
        setCompletionChapter(Chapter.APPLICATION)
        break
      // For video-only lessons, start on Training which is the chapter that plays the video.
      case LessonType.VIDEO_ONLY:
        setActiveChapter(Chapter.TRAINING)
        setCompletionChapter(Chapter.TRAINING)
        break
      // For audiobook lessons, start on Story which contains the audio for the audiobook.
      case LessonType.AUDIOBOOK:
        setActiveChapter(Chapter.STORY)
        setCompletionChapter(Chapter.STORY)
        break
    }
  }

  /**
   * Updates the active chapter.
   * @param {number} chapter - The chapter to switch to.
   */
  const changeChapter = async (chapter: Chapter) => {
    if (!isMediaLoaded) return
    /* Pause audio or video before changing chapters. This is here because of some jank android-only error where the onPlaybackStatusUpdate function was being called continuously when switching from the Training chapter to a different chapter, even when media wasn't loaded, which caused the app to constantly switch between being loaded and not loaded. Pausing the audio or video before switching fixes this issue. */
    if (activeChapter && isMediaPlaying && isMediaLoaded) {
      // if (activeChapter === chapters.TRAINING) videoRef.current.pauseAsync()
      // else audioRef.current.pauseAsync()
      media.pause(activeChapter)
    }

    // Switch to the new chapter if it's different from the currently active chapter and the current media is loaded.
    if (chapter !== activeChapter) setActiveChapter(chapter)
    // If we're "changing" to our currently active chapter, start it over at the beginning.
    else playFromLocation(0)

    // Scroll the text to the appropriate position.
    if (
      lessonTextContentRef.current !== null &&
      thisLesson.scripture &&
      sectionOffsets.current.length === thisLesson.scripture.length + 3
    ) {
      if (chapter === Chapter.FELLOWSHIP)
        lessonTextContentRef.current.scrollTo({
          y: sectionOffsets.current[0].globalOffset,
          animated: true,
        })
      else if (chapter === Chapter.STORY)
        lessonTextContentRef.current.scrollTo({
          y: sectionOffsets.current[1].globalOffset + 40 * scaleMultiplier,
          animated: true,
        })
      else if (chapter === Chapter.APPLICATION)
        lessonTextContentRef.current.scrollTo({
          y:
            sectionOffsets.current[sectionOffsets.current.length - 2]
              .globalOffset +
            40 * scaleMultiplier,
          animated: true,
        })
    }

    // If this lesson doesn't have any Story audio, swipe over to the text once we get to the Story chapter so the user can still read it.
    if (
      playScreenSwiperRef.current &&
      chapter === Chapter.STORY &&
      !thisLesson.hasAudio
    )
      playScreenSwiperRef.current.setPage(isRTL ? 0 : 1)
  }

  /** useEffect function that calls the onChapterChange function whenever the active chapter changes.  */
  useEffect(() => {
    activeChapter && onChapterChange()
  }, [activeChapter])

  /** Handles the changing of the active chapter, including loading the new media. */
  const onChapterChange = async () => {
    // Don't update the thumb while we're changing chapters and loading new media.
    shouldThumbUpdate.current = false

    // Unload any existing media.
    media.unload()

    // Set isMediaLoaded to be false.
    setIsMediaLoaded(false)

    // Set our thumb position back to the start.
    setMediaProgress(0)

    // If we're switching to anything but the Training chapter, fade in the <AlbumArtSwiper/> and fade out the <VideoPlayer/>. If the <AlbumArtSwiper/> is already present, this animation does nothing.
    if (activeChapter !== Chapter.TRAINING) {
      !isTablet && lockPortrait()
      Animated.parallel([
        Animated.timing(playScreenSwiperOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(videoPlayerOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
    // If we're switching to the Training chapter, fade out the <AlbumArtSwiper /> and fade in the <VideoPlayer />.
    else {
      Animated.parallel([
        Animated.timing(playScreenSwiperOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(videoPlayerOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }

    // Finally, if we have a valid source for the media, load it up.
    if (chapterSources && activeChapter && chapterSources[activeChapter])
      loadMedia(chapterSources[activeChapter])
  }

  /**
   * Loads audio or video for playing.
   * @param source - The source URI of the media to load.
   */
  const loadMedia = async (source: MediaSource) => {
    media
      .load(
        source,
        shouldAutoPlay,
        activeChapter ? activeChapter : Chapter.FELLOWSHIP
      )
      .then((playbackStatus: AVPlaybackStatus) => {
        // Set the length of this media. Used for the <Scrubber/>.
        if (playbackStatus.isLoaded) {
          setMediaLength(playbackStatus.durationMillis)

          // Start updating the thumb again.
          shouldThumbUpdate.current = true

          // Sync up isMediaPlaying with the play status of this media. Depends on shouldAutoPlay.
          if (shouldAutoPlay) setIsMediaPlaying(true)
          else setIsMediaPlaying(false)
        } else if (playbackStatus.error) console.log(playbackStatus.error)
      })

    // Auto play starts off false but after the first chapter should always be true, so after loading, we always set it to true.
    if (!shouldAutoPlay) setShouldAutoPlay(true)
  }

  /*
    PLAYBACK STATUS UPDATES
  */

  /**
   * Acts as an in-between function to make sure that the playback statuses of audio and video aren't overwriting each other.
   */
  const onAudioPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (activeChapter !== Chapter.TRAINING)
      onPlaybackStatusUpdate(playbackStatus)
  }

  /**
   * Acts as an in-between function to make sure that the playback statuses of audio and video aren't overwriting each other.
   */
  const onVideoPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (activeChapter === Chapter.TRAINING)
      onPlaybackStatusUpdate(playbackStatus)
  }

  /**
   * Updates on every api call to the audio object as well as every second. Covers the automatic switch of one chapter to the next and marking a lesson as complete at the finish of the last chapter.
   * @param {Object} playbackStatus - The playback status object passed from the media reference. Includes information like load status, progress, play status, and more.
   */
  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    // Set isLoaded state to true once media loads.
    if (playbackStatus.isLoaded) {
      setIsMediaLoaded(true)

      // If we should update the thumb, update it to the newest value.
      if (shouldThumbUpdate.current && playbackStatus.positionMillis)
        setMediaProgress(playbackStatus.positionMillis)

      // Mark a lesson as complete if we get at least halfway through its completion chapter and it's not already complete.
      if (
        playbackStatus.durationMillis &&
        playbackStatus.positionMillis / playbackStatus.durationMillis > 0.5 &&
        !isThisLessonComplete.current &&
        activeChapter === completionChapter
      )
        markLessonAsComplete()

      // Keep the isPlaying state in sync with the playback status while in fullscreen mode.
      if (
        activeChapter === Chapter.TRAINING &&
        fullscreenStatus.current === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
      ) {
        if (playbackStatus.isPlaying) setIsMediaPlaying(true)
        else if (!playbackStatus.isPlaying) setIsMediaPlaying(false)
      }

      // On a chapter finish, call the appropriate handler function.
      if (playbackStatus.didJustFinish) {
        switch (activeChapter) {
          case Chapter.FELLOWSHIP:
            onFellowshipFinish()
            break
          case Chapter.STORY:
            onStoryFinish()
            break
          case Chapter.TRAINING:
            onTrainingFinish()
            break
          case Chapter.APPLICATION:
            onApplicationFinish()
            break
        }
      }
    }
  }

  /** useEffect function that refreshes the onPlaybackStatusUpdate function whenever the active chapter, loaded state, and playing state change, since those are used throughout the chapter finish handler functions below. */
  useEffect(() => {
    media.setAudioOnStatusUpdate(onAudioPlaybackStatusUpdate)
  }, [activeChapter, isMediaLoaded, isMediaPlaying])

  /** Handles the finishing of the Fellowship chapter. */
  const onFellowshipFinish = () => {
    if (playScreenSwiperRef.current && lessonTextContentRef.current) {
      // If the lesson has no story audio, change to the Story chapter and swipe over to the text so the user can still read it.
      if (!thisLesson.hasAudio) {
        changeChapter(Chapter.STORY)
        playScreenSwiperRef.current.setPage(isRTL ? 0 : 1)
      } // If a Story chapter is still downloading or it isn't downloaded and can't start downloading, swipe to the text so the user can read the text while they're waiting for it to download.
      else if (isAudioDownloading.current)
        playScreenSwiperRef.current.setPage(isRTL ? 0 : 1)
      else if (!isAudioDownloaded && !isConnected) {
        playScreenSwiperRef.current.setPage(isRTL ? 0 : 1)
        lessonTextContentRef.current.scrollTo({
          y: sectionOffsets.current[1].globalOffset + 40 * scaleMultiplier,
          animated: true,
        })
      }
      // Otherwise, just change to the Story chapter.
      else changeChapter(Chapter.STORY)
    }
  }

  /** Handles the finishing of the Story chapter. */
  const onStoryFinish = () => {
    switch (lessonType) {
      // If we're in a standard DBS lesson, simply change to the Application chapter after a brief delay.
      case LessonType.STANDARD_DBS:
        setTimeout(() => changeChapter(Chapter.APPLICATION), 1000)
        break
      // If we're in a standard DMC lesson, there's a Training chapter between Story and Application, so switch to that after a brief delay.
      case LessonType.STANDARD_DMC:
        if (!downloads[thisLesson.id + 'v'])
          setTimeout(() => changeChapter(Chapter.TRAINING), 1000)
        break
    }
  }

  /** Handles the finishing of the Training chapter. */
  const onTrainingFinish = () => {
    // If we're in fullscreen, lock back to portrait orientation and close fullscreen.
    if (
      fullscreenStatus.current === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT
    ) {
      !isTablet && lockPortrait()
      media.closeFullscreen()
    }
    switch (lessonType) {
      // If we're in a standard DMC lesson, switch to the Application chapter after a short delay.
      case LessonType.STANDARD_DMC:
        setTimeout(() => changeChapter(Chapter.APPLICATION), 500)
        break
    }
  }

  /** Handles the finishing of the Application chapter. */
  const onApplicationFinish = () => {}

  /*
    PLAYBACK CONTROL
  */

  /** Plays the audio if it's currently paused and pauses the audio if it's currently playing. Also animates a play status feedback indicator over the album art. */
  const playHandler = () => {
    // If we're still loading, don't try and do anything with the media.
    if (!isMediaLoaded) return

    // Switch play button over to the opposite of its current state.
    setIsMediaPlaying((currentStatus) => !currentStatus)

    // Animate the play indicator that appears over the album art.
    setPlayFeedbackZIndex(2)
    Animated.sequence([
      Animated.timing(playFeedbackOpacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(playFeedbackOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setPlayFeedbackZIndex(0))

    isMediaPlaying ? media.pause(activeChapter) : media.play(activeChapter)
  }

  /**
   * Plays media from a specified location.
   * @param value - The location to start playing from.
   */
  const playFromLocation = (value: number) => {
    // If we're still loading, don't try and do anything with the media.
    if (!isMediaLoaded) return

    shouldThumbUpdate.current = false
    setMediaProgress(value)

    media
      .playFromLocation(value, isMediaPlaying, activeChapter)
      .then((playbackStatus: AVPlaybackStatus) => {
        if (playbackStatus.isLoaded) shouldThumbUpdate.current = true
      })
  }

  /*
    DOWNLOADS
  */

  /** useEffect function that checks a lesson's downloaded/downloading status. */
  useEffect(() => {
    // Checks whether a lesson's audio or video is currently downloading.
    if (downloads[thisLesson.id]) isAudioDownloading.current = true
    else isAudioDownloading.current = false
    if (downloads[thisLesson.id + 'v']) isVideoDownloading.current = true
    else isVideoDownloading.current = false

    // Checks whether a lesson's audio or video is downloaded.
    if (FileSystem.documentDirectory)
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
        (contents) => {
          if (contents.includes(thisLesson.id + '.mp3'))
            setIsAudioDownloaded(true)
          if (contents.includes(thisLesson.id + 'v.mp4')) {
            setIsVideoDownloaded(true)
          }
        }
      )
  }, [Object.keys(downloads).length])

  /** useEffect function that removes a download record from the download tracker redux object once it's finished. Removes audio and video download records when necessary. */
  useEffect(() => {
    switch (lessonType) {
      case LessonType.STANDARD_DBS:
        if (
          isAudioDownloading.current &&
          downloads[thisLesson.id].progress === 1
        )
          dispatch(removeDownload({ lessonID: thisLesson.id }))
        break
      case LessonType.STANDARD_DMC:
        if (
          isAudioDownloading.current &&
          isVideoDownloading.current &&
          downloads[thisLesson.id].progress === 1 &&
          downloads[thisLesson.id + 'v'].progress === 1
        ) {
          dispatch(removeDownload({ lessonID: thisLesson.id }))
          dispatch(removeDownload({ lessonID: thisLesson.id + 'v' }))
        }
        break
      case LessonType.VIDEO_ONLY:
        if (
          isVideoDownloading.current &&
          downloads[thisLesson.id + 'v'].progress === 1
        )
          dispatch(removeDownload({ lessonID: thisLesson.id + 'v' }))
        break
    }
  }, [downloads[thisLesson.id], downloads[thisLesson.id + 'v']])

  /*
    MISC
  */

  /** Marks a lesson as complete and handles any other logic related to that. */
  const markLessonAsComplete = () => {
    // Set isThisLessonComplete to true so that we know not to mark is as complete again.
    isThisLessonComplete.current = true

    // Set the justCompleted state to true so we know to show any relevant modals upon exiting the play screen.
    justCompleted.current = true

    // Toggle the complete status of the lesson.
    dispatch(
      toggleComplete(
        activeGroup.name,
        thisSet,
        getLessonInfo('index', thisLesson.id)
      )
    )

    // Track analytics.
    logCompleteLesson(thisLesson, activeGroup.id)

    dispatch(setLessonCounter({ counter: lessonCounter + 1 }))

    if (reviewTimeout === null && lessonCounter >= numLessonsTilReview - 1) {
      dispatch(setReviewTimeout({ timeout: Date.now() + 1800000 }))
      dispatch(setLessonCounter({ counter: 0 }))
      if (numLessonsTilReview === 2)
        dispatch(setNumLessonsTilReview({ numLessons: 5 }))
      else if (numLessonsTilReview === 5)
        dispatch(setNumLessonsTilReview({ numLessons: 10 }))
    }
  }

  /**
   * Gets called when the user pressed the back button. Shows any necessary modals before going back as well.
   */
  const onBackButtonPress = async () => {
    // Lock to portrait orientation.
    !isTablet && lockPortrait()

    // Unload all the media.
    media.unload()
    media.cleanup()

    // Here is where any modals that appear after a lesson is completed for the first time should appear.
    if (justCompleted.current) {
      if (
        // Check to see if we should automatically add the next Story Set if this set is now 85% or more of the way completed.
        !checkForAlmostCompleteSet(
          thisSet,
          activeGroup.addedSets.filter((set) => set.id === thisSet.id)[0],
          activeGroup,
          activeDatabase,
          (groupName: string, groupID: number, set: StorySet) =>
            dispatch(addSet({ groupName, groupID, set })),
          setShowNextSetUnlockedModal
        ) &&
        // If completing this lesson completes the whole set, show a celebratory modal.
        !checkForFullyCompleteSet(
          thisSet,
          activeGroup.addedSets.filter((set) => set.id === thisSet.id)[0],
          setShowSetCompleteModal
        )
      )
        goBack()
    } else goBack()
  }

  /** Keeps the screen from auto-dimming or auto-locking. */
  useKeepAwake()

  /** useEffect function that automatically pauses the media when the play screen becomes unfocused. */
  useEffect(() => {
    if (isMediaPlaying) playHandler()
  }, [isFocused()])

  /*
    RENDER
  */

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      <View style={styles.middleAreaContainer}>
        {lessonType !== LessonType.VIDEO_ONLY && (
          <Animated.View
            style={{
              // Width/height instead of flex: 1 because of a PagerView bug.
              width: '100%',
              height: '100%',
              position: 'absolute',
              opacity:
                lessonType === LessonType.BOOK ? 1 : playScreenSwiperOpacity,
              zIndex:
                activeChapter === Chapter.TRAINING
                  ? middleAreaVisibility.HIDE
                  : middleAreaVisibility.SHOW,
            }}
          >
            <PlayScreenSwiper
              playScreenSwiperRef={playScreenSwiperRef}
              lessonTextContentRef={lessonTextContentRef}
              iconName={thisSet.iconName}
              thisLesson={thisLesson}
              lessonType={lessonType}
              playHandler={playHandler}
              playFeedbackOpacity={playFeedbackOpacity}
              playFeedbackZIndex={playFeedbackZIndex}
              isMediaPlaying={isMediaPlaying}
              sectionOffsets={sectionOffsets}
              markLessonAsComplete={markLessonAsComplete}
              isThisLessonComplete={isThisLessonComplete}
              setShowCopyrightsModal={setShowCopyrightsModal}
              activeGroup={activeGroup}
              activeDatabase={activeDatabase}
              isDark={isDark}
              t={t}
              isRTL={isRTL}
            />
          </Animated.View>
        )}
        {lessonType.includes('Video') && (
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              opacity: videoPlayerOpacity,
              zIndex:
                activeChapter === Chapter.TRAINING
                  ? middleAreaVisibility.SHOW
                  : middleAreaVisibility.HIDE,
            }}
          >
            <VideoPlayer
              videoRef={videoRef}
              media={media}
              onVideoPlaybackStatusUpdate={onVideoPlaybackStatusUpdate}
              isMediaPlaying={isMediaPlaying}
              setIsMediaPlaying={setIsMediaPlaying}
              fullscreenStatus={fullscreenStatus}
              activeChapter={activeChapter ? activeChapter : Chapter.FELLOWSHIP}
              isMediaLoaded={isMediaLoaded}
              isDark={isDark}
              isRTL={isRTL}
            />
          </Animated.View>
        )}
      </View>
      {/* For any lessons except book lessons, show some audio controls. */}
      {lessonType !== LessonType.BOOK && (
        <SafeAreaView>
          {/* Only lessons that have questions have separate chapters and require the chapter selector. */}
          {lessonType.includes('Questions') && (
            <ChapterSelector
              activeChapter={activeChapter ? activeChapter : Chapter.FELLOWSHIP}
              changeChapter={changeChapter}
              isAudioDownloaded={isInOfflineMode ? true : isAudioDownloaded}
              isVideoDownloaded={isInOfflineMode ? true : isVideoDownloaded}
              lessonType={lessonType}
              lessonID={thisLesson.id}
              isDark={isDark}
              activeGroup={activeGroup}
              t={t}
              downloads={downloads}
              isConnected={isConnected}
              isRTL={isRTL}
            />
          )}
          <Scrubber
            playFromLocation={playFromLocation}
            shouldThumbUpdate={shouldThumbUpdate}
            mediaLength={mediaLength ? mediaLength : 0}
            mediaProgress={mediaProgress}
            isDark={isDark}
            isRTL={isRTL}
          />
          <PlaybackControls
            isMediaPlaying={isMediaPlaying}
            isMediaLoaded={isMediaLoaded}
            playHandler={playHandler}
            mediaProgress={mediaProgress}
            playFromLocation={playFromLocation}
            isDark={isDark}
            activeGroup={activeGroup}
            isRTL={isRTL}
          />
        </SafeAreaView>
      )}
      {/* Modals */}
      <ShareModal
        isVisible={showShareLessonModal}
        hideModal={() => setShowShareLessonModal(false)}
        closeText={t.general.close}
        lesson={thisLesson}
        lessonType={lessonType}
        t={t}
        downloads={downloads}
        activeGroup={activeGroup}
        isDark={isDark}
        isRTL={isRTL}
      />
      <MessageModal
        isVisible={showSetCompleteModal}
        hideModal={() => {
          setShowSetCompleteModal(false)
          goBack()
        }}
        title={t.sets.set_complete_title}
        message={t.sets.set_complete_message}
        confirmText={t.general.got_it}
        confirmOnPress={() => {
          setShowSetCompleteModal(false)
          goBack()
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
        hideModal={() => {
          setShowNextSetUnlockedModal(false)
          goBack()
        }}
        title={t.sets.new_story_set_unlocked_title}
        message={t.sets.new_story_set_unlocked_message}
        confirmText={t.general.got_it}
        confirmOnPress={() => {
          setShowNextSetUnlockedModal(false)
          goBack()
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
          source={require('../assets/lotties/new_set_unlocked.json')}
        />
      </MessageModal>
      <CopyrightsModal
        isVisible={showCopyrightsModal}
        hideModal={() => setShowCopyrightsModal(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  middleAreaContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PlayScreen
