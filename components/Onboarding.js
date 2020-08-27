import ViewPager from '@react-native-community/viewpager'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function Onboarding (props) {
  const [onboardingPage, setOnboardingPage] = useState(1)
  const [checkmarkOpacity, setCheckmarkOpacity] = useState(
    new Animated.Value(0)
  )
  const [pagerRef, setPagerRef] = useState()

  useEffect(() => {
    if (onboardingPage === props.titles.length - 1) {
      Animated.timing(checkmarkOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      ***REMOVED***).start()
    ***REMOVED*** else {
      Animated.timing(checkmarkOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      ***REMOVED***).start()
    ***REMOVED***
  ***REMOVED***, [onboardingPage])

  var dots = []
  props.titles.forEach((title, index) => {
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
  props.titles.forEach((title, index) => {
    pages.push(
      <View style={{ flexDirection: 'row', flex: 1 ***REMOVED******REMOVED*** key={index***REMOVED***>
        <View style={styles.page***REMOVED***>
          <Image style={styles.image***REMOVED*** source={props.sources[index]***REMOVED*** />
          <Text
            style={[
              {
                fontFamily: props.font ? props.font + '-medium' : null,
                fontWeight: props.font ? null : 'bold'
              ***REMOVED***,
              styles.title
            ]***REMOVED***
          >
            {props.titles[index]***REMOVED***
          </Text>
          <Text
            style={[
              { fontFamily: props.font ? props.font + '-regular' : null ***REMOVED***,
              styles.message
            ]***REMOVED***
          >
            {props.messages[index]***REMOVED***
          </Text>
        </View>

        {/* <View style={{***REMOVED******REMOVED***>
          {index === props.titles.length - 1 ? (
            <TouchableOpacity onPress={props.onFinish***REMOVED***>
              <Icon name='check' size={50***REMOVED*** color={colors.tuna***REMOVED*** />
            </TouchableOpacity>
          ) : null***REMOVED***
        </View> */***REMOVED***
      </View>
    )
  ***REMOVED***)

  return (
    <View style={{ flex: 1 ***REMOVED******REMOVED***>
      <ViewPager
        ref={ref => (ref ? setPagerRef(ref) : null)***REMOVED***
        // showPageIndicator
        style={styles.pager***REMOVED***
        initialPage={0***REMOVED***
        onPageSelected={stuff => setOnboardingPage(stuff.nativeEvent.position)***REMOVED***
      >
        {pages***REMOVED***
      </ViewPager>
      <View
        style={{
          width: '100%',
          height: 80 * scaleMultiplier,
          flexDirection: 'column',
          alignSelf: 'flex-end',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        ***REMOVED******REMOVED***
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' ***REMOVED******REMOVED***>
          {dots***REMOVED***
        </View>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            alignItems: 'flex-end',
            opacity: checkmarkOpacity
          ***REMOVED******REMOVED***
        >
          {/* <TouchableOpacity onPress={props.onFinish***REMOVED***> */***REMOVED***
          <TouchableOpacity onPress={props.onFinish***REMOVED***>
            <Icon name='check' size={50***REMOVED*** color={colors.tuna***REMOVED*** />
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* <ViewPager ref={ref => (ref ? console.log(ref.setPage) : null)***REMOVED*** /> */***REMOVED***
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width - 100 * scaleMultiplier,
    height: Dimensions.get('window').width - 100 * scaleMultiplier
  ***REMOVED***,
  pager: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  page: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20 * scaleMultiplier
  ***REMOVED***,
  title: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    color: colors.shark
  ***REMOVED***,
  message: {
    textAlign: 'center',
    fontSize: 18 * scaleMultiplier,
    color: colors.oslo,
    marginVertical: 20
  ***REMOVED***,
  dot: {
    marginHorizontal: 10
  ***REMOVED***
***REMOVED***)

export default Onboarding
