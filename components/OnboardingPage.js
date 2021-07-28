import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { StandardTypography } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    isDark: state.settings.isDarkModeEnabled,
    activeGroup: activeGroupSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

/**
 * A component that's used for a single onboarding page in the various onboarding slides used in Waha.
 * @param {string} title - The title to display on the page.
 * @param {string} message - The message to display on the page.
 * @param {Component} children - Child components to render on the page.
 */
const OnboardingPage = ({
  // Props passed from a parent component.
  title,
  message,
  children,
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup
}) => (
  <View
    style={[
      styles.onboardingPageContainer,
      { backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3 }
    ]}
  >
    <View style={styles.textContainer}>
      <Text
        style={[
          StandardTypography(
            activeGroup.language,
            'h2',
            'Bold',
            'center',
            colors(isDark).text
          ),
          { fontSize: 24 * scaleMultiplier }
        ]}
      >
        {title}
      </Text>
      <View style={{ height: 15 * scaleMultiplier }} />
      <Text
        style={StandardTypography(
          activeGroup.language,
          'h3',
          'Regular',
          'center',
          colors(isDark).secondaryText
        )}
      >
        {message}
      </Text>
    </View>
    {children}
  </View>
)

const styles = StyleSheet.create({
  onboardingPageContainer: {
    // flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25 * scaleMultiplier
  },
  childrenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'green'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPage)
