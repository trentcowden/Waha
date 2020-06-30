import { Dimensions ***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import i18n from 'i18n-js'

export const scaleMultiplier = Dimensions.get('window').width / 430

export const languageT2S = {
  en: require('./assets/languageT2S/en.mp3'),
  te: require('./assets/languageT2S/te.mp3')
***REMOVED***

export const languages = [
  {
    title: 'English',
    data: [
      { name: 'English (Global)', wahaID: 'en', languageCode: 'en' ***REMOVED***,
      { name: 'English (UK)', wahaID: 'uk', languageCode: 'en' ***REMOVED***,
      { name: 'English (Australia)', wahaID: 'as', languageCode: 'en' ***REMOVED***
    ]
  ***REMOVED***,
  { title: 'اَلْعَرَبِيَّةُ', data: ['ليبي', 'الدارجة', 'خليجي'] ***REMOVED***
]
