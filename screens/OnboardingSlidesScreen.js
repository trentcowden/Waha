import i18n from 'i18n-js'
import React, { useEffect ***REMOVED*** from 'react'
import { Dimensions, Image, StyleSheet, View ***REMOVED*** from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import {
  addLanguage,
  changeLanguage,
  setFinishedOnboarding
***REMOVED*** from '../redux/actions/databaseActions'
import { changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import ar from '../translations/ar.json'
// translations import
import en from '../translations/en.json'
import fr from '../translations/fr.json'
function OnboardingSlidesScreen (props) {
  //// STATE

  // translations for language select
  i18n.translations = {
    en,
    fr,
    ar
  ***REMOVED***

  //// CONSTRUCTOR

  useEffect(() => {
    var language = props.route.params.selectedLanguage
    props.addLanguage(language)
  ***REMOVED***, [])

  // //// FUNCTIONS

  // tells redux that we're ready to go to loading screen once onboarding is finished
  function finishOnboarding () {
    props.setFinishedOnboarding(true)
    props.navigation.navigate('Loading')
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
      title: i18n.t('title0'),
      subtitle: i18n.t('body0')
    ***REMOVED***,
    {
      backgroundColor: colors.white,
      image: (
        <Image
          style={styles.image***REMOVED***
          source={require('../assets/onboarding/onboarding2.png')***REMOVED***
        />
      ),
      title: i18n.t('title1'),
      subtitle: i18n.t('body1')
    ***REMOVED***,
    {
      backgroundColor: colors.white,
      image: (
        <Image
          style={styles.image***REMOVED***
          source={require('../assets/onboarding/onboarding3.png')***REMOVED***
        />
      ),
      title: i18n.t('title2'),
      subtitle: i18n.t('body2')
    ***REMOVED***,
    {
      backgroundColor: colors.white,
      image: (
        <Image
          style={styles.image***REMOVED***
          source={require('../assets/onboarding/onboarding4.png')***REMOVED***
        />
      ),
      title: i18n.t('title3'),
      subtitle: i18n.t('body3')
    ***REMOVED***
  ]

  return (
    <View style={styles.screen***REMOVED***>
      <Onboarding
        pages={onboardingData***REMOVED***
        showSkip={false***REMOVED***
        onDone={finishOnboarding***REMOVED***
        nextLabel={i18n.t('next')***REMOVED***
        containerStyles={{
          marginTop: Dimensions.get('window').height > 600 ? 100 : 0,
          justifyContent: 'flex-start'
        ***REMOVED******REMOVED***
        imageContainerStyles={{
          paddingBottom: 0
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

// function renderOnboardingSlide (slideList) {
//   return (
//     <View style={styles.pageContainer***REMOVED***>
//       <View style={styles.titleContainer***REMOVED***>
//         <Text style={styles.title***REMOVED***>{slideList.item.title***REMOVED***</Text>
//       </View>
//       <View style={styles.bodyContainer***REMOVED***>
//         <Text style={styles.body***REMOVED***>{slideList.item.body***REMOVED***</Text>
//       </View>
//       <View style={styles.imageContainer***REMOVED***>
//         <Image source={slideList.item.imageSource***REMOVED*** style={styles.image***REMOVED*** />
//       </View>
//     </View>
//   )
// ***REMOVED***

/* <View style={styles.onboardingSequence***REMOVED***>
        <FlatList
          renderItem={renderOnboardingSlide***REMOVED***
          data={onboardingData***REMOVED***
          ref={ref => {
            setFlatListRef(ref)
          ***REMOVED******REMOVED***
          horizontal={true***REMOVED***
          pagingEnabled={true***REMOVED***
          snapToAlignment={'start'***REMOVED***
          snapToInterval={Dimensions.get('window').width - 64***REMOVED***
          decelerationRate={'fast'***REMOVED***
          getItemLayout={(data, index) => ({
            length: Dimensions.get('window').width - 64,
            offset: Dimensions.get('window').width - 64 * index,
            index
          ***REMOVED***)***REMOVED***
          onViewableItemsChanged={onViewRef.current***REMOVED***
          viewabilityConfig={viewConfigRef.current***REMOVED***
          showsHorizontalScrollIndicator={false***REMOVED***
        />
        <View style={styles.buttonsContainer***REMOVED***>
          <View>
            {pageNumber > 0 ? (
              <TouchableOpacity onPress={() => incrementPageNumber('prev')***REMOVED***>
                <Text>{i18n.t('prev')***REMOVED***</Text>
              </TouchableOpacity>
            ) : null***REMOVED***
          </View>
          <View>
            <TouchableOpacity
              onPress={
                pageNumber !== 3
                  ? () => incrementPageNumber('next')
                  : finishOnboarding
              ***REMOVED***
            >
              <Text>
                {pageNumber !== 3 ? i18n.t('next') : i18n.t('finish')***REMOVED***
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */

// // updates scroll when page number updates
// useEffect(() => {
//   if (flatListRef) {
//     flatListRef.scrollToIndex({ index: pageNumber ***REMOVED***)
//   ***REMOVED***
// ***REMOVED***, [pageNumber])

// // decrements / increments page number
// function incrementPageNumber (direction) {
//   if (direction === 'next') {
//     setPageNumber(oldPageNumber => (oldPageNumber += 1))
//   ***REMOVED*** else {
//     setPageNumber(oldPageNumber => (oldPageNumber -= 1))
//   ***REMOVED***
// ***REMOVED***

// // stuff for flatlist
// const onViewRef = useRef(info => {
//   console.log(info)
//   // if (viewableItems) {
//   //   setPageNumber(viewableItems[0].index)
//   // ***REMOVED***
// ***REMOVED***)
// const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 100 ***REMOVED***)

// // keeps track of current onboarding page number
// const [pageNumber, setPageNumber] = useState(0)

// // reference to change flatlist
// const [flatListRef, setFlatListRef] = useState()
