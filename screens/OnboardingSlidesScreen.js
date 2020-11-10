import i18n from 'i18n-js'
import React, { useEffect ***REMOVED*** from 'react'
import { SafeAreaView, StyleSheet ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OnboardingSwiper from '../components/OnboardingSwiper'
import { colors ***REMOVED*** from '../constants'
import {
  addLanguage,
  changeLanguage,
  setFinishedOnboarding
***REMOVED*** from '../redux/actions/databaseActions'
import { changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import ar from '../translations/ar.json'
// translations import
import en from '../translations/en.json'

function OnboardingSlidesScreen (props) {
  //+ STATE

  // translations for language select
  i18n.translations = {
    en,
    ar
  ***REMOVED***

  //+ CONSTRUCTOR

  useEffect(() => {
    var language = props.route.params.selectedLanguage
    props.addLanguage(language)
  ***REMOVED***, [])

  // //+ FUNCTIONS

  // tells redux that we're ready to go to loading screen once onboarding is finished
  function finishOnboarding () {
    props.setFinishedOnboarding(true)
    props.navigation.navigate('Loading')
  ***REMOVED***

  //+ RENDER

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <OnboardingSwiper
        sources={[
          require('../assets/onboarding/onboarding1.png'),
          require('../assets/onboarding/onboarding2.png'),
          require('../assets/onboarding/onboarding3.png'),
          require('../assets/onboarding/onboarding4.png')
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

//+REDUX

function mapStateToProps (state) {
  return {
    isFetching: state.database.isFetching
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language)),
    setFinishedOnboarding: toSet => dispatch(setFinishedOnboarding(toSet)),
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingSlidesScreen)
