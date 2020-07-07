import { Dimensions ***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import i18n from 'i18n-js'

export const scaleMultiplier = Dimensions.get('window').width / 430

export const languageT2S = {
  en: require('./assets/languageT2S/en.mp3'),
  da: require('./assets/languageT2S/te.mp3'),
  english: require('./assets/languageT2S/en.mp3')
***REMOVED***

export const languages = [
  {
    title: 'English',
    i18nName: 'english',
    data: [
      {
        nativeName: 'English (Global)',
        wahaID: 'en',
        i18nName: 'englishGlobal'
      ***REMOVED***,
      { nativeName: 'English (UK)', wahaID: 'uk', i18nName: 'englishUK' ***REMOVED***,
      {
        nativeName: 'English (Australia)',
        wahaID: 'as',
        i18nName: 'englishAustralia'
      ***REMOVED***
    ]
  ***REMOVED***,
  {
    title: 'اَلْعَرَبِيَّةُ',
    i18nName: 'arabic',
    data: [
      {
        nativeName: 'اللهجة المغربية',
        wahaID: 'da',
        i18nName: 'darija'
      ***REMOVED***,
      {
        nativeName: 'ليبي‎',
        wahaID: 'la',
        i18nName: 'laarbia'
      ***REMOVED***
    ]
  ***REMOVED***,
  {
    title: 'Français',
    i18nName: 'french',
    data: [
      {
        nativeName: 'Français',
        wahaID: 'fr',
        i18nName: 'french'
      ***REMOVED***
    ]
  ***REMOVED***
]
