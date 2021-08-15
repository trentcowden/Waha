import { TextStyle } from 'react-native'
import { isTablet, scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { languages } from '../languages'
/**
 * Takes in some text style settings and returns a filled out text style object. This is used simply to save space in components and simplify things overall. Used within the style prop of a text component. For example:
 * <Text style={type(activeGroup.language,
 *  props,
 *  'p',
 *  'Regular',
 *  'left',
 *  colors(isDark).text
 * )}/>
 * @export
 * @param {Object} props - The props from the component that calls this function. Notably includes the font name for the active group and whether the active group's language is RTL.
 * @param {string} fontSize - The size of the font. Can be "d" (for detail), "p" (for paragraph), "h4" (for header 4), "h3" (for header 3), "h2" (for header 2), or "h1" (for header 1).
 * @param {string} fontFamily - The family, or weight, of the font. Can be "Regular", "Bold", or "Black".
 * @param {string} textAlign - The alignment of the text. Can be "center" which aligns text center or "left" which aligns text left or right depending on whether we need to be RTL.
 * @param {string} color - The color of the font. Can be any color for the colors object in ./colors.js.
 * @return {Object} - The completed style object.
 */
export const type = (
  languageID: string,
  fontSize: 'd' | 'p' | 'h4' | 'h3' | 'h2' | 'h1',
  fontFamily: 'Regular' | 'Bold' | 'Black',
  textAlign: 'left' | 'center',
  color: string
): TextStyle => {
  var languageInfo = info(languageID)

  // A font size modifier that makes all Arabic script a point smaller and increases the font size on tablets.
  var fontSizeModifier = 0
  fontSizeModifier += languageInfo.font === 'NotoSansArabic' ? -1 : 0
  fontSizeModifier += isTablet ? 2 : 0

  // The options for font families.
  const families = {
    Regular: languageInfo.font + '-Regular',
    Bold: languageInfo.font + '-Bold',
    Black: languageInfo.font + '-Black'
  }

  // The options for font sizes.
  const sizes = {
    d: 12 * scaleMultiplier,
    p: 14 * scaleMultiplier,
    h4: 16 * scaleMultiplier,
    h3: 18 * scaleMultiplier,
    h2: 24 * scaleMultiplier,
    h1: 36 * scaleMultiplier
  }

  // The options for font alignments.
  const alignments: {
    left: 'left' | 'right'
    center: 'center'
  } = {
    left: languageInfo.isRTL ? 'right' : 'left',
    center: 'center'
  }

  // Return the completed style object.
  return {
    fontSize: sizes[fontSize] + fontSizeModifier,
    fontFamily: languageInfo.font ? families[fontFamily] : undefined,
    textAlign: alignments[textAlign],
    color: color
  }
}

/**
 * Get the font used for whatever language the user's phone is set to. If the system is not included in the languages object declared in languages.js, the font defaults to Roboto. For example, if the user has the English language instance installed but their phone is set to Arabic, this function will return the name of the font used for Arabic.
 * @export
 * @return {string} - The name of the font to use.
 */
// export const getSystemFont = () => {
//   var systemFont = 'Roboto'
//   languages.forEach(languageFamily => {
//     if (i18n.locale.slice(0, 2) === languageFamily.languageFamilyID) {
//       systemFont = languageFamily.font
//     }
//   })
//   return systemFont
// }

/**
 * Get the font used for whatever language is associated with the active group. For example, if the user has the English language instance installed but their phone is set to Arabic, this function will return the name of the font used for English.
 * @export
 * @return {string} - The name of the font to use.
 */
export const getLanguageFont = (languageID: string) => {
  var languageFont
  languages.forEach(languageFamily => {
    if (
      languageFamily.data.some(language => language.languageID === languageID)
    )
      languageFont = languageFamily.font
  })
  return languageFont
}
