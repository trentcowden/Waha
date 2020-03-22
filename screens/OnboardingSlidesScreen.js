//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, Dimensions ***REMOVED*** from 'react-native';
import i18n from 'i18n-js';

//redux imports
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { setFirstOpen ***REMOVED*** from '../redux/actions/databaseActions'
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'


function OnboardingSlidesScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


  function navigateToLoading() {
    props.navigation.replace("StudySet")
  ***REMOVED***

  useEffect(() => {
    props.setFirstOpen(false)
    var language = props.navigation.getParam("selectedLanguage")
    props.changeLanguage(language)
    props.addLanguage(language)
  ***REMOVED***, [])

  const [pageNumber, setPageNumber] = useState(0)
  const [flatListRef, setFlatListRef] = useState()

  const onViewRef = React.useRef(({viewableItems***REMOVED***)=> {
    if(viewableItems) {
      setPageNumber(viewableItems[0].index)
    ***REMOVED***
  ***REMOVED***)

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

  useEffect(() => {
    if(flatListRef) {
      flatListRef.scrollToIndex({index: pageNumber***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [pageNumber])

  ///////////////////////
  ////OTHER FUNCTIONS////
  ///////////////////////

  function incrementPageNumber(direction) {
    if (direction === "next") {
      setPageNumber(oldPageNumber =>  oldPageNumber += 1)
    ***REMOVED*** else {
      setPageNumber(oldPageNumber => oldPageNumber -= 1)
    ***REMOVED***
  ***REMOVED***

  i18n.translations = {
    en: { 
      title0: 'Welcome to the app!',
      body0: 'Jeff keeps adding new features for me to do :)' ,
      title1: 'I enjoy it though',
      body1: 'Here\'s a picture of me as a kid',
      title2: 'Sometimes when I code,',
      body2: 'I get frustrated and make the face of this cat',
      title3: 'And then I ask myself',
      body3: 'Why do I do it?',
      prev: 'Previous',
      next: 'Next',
      finish: 'Finish'
    ***REMOVED***,
    es: {
      title0: 'Bienvenido a la aplicación!',
      body0: 'Jeff sigue agregando nuevas funciones para que yo haga :)' ,
      title1: 'Aunque lo disfruto',
      body1: 'Aquí hay una foto mía de niño',
      title2: 'A veces cuando codifico,',
      body2: 'Me frustro y hago la cara de este gato',
      title3: 'Y luego me pregunto',
      body3: '¿Por qué lo hago?',
      prev: 'Previo',
      next: 'Siguiente',
      finish: 'Terminar'
    ***REMOVED***
  ***REMOVED***;

  
  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////

  const onboardingData = [
    {
      key: '0',
      imageSource: require('../assets/onboarding/meme1.png'),
      title: i18n.t('title0'),
      body: i18n.t('body0'),
    ***REMOVED***,
    {
      key: '1',
      imageSource: require('../assets/onboarding/meme2.jpg'),
      title: i18n.t('title1'),
      body: i18n.t('body1'),
    ***REMOVED***,
    {
      key: '2',
      imageSource: require('../assets/onboarding/meme3.jpg'),
      title: i18n.t('title2'),
      body: i18n.t('body2'),
    ***REMOVED***,
    {
      key: '3',
      imageSource: require('../assets/onboarding/meme4.jpg'),
      title: i18n.t('title3'),
      body: i18n.t('body3'),
    ***REMOVED***
  ]

  function renderOnboardingSlide(slideList) {
    return (
      <View style={styles.pageContainer***REMOVED***>
        <View style={styles.imageContainer***REMOVED***>
          <Image source={slideList.item.imageSource***REMOVED*** style={styles.image***REMOVED*** />
        </View>
        <View style={styles.titleContainer***REMOVED***>
          <Text style={styles.title***REMOVED***>{slideList.item.title***REMOVED***</Text>
        </View>
        <View style={styles.bodyContainer***REMOVED***>
          <Text style={styles.body***REMOVED***>{slideList.item.body***REMOVED***</Text>
        </View>
      </View>
    )
  ***REMOVED***

  //create modal in here, pass state to show it to lesson item so lesson item
  //can change it and show the modal on this screen
  return (
    <View style={styles.screen***REMOVED***>
        <FlatList 
          renderItem={renderOnboardingSlide***REMOVED***
          data={onboardingData***REMOVED***
          ref={(ref) => {setFlatListRef(ref)***REMOVED******REMOVED***
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
          {pageNumber > 0 ? <Button title= {i18n.t('prev')***REMOVED*** onPress={() => incrementPageNumber("prev")***REMOVED***/>: null***REMOVED***
        </View>
        <View>
          <Button title={pageNumber !== 3 ? i18n.t('next') : i18n.t('finish')***REMOVED*** onPress={pageNumber !== 3 ? () => incrementPageNumber("next") : () => props.navigation.replace("StudySet")***REMOVED***/>
        </View>
      </View>
    </View>
  )
***REMOVED***

OnboardingSlidesScreen.navigationOptions = navigationData => {
  return {
    headerShown: false
  ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  ***REMOVED***,
  pageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: Dimensions.get('window').width,
    flex: 1
  ***REMOVED***,
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  ***REMOVED***,
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "20%",
    padding: 100
  ***REMOVED***,
  titleContainer: {
    width: "100%",
    padding: 20,
  ***REMOVED***,
  title: {
    textAlign: "center",
    fontSize: 50,
    flexWrap: "wrap",
  ***REMOVED***,
  bodyContainer: {
    width: "100%",
    padding: 20,
  ***REMOVED***,
  body: {
    textAlign: "center",
    fontSize: 20,
    flexWrap: "wrap",
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
  //console.log(state)
  return {
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
    setFirstOpen: toSet => dispatch(setFirstOpen(toSet)),
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language)),
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSlidesScreen);