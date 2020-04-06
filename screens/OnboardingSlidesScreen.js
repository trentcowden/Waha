//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, Dimensions ***REMOVED*** from 'react-native';
import i18n from 'i18n-js';

//redux imports
import { setFirstOpen, setIsReadyToStart, addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { connect ***REMOVED*** from 'react-redux'
import { createGroup, changeActiveGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'


function OnboardingSlidesScreen(props) {


   //////////////////////////////////////////
   ////STATE, CONSTRUCTOR, AND NAVIGATION////
   //////////////////////////////////////////


   useEffect(() => {
      props.setFirstOpen(false)
      var language = props.route.params.selectedLanguage
      props.addLanguage(language)
      props.createGroup('Group 1', language)
      props.changeActiveGroup('Group 1')
   ***REMOVED***, [])

   const [pageNumber, setPageNumber] = useState(0)
   const [flatListRef, setFlatListRef] = useState()

   const onViewRef = React.useRef(({ viewableItems ***REMOVED***) => {
      if (viewableItems) {
         setPageNumber(viewableItems[0].index)
      ***REMOVED***
   ***REMOVED***)

   const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

   useEffect(() => {
      if (flatListRef) {
         flatListRef.scrollToIndex({ index: pageNumber ***REMOVED***)
      ***REMOVED***
   ***REMOVED***, [pageNumber])

   ///////////////////////
   ////OTHER FUNCTIONS////
   ///////////////////////

   function incrementPageNumber(direction) {
      if (direction === "next") {
         setPageNumber(oldPageNumber => oldPageNumber += 1)
      ***REMOVED*** else {
         setPageNumber(oldPageNumber => oldPageNumber -= 1)
      ***REMOVED***
   ***REMOVED***

   i18n.translations = {
      en: {
         title0: 'Welcome!',
         body0: 'Here is how to use this app.',
         title1: 'Discover God’s truth the Holy Bible.',
         body1: 'Each story brings insight for your group to discover the love and purpose of God.',
         title2: 'Gather a small group.',
         body2: 'Lessons are audio based, so gather a small group of friends or family to listen to bible stories and to discuss them.',
         title3: 'Lets get everything set up!',
         body3: 'We’ve started downloading some necessary files for you. This process usually takes between 1 to 3 minutes.',
         prev: 'Previous',
         next: 'Next',
         finish: 'Finish'
      ***REMOVED***,
   ***REMOVED***;

   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////

   const onboardingData = [
      {
         key: '0',
         imageSource: require('../assets/onboarding/onboarding1.png'),
         title: i18n.t('title0'),
         body: i18n.t('body0'),
      ***REMOVED***,
      {
         key: '1',
         imageSource: require('../assets/onboarding/onboarding2.png'),
         title: i18n.t('title1'),
         body: i18n.t('body1'),
      ***REMOVED***,
      {
         key: '2',
         imageSource: require('../assets/onboarding/onboarding3.png'),
         title: i18n.t('title2'),
         body: i18n.t('body2'),
      ***REMOVED***,
      {
         key: '3',
         imageSource: require('../assets/onboarding/onboarding4.png'),
         title: i18n.t('title3'),
         body: i18n.t('body3'),
      ***REMOVED***
   ]

   function finishOnboarding() {
      props.setIsReadyToStart(true)
      props.navigation.navigate('Loading')
   ***REMOVED***

   function renderOnboardingSlide(slideList) {
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

   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View style={styles.onboardingSequence***REMOVED***>
            <FlatList
               renderItem={renderOnboardingSlide***REMOVED***
               data={onboardingData***REMOVED***
               ref={(ref) => { setFlatListRef(ref) ***REMOVED******REMOVED***
               horizontal={true***REMOVED***
               pagingEnabled={true***REMOVED***
               snapToAlignment={"start"***REMOVED***
               snapToInterval={Dimensions.get('window').width***REMOVED***
               decelerationRate={"fast"***REMOVED***
               onViewableItemsChanged={onViewRef.current***REMOVED***
               viewabilityConfig={viewConfigRef.current***REMOVED***
            />
            <View style={styles.buttonsContainer***REMOVED***>
               <View>
                  {pageNumber > 0 ? <Button title={i18n.t('prev')***REMOVED*** onPress={() => incrementPageNumber("prev")***REMOVED*** /> : null***REMOVED***
               </View>
               <View>
                  <Button title={pageNumber !== 3 ? i18n.t('next') : i18n.t('finish')***REMOVED*** onPress={pageNumber !== 3 ? () => incrementPageNumber("next") : finishOnboarding***REMOVED*** />
               </View>
            </View>
         </View>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#F7F7F7",
      flexDirection: "column",
      justifyContent: "space-between",
   ***REMOVED***,
   onboardingSequence: {
      flex: 1,
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 50,
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      borderColor: "#1D1E20",
      borderWidth: 2,
      flexDirection: "column",
      justifyContent: "space-between",
   ***REMOVED***,
   pageContainer: {
      flexDirection: "column",
      justifyContent: "center",
      width: Dimensions.get("window").width - 64
   ***REMOVED***,
   imageContainer: {
      justifyContent: "center",
      alignItems: "center",
   ***REMOVED***,
   image: {
      resizeMode: "center",
      width: 321,
      height: 272,
      padding: 100
   ***REMOVED***,
   titleContainer: {
      width: "100%",
      padding: 20,
   ***REMOVED***,
   title: {
      textAlign: "center",
      fontSize: 24,
      flexWrap: "wrap",
      fontFamily: "bold"
   ***REMOVED***,
   bodyContainer: {
      width: "100%",
      padding: 20,
   ***REMOVED***,
   body: {
      textAlign: "center",
      fontSize: 18,
      flexWrap: "wrap",
      fontFamily: "regular"
   ***REMOVED***,
   buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 20,
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   return {
      isFetching: state.database.isFetching
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      setFirstOpen: toSet => dispatch(setFirstOpen(toSet)),
      addLanguage: language => dispatch(addLanguage(language)),
      changeLanguage: language => dispatch(changeLanguage(language)),
      setIsReadyToStart: toSet => dispatch(setIsReadyToStart(toSet)),
      createGroup: (groupName, language) => dispatch(createGroup(groupName, language)),
      changeActiveGroup: name => { dispatch(changeActiveGroup(name))***REMOVED***
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSlidesScreen);