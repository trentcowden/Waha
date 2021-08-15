// import SvgUri from 'expo-svg-uri'
import React, {
  FC,
  MutableRefObject,
  ReactElement,
  RefObject,
  useRef,
  useState,
} from 'react'
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { Lesson } from 'redux/reducers/database'
import { gutterSize, scaleMultiplier } from '../constants'
import { ADBProps, AGProps, CommonProps, TProps } from '../interfaces/common'
import { LessonType, SectionOffset } from '../interfaces/playScreen'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import AlbumArt from './AlbumArt'
import LessonTextViewer from './LessonTextViewer'
import PageDots from './PageDots'
import PlayScreenTitle from './PlayScreenTitle'

interface Props extends CommonProps, TProps, ADBProps, AGProps {
  playScreenSwiperRef: RefObject<PagerView>
  lessonTextContentRef: RefObject<ScrollView>
  iconName: string
  thisLesson: Lesson
  lessonType: LessonType
  playHandler: () => void
  playFeedbackOpacity: Animated.Value
  playFeedbackZIndex: number
  isMediaPlaying: boolean
  sectionOffsets: MutableRefObject<SectionOffset[]>
  markLessonAsComplete: () => void
  isThisLessonComplete: RefObject<boolean>
  setShowCopyrightsModal?: (toSet: boolean) => void
}

/**
 * A component that shows the album art for a lesson as well as the text on either side of it in a swipable carousel.
 * @param {ref} lessonTextContentRef - The ref for the area that contains the lesson text. Used to jump to specific points when the active chapter changes.
 * @param {string} iconName - The name of the icon associated with the set this lesson is a part of.
 * @param {Object} thisLesson - The object for the lesson that the user has selected to do.
 * @param {string} lessonType - The type of the current lesson. See lessonTypes in constants.js.
 * @param {Function} playHandler - Plays/pauses a lesson. Needed because the user can tap on the album art pane to play/pause the lesson.
 * @param {number} playFeedbackOpacity - Opacity for the play/pause animation feedback that appears whenever the lesson is played or paused.
 * @param {number} playFeedbackZIndex - Z-index for the play/pause animation feedback that appears whenever the lesson is played or paused.
 * @param {boolean} isMediaPlaying - Whether the current media (audio or video) is currently playing.
 * @param {Object[]} sectionOffsets - Stores the different sections of the lesson text and their global scroll offset.
 * @param {Function} markLessonAsComplete - Marks this lesson as complete.
 * @param {boolean} isThisLessonComplete - Whether or not this lesson is complete.
 */
const PlayScreenSwiper: FC<Props> = ({
  // Props passed from a parent component.
  playScreenSwiperRef,
  lessonTextContentRef,
  iconName,
  thisLesson,
  lessonType,
  playHandler,
  playFeedbackOpacity,
  playFeedbackZIndex,
  isMediaPlaying,
  sectionOffsets,
  markLessonAsComplete,
  isThisLessonComplete,
  setShowCopyrightsModal,
  activeGroup,
  activeDatabase,
  isDark,
  isRTL,
  t,
}): ReactElement => {
  /** Keeps track of the active page of the album art swiper. */
  const [activePage, setActivePage] = useState(0)

  /** Keeps track of the section title text. */
  const [sectionTitleText, setSectionTitleText] = useState(t.play.fellowship)

  /** Keeps track of the opacity and transform value of the section header so it can be animated. */
  const sectionTitleOpacity = useRef(new Animated.Value(1))
  const sectionTitleYTransform = useRef(new Animated.Value(0))

  // The pages of the swiper. Stored here so that they can be .reverse()'d later for RTL languages.
  const pages = [
    <View
      key='1'
      style={{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // Background is set here because of some strange issues with the video player flashing during the transition to/from the Training chapter.
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      <PlayScreenTitle
        text={thisLesson.title}
        activeGroup={activeGroup}
        isDark={isDark}
        isRTL={isRTL}
      />
      <AlbumArt
        iconName={iconName}
        playHandler={playHandler}
        playFeedbackOpacity={playFeedbackOpacity}
        playFeedbackZIndex={playFeedbackZIndex}
        isMediaPlaying={isMediaPlaying}
        isDark={isDark}
        isRTL={isRTL}
      />
    </View>,
    <View key='2' style={{ width: '100%', height: '100%' }}>
      {!lessonType.includes('BookText') ? (
        // Standard Page used for most lessons.
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              ...styles.sectionHeaderContainer,
              flexDirection: isRTL ? 'row-reverse' : 'row',
              opacity: sectionTitleOpacity.current,
              transform: [{ translateY: sectionTitleYTransform.current }],
            }}
          >
            <Text
              style={type(
                activeGroup.language,
                'h2',
                'Black',
                'left',
                colors(isDark).icons
              )}
            >
              {sectionTitleText}
            </Text>
          </Animated.View>
          <LessonTextViewer
            lessonTextContentRef={lessonTextContentRef}
            thisLesson={thisLesson}
            lessonType={lessonType}
            sectionOffsets={sectionOffsets}
            setSectionTitleText={(text: string) => setSectionTitleText(text)}
            markLessonAsComplete={markLessonAsComplete}
            isThisLessonComplete={isThisLessonComplete}
            setShowCopyrightsModal={setShowCopyrightsModal}
            activeGroup={activeGroup}
            activeDatabase={activeDatabase}
            isDark={isDark}
            t={t}
            isRTL={isRTL}
            sectionTitleOpacity={sectionTitleOpacity}
            sectionTitleYTransform={sectionTitleYTransform}
          />
        </View>
      ) : (
        // Altered page used only for book/audiobook lessons.
        <LessonTextViewer
          lessonTextContentRef={lessonTextContentRef}
          thisLesson={thisLesson}
          lessonType={lessonType}
          sectionOffsets={sectionOffsets}
          markLessonAsComplete={markLessonAsComplete}
          isThisLessonComplete={isThisLessonComplete}
          activeGroup={activeGroup}
          activeDatabase={activeDatabase}
          isDark={isDark}
          t={t}
          isRTL={isRTL}
        />
      )}
    </View>,
  ]

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <PagerView
        ref={playScreenSwiperRef}
        style={{ flex: 1 }}
        initialPage={
          // The page order is reversed for RTL languages, so we need to start on the second page instead of the first page. Also, we want to start on the text page for book lessons since the user's only option is to read the text.
          lessonType === LessonType.BOOK ? (isRTL ? 0 : 1) : isRTL ? 1 : 0
        }
        // scrollEnabled={!isScrollBarDragging.current && !isScrolling.current}
        onPageSelected={({ nativeEvent }) => {
          setActivePage(nativeEvent.position)
        }}
      >
        {isRTL ? pages.reverse() : pages}
      </PagerView>
      <View style={styles.pageDotsContainer}>
        <PageDots
          numDots={2}
          activeDot={activePage}
          isRTL={isRTL}
          isDark={isDark}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageDotsContainer: {
    width: '100%',
    height: 40 * scaleMultiplier,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionHeaderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: gutterSize,
    height: 50 * scaleMultiplier,
    zIndex: 1,
  },
})

export default PlayScreenSwiper
