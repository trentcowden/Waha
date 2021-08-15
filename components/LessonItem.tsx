import LottieView from 'lottie-react-native'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { isTablet, itemHeights, scaleMultiplier } from '../constants'
import { getLessonInfo } from '../functions/setAndLessonInfoFunctions'
import {
  AGProps,
  CommonProps,
  DLProps,
  NetworkProps,
} from '../interfaces/common'
import { LessonType } from '../interfaces/playScreen'
import { Lesson } from '../redux/reducers/database'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import DownloadStatusIndicator from './DownloadStatusIndicator'

interface Props extends CommonProps, AGProps, DLProps, NetworkProps {
  thisLesson: Lesson
  onLessonItemPress: (params: {
    thisLesson: Lesson
    isAudioAlreadyDownloaded: boolean
    isVideoAlreadyDownloaded: boolean
    isAlreadyDownloading: boolean
    lessonType: LessonType
  }) => void
  isBookmark: boolean
  isComplete: boolean
  lessonType: LessonType
  downloadedLessons: string[]
  onDownloadButtonPress: (lesson: Lesson) => void
  onRemoveDownloadButtonPress: (lesson: Lesson) => void
  scriptureList: string
  setShowTrailerHighlights: (toSet: boolean) => void
  removeDownload: (lessonID: string) => void
  isInInfoMode: boolean
  font: string
  areMobilizationToolsUnlocked: boolean
  showTrailerHighlights: boolean
}

/**
 * A list item used to display a single lesson on the LessonsScreen. Shows the title, subtitle, complete status, and download status.
 * @param {Object} thisLesson - The object for the lesson to display.
 * @param {Function} goToPlayScreen - Navigates to the play screen with some custom parameters.
 * @param {boolean} thisSetBookmark - The bookmark for the set this lesson is a part of.
 * @param {string} lessonType - The type of this lesson. See getLessonType() from LessonsScreen.js for more info.
 * @param {number[]} thisSetProgress - The progress for the set this lesson is a part of.
 * @param {Object[]} downloadedLessons - An array of the downloaded lessons
 * @param {Function} showDownloadLessonModal - Function that shows the download lesson modal.
 * @param {Function} showDeleteLessonModal - Function that shows the delete lesson modal.
 */
