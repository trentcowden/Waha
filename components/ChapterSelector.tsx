import {
  AGProps,
  CommonProps,
  DLProps,
  NetworkProps,
  TProps,
} from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { gutterSize, isTablet } from '../constants'
import { Chapter, LessonType } from '../interfaces/setAndLessonInfo'
import { colors } from '../styles/colors'
import ChapterButton from './ChapterButton'

interface Props extends CommonProps, AGProps, TProps, NetworkProps, DLProps {
  activeChapter: Chapter
  changeChapter: (chapter: Chapter) => void
  lessonType: LessonType
  lessonID?: string
  isAudioDownloaded: boolean
  isVideoDownloaded: boolean
}

/**
 * Component that displays the various 3 or 4 chapter buttons on the PlayScreen.
 */
const ChapterSelector: FC<Props> = ({
  activeChapter,
  changeChapter,
  isAudioDownloaded,
  isVideoDownloaded,
  lessonType,
  lessonID,
  isDark,
  activeGroup,
  downloads,
  isConnected,
  t,
  isRTL,
}): ReactElement => (
  <View
    style={{
      ...styles.chapterSelectorContainer,
      borderColor: colors(isDark, activeGroup.language).accent,
    }}
  >
    <ChapterButton
      chapter={Chapter.FELLOWSHIP}
      activeChapter={activeChapter}
      lessonType={lessonType}
      changeChapter={changeChapter}
      activeGroup={activeGroup}
      t={t}
      isDark={isDark}
      downloads={downloads}
      isConnected={isConnected}
      isRTL={isRTL}
    />
    <View style={{ width: isTablet ? 8 : 4 }} />
    {/* <ChapterSeparator /> */}
    <ChapterButton
      chapter={Chapter.STORY}
      activeChapter={activeChapter}
      changeChapter={changeChapter}
      lessonType={lessonType}
      lessonID={lessonID}
      isAudioDownloaded={isAudioDownloaded}
      activeGroup={activeGroup}
      t={t}
      isDark={isDark}
      downloads={downloads}
      isConnected={isConnected}
      isRTL={isRTL}
    />
    {/* For DMC lessons, we need an extra 'Training' chapter button. */}
    {lessonType === LessonType.STANDARD_DMC ? (
      <View style={{ width: isTablet ? 8 : 4 }} />
    ) : // <ChapterSeparator />
    null}
    {lessonType === LessonType.STANDARD_DMC ? (
      <ChapterButton
        chapter={Chapter.TRAINING}
        activeChapter={activeChapter}
        changeChapter={changeChapter}
        lessonType={lessonType}
        lessonID={lessonID}
        isVideoDownloaded={isVideoDownloaded}
        activeGroup={activeGroup}
        t={t}
        isDark={isDark}
        downloads={downloads}
        isConnected={isConnected}
        isRTL={isRTL}
      />
    ) : null}
    <View style={{ width: isTablet ? 8 : 4 }} />
    {/* <ChapterSeparator /> */}
    <ChapterButton
      chapter={Chapter.APPLICATION}
      activeChapter={activeChapter}
      changeChapter={changeChapter}
      lessonType={lessonType}
      activeGroup={activeGroup}
      t={t}
      isDark={isDark}
      downloads={downloads}
      isConnected={isConnected}
      isRTL={isRTL}
    />
  </View>
)

const styles = StyleSheet.create({
  chapterSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: gutterSize,
  },
})

export default ChapterSelector
