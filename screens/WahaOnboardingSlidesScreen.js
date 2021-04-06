import i18n from 'i18n-js'
import React from 'react'
import { SafeAreaView, StyleSheet ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OnboardingSwiper from '../components/OnboardingSwiper'
import { getSystemIsRTL ***REMOVED*** from '../constants'
import { setHasOnboarded ***REMOVED*** from '../redux/actions/databaseActions'
import { colors ***REMOVED*** from '../styles/colors'
import ar from '../translations/ar.json'
import en from '../translations/en.json'

i18n.translations = {
  en,
  ar
***REMOVED***

function mapStateToProps (state) {
  return {***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setHasOnboarded: toSet => dispatch(setHasOnboarded(toSet))
  ***REMOVED***
***REMOVED***

const WahaOnboardingSlidesScreen = ({
  // Props passed from navigation.
  navigation: { navigate ***REMOVED***,
  route: {
    // Props passed from previous screen.
    params: { selectedLanguage ***REMOVED***
  ***REMOVED***,
  // Props passed from redux.
  setHasOnboarded
***REMOVED***) => {
  //+ FUNCTIONS

  // tells redux that we're ready to go to loading screen once onboarding is finished
  function finishOnboarding () {
    setHasOnboarded(true)
    navigate('Loading', {
      selectedLanguage: selectedLanguage
    ***REMOVED***)
  ***REMOVED***

  //+ RENDER

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <OnboardingSwiper
        sources={[
          require('../assets/onboardingImages/onboarding1.png'),
          require('../assets/onboardingImages/onboarding2.png'),
          require('../assets/onboardingImages/onboarding3.png'),
          require('../assets/onboardingImages/onboarding4.png')
        ]***REMOVED***
        titles={[
          i18n.t('title0'),
          i18n.t('title1'),
          i18n.t('title2'),
          i18n.t('title3')
        ]***REMOVED***
        messages={[
          i18n.t('body0'),
          i18n.t('body1'),
          i18n.t('body2'),
          i18n.t('body3')
        ]***REMOVED***
        onFinish={finishOnboarding***REMOVED***
        nextTranslation={i18n.t('next')***REMOVED***
        startTranslation={i18n.t('start')***REMOVED***
        useDefaultFont={true***REMOVED***
        isRTL={getSystemIsRTL()***REMOVED***
      />
    </SafeAreaView>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    justifyContent: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WahaOnboardingSlidesScreen)
