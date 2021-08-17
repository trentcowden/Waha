// import SvgUri from 'expo-svg-uri'
import { LinearGradient } from 'expo-linear-gradient'
import React, {
  FC,
  MutableRefObject,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Lesson } from 'redux/reducers/database'
import { scaleMultiplier } from '../constants'
import { ADBProps, AGProps, CommonProps, TProps } from '../interfaces/common'
import { Layouts, SectionOffset } from '../interfaces/components'
import { LessonType } from '../interfaces/setAndLessonInfo'
import { colors } from '../styles/colors'
import LessonTextContent from './LessonTextContent'

interface Props extends CommonProps, TProps, ADBProps, AGProps {
  lessonTextContentRef: RefObject<ScrollView>
  thisLesson: Lesson
  lessonType: LessonType
  sectionOffsets: MutableRefObject<SectionOffset[]>
  markLessonAsComplete: () => void
  isThisLessonComplete: RefObject<boolean>
  setShowCopyrightsModal?: (toSet: boolean) => void
  setSectionTitleText?: (text: string) => void
  // Animation values for the section title.
  sectionTitleOpacity?: MutableRefObject<Animated.Value>
  sectionTitleYTransform?: MutableRefObject<Animated.Value>
}

/**
 * Component for the view that contains a lesson's text content. It handles the scrolling logic and animation.
 */
const LessonTextViewer: FC<Props> = ({
  lessonTextContentRef,
  thisLesson,
  lessonType,
  sectionOffsets,
  setSectionTitleText = () => {},
  sectionTitleOpacity,
  sectionTitleYTransform,
  markLessonAsComplete,
  isThisLessonComplete,
  setShowCopyrightsModal = () => {},
  activeGroup,
  activeDatabase,
  isDark,
  isRTL,
  t,
}): ReactElement => {
  /** Keeps track of the heights of the various text layouts. */
  const layouts = useRef<Layouts>({
    contentHeight: 0,
    windowHeight: 0,
  })

  /** Simple state to re-render the section header. */
  const [refreshSectionHeader, setRefreshSectionHeader] = useState(false)

  /** Keeps track of the section that the user is currently in. */
  const [currentSection, setCurrentSection] = useState<SectionOffset>()

  /** Gets fired whenever the user scrolls the lesson text content. */
  const onScroll = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      // Check if the section header needs to be updated.
      checkForSectionHeaderUpdates(
        nativeEvent.contentOffset.y < 0 ? 0 : nativeEvent.contentOffset.y
      )
    }

    // Marks a lesson as complete if the user scrolls 20% of the way through the application text.
    if (
      currentSection &&
      currentSection.title === t.play.application &&
      !isThisLessonComplete.current
    )
      markLessonAsComplete()
  }

  /**
   * Checks if the section header needs to be updated based on the current scroll position.
   */
  const checkForSectionHeaderUpdates = (scrollPosition: number) => {
    // There's no section headers for book/audiobook lessons, so return if we're in one of those lessons.
    if (lessonType.includes('BookText')) return

    // The index of the current section.
    const currentIndex = currentSection
      ? sectionOffsets.current.indexOf(currentSection)
      : 0

    // Only find the current section if the scroll position is outside of the current section's bounds.
    if (
      (currentSection && scrollPosition < currentSection.globalOffset) ||
      scrollPosition > sectionOffsets.current[currentIndex + 1].globalOffset
    ) {
      // Find the section that we're currently scrolling in by iterating through the sections and checking their offsets.
      var sectionIndex = -1
      do {
        sectionIndex += 1
      } while (
        scrollPosition >= sectionOffsets.current[sectionIndex].globalOffset
      )
      setCurrentSection(sectionOffsets.current[sectionIndex - 1])
    }
  }

  /** useEffect function that sets the initial section once all of the sections have been added. */
  useEffect(() => {
    if (
      lessonType.includes('Questions') &&
      thisLesson.scripture &&
      // Fellowship + Application + END + number of scripture passages
      sectionOffsets.current.length === thisLesson.scripture.length + 3
    )
      setCurrentSection(sectionOffsets.current[0])
  }, [sectionOffsets.current])

  /** useEffect function that sets and animates the section header text whenever the current section changes. */
  useEffect(() => {
    currentSection && setAndAnimateSectionHeaderText(currentSection.title)
  }, [currentSection])

  /**
   * Animates the current section title out and sets it to the new title..
   * @param {string} newTitle - The new title to set.
   */
  const setAndAnimateSectionHeaderText = (newTitle: string) => {
    if (sectionTitleOpacity && sectionTitleYTransform)
      Animated.parallel([
        Animated.timing(sectionTitleOpacity.current, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(sectionTitleYTransform.current, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setSectionTitleText(newTitle)
        setRefreshSectionHeader((current) => !current)
      })
  }

  /** useEffect function that animates the section title back in after it's been changed. */
  useEffect(() => {
    if (
      currentSection !== null &&
      sectionTitleYTransform &&
      sectionTitleOpacity
    ) {
      sectionTitleYTransform.current.setValue(0)
      Animated.timing(sectionTitleOpacity.current, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }, [refreshSectionHeader])

  return (
    <View style={{ flex: 1 }}>
      <LessonTextContent
        thisLesson={thisLesson}
        lessonType={lessonType}
        lessonTextContentRef={lessonTextContentRef}
        layouts={layouts}
        onScroll={onScroll}
        sectionOffsets={sectionOffsets}
        setShowCopyrightsModal={setShowCopyrightsModal}
        activeGroup={activeGroup}
        activeDatabase={activeDatabase}
        isDark={isDark}
        t={t}
        isRTL={isRTL}
      />
      <LinearGradient
        colors={
          isDark
            ? [colors(isDark).bg1, colors(isDark).bg1 + '00']
            : [colors(isDark).bg4, colors(isDark).bg4 + '00']
        }
        start={[1, 1]}
        end={[1, 0]}
        style={styles.bottomFadeArea}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  bottomFadeArea: {
    position: 'absolute',
    bottom: 0,
    height: 20 * scaleMultiplier,
    width: '100%',
  },
})

export default LessonTextViewer
