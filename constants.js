import { Dimensions ***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'

export const scaleMultiplier = Dimensions.get('window').width / 430

export const languageT2S = {
  en: require('./assets/languageT2S/en.mp3'),
  te: require('./assets/languageT2S/te.mp3')
***REMOVED***

export const languages = [
  {
    title: 'English',
    data: ['English (Global)', 'English (UK)', 'English (Australia)']
  ***REMOVED***,
  { title: 'اَلْعَرَبِيَّةُ', data: ['ليبي', 'الدارجة', 'خليجي'] ***REMOVED***
]
