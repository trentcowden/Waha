import React, { useEffect ***REMOVED*** from 'react'
import { Dimensions, Image, StyleSheet, View ***REMOVED*** from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
function SecurityOnboardingScreen (props) {
  //// STATE

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //// NAV OPTIONS
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

  // //// FUNCTIONS

  // tells redux that we're ready to go to loading screen once onboarding is finished
  function finishOnboarding () {
    props.navigation.navigate('KeyOrderSet_Initial')
  ***REMOVED***

  //// RENDER

  const onboardingData = [
    {
      backgroundColor: colors.white,
      image: (
        <Image
          style={styles.image***REMOVED***
          source={require('../assets/onboarding/onboarding1.png')***REMOVED***
        />
      ),
      title: props.translations.security.popups.onboarding_1_title,
      subtitle: props.translations.security.popups.onboarding_1_message
    ***REMOVED***,
    {
      backgroundColor: colors.white,
      image: (
        <Image
          style={styles.image***REMOVED***
          source={require('../assets/onboarding/onboarding2.png')***REMOVED***
        />
      ),
      title: props.translations.security.popups.onboarding_2_title,
      subtitle: props.translations.security.popups.onboarding_2_message
    ***REMOVED***,
    {
      backgroundColor: colors.white,
      image: (
        <Image
          style={styles.image***REMOVED***
          source={require('../assets/onboarding/onboarding3.png')***REMOVED***
        />
      ),
      title: props.translations.security.popups.onboarding_3_title,
      subtitle: props.translations.security.popups.onboarding_3_message
    ***REMOVED***
  ]

  return (
    <View style={styles.screen***REMOVED***>
      <Onboarding
        pages={onboardingData***REMOVED***
        showSkip={false***REMOVED***
        onDone={finishOnboarding***REMOVED***
        nextLabel={props.translations.general.next***REMOVED***
        containerStyles={{ marginTop: 0 ***REMOVED******REMOVED***
        imageContainerStyles={{
          paddingBottom: Dimensions.get('window').width < 700 ? 0 : 60
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    flexDirection: 'column',
    justifyContent: 'space-between'
  ***REMOVED***,
  image: {
    resizeMode: 'center',
    width:
      Dimensions.get('window').width < 700
        ? 241 * scaleMultiplier
        : 321 * scaleMultiplier,
    height:
      Dimensions.get('window').width < 700
        ? 204 * scaleMultiplier
        : 272 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

////REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    translations: state.database[activeGroup.language].translations
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityOnboardingScreen)
