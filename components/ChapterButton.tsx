import {
  AGProps,
  CommonProps,
  DLProps,
  NetworkProps,
  TProps,
} from 'interfaces/common'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import Icon from '../assets/fonts/icon_font_config'
import { isTablet, scaleMultiplier } from '../constants'
import { ChapterButtonMode } from '../interfaces/components'
import { Chapter, LessonType } from '../interfaces/playScreen'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps, NetworkProps, DLProps {
  // The chapter to display on this button.
  chapter: Chapter
  activeChapter: Chapter
  changeChapter: (chapter: Chapter) => void
  lessonType: LessonType
  lessonID?: string
  isAudioDownloaded?: boolean
  isVideoDownloaded?: boolean
}

/**
 * Pressable component for a single chapter button used in <ChapterSeparator />. Has a variety of possible styles based on its current mode.
 */
const ChapterButton: FC<Props> = ({
  chapter,
  activeChapter,
  changeChapter,
  lessonType,
  lessonID = '',
  isAudioDownloaded = false,
  isVideoDownloaded = false,
  activeGroup,
  isDark,
  downloads,
  isConnected,
  t,
}): ReactElement => {
  /** Keeps track of the mode of this chapter button. */
  const [mode, setMode] = useState(ChapterButtonMode.INCOMPLETE)

  /** Keeps track of the icon name, button style, text style, and icon color for the chapter button. Updates whenever the mode changes. */
  const [iconName, setIconName] = useState('')
  const [extraButtonStyle, setExtraButtonStyle] = useState({
    borderColor: colors(isDark).bg3,
    backgroundColor: colors(isDark).bg2,
  })
  const [textStyle, setTextStyle] = useState({
    color: colors(isDark, activeGroup.language).accent,
  })
  const [iconColor, setIconColor] = useState(
    colors(isDark, activeGroup.language).accent
  )

  /** Keeps track of the download progress for the piece of media associated with the chapter button's chapter. */
  const [downloadProgress, setDownloadProgress] = useState(0)

  // The names of the Chapter. 'Filler' is there to line up this array with the chapters enum since the enum starts at 1.
  const chapterNames = [
    'Filler',
    t.play.fellowship,
    t.play.story,
    t.play.training,
    t.play.application,
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
    if (chapter === Chapter.STORY || chapter === Chapter.TRAINING)
      setChapterButtonMode()
  }, [downloads[lessonID], downloads[lessonID + 'v']])

  // Every time the mode changes, reset the styles for the button.
  useEffect(() => {
    setStyles()
  }, [mode])

  /** Sets the mode for this chapter button. */
  const setChapterButtonMode = () => {
    switch (chapter) {
      case Chapter.FELLOWSHIP:
        if (activeChapter === Chapter.FELLOWSHIP)
          setMode(ChapterButtonMode.ACTIVE)
        // Because the active chapter and chapter are stored as numbers, we can check if the active chapter is bigger than the chapter for this button to see if it's already been completed.
        else if (activeChapter > chapter) setMode(ChapterButtonMode.COMPLETE)
        else setMode(ChapterButtonMode.INCOMPLETE)
        break
      case Chapter.STORY:
        if (
          (lessonType === LessonType.STANDARD_DBS ||
            lessonType === LessonType.STANDARD_DMC) &&
          !isConnected &&
          !isAudioDownloaded
        )
          setMode(ChapterButtonMode.DISABLED)
        else if (downloads[lessonID] && downloads[lessonID].progress < 1) {
          setDownloadProgress(downloads[lessonID].progress * 100)
          setMode(ChapterButtonMode.DOWNLOADING)
        } else if (activeChapter === Chapter.STORY)
          setMode(ChapterButtonMode.ACTIVE)
        else if (activeChapter > chapter) setMode(ChapterButtonMode.COMPLETE)
        else setMode(ChapterButtonMode.INCOMPLETE)
        break
      case Chapter.TRAINING:
        if (!isConnected && !isVideoDownloaded)
          setMode(ChapterButtonMode.DISABLED)
        else if (
          downloads[lessonID + 'v'] &&
          downloads[lessonID + 'v'].progress < 1
        ) {
          setDownloadProgress(downloads[lessonID + 'v'].progress * 100)
          setMode(ChapterButtonMode.DOWNLOADING)
        } else if (activeChapter === Chapter.TRAINING)
          setMode(ChapterButtonMode.ACTIVE)
        else if (activeChapter > chapter) setMode(ChapterButtonMode.COMPLETE)
        else setMode(ChapterButtonMode.INCOMPLETE)
        break
      case Chapter.APPLICATION:
        if (activeChapter === Chapter.APPLICATION)
          setMode(ChapterButtonMode.ACTIVE)
        else if (activeChapter > chapter) setMode(ChapterButtonMode.COMPLETE)
        else setMode(ChapterButtonMode.INCOMPLETE)
        break
    }
  }

  /** Sets the various style states based on the current mode. */
  const setStyles = () => {
    switch (mode) {
      case ChapterButtonMode.ACTIVE:
        setExtraButtonStyle({
          backgroundColor: colors(isDark, activeGroup.language).accent,
          borderColor: colors(isDark, activeGroup.language).accent,
        })
        setTextStyle({ color: colors(isDark).textOnColor })
        setIconColor(colors(isDark).bg4)
        // Slight adjustment if the lesson contains a training chapter since that will make the Application need the '4' label instead of '3'.
        if (lessonType.includes('Video') && chapter === Chapter.APPLICATION)
          setIconName('number-4-filled')
        else if (
          !lessonType.includes('Video') &&
          chapter === Chapter.APPLICATION
        )
          setIconName('number-3-filled')
        else setIconName(`number-${chapter}-filled`)
        break
      case ChapterButtonMode.INCOMPLETE:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2,
        })
        setTextStyle({
          color: isDark
            ? colors(isDark).icons
            : colors(isDark, activeGroup.language).accent,
        })
        setIconColor(
          isDark
            ? colors(isDark).icons
            : colors(isDark, activeGroup.language).accent
        )
        // Slight adjustment if the lesson contains a training chapter since that will make the Application need the '4' label instead of '3'. Another adjustment is that if the chapter is behind the active chapter, the icon is a check mark to show that it's been completed.
        if (lessonType.includes('Video') && chapter === Chapter.APPLICATION)
          setIconName('number-4-filled')
        else if (
          !lessonType.includes('Video') &&
          chapter === Chapter.APPLICATION
        )
          setIconName('number-3-filled')
        else setIconName(`number-${chapter}-filled`)
        break
      case ChapterButtonMode.COMPLETE:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2,
        })
        setTextStyle({ color: colors(isDark, activeGroup.language).accent })
        setIconColor(colors(isDark, activeGroup.language).accent)
        setIconName('check-filled')
        break
      case ChapterButtonMode.DOWNLOADING:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2,
        })
        setTextStyle({ color: colors(isDark).disabled })
        setIconName('')
        setIconColor('')
        break
      case ChapterButtonMode.DISABLED:
        setExtraButtonStyle({
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg3 : colors(isDark).bg2,
        })
        setTextStyle({ color: colors(isDark).disabled })
        setIconName('cloud-slash')
        setIconColor(colors(isDark).disabled)
        break
    }
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.chapterButton,
        ...extraButtonStyle,
        paddingVertical: isTablet ? 16 : 8,
      }}
      // Disable onPress (by making the onPress function empty and by disabling the touch effect) if the chapter button is DISABLED or DOWNLOADING.
      onPress={
        mode === ChapterButtonMode.DISABLED ||
        mode === ChapterButtonMode.DOWNLOADING
          ? () => {}
          : () => changeChapter(chapter)
      }
      activeOpacity={
        mode === ChapterButtonMode.DISABLED ||
        mode === ChapterButtonMode.DOWNLOADING
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
          justifyContent: 'center',
        }}
      >
        {/* If we're DOWNLOADING, show the progress indicator. Otherwise, show an icon. */}
        {mode === ChapterButtonMode.DOWNLOADING ? (
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
        style={{ ...defaultTextStyle, ...textStyle }}
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
    paddingHorizontal: 3,
  },
})

export default ChapterButton
