import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PagerView from 'react-native-pager-view'
import { connect } from 'react-redux'
import OnboardingImage from '../components/OnboardingImage'
import OnboardingPage from '../components/OnboardingPage'
import PageDots from '../components/PageDots'
import WahaBackButton from '../components/WahaBackButton'
import WahaButton from '../components/WahaButton'
import { buttonModes, scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

function mapStateToProps(state) {
  return {
    isDark: state.settings.isDarkModeEnabled,
    isRTL: info(activeGroupSelector(state).language).isRTL,
    activeGroup: activeGroupSelector(state),
    t: getTranslations(activeGroupSelector(state).language),
  }
}

const numPages = 4

/**
 * A screen that guides the user through what security mode is.
 */
const SecurityOnboardingSlidesScreen = ({
  // Props passed from navigation.
  navigation: { setOptions, navigate, goBack },
  isRTL,
  isDark,
  t,
  activeGroup,
}) => {
  /** The ref for the pager view. Used to manually swipe pages. */
  const pagerRef = useRef()

  /** Keeps track of onboarding page we're currently on. */
  const [activePage, setActivePage] = useState(0)

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
        : () => <View />,
      headerLeft: isRTL
        ? () => <View />
        : () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          ),
    })
  }, [])

  // The 4 onboarding pages. These are stored here in an array so that we can call pages.reverse() to reverse the order of the pages for RTL languages.
  const pages = [
    <OnboardingPage
      key='1'
      title={t.security.onboarding_1_title}
      message={t.security.onboarding_1_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        source={require('../assets/onboardingImages/security_onboarding1.png')}
        imageType='png'
        isDark={isDark}
      />
    </OnboardingPage>,
    <OnboardingPage
      key='2'
      title={t.security.onboarding_2_title}
      message={t.security.onboarding_2_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        source={require('../assets/onboardingImages/security_onboarding2.png')}
        imageType='png'
        isDark={isDark}
      />
    </OnboardingPage>,
    <OnboardingPage
      key='3'
      title={t.security.onboarding_3_title}
      message={t.security.onboarding_3_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        source={require('../assets/onboardingImages/security_onboarding3.png')}
        imageType='png'
        isDark={isDark}
      />
    </OnboardingPage>,
    <OnboardingPage
      key='4'
      title={t.security.onboarding_4_title}
      message={t.security.onboarding_4_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        source={require('../assets/onboardingImages/security_onboarding4.png')}
        imageType='png'
        isDark={isDark}
      />
    </OnboardingPage>,
  ]

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
      }}
    >
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={isRTL ? numPages - 1 : 0}
        onPageSelected={({ nativeEvent }) =>
          // Set the active page to the new page.
          setActivePage(nativeEvent.position)
        }
      >
        {isRTL ? pages.reverse() : pages}
      </PagerView>
      <View
        style={{
          ...styles.bottomControlsContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        <PageDots
          numDots={numPages}
          activeDot={activePage}
          isRTL={isRTL}
          isDark={isDark}
        />
        <View
          style={{
            ...styles.skipButtonContainer,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => navigate('PianoPasscodeSet')}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={type(
                activeGroup.language,
                'h4',
                'Bold',
                'center',
                colors(isDark).text
              )}
            >
              {t.general.skip}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 20 }} />
        <WahaButton
          label={t.general.continue}
          onPress={
            // This button goes to the next page or finishes onboarding if we're on the last page.
            isRTL
              ? activePage === 0
                ? () => navigate('PianoPasscodeSet')
                : () => pagerRef.current.setPage(activePage - 1)
              : activePage === 3
              ? () => navigate('PianoPasscodeSet')
              : () => pagerRef.current.setPage(activePage + 1)
          }
          mode={buttonModes.SUCCESS}
          extraContainerStyles={{
            // Make the continue button twice as big as the skip button.
            flex: 2,
          }}
          isDark={isDark}
          isRTL={isRTL}
          language={activeGroup.language}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pager: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControlsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  skipButtonContainer: {
    height: 65 * scaleMultiplier,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

export default connect(mapStateToProps)(SecurityOnboardingSlidesScreen)
