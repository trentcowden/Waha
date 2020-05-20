import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  FlatList,
  Dimensions
***REMOVED*** from 'react-native'
import i18n from 'i18n-js'
import {
  setFinishedOnboarding,
  addLanguage,
  changeLanguage
***REMOVED*** from '../redux/actions/databaseActions'
import { connect ***REMOVED*** from 'react-redux'
import { createGroup, changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'

function OnboardingSlidesScreen (props) {
  //// STATE

  // keeps track of current onboarding page number
  const [pageNumber, setPageNumber] = useState(0)

  // reference to change flatlist
  const [flatListRef, setFlatListRef] = useState()

  // translations
  i18n.translations = {
    en: {
      title0: 'Welcome!',
      body0: 'Here is how to use this app.',
      title1: 'Discover God’s truth the Holy Bible.',
      body1:
        'Each story brings insight for your group to discover the love and purpose of God.',
      title2: 'Gather a small group.',
      body2:
        'Lessons are audio based, so gather a small group of friends or family to listen to bible stories and to discuss them.',
      title3: 'Lets get everything set up!',
      body3:
        'We’ve started downloading some necessary files for you. This process usually takes between 1 to 3 minutes.',
      prev: 'Previous',
      next: 'Next',
      finish: 'Finish'
    ***REMOVED***,
    te: {
      title0: 'sed!',
      body0: 'ultricies lacus sed turpis tincidunt.',
      title1: 'pulvinar neque laoreet suspendisse interdum.',
      body1:
        'duis convallis convallis tellus id interdum velit laoreet id donec.',
      title2: 'turpis tincidunt id aliquet.',
      body2:
        'in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu.',
      title3: 'ac turpis egestas maecenas!',
      body3:
        'varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor.',
      prev: 'nulla',
      next: 'interdum',
      finish: 'nunc'
    ***REMOVED***
  ***REMOVED***

  // stuff for flatlist
  const onViewRef = React.useRef(({ viewableItems ***REMOVED***) => {
    if (viewableItems) {
      setPageNumber(viewableItems[0].index)
    ***REMOVED***
  ***REMOVED***)
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

  //// CONSTRUCTOR

  useEffect(() => {
    var language = props.route.params.selectedLanguage
    props.addLanguage(language)
  ***REMOVED***, [])

  //// FUNCTIONS

  // updates scroll when page number updates
  useEffect(() => {
    if (flatListRef) {
      flatListRef.scrollToIndex({ index: pageNumber ***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [pageNumber])

  // decrements / increments page number
  function incrementPageNumber (direction) {
    if (direction === 'next') {
      setPageNumber(oldPageNumber => (oldPageNumber += 1))
    ***REMOVED*** else {
      setPageNumber(oldPageNumber => (oldPageNumber -= 1))
    ***REMOVED***
  ***REMOVED***

  // tells redux that we're ready to go to loading screen once onboarding is finished
  function finishOnboarding () {
    props.setFinishedOnboarding(true)
  ***REMOVED***

  //// RENDER

  const onboardingData = [
    {
      key: '0',
      imageSource: require('../assets/onboarding/onboarding1.png'),
      title: i18n.t('title0'),
      body: i18n.t('body0')
    ***REMOVED***,
    {
      key: '1',
      imageSource: require('../assets/onboarding/onboarding2.png'),
      title: i18n.t('title1'),
      body: i18n.t('body1')
    ***REMOVED***,
    {
      key: '2',
      imageSource: require('../assets/onboarding/onboarding3.png'),
      title: i18n.t('title2'),
      body: i18n.t('body2')
    ***REMOVED***,
    {
      key: '3',
      imageSource: require('../assets/onboarding/onboarding4.png'),
      title: i18n.t('title3'),
      body: i18n.t('body3')
    ***REMOVED***
  ]

  function renderOnboardingSlide (slideList) {
    return (
      <View style={styles.pageContainer***REMOVED***>
        <View style={styles.titleContainer***REMOVED***>
          <Text style={styles.title***REMOVED***>{slideList.item.title***REMOVED***</Text>
        </View>
        <View style={styles.bodyContainer***REMOVED***>
          <Text style={styles.body***REMOVED***>{slideList.item.body***REMOVED***</Text>
        </View>
        <View style={styles.imageContainer***REMOVED***>
          <Image source={slideList.item.imageSource***REMOVED*** style={styles.image***REMOVED*** />
        </View>
      </View>
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.onboardingSequence***REMOVED***>
        <FlatList
          renderItem={renderOnboardingSlide***REMOVED***
          data={onboardingData***REMOVED***
          ref={ref => {
            setFlatListRef(ref)
          ***REMOVED******REMOVED***
          horizontal={true***REMOVED***
          pagingEnabled={true***REMOVED***
          snapToAlignment={'start'***REMOVED***
          snapToInterval={Dimensions.get('window').width***REMOVED***
          decelerationRate={'fast'***REMOVED***
          onViewableItemsChanged={onViewRef.current***REMOVED***
          viewabilityConfig={viewConfigRef.current***REMOVED***
          showsHorizontalScrollIndicator={false***REMOVED***
        />
        <View style={styles.buttonsContainer***REMOVED***>
          <View>
            {pageNumber > 0 ? (
              <Button
                title={i18n.t('prev')***REMOVED***
                onPress={() => incrementPageNumber('prev')***REMOVED***
              />
            ) : null***REMOVED***
          </View>
          <View>
            <Button
              title={pageNumber !== 3 ? i18n.t('next') : i18n.t('finish')***REMOVED***
              onPress={
                pageNumber !== 3
                  ? () => incrementPageNumber('next')
                  : finishOnboarding
              ***REMOVED***
            />
          </View>
        </View>
      </View>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    flexDirection: 'column',
    justifyContent: 'space-between'
  ***REMOVED***,
  onboardingSequence: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#1D1E20',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'space-between'
  ***REMOVED***,
  pageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 64
  ***REMOVED***,
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  image: {
    resizeMode: 'center',
    width: 321 * scaleMultiplier,
    height: 272 * scaleMultiplier
  ***REMOVED***,
  titleContainer: {
    width: '100%',
    padding: 20
  ***REMOVED***,
  title: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    flexWrap: 'wrap',
    fontWeight: 'bold'
  ***REMOVED***,
  bodyContainer: {
    width: '100%',
    padding: 20
  ***REMOVED***,
  body: {
    textAlign: 'center',
    fontSize: 18 * scaleMultiplier,
    flexWrap: 'wrap'
  ***REMOVED***,
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20
  ***REMOVED***
***REMOVED***)

////REDUX

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
    createGroup: (groupName, language, imageSource) =>
      dispatch(createGroup(groupName, language, imageSource)),
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingSlidesScreen)
