import { TextStyle } from 'react-native'
import { isTablet, scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { LanguageID } from '../languages'

/**
 * Takes in some text style settings and returns a filled out text style object. This is used simply to save space in components and simplify things overall. Used within the style prop of a text component. For example:
 * <Text style={type(activeGroup.language,
 *  'p',
 *  'Regular',
 *  'left',
 *  colors(isDark).text
 * )}/>
 */
export const type = (
  languageID: LanguageID,
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
