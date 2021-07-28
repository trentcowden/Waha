// import SvgUri from 'expo-svg-uri'
import React from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { gutterSize } from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),

    isDark: state.settings.isDarkModeEnabled,

    t: activeDatabaseSelector(state).translations,
    isRTL: getLanguageInfo(activeGroupSelector(state).language).isRTL
  }
}

/**
 *
 */
const LessonTextSectionHeader = ({
  // Props passed from a parent component.
  sectionHeaderYTransform,
  sectionHeaderOpacity,
  sectionTitleText,
  sectionSubtitleText,
  // Props passed from redux.
  activeGroup,
  activeDatabase

  t,
  isRTL
}) => (
  <Animated.View
    style={[
      styles.sectionHeaderContainer,
      {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        opacity: sectionHeaderOpacity,
        transform: [{ translateY: sectionHeaderYTransform }]
      }
    ]}
  >
    <Text>
      <Text
        style={type(
          activeGroup.language,
          'h2',
          'Black',
          'left',
          colors(isDark).text
        )}
      >
        {sectionTitleText}
      </Text>
      {sectionSubtitleText !== '' && (
        <Text
          style={[
            type(
              activeGroup.language,
              'h3',
              'Regular',
              'left',
              colors.oslo
            )
          ]}
        >
          {` / `}
        </Text>
      )}
      {sectionSubtitleText !== '' && (
        <Text
          style={[
            type(
              activeGroup.language,
              'h3',
              'Regular',
              'left',
              colors.oslo
            )
          ]}
        >
          {sectionSubtitleText}
        </Text>
      )}
    </Text>
  </Animated.View>
)

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    width: '100%',
    // backgroundColor: colors(isDark).highlight,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingHorizontal: gutterSize,
    paddingVertical: 10,
    zIndex: 1
  }
})

export default connect(mapStateToProps)(LessonTextSectionHeader)
