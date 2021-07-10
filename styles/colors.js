/**
 * This file contains the hex codes for all colors used in Waha. The normal colors and the colors used for the piano keys are exported from this file.
 */

import { languages } from '../languages'

export const colors = (isDark, languageID = null) => {
  var accentColor = ''
  if (languageID !== null)
    languages.forEach(languageFamily => {
      languageFamily.data.forEach(language => {
        if (language.versions !== null) {
          language.versions.forEach(version => {
            if (version.wahaID === languageID) {
              accentColor = isDark ? language.colorDark : language.colorLight
            }
          })
        } else {
          if (language.wahaID === langaugeID) {
            accentColor = isDark ? language.colorDark : language.colorLight
          }
        }
      })
    })

  if (!isDark)
    return {
      // Light (default) mode colors.
      accent: accentColor,
      text: '#353E42',
      textOnColor: '#FFFFFF',
      icons: '#4E5A60',
      disabled: '#95A0A6',
      bg1: '#E6EBEE',
      bg2: '#EFF4F6',
      bg3: '#F3F7F9',
      bg4: '#FFFFFF',
      success: '#60C239',
      successShadow: '#54A534',
      error: '#FF0800',
      errorShadow: '#DB0700',
      highlight: '#2D9CDB',
      highlightShadow: '#2986BB'
    }
  else
    return {
      // Dark mode colors.
      accent: accentColor,
      text: '#EFF4F6',
      textOnColor: '#282E31',
      icons: '#BFC9CD',
      disabled: '#9DA5AA',
      bg1: '#464E52',
      bg2: '#424A4E',
      bg3: '#394043',
      bg4: '#282E31',
      success: '#9BC988',
      successShadow: '#769769',
      error: '#FB7F8E',
      errorShadow: '#CA6874',
      highlight: '#91C8E7',
      highlightShadow: '#6A95AD'
    }
}

// // The standard colors used in components in Waha.
// export const colors = {
//   // Used for almost all text.
//   shark: '#1D1E20',

//   // Used as a secondary text color and for some icons.
//   tuna: '#3A3C3F',

//   // Used for grayed out stuff.
//   chateau: '#9FA5AD',

//   // Used for darker borders.
//   oslo: '#828282',

//   // Used in miscellaneous places throughout the app.
//   geyser: '#DEE3E9',

//   // Waha's brand color.
//   waha: '#E63946',

//   // Used for backgrounds, list items, and borders.
//   // Darkest.
//   porcelain: '#EAEEF0',
//   // Medium.
//   athens: '#EFF2F4',
//   // Light.
//   aquaHaze: '#f7f9fa',
//   // Lightest.
//   white: '#FFFFFF',

//   // Used for confirms/positive action buttons/highlights.
//   apple: '#60C239',

//   // Used for cancels/negative action buttons/highlights.
//   red: '#FF0800',

//   // Used for neutral action buttons/highlights.
//   blue: '#2D9CDB',

//   // Used for button 'shadows'.
//   appleShadow: '#54A534',
//   // chateauShadow: '#868A91',
//   redShadow: '#DB0700',
//   blueShadow: '#2986BB',
//   porcelainShadow: '#BFC7CC',
//   wahaShadow: '#CF333F'
// }

// The colors used for each piano key in the PianoApp component.
export const keyColors = {
  0: '#ffe119',
  1: '#3cb44b',
  2: '#4363d8',
  3: '#911eb4',
  4: '#aaffc3',
  5: '#f032e6',
  6: '#e6194B',
  7: '#42d4f4',
  8: '#469990',
  9: '#bfef45',
  10: '#dcbeff',
  11: '#9A6324'
}
