import React, { useEffect ***REMOVED*** from 'react'
import { StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OnboardingSwiper from '../components/OnboardingSwiper'
import BackButton from '../components/standard/BackButton'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    isRTL: activeDatabaseSelector(state).isRTL,
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

function SecurityOnboardingSlidesScreen ({
  // Props passed from navigation.
  navigation: { setOptions, navigate, goBack ***REMOVED***,
  translations,
  font,
  isRTL,
  activeGroup
***REMOVED***) {
  //+ STATE

  //+ CONSTRUCTOR

  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ NAV OPTIONS
  function getNavOptions () {
    return {
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //+ RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <OnboardingSwiper
        isRTL={isRTL ? true : false***REMOVED***
        sources={[
          require('../assets/onboardingImages/security_onboarding1.png'),
          require('../assets/onboardingImages/security_onboarding2.png'),
          require('../assets/onboardingImages/security_onboarding3.png'),
          require('../assets/onboardingImages/security_onboarding4.png')
        ]***REMOVED***
        titles={[
          translations.security.popups.onboarding_1_title,
          translations.security.popups.onboarding_2_title,
          translations.security.popups.onboarding_3_title,
          translations.security.popups.onboarding_4_title
        ]***REMOVED***
        messages={[
          translations.security.popups.onboarding_1_message,
          translations.security.popups.onboarding_2_message,
          translations.security.popups.onboarding_3_message,
          translations.security.popups.onboarding_4_message
        ]***REMOVED***
        onFinish={() => navigate('KeyOrderSet_Initial')***REMOVED***
        nextTranslation={translations.general.next***REMOVED***
        startTranslation={translations.general.start***REMOVED***
        useDefaultFont={false***REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    flexDirection: 'column',
    justifyContent: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(SecurityOnboardingSlidesScreen)
