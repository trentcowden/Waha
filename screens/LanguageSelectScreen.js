//imports
import React, { useState, useEffect, useRef ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Picker, TouchableOpacity ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { Audio ***REMOVED*** from 'expo-av';
import { scaleMultiplier ***REMOVED*** from '../constants'

//redux imports
import { connect ***REMOVED*** from 'react-redux'

function LanguageSelectScreen(props) {


   //////////////////////////////////////////
   ////STATE, CONSTRUCTOR, AND NAVIGATION////
   //////////////////////////////////////////


   //state for our selected language; set default to english
   const [selectedLanguage, setSelectedLanguage] = useState('en')

   //sound for the text to speech
   const soundObject = new Audio.Sound();

   //onboarding translations for language select screen
   i18n.translations = {
      en: {
         welcome: 'Hello and welcome!',
         selectLanguage: 'Please select your language.',
         letsBegin: 'Let\'s begin!'
      ***REMOVED***,
   ***REMOVED***;

   //set language based on user's language vs user's location?
   useEffect(() => {
      i18n.locale = Localization.locale;
      i18n.fallbacks = true;
   ***REMOVED***, [])

   //function to navigate to the play screen
   //props.navigation.navigate takes us to the play screen
   //params is the information we want to pass to play screen
   function navigateToOnboarding() {
      // console.log(`type of language parameter passed: ${typeof selectedLanguage***REMOVED***`)
      // console.log(`language parameter passed: ${selectedLanguage***REMOVED***`)
      props.navigation.navigate('OnboardingSlides', {selectedLanguage: selectedLanguage***REMOVED***)
   ***REMOVED***

   async function playAudio() {
      soundObject.unloadAsync();
      switch (i18n.locale) {
         case 'en':
            await soundObject
               .loadAsync(require('../assets/language_mp3s/en.mp3'))
               .then(() => {
                  soundObject.playAsync()
               ***REMOVED***)
            break;
      ***REMOVED***
      //await soundObject.playAsync();
   ***REMOVED***




   function onPickerChange(language) {
      //console.log(language)
      setSelectedLanguage(language)
      i18n.locale = language
   ***REMOVED***

   //console.log(i18n.locale)

   ///////////////////////
   ////OTHER FUNCTIONS////
   ///////////////////////


   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////


   //create modal in here, pass state to show it to lesson item so lesson item
   //can change it and show the modal on this screen
   return (
      <View style={styles.screen***REMOVED***>
         <View>
            <Text style={styles.title***REMOVED***> {i18n.t('welcome')***REMOVED***</Text>
            <Text style={styles.subtitle***REMOVED***> {i18n.t('selectLanguage')***REMOVED***</Text>
         </View>
         <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 ***REMOVED******REMOVED***>
            <View style={{ flex: 1 ***REMOVED******REMOVED***>
               <Picker
                  selectedValue={selectedLanguage***REMOVED***
                  onValueChange={(language) => onPickerChange(language)***REMOVED***
                  mode="dropdown"
               >
                  <Picker.Item label="🇺🇸English" value="en" />
                  <Picker.Item label="⭐️Klingon" value="kl" />
               </Picker>
            </View>
            <View style={{***REMOVED******REMOVED***>
               <Ionicons.Button
                  name="ios-volume-high"
                  size={30***REMOVED***
                  backgroundColor="rgba(0,0,0,0)"
                  color="black"
                  onPress={playAudio***REMOVED***
               // style={{width: 20***REMOVED******REMOVED***
               />
            </View>
         </View>
         <TouchableOpacity onPress={navigateToOnboarding***REMOVED*** style={styles.button***REMOVED***>
            <Text style={styles.buttonTitle***REMOVED***>{i18n.t('letsBegin')***REMOVED*** </Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

LanguageSelectScreen.navigationOptions = navigationData => {
   return {
      headerShown: false
   ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F7F7F7"
   ***REMOVED***,
   title: {
      textAlign: "center",
      fontSize: 36 * scaleMultiplier,
      fontFamily: 'bold',
      margin: 5
   ***REMOVED***,
   subtitle: {
      textAlign: "center",
      fontSize: 24 * scaleMultiplier,
      fontFamily: 'medium'
   ***REMOVED***,
   button: {
      width: 200,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1D1E20",
      borderRadius: 5
   ***REMOVED***,
   buttonTitle: {
      textAlign: "center",
      fontSize: 24 * scaleMultiplier,
      fontFamily: 'medium',
      color: "#FFFFFF"
   ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
   return {
      downloads: state.downloads,
      appProgress: state.appProgress,
      database: state.database
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      addLanguage: language => dispatch(addLanguage(language)),
      changeLanguage: language => dispatch(changeLanguage(language)),
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelectScreen);