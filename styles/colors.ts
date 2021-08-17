import { LanguageID, languages } from '../languages'

type ColorName = string
type Color = string

/**
 * Gets a set of colors for either light mode or dark mode.
 */
export const colors = (
  isDark: boolean,
  languageID?: LanguageID
): Record<ColorName, Color> => {
  // Get the accent color if languageID was provided as an argument.
  var accentColor = ''

  if (languageID !== null)
    // Go through each language in each language family until we find the one that matches with our ID, then set accentColor to the accent color of that language.
    languages.forEach(languageFamily => {
      languageFamily.data.forEach(language => {
        if (language.versions !== undefined) {
          language.versions.forEach(version => {
            if (version.languageID === languageID) {
              accentColor = isDark
                ? language.colors.dark
                : language.colors.light
            }
          })
        } else {
          if (language.languageID === languageID) {
            accentColor = isDark ? language.colors.dark : language.colors.light
          }
        }
      })
    })

  // Return either the light or dark mode colors.
  if (!isDark)
    return {
      // Light mode colors.
      accent: accentColor,
      brand: '#E63946',
      text: '#2D3336',
      secondaryText: '#717F86',
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
      highlightShadow: '#2986BB',
      bg1Shadow: '#D1D8DB'
    }
  else
    return {
      // Dark mode colors.
      accent: accentColor,
      brand: '#E63946',
      text: '#EFF4F6',
      secondaryText: '#B1BBC3',
      textOnColor: '#24292C',
      icons: '#D4DDE1',
      disabled: '#8C969D',
      bg1: '#24292C',
      bg2: '#2E3538',
      bg3: '#30383B',
      bg4: '#363E42',
      success: '#9BC988',
      successShadow: '#769769',
      error: '#FB7F8E',
      errorShadow: '#CA6874',
      highlight: '#91C8E7',
      highlightShadow: '#6A95AD',
      bg1Shadow: '#1B1F21'
    }
}

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
