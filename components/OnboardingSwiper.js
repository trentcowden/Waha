import ViewPager from '@react-native-community/viewpager'
import React, { useState ***REMOVED*** from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'
import {
  getLanguageFont,
  StandardTypography,
  SystemTypography
***REMOVED*** from '../styles/typography'
import WahaButton from './standard/WahaButton'

function OnboardingSwiper ({
  // passed from parent
  isRTL,
  sources,
  titles,
  messages,
  onFinish,
  nextTranslation,
  startTranslation,
  useDefaultFont,
  // passed from redux
  font = null
***REMOVED***) {
  const [onboardingPage, setOnboardingPage] = useState(1)
  const [pagerRef, setPagerRef] = useState()
  var dots = []

  titles.forEach((title, index) => {
    dots.push(
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              index === onboardingPage ? colors.tuna : colors.chateau,
            width:
              index === onboardingPage
                ? 10 * scaleMultiplier
                : 8 * scaleMultiplier,
            height:
              index === onboardingPage
                ? 10 * scaleMultiplier
                : 8 * scaleMultiplier,
            borderRadius:
              index === onboardingPage
                ? 5 * scaleMultiplier
                : 4 * scaleMultiplier
          ***REMOVED***
        ]***REMOVED***
        key={index***REMOVED***
      />
    )
  ***REMOVED***)

  var pages = []
  titles.forEach((title, index) => {
    pages.push(
      <View style={{ flexDirection: 'row', flex: 1 ***REMOVED******REMOVED*** key={index***REMOVED***>
        <View style={styles.page***REMOVED***>
          <Image style={styles.image***REMOVED*** source={sources[index]***REMOVED*** />
          <View>
            <Text
              style={[
                useDefaultFont
                  ? SystemTypography(
                      false,
                      'h2',
                      'Bold',
                      'center',
                      colors.shark
                    )
                  : StandardTypography(
                      { font, isRTL ***REMOVED***,
                      'h2',
                      'Bold',
                      'center',
                      colors.shark
                    ),
                { marginVertical: 10 ***REMOVED***
              ]***REMOVED***
            >
              {titles[index]***REMOVED***
            </Text>
            <Text
              style={
                useDefaultFont
                  ? SystemTypography(
                      false,
                      'h3',
                      'Regular',
                      'center',
                      colors.chateau
                    )
                  : StandardTypography(
                      { font, isRTL ***REMOVED***,
                      'h3',
                      'Regular',
                      'center',
                      colors.chateau
                    )
              ***REMOVED***
            >
              {messages[index]***REMOVED***
            </Text>
          </View>
        </View>

        {/* <View style={{***REMOVED******REMOVED***>
          {index === titles.length - 1 ? (
            <TouchableOpacity onPress={onFinish***REMOVED***>
              <Icon name='check' size={50***REMOVED*** color={colors.tuna***REMOVED*** />
            </TouchableOpacity>
          ) : null***REMOVED***
        </View> */***REMOVED***
      </View>
    )
  ***REMOVED***)

  return (
    <SafeAreaView style={{ flex: 1 ***REMOVED******REMOVED***>
      {/* <TouchableOpacity
        style={{ position: 'absolute', marginTop: 20, marginLeft: 10 ***REMOVED******REMOVED***
        onPress={onFinish***REMOVED***
      >
        <Icon name='cancel' color={colors.oslo***REMOVED*** size={40 * scaleMultiplier***REMOVED*** />
      </TouchableOpacity> */***REMOVED***
      <ViewPager
        ref={ref => (ref ? setPagerRef(ref) : null)***REMOVED***
        // showPageIndicator
        style={styles.pager***REMOVED***
        initialPage={isRTL ? pages.length - 1 : 0***REMOVED***
        onPageSelected={stuff => setOnboardingPage(stuff.nativeEvent.position)***REMOVED***
      >
        {isRTL ? pages.reverse() : pages***REMOVED***
      </ViewPager>
      <View
        style={{
          width: '100%',
          // height: 200 * scaleMultiplier,
          flexDirection: 'column',
          alignSelf: 'flex-end',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 20
        ***REMOVED******REMOVED***
      >
        <WahaButton
          type='filled'
          color={
            isRTL
              ? onboardingPage === 0
                ? colors.apple
                : colors.blue
              : onboardingPage === pages.length - 1
              ? colors.apple
              : colors.blue
          ***REMOVED***
          onPress={
            isRTL
              ? onboardingPage === 0
                ? onFinish
                : () => pagerRef.setPage(onboardingPage - 1)
              : onboardingPage === pages.length - 1
              ? onFinish
              : () => pagerRef.setPage(onboardingPage + 1)
          ***REMOVED***
          label={
            isRTL
              ? onboardingPage === 0
                ? startTranslation
                : nextTranslation
              : onboardingPage === pages.length - 1
              ? startTranslation
              : nextTranslation
          ***REMOVED***
          style={{
            width: Dimensions.get('window').width - 40,
            marginHorizontal: 20,
            height: 68 * scaleMultiplier
          ***REMOVED******REMOVED***
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' ***REMOVED******REMOVED***>
          {dots***REMOVED***
        </View>

        {/* <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            alignItems: isRTL ? 'flex-start' : 'flex-end',
            opacity: checkmarkOpacity
          ***REMOVED******REMOVED***
        >
          {/* <TouchableOpacity onPress={onFinish***REMOVED***> */***REMOVED***
        {/* <TouchableOpacity onPress={onFinish***REMOVED***>
          <Icon name='check' size={50***REMOVED*** color={colors.tuna***REMOVED*** />
        </TouchableOpacity> */***REMOVED***
        {/* </Animated.View> */***REMOVED***
      </View>
      {/* <ViewPager ref={ref => (ref ? console.log(ref.setPage) : null)***REMOVED*** /> */***REMOVED***
    </SafeAreaView>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width * scaleMultiplier * scaleMultiplier,
    height:
      Dimensions.get('window').width * 0.6 * scaleMultiplier * scaleMultiplier,
    borderRadius: 20
  ***REMOVED***,
  pager: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  page: {
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20 * scaleMultiplier
  ***REMOVED***,
  dot: {
    marginHorizontal: 10
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return activeGroup
    ? {
        font: getLanguageFont(activeGroup.language)
      ***REMOVED***
    : {***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(OnboardingSwiper)
