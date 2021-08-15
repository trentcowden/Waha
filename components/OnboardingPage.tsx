import { AGProps, CommonProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  title: string
  message: string
}

/**
 * A component that's used for a single onboarding page in the various onboarding slides used in Waha.
 * @param {string} title - The title to display on the page.
 * @param {string} message - The message to display on the page.
 * @param {Component} children - Child components to render on the page.
 */
const OnboardingPage: FC<Props> = ({
  // Props passed from a parent component.
  title,
  message,
  children,
  isDark,
  activeGroup,
}): ReactElement => (
  <View
    style={{
      ...styles.onboardingPageContainer,
      backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
    }}
  >
    <View style={styles.textContainer}>
      <Text
        style={{
          ...type(
            activeGroup.language,
            'h2',
            'Bold',
            'center',
            colors(isDark).text
          ),
          fontSize: 24 * scaleMultiplier,
        }}
      >
        {title}
      </Text>
      <View style={{ height: 15 * scaleMultiplier }} />
      <Text
        style={type(
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
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25 * scaleMultiplier,
  },
  childrenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'green',
  },
})

export default OnboardingPage
