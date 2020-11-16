import React, { useEffect ***REMOVED*** from 'react'
import { StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OnboardingSwiper from '../components/OnboardingSwiper'
import BackButton from '../components/standard/BackButton'
import { colors ***REMOVED*** from '../constants'

function SecurityOnboardingSlidesScreen (props) {
  //+ STATE

  //+ CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ NAV OPTIONS
  function getNavOptions () {
    return {
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //+ RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <OnboardingSwiper
        isRTL={props.isRTL ? true : false***REMOVED***
        sources={[
          require('../assets/onboarding/security_onboarding1.png'),
          require('../assets/onboarding/security_onboarding2.png'),
          require('../assets/onboarding/security_onboarding3.png'),
          require('../assets/onboarding/security_onboarding4.png')
        ]***REMOVED***
        titles={[
          props.translations.security.popups.onboarding_1_title,
          props.translations.security.popups.onboarding_2_title,
          props.translations.security.popups.onboarding_3_title,
          props.translations.security.popups.onboarding_4_title
        ]***REMOVED***
        messages={[
          props.translations.security.popups.onboarding_1_message,
          props.translations.security.popups.onboarding_2_message,
          props.translations.security.popups.onboarding_3_message,
          props.translations.security.popups.onboarding_4_message
        ]***REMOVED***
        onFinish={() => props.navigation.navigate('KeyOrderSet_Initial')***REMOVED***
        nextTranslation={props.translations.general.next***REMOVED***
        startTranslation={props.translations.general.start***REMOVED***
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

//+REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SecurityOnboardingSlidesScreen)
