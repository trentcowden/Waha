// import SvgUri from 'expo-svg-uri'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { gutterSize, scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/*
  A simple set of 3 components to display different parts of the lesson text.
*/

const HeaderBig = ({ text, activeGroup, onLayout, isDark }) => (
  <View
    style={{
      marginBottom: 10 * scaleMultiplier,
      paddingHorizontal: gutterSize
    }}
    onLayout={onLayout}
  >
    <Text
      style={[
        type(activeGroup.language, 'h2', 'Black', 'left', colors(isDark).icons)
      ]}
    >
      {text}
    </Text>
  </View>
)

const HeaderSmall = ({ text, activeGroup, isTablet, isDark }) => (
  <View>
    <Text
      style={[
        type(
          activeGroup.language,
          'h3',
          'Regular',
          'left',
          colors(isDark).disabled
        ),
        { paddingHorizontal: gutterSize, marginVertical: 5 * scaleMultiplier }
      ]}
    >
      {text}
    </Text>
  </View>
)

const StandardText = ({ text, activeGroup, isTablet, isDark }) => (
  <View>
    <Text
      style={[
        type(
          activeGroup.language,
          'h3',
          'Regular',
          'left',
          colors(isDark).text
        ),
        {
          zIndex: 0,
          paddingHorizontal: gutterSize
        }
      ]}
    >
      {text}
    </Text>
  </View>
)

/**
 * Displays all of the text for the different lesson sections.
 * @param {ref} lessonTextContentRef - The ref for the carousel component of the AlbumArtSwiper. Used to manually jump to specific pages.
 * @param {Object} thisLesson - The object for the lesson that the user has selected to do.
 * @param {string} lessonType - The type of the current lesson. See lessonTypes in constants.js.
 * @param {Object} layouts - The heights of the text content and text window.
 * @param {Function} onScroll - Function that triggers on every scroll event.
 * @param {Object[]} sectionOffsets - Stores the different sections of the lesson text and their global scroll offset.
 */
const LessonTextContent = ({
  // Props passed from a parent component.
  lessonTextContentRef,
  thisLesson,
  lessonType,
  layouts,
  onScroll,
  sectionOffsets,
  setShowCopyrightsModal,
  activeGroup,
  activeDatabase,
  isDark,
  isRTL,
  t
}) => {
  /**
   * Adds a section and its offset in the sectionOffsets array.
   * @param {string} sectionTitle
   * @param {Object} nativeEvent
   */
  const setOffsets = (sectionTitle, nativeEvent) => {
    if (nativeEvent) {
      const thisSection = {
        title: sectionTitle,
        globalOffset: nativeEvent.layout.y
      }

      // Find the index of this section (if it has already been added).
      const indexOfThisSection = sectionOffsets.current.findIndex(
        section => section.title === sectionTitle
      )

      // If section is already present, replace it so it has the most current global offset value. This is so that if the user rotates their tablet, the sectionOffsets will update with new global offset values.
      if (indexOfThisSection > -1)
        sectionOffsets.current[indexOfThisSection] = thisSection
      // If section isn't present, add it to the array.
      else sectionOffsets.current = [...sectionOffsets.current, thisSection]

      // Always sort the array by global offset.
      sectionOffsets.current = sectionOffsets.current.sort(
        (a, b) => a.globalOffset - b.globalOffset
      )
    }
  }

  /** Adds the text window height to the layouts object. */
  const onLayout = event => {
    if (event.nativeEvent)
      layouts.current = {
        ...layouts.current,
        windowHeight: event.nativeEvent.layout.height
      }
  }

  return (
    <ScrollView
      ref={lessonTextContentRef}
      onScroll={onScroll}
      onContentSizeChange={(width, height) =>
        (layouts.current = {
          ...layouts.current,
          contentHeight: height
        })
      }
      onLayout={onLayout}
      removeClippedSubviews={false}
      scrollEventThrottle={256}
      indicatorStyle={isDark ? 'white' : 'black'}
    >
      {!lessonType.includes('BookText') ? (
        <View>
          {/* Used to get the offset for the Fellowship section. */}
          <View
            onLayout={({ nativeEvent }) =>
              setOffsets(t.play.fellowship, nativeEvent)
            }
          />
          {/* Fellowship questions. */}
          {activeDatabase.questions[thisLesson.fellowshipType].map(
            (question, index) => (
              <View key={index}>
                <HeaderSmall
                  text={t.play.question + ' ' + (index + 1).toString()}
                  activeGroup={activeGroup}
                  isDark={isDark}
                />
                <StandardText
                  text={question + '\n'}
                  activeGroup={activeGroup}
                  isDark={isDark}
                />
              </View>
            )
          )}
          {/* Scripture passages. */}
          {thisLesson.scripture.map((scriptureChunk, index) => (
            <View
              key={index}
              onLayout={({ nativeEvent }) => {
                setOffsets(scriptureChunk.header, nativeEvent)
              }}
            >
              <HeaderBig
                text={scriptureChunk.header}
                activeGroup={activeGroup}
                isDark={isDark}
              />
              <StandardText
                text={scriptureChunk.text}
                activeGroup={activeGroup}
                isDark={isDark}
              />
            </View>
          ))}
          {/* <WahaSeparator /> */}
          {t.general.copyrights !== '' && (
            <TouchableOpacity
              onPress={() => setShowCopyrightsModal(true)}
              style={{
                width: '100%',
                paddingVertical: 10 * scaleMultiplier,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingHorizontal: gutterSize,
                marginTop: -20 * scaleMultiplier,
                marginBottom: 20 * scaleMultiplier
              }}
            >
              <Text
                style={type(
                  activeGroup.language,
                  'h4',
                  'Regular',
                  'left',
                  colors(isDark).disabled
                )}
              >
                {t.general.view_copyright}
              </Text>
              {/* <View
              style={
                {
                  // paddingHorizontal: 20,
                  // paddingVertical: 10 * scaleMultiplier
                }
              }
            >
              <Icon
                name='info'
                size={25 * scaleMultiplier}
                color={colors.chateau}
              />
            </View> */}
            </TouchableOpacity>
          )}
          {/* <WahaSeparator /> */}
          {/* Header for application section. */}
          <HeaderBig
            onLayout={({ nativeEvent }) =>
              setOffsets(t.play.application, nativeEvent)
            }
            activeGroup={activeGroup}
            text={t.play.application}
            isDark={isDark}
          />
          {/* Application questions. */}
          {activeDatabase.questions[thisLesson.applicationType].map(
            (question, index) => (
              <View key={index}>
                <HeaderSmall
                  text={t.play.question + ' ' + (index + 1).toString()}
                  activeGroup={activeGroup}
                  isDark={isDark}
                />
                <StandardText
                  text={question + '\n'}
                  activeGroup={activeGroup}
                  isDark={isDark}
                />
              </View>
            )
          )}
          <View style={{ height: 25 }} />
        </View>
      ) : (
        <View style={{ paddingTop: 20 * scaleMultiplier }}>
          <HeaderSmall
            text={thisLesson.title}
            activeGroup={activeGroup}
            isDark={isDark}
          />
          {thisLesson.text.split('\n').map((paragraph, index) => (
            <StandardText
              key={index}
              activeGroup={activeGroup}
              text={paragraph + '\n'}
              isDark={isDark}
            />
          ))}
        </View>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({})

export default LessonTextContent
