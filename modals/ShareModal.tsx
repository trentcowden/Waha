import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { LessonType } from 'functions/setAndLessonDataFunctions'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Share, View } from 'react-native'
import { Lesson } from 'redux/reducers/database'
import OptionsModalButton from '../components/OptionsModalButton'
import WahaSeparator from '../components/WahaSeparator'
import {
  logShareApp,
  logShareAudio,
  logShareText,
} from '../functions/analyticsFunctions'
import { AGProps, CommonProps, DLProps, TProps } from '../redux/common'
import OptionsModal from './OptionsModal'

enum ShareType {
  APP = 1,
  TEXT = 2,
  AUDIO = 3,
  VIDEO = 4,
  MOBILIZATION_TOOLS = 5,
}

interface Props extends CommonProps, AGProps, DLProps, TProps {
  isVisible: boolean
  hideModal: () => void
  closeText: string
  lesson: Lesson | undefined
  lessonType: LessonType
}

/**
 * A modal component that gives the user options to share various parts of a lesson.
 * @param {boolean} isVisible - Whether the modal is visible.
 * @param {Function} hideModal - Function to hide the modal.
 * @param {string} closeText - The text to display on the button that closes the modal.
 * @param {Object} lesson - The object for the lesson that we're sharing.
 * @param {string[]} lessonType - The type of the lesson that we're sharing. See lessonTypes in constants.js.
 * @param {Object} set - The object for the set that the lesson that we're sharing is a part of.
 */
const ShareModal: FC<Props> = ({
  // Props passed from a parent component.s
  isVisible,
  hideModal,
  closeText,
  lesson,
  lessonType,
  downloads,
  activeGroup,
  isDark,
  t,
  isRTL,
}): ReactElement => {
  const [isLessonDownloaded, setIsLessonDownloaded] = useState(true)

  useEffect(() => {
    if (lesson)
      FileSystem.getInfoAsync(
        FileSystem.documentDirectory + lesson.id + '.mp3'
      ).then(({ exists }) => {
        setIsLessonDownloaded(exists)
      })
  }, [isVisible])

  /**
   * Opens the share sheet to share a piece of content from a lesson.
   * @param {number} type - The type of content to share. See shareTypes at the top of this page.
   */
  const shareLessonContent = (type: ShareType) => {
    switch (type) {
      // Share links to Waha's app store pages.
      case ShareType.APP:
        Share.share({
          message:
            'iOS: https://apps.apple.com/us/app/waha-discover-gods-story/id1530116294\n\nAndroid: https://play.google.com/store/apps/details?id=com.kingdomstrategies.waha',
        }).then(() => {
          logShareApp(activeGroup.id)
          hideModal()
        })
        break
      // Share the Scripture text for a lesson if it has it.
      case ShareType.TEXT:
        var scriptureString = ''
        if (lesson && lesson.scripture) {
          lesson.scripture.forEach((scripturePiece, index) => {
            scriptureString +=
              scripturePiece.header + '\n' + scripturePiece.text
            if (lesson.scripture && index !== lesson.scripture.length - 1)
              scriptureString += '\n'
          })
        }
        Share.share({
          message: scriptureString,
        }).then(() => {
          if (lesson) logShareText(lesson, activeGroup.id)
          hideModal()
        })
        break
      // Share the Scripture audio for a lesson if it exists.
      case ShareType.AUDIO:
        if (lesson)
          Sharing.shareAsync(
            FileSystem.documentDirectory + lesson.id + '.mp3'
          ).then(() => {
            logShareAudio(lesson, activeGroup.id)
            hideModal()
          })
        break
      // Share a link to the video for this lesson if there is one.
      case ShareType.VIDEO:
        if (lesson)
          if (lesson.videoShareLink)
            Share.share({
              message: lesson.videoShareLink,
            }).then(() => {
              hideModal()
            })
        break
      case ShareType.MOBILIZATION_TOOLS:
        Share.share({
          message: `${t.mobilization_tools.share_message_1}\n
            ${t.mobilization_tools.share_message_2}\n
            ${t.mobilization_tools.share_message_3}\n
            ${t.mobilization_tools.share_message_4}\n
            ${t.mobilization_tools.share_message_5}`,
        }).then(() => {
          hideModal()
        })
        break
    }
  }

  return (
    // The share modal uses the <OptionsModal/> component.
    <OptionsModal
      isVisible={isVisible}
      hideModal={hideModal}
      closeText={closeText}
      isDark={isDark}
      activeGroup={activeGroup}
      isRTL={isRTL}
    >
      <OptionsModalButton
        label={t.general.share_app}
        onPress={() => shareLessonContent(ShareType.APP)}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      />
      {/* Include a "Share Text" button if a lesson has questions. If it has questions, then it also has Scripture text. */}
      {lessonType.includes('Questions') ? (
        <View>
          <WahaSeparator isDark={isDark} />
          <OptionsModalButton
            label={t.general.share_passage_text}
            onPress={() => shareLessonContent(ShareType.TEXT)}
            isDark={isDark}
            activeGroup={activeGroup}
            isRTL={isRTL}
          />
        </View>
      ) : null}
      {/* Include a "Share Audio" button if a lesson has audio and it's not currently downloading. */}
      {lesson &&
        lessonType.includes('Audio') &&
        !downloads[lesson.id] &&
        isLessonDownloaded && (
          <View>
            <WahaSeparator isDark={isDark} />
            <OptionsModalButton
              label={t.general.share_passage_audio}
              onPress={() => shareLessonContent(ShareType.AUDIO)}
              isDark={isDark}
              activeGroup={activeGroup}
              isRTL={isRTL}
            />
          </View>
        )}
      {/* Include a "Share Video" button if a lesson has video, the link to share it exists, and it's not currently downloading. */}
      {lesson &&
        lessonType.includes('Video') &&
        lesson.videoShareLink &&
        !downloads[lesson.id] && (
          <View>
            <WahaSeparator isDark={isDark} />
            <OptionsModalButton
              label={t.general.share_video_link}
              onPress={() => shareLessonContent(ShareType.VIDEO)}
              isDark={isDark}
              activeGroup={activeGroup}
              isRTL={isRTL}
            />
          </View>
        )}
      {lesson && /[a-z]{2}.3.[0-9]+.[0-9]+/.test(lesson.id) && (
        <View>
          <WahaSeparator isDark={isDark} />
          <OptionsModalButton
            label={t.general.share_mobilization_tools}
            onPress={() => shareLessonContent(ShareType.MOBILIZATION_TOOLS)}
            isDark={isDark}
            activeGroup={activeGroup}
            isRTL={isRTL}
          />
        </View>
      )}
    </OptionsModal>
  )
}

export default ShareModal
