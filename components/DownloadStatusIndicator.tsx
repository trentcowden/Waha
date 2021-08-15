import React, { FC, ReactElement, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Lesson } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { CommonProps, DLProps, NetworkProps } from '../interfaces/common'
import { LessonType } from '../interfaces/playScreen'
import { colors } from '../styles/colors'

interface Props extends CommonProps, NetworkProps, DLProps {
  // Whether the media for this lesson is fully downloaded or not. Fully downloaded means that all of the media for a lesson is downloaded. For lessons that audio, it means the audio is downloaded. For lessons that have audio and video, it means both the audio and video are downloaded.
  isFullyDownloaded: boolean
  // Whether any media for this lesson is actively downloading.
  isDownloading: boolean
  onDownloadButtonPress: (lesson: Lesson) => void
  onRemoveDownloadButtonPress: (lesson: Lesson) => void
  lessonID: string
  lessonType: LessonType
  // Removes a download from the redux downloads tracker.
  removeDownload: (lessonID: string) => void
  thisLesson: Lesson
}

/**
 * A component on a <LessonItem /> that shows the status of the download for a lesson as a button which allows the user to do an action related to the download, like start it or delete it.
 */
const DownloadStatusIndicator: FC<Props> = ({
  isFullyDownloaded,
  isDownloading,
  onDownloadButtonPress,
  onRemoveDownloadButtonPress,
  lessonID,
  lessonType,
  isConnected,
  downloads,
  isDark,
  removeDownload,
  thisLesson,
}): ReactElement => {
  /** Keeps track of the percentage of the download for this lesson if it's currently downloading. */
  const [downloadPercentage, setDownloadPercentage] = useState(0)

  /** useEffect function that updates the percentage of the download for this lesson based on what the lesson type is. */
  useEffect(() => {
    if (downloads[lessonID] || downloads[lessonID + 'v'])
      switch (lessonType) {
        case LessonType.STANDARD_DBS:
        case LessonType.AUDIOBOOK:
          // For audio only lessons, the progress is just the progress of the video download.
          setDownloadPercentage(downloads[lessonID].progress * 100)
          break
        // Special case. When we're in a DMC lesson, the download progress should be the audio and video download progress combined. If one has already finished and has been removed from the downloads redux object, use 1 for its progress instead.
        case LessonType.STANDARD_DMC:
          var audioPercentage = downloads[lessonID]
            ? downloads[lessonID].progress
            : 1
          var videoPercentage = downloads[lessonID + 'v']
            ? downloads[lessonID + 'v'].progress
            : 1
          setDownloadPercentage(((audioPercentage + videoPercentage) / 2) * 100)
          break
        case LessonType.VIDEO_ONLY:
          // For video only lessons, the progress is just the progress of the video download.
          setDownloadPercentage(downloads[lessonID + 'v'].progress * 100)
          break
      }
  }, [downloads[lessonID], downloads[lessonID + 'v']])

  // If our lesson has no media to download, return nothing.
  if (
    lessonType === LessonType.STANDARD_NO_AUDIO ||
    lessonType === LessonType.BOOK
  )
    return <View />
  // If all the media for the lesson is downloaded, show the checkmark icon. Pressing on this deletes the media.
  else if (isFullyDownloaded)
    return (
      <TouchableOpacity
        onPress={() => onRemoveDownloadButtonPress(thisLesson)}
        style={styles.downloadStatusIndicatorContainer}
      >
        <Icon
          name='cloud-check'
          color={colors(isDark).disabled}
          size={22 * scaleMultiplier}
        />
      </TouchableOpacity>
    )
  // If we're actively downloading the media for the lesson, show a progress bar of the download. Pressing on it stops the download.
  else if (isDownloading && isConnected)
    return (
      <TouchableOpacity
        style={styles.downloadStatusIndicatorContainer}
        onPress={() => {
          if (downloads[lessonID]) {
            downloads[lessonID].resumable.pauseAsync()
            removeDownload(lessonID)
          }
          if (downloads[lessonID + 'v']) {
            downloads[lessonID + 'v'].resumable.pauseAsync()
            removeDownload(lessonID + 'v')
          }
        }}
      >
        <AnimatedCircularProgress
          size={22 * scaleMultiplier}
          width={4 * scaleMultiplier}
          fill={downloadPercentage}
          tintColor={colors(isDark).icons}
          rotation={0}
          backgroundColor={colors(isDark).bg4}
          padding={2}
        >
          {() => (
            <View
              style={{
                width: 5 * scaleMultiplier,
                height: 5 * scaleMultiplier,
                backgroundColor: colors(isDark).text,
              }}
            />
          )}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    )
  // If we're not actively downloading the media for this lesson, it's not already downloaded, and we're connected to the internet, show the download icon which starts downloading the media when pressed.
  else if (!isDownloading && !isFullyDownloaded && isConnected)
    return (
      <TouchableOpacity
        onPress={() => onDownloadButtonPress(thisLesson)}
        style={styles.downloadStatusIndicatorContainer}
      >
        <Icon
          name='cloud-download'
          color={
            isFullyDownloaded ? colors(isDark).disabled : colors(isDark).icons
          }
          size={22 * scaleMultiplier}
        />
      </TouchableOpacity>
    )
  // Lastly, if the media isn't downloaded and we have no connection, show a slash icon which indicates the lesson can't be downloaded right now.
  else if (!isFullyDownloaded && !isConnected)
    return (
      <View style={styles.downloadStatusIndicatorContainer}>
        <Icon
          name='cloud-slash'
          color={colors(isDark).icons}
          size={22 * scaleMultiplier}
        />
      </View>
    )
  else return <View />
}

const styles = StyleSheet.create({
  downloadStatusIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: '100%',
  },
})

export default DownloadStatusIndicator
