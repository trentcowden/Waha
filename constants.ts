import * as FileSystem from 'expo-file-system'
import { Dimensions, PixelRatio } from 'react-native'

/**
 * This file contains a bunch of constants and a few miscellaneous functions that are used globally throughout Waha.
 */

const bundledAssets = require('./assets/downloaded/master-list')

export const isInOfflineMode =
  Object.keys(bundledAssets).length > 2 ? true : false

export const getFileSource = (fileName: string) => {
  if (isInOfflineMode) return bundledAssets[fileName]
  else return { uri: FileSystem.documentDirectory + fileName }
}

/** Set the max font scaling allowed. This is based on the system font scaling that the user sets in their phone's accessibility settings. We limit it so that the text in the app isn't allowed scale above 1.2 times normal size, which would not be good for the UI. */
const fontScale =
  PixelRatio.getFontScale() >= 1.2 ? 1.2 : PixelRatio.getFontScale()

/** If the font scaling is larger than 1, we need to increase the heights of a few components to be able to fit the larger text. This variable acts as a multiplier for the height of those components. */
const heightScaleModifier = 1 + (fontScale - 1) / 2

/**
 * This object stores the heights of a few specific components in Waha that react particularly badly to large font scaling. We need to declare the height of these dynamically, otherwise the text would never fit between a variety of fonts and font scaling. We have separate heights for each font in Waha as well as adding the heightScaleModifier we declared earlier.
 * @export
 * */
export const itemHeights = {
  Roboto: {
    LessonItem: 60 * heightScaleModifier,
    SetItem: 95 * heightScaleModifier
  },
  NotoSansArabic: {
    LessonItem: 83 * heightScaleModifier,
    SetItem: 108 * heightScaleModifier
  }
}

/**
 * This variable stores a multiplier value that we use to scale the dimensions of components throughout the app. It's based on the size of the phone screen. Basically, it shrinks components on smaller phones so that we're able to fit everything we need to on the screen.
 * @export
 * */
export const scaleMultiplier =
  Dimensions.get('window').width > 400
    ? 1
    : Dimensions.get('window').width / 400

export const gutterSize = 15 * scaleMultiplier

export const isTablet = Dimensions.get('window').width > 500 ? true : false