const LessonItem: FC<Props> = ({
  // Props passed from a parent component.
  thisLesson,
  onLessonItemPress,
  isBookmark,
  isComplete,
  lessonType,
  downloadedLessons,
  onDownloadButtonPress,
  onRemoveDownloadButtonPress,
  scriptureList,
  isInInfoMode,
  isRTL,
  isDark,
  activeGroup,
  downloads,
  font,
  areMobilizationToolsUnlocked,
  showTrailerHighlights,
  isConnected,
  setShowTrailerHighlights,
  removeDownload,
}): ReactElement => {
  /** Keeps track of whether this lesson is downloaded or not. */
  const [isFullyDownloaded, setIsFullyDownloaded] = useState(false)

  /** Keeps track of whether this lesson is currently downloading or not. */
  const [isDownloading, setIsDownloading] = useState(false)

  /** useEffect function that removes an active download from the downloads redux object after it finishes. */
  useEffect(() => {
    // Remove finished audio downloads.
    if (
      lessonType.includes('Audio') &&
      downloads[thisLesson.id] &&
      downloads[thisLesson.id].progress === 1
    )
      removeDownload(thisLesson.id)

    // Remove finished video downloads.
    if (
      lessonType.includes('Video') &&
      downloads[thisLesson.id + 'v'] &&
      downloads[thisLesson.id + 'v'].progress === 1
    )
      removeDownload(thisLesson.id + 'v')
  }, [downloads[thisLesson.id], downloads[thisLesson.id + 'v']])

  /** useEffect function that updates the downloading and downloaded status of a lesson whenever a download gets added or removed from the downloads redux object. */
  useEffect(() => {
    switch (lessonType) {
      case LessonType.STANDARD_DBS:
      case LessonType.AUDIOBOOK:
        if (downloadedLessons.includes(thisLesson.id))
          setIsFullyDownloaded(true)
        else setIsFullyDownloaded(false)
        if (downloads[thisLesson.id]) setIsDownloading(true)
        else setIsDownloading(false)
        break
      case LessonType.STANDARD_DMC:
        if (
          downloadedLessons.includes(thisLesson.id) &&
          downloadedLessons.includes(thisLesson.id + 'v')
        )
          setIsFullyDownloaded(true)
        else setIsFullyDownloaded(false)
        if (downloads[thisLesson.id] || downloads[thisLesson.id + 'v'])
          setIsDownloading(true)
        else setIsDownloading(false)
        break
      case LessonType.VIDEO_ONLY:
        if (downloadedLessons.includes(thisLesson.id + 'v'))
          setIsFullyDownloaded(true)
        else setIsFullyDownloaded(false)
        if (downloads[thisLesson.id + 'v']) setIsDownloading(true)
        else setIsDownloading(false)
        break
    }
  }, [downloadedLessons, Object.keys(downloads).length])

  return (
    <View
      style={{
        ...styles.lessonItemContainer,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        paddingVertical: isInInfoMode ? (isTablet ? 20 : 10) : 0,
        paddingLeft: 20,
        alignItems: 'center',
        minHeight: isTablet
          ? itemHeights[font].LessonItem + 15
          : itemHeights[font].LessonItem,
        height: isInInfoMode
          ? null
          : isTablet
          ? itemHeights[font].LessonItem + 15
          : itemHeights[font].LessonItem,
      }}
    >
      <TouchableOpacity
        style={{
          ...styles.touchableAreaContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
        }}
        onPress={() => {
          if (areMobilizationToolsUnlocked && showTrailerHighlights)
            setShowTrailerHighlights(false)

          onLessonItemPress({
            thisLesson: thisLesson,
            isAudioAlreadyDownloaded: downloadedLessons.includes(thisLesson.id),
            isVideoAlreadyDownloaded: downloadedLessons.includes(
              thisLesson.id + 'v'
            ),
            isAlreadyDownloading: isDownloading,
            lessonType: lessonType,
          })
        }}
      >
        <View style={styles.completeStatusContainer}>
          <Icon
            name={
              isComplete
                ? 'check-outline'
                : isBookmark
                ? isRTL
                  ? 'triangle-left'
                  : 'triangle-right'
                : null
            }
            size={24 * scaleMultiplier}
            color={
              isComplete
                ? colors(isDark).disabled
                : colors(isDark, activeGroup.language).accent
            }
          />
        </View>
        <View
          style={{
            ...styles.titlesContainer,
            marginLeft: isRTL ? (thisLesson.hasAudio ? 0 : 20) : 20,
            marginRight: isRTL ? 20 : thisLesson.hasAudio ? 0 : 20,
          }}
        >
          <Text
            style={type(
              activeGroup.language,
              'h4',
              'Bold',
              'left',
              isComplete ? colors(isDark).disabled : colors(isDark).text
            )}
            numberOfLines={2}
          >
            {thisLesson.title}
          </Text>
          {/* <Text
          // numberOfLines={2}
          > */}
          <Text
            style={type(
              activeGroup.language,
              'd',
              'Regular',
              'left',
              isComplete
                ? colors(isDark).disabled
                : colors(isDark).secondaryText
            )}
          >
            {getLessonInfo('subtitle', thisLesson.id)}
          </Text>
          {isInInfoMode && (
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {/* {lessonType.includes('Audio') && (
                <Icon name='volume' size={20} color={colors(isDark).disabled} />
              )}
              {lessonType.includes('Questions') && (
                <Icon name='help' size={20} color={colors(isDark).disabled} />
              )} */}
              {lessonType.includes('Video') && (
                <Icon name='video' size={20} color={colors(isDark).disabled} />
              )}
              {lessonType.includes('BookText') && (
                <Icon
                  name='description'
                  size={20}
                  color={colors(isDark).disabled}
                />
              )}
            </View>
          )}
          {isInInfoMode && thisLesson.scripture && (
            <Text
              style={type(
                activeGroup.language,
                'd',
                'Regular',
                'left',
                isComplete
                  ? colors(isDark).disabled
                  : colors(isDark).secondaryText
              )}
              // numberOfLines={2}
            >
              {scriptureList}
            </Text>
          )}
          {/* </Text> */}
        </View>
        {thisLesson.id.includes('3.1.1') &&
          areMobilizationToolsUnlocked &&
          showTrailerHighlights && (
            <View
              style={{
                height: '100%',
                position: 'absolute',
                top: -15,
                right: -25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LottieView
                autoPlay
                loop
                colorFilters={[
                  {
                    keypath: 'hand 2',
                    color: colors(isDark, activeGroup.language).accent,
                  },
                ]}
                resizeMode='cover'
                style={{ height: '120%' }}
                source={require('../assets/lotties/tap.json')}
              />
            </View>
          )}
      </TouchableOpacity>
      <View
        style={{
          width: 22 * scaleMultiplier + 40,
        }}
      >
        {!isInInfoMode && (
          <DownloadStatusIndicator
            isFullyDownloaded={isFullyDownloaded}
            isDownloading={isDownloading}
            onDownloadButtonPress={onDownloadButtonPress}
            onRemoveDownloadButtonPress={onRemoveDownloadButtonPress}
            lessonID={thisLesson.id}
            lessonType={lessonType}
            isConnected={isConnected}
            downloads={downloads}
            isDark={isDark}
            removeDownload={removeDownload}
            isRTL={isRTL}
            thisLesson={thisLesson}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lessonItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  touchableAreaContainer: {
    alignItems: 'center',
    flex: 1,
    overflow: 'visible',
  },
  completeStatusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24 * scaleMultiplier,
  },
  titlesContainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
})

/*
  Lesson items need to update when:
  1. Their or any other lesson in the set's complete status changes
  2. Their download progress changes
  3. Their downloaded status changes
  4. Info mode changes
  5. Show trailer highlights changes
*/
const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.isBookmark === nextProps.isBookmark &&
    prevProps.isComplete === nextProps.isComplete &&
    prevProps.downloads[prevProps.thisLesson.id] ===
      nextProps.downloads[nextProps.thisLesson.id] &&
    prevProps.downloads[prevProps.thisLesson.id + 'v'] ===
      nextProps.downloads[nextProps.thisLesson.id + 'v'] &&
    prevProps.downloadedLessons.includes(prevProps.thisLesson.id) ===
      nextProps.downloadedLessons.includes(nextProps.thisLesson.id) &&
    prevProps.downloadedLessons.includes(prevProps.thisLesson.id + 'v') ===
      nextProps.downloadedLessons.includes(nextProps.thisLesson.id + 'v') &&
    prevProps.isInInfoMode === nextProps.isInInfoMode &&
    prevProps.showTrailerHighlights === nextProps.showTrailerHighlights
  )
}

export default React.memo(LessonItem, areEqual)
