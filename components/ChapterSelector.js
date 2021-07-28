import React from 'react'
import { StyleSheet, View } from 'react-native'
import { chapters, gutterSize, isTablet, lessonTypes } from '../constants'
import { colors } from '../styles/colors'
import ChapterButton from './ChapterButton'

/**
 * Component that displays the various 3 or 4 chapter buttons on the PlayScreen.
 * @param {string} activeChapter - The currently active chapter. See chapters in constants.js.
 * @param {Function} changeChapter - Changes the active chapter.
 * @param {boolean} isAudioDownloaded - Whether this lesson has its audio file downloaded or not.
 * @param {boolean} isVideoDownloaded - Whether this lesson has its video file downloaded or not. Only relevant to STANDARD_DMC or VIDEO_ONLY lesson types.
 * @param {string} lessonType - The type of the current lesson. See lessonTypes in constants.js.
 * @param {string} lessonID - The ID for the active lesson.
 */
const ChapterSelector = ({
  // Props passed from a parent component.
  activeChapter,
  changeChapter,
  isAudioDownloaded,
  isVideoDownloaded,
  lessonType,
  lessonID,
  isDark,
  activeGroup,
  t,
  downloads,
  isConnected
}) => (
  <View
    style={[
      styles.chapterSelectorContainer,
      { borderColor: colors(isDark, activeGroup.language).accent }
    ]}
  >
    <ChapterButton
      chapter={chapters.FELLOWSHIP}
      activeChapter={activeChapter}
      lessonType={lessonType}
      changeChapter={changeChapter}
      activeGroup={activeGroup}
      t={t}
      isDark={isDark}
      downloads={downloads}
      isConnected={isConnected}
    />
    <View style={{ width: isTablet ? 8 : 4 }} />
    {/* <ChapterSeparator /> */}
    <ChapterButton
      chapter={chapters.STORY}
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
    />
    {/* For DMC lessons, we need an extra 'Training' chapter button. */}
    {lessonType === lessonTypes.STANDARD_DMC ? (
      <View style={{ width: isTablet ? 8 : 4 }} />
    ) : // <ChapterSeparator />
    null}
    {lessonType === lessonTypes.STANDARD_DMC ? (
      <ChapterButton
        chapter={chapters.TRAINING}
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
      />
    ) : null}
    <View style={{ width: isTablet ? 8 : 4 }} />
    {/* <ChapterSeparator /> */}
    <ChapterButton
      chapter={chapters.APPLICATION}
      activeChapter={activeChapter}
      changeChapter={changeChapter}
      lessonType={lessonType}
      activeGroup={activeGroup}
      t={t}
      isDark={isDark}
      downloads={downloads}
      isConnected={isConnected}
    />
  </View>
)

const styles = StyleSheet.create({
  chapterSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: gutterSize
  }
})

export default ChapterSelector
