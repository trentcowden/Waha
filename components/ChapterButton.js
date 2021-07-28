import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import {
  chapterButtonModes,
  chapters,
  isTablet,
  lessonTypes,
  scaleMultiplier
} from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/**
 * Pressable component for a single chapter button used in ChapterSeparator. Has a variety of possible styles based on its current mode.
 * @param {number} chapter - The chapter to display on this button. See chapters in constants.js.
 * @param {number} activeChapter - The currently active chapter of the current lesson. See chapters in constants.js.
 * @param {Function} changeChapter - Changes the currently active chapter.
 * @param {string} lessonType - The type of the current lesson. See lessonTypes in constants.js.
 * @param {string} lessonID - The ID of the current lesson. Only needed for the Story and Training chapters.
 * @param {boolean} isAudioDownloaded - Whether this lesson has its audio file downloaded or not. Only needed for the Story chapter button.
 * @param {boolean} isVideoDownloaded - Whether this lesson has its video file downloaded or not. Only needed for the Training chapter button.
 */
const ChapterButton = ({
  // Props passed from a parent component.
  chapter,
  activeChapter,
  changeChapter,
  lessonType,
  lessonID = null,
  isAudioDownloaded = false,
  isVideoDownloaded = false,
  activeGroup,
  t,
  isDark,
  downloads,
  isConnected
}) => {
  /** Keeps track of the mode of this chapter button. */
  const [mode, setMode] = useState(chapterButtonModes.INACTIVE)

  /** Keeps track of the icon name, button style, text style, and icon color for the chapter button. Updates whenever the mode changes. */
  const [iconName, setIconName] = useState('')
  const [extraButtonStyle, setExtraButtonStyle] = useState({
    borderColor: colors(isDark).bg3,
    backgroundColor: colors(isDark).bg2
  })
  const [textStyle, setTextStyle] = useState({
    color: colors(isDark, activeGroup.language).accent
  })
  const [iconColor, setIconColor] = useState(
    colors(isDark, activeGroup.language).accent
  )

  /** Keeps track of the download progress for the piece of media associated with the chapter button's chapter. */
  const [downloadProgress, setDownloadProgress] = useState(0)

  // The names of the chapters. 'Filler' is there to line up this array with the chapters enum since the enum starts at 1.
  const chapterNames = [
    'Filler',
    t.play && t.play.fellowship,
    t.play && t.play.story,
    t.play && t.play.training,
    t.play && t.play.application
  ]

  // The default text style.
  const defaultTextStyle = type(
    activeGroup.language,
    'p',
    'Bold',
    'center',
    colors(isDark, activeGroup.language).accent
  )

  // Whenever the active chapter or the user's internet connection status changes, get the most updated mode.
  useEffect(() => {
    setChapterButtonMode()
  }, [activeChapter, isConnected])

  // Also get the most updated mode whenever the download progress changes for this lesson.
  useEffect(() => {
    if (chapter === chapters.STORY || chapter === chapters.TRAINING)
      setChapterButtonMode()
  }, [downloads[lessonID], downloads[lessonID + 'v']])

  // Every time the mode changes, reset the styles for the button.
  useEffect(() => {
    setStyles()
  }, [mode])

  /** Sets the mode for this chapter button. */
  const setChapterButtonMode = () => {
    switch (chapter) {
      case chapters.FELLOWSHIP:
        if (activeChapter === chapters.FELLOWSHIP)
          setMode(chapterButtonModes.ACTIVE)
        // Because the active chapter and chapter are stored as numbers, we can check if the active chapter is bigger than the chapter for this button to see if it's already been completed.
        else if (activeChapter > chapter) setMode(chapterButtonModes.COMPLETE)
        else setMode(chapterButtonModes.INCOMPLETE)
        break
      case chapters.STORY:
        if (
          (lessonType === lessonTypes.STANDARD_DBS ||
            lessonType === lessonTypes.STANDARD_DMC) &&
          !isConnected &&
          !isAudioDownloaded
        )
          setMode(chapterButtonModes.DISABLED)
        else if (downloads[lessonID] && downloads[lessonID].progress < 1) {
          setDownloadProgress(downloads[lessonID].progress * 100)
          setMode(chapterButtonModes.DOWNLOADING)
        } else if (activeChapter === chapters.STORY)
          setMode(chapterButtonModes.ACTIVE)
        else if (activeChapter > chapter) setMode(chapterButtonModes.COMPLETE)
        else setMode(chapterButtonModes.INCOMPLETE)
        break
      case chapters.TRAINING:
        if (!isConnected && !isVideoDownloaded)
          setMode(chapterButtonModes.DISABLED)
        else if (
          downloads[lessonID + 'v'] &&
          downloads[lessonID + 'v'].progress < 1
        ) {
          setDownloadProgress(downloads[lessonID + 'v'].progress * 100)
          setMode(chapterButtonModes.DOWNLOADING)
        } else if (activeChapter === chapters.TRAINING)
          setMode(chapterButtonModes.ACTIVE)
        else if (activeChapter > chapter) setMode(chapterButtonModes.COMPLETE)
        else setMode(chapterButtonModes.INCOMPLETE)
        break
      case chapters.APPLICATION:
        if (activeChapter === chapters.APPLICATION)
          setMode(chapterButtonModes.ACTIVE)
        else if (activeChapter > chapter) setMode(chapterButtonModes.COMPLETE)
        else setMode(chapterButtonModes.INCOMPLETE)
        break
    }
  }

  /** Sets the various style states based on the current mode. */
  const setStyles = () => {
    switch (mode) {
      case chapterButtonModes.ACTIVE:
        setExtraButtonStyle({
          backgroundColor: colors(isDark, activeGroup.language).accent,
          borderColor: colors(isDark, activeGroup.language).accent
        })
        setTextStyle({ color: colors(isDark).textOnColor })
        setIconColor(colors(isDark).bg4)
        // Slight adjustment if the lesson contains a training chapter since that will make the Application need the '4' label instead of '3'.
        if (lessonType.includes('Video') && chapter === chapters.APPLICATION)
          setIconName('number-4-filled')
        else if (
          !lessonType.includes('Video') &&
          chapter === chapters.APPLICATION
        )
          setIconName('number-3-filled')
        else setIconName(`number-${chapter}-filled`)
        break
      case chapterButtonModes.INCOMPLETE:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2
        })
        setTextStyle({
          color: isDark
            ? colors(isDark).icons
            : colors(isDark, activeGroup.language).accent
        })
        setIconColor(
          isDark
            ? colors(isDark).icons
            : colors(isDark, activeGroup.language).accent
        )
        // Slight adjustment if the lesson contains a training chapter since that will make the Application need the '4' label instead of '3'. Another adjustment is that if the chapter is behind the active chapter, the icon is a check mark to show that it's been completed.
        if (lessonType.includes('Video') && chapter === chapters.APPLICATION)
          setIconName('number-4-filled')
        else if (
          !lessonType.includes('Video') &&
          chapter === chapters.APPLICATION
        )
          setIconName('number-3-filled')
        else setIconName(`number-${chapter}-filled`)
        break
      case chapterButtonModes.COMPLETE:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2
        })
        setTextStyle({ color: colors(isDark, activeGroup.language).accent })
        setIconColor(colors(isDark, activeGroup.language).accent)
        setIconName('check-filled')
        break
      case chapterButtonModes.DOWNLOADING:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2
        })
        setTextStyle({ color: colors(isDark).disabled })
        setIconName(null)
        setIconColor(null)
        break
      case chapterButtonModes.DISABLED:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2
        })
        setTextStyle({ color: colors(isDark).disabled })
        setIconName('cloud-slash')
        setIconColor(colors(isDark).disabled)
        break
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.chapterButton,
        extraButtonStyle,
        {
          paddingVertical: isTablet ? 16 : 8
        }
      ]}
      // Disable onPress (by making the onPress function empty and by disabling the touch effect) if the chapter button is DISABLED or DOWNLOADING.
      onPress={
        mode === chapterButtonModes.DISABLED ||
        mode === chapterButtonModes.DOWNLOADING
          ? () => {}
          : () => changeChapter(chapter)
      }
      activeOpacity={
        mode === chapterButtonModes.DISABLED ||
        mode === chapterButtonModes.DOWNLOADING
          ? 1
          : 0.2
      }
    >
      <View
        style={{
          width: 25 * scaleMultiplier,
          height: 25 * scaleMultiplier,
          marginBottom: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* If we're DOWNLOADING, show the progress indicator. Otherwise, show an icon. */}
        {mode === chapterButtonModes.DOWNLOADING ? (
          <AnimatedCircularProgress
            size={22 * scaleMultiplier}
            width={4}
            fill={downloadProgress}
            tintColor={colors(isDark, activeGroup.language).accent}
            rotation={0}
            backgroundColor={colors(isDark).bg4}
            padding={4}
          />
        ) : (
          <Icon name={iconName} size={25 * scaleMultiplier} color={iconColor} />
        )}
      </View>
      {/* The name of the chapter. */}
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[defaultTextStyle, textStyle]}
      >
        {chapterNames[chapter]}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chapterButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 3,
    paddingHorizontal: 3
  }
})

export default ChapterButton
