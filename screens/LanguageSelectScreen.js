import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Picker, TouchableOpacity ***REMOVED*** from 'react-native';
import { Ionicons ***REMOVED*** from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { Audio ***REMOVED*** from 'expo-av';
import { scaleMultiplier ***REMOVED*** from '../constants'

function LanguageSelectScreen(props) {

   //// STATE

   // keeps track of language selected in picker (TODO: change default to user's default language)
   const [selectedLanguage, setSelectedLanguage] = useState('en')

   // sound for the text to speech
   const soundObject = new Audio.Sound();

   // translations for language select
   i18n.translations = {
      en: {
         welcome: 'Hello and welcome!',
         selectLanguage: 'Please select your language.',
         letsBegin: 'Let\'s begin!'
      ***REMOVED***,
   ***REMOVED***;

   //// CONSTRUCTOR

   useEffect(() => {
      i18n.locale = Localization.locale;
      i18n.fallbacks = true;
   ***REMOVED***, [])

   //// FUNCTIONS

   // plays text-to-speech audio file of language
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
   ***REMOVED***

   // updates language on picker change
   function onPickerChange(language) {
      setSelectedLanguage(language)
      i18n.locale = language
   ***REMOVED***

   //// RENDER

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
               />
            </View>
         </View>
         <TouchableOpacity onPress={props.navigation.navigate('OnboardingSlides', {selectedLanguage: selectedLanguage***REMOVED***)***REMOVED*** style={styles.button***REMOVED***>
            <Text style={styles.buttonTitle***REMOVED***>{i18n.t('letsBegin')***REMOVED*** </Text>
         </TouchableOpacity>
      </View>
   )
***REMOVED***

//// STYLES

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

export default LanguageSelectScreen