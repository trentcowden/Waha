import { locale } from 'i18n-js'
import { languages } from '../languages'

export const info = languageID => {
  // Default values in case the language can't be found.
  var languageInfo = {
    languageFamilyID: 'en',
    font: 'Roboto',
    isRTL: false,
    languageID: 'en',
    nativeName: 'English',
    brandName: 'Discovering God',
    contactEmail: 'developer@waha.app',
    colors: {
      light: '#E74D3D',
      dark: '#EA8E84'
    },
    logos: {
      light:
        'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader.png?alt=media',
      dark:
        'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader-dark.png?alt=media'
    },
    versions: null
  }

  languages.forEach(languageFamily => {
    if (languageFamily.languageFamilyID === languageID) {
      languageInfo = {
        ...languageFamily.data[0],
        isRTL: languageFamily.isRTL,
        font: languageFamily.font
      }
    } else
      languageFamily.data.forEach(language => {
        // If our language has multiple versions, check through each version to find the language we want.
        if (language.versions !== null) {
          language.versions.forEach(version => {
            if (version.languageID === languageID) {
              languageInfo = {
                ...version,
                // Extra keys to return from the language family.
                languageFamilyID: languageFamily.languageFamilyID,
                font: languageFamily.font,
                isRTL: languageFamily.isRTL,
                // Extra keys to return from the language.
                nativeName: language.nativeName
              }
            }
          })
        } else if (language.languageID === languageID) {
          languageInfo = {
            ...language,
            languageFamilyID: languageFamily.languageFamilyID,
            font: languageFamily.font,
            isRTL: languageFamily.isRTL
          }
        }
      })
  })

  return languageInfo
}

/**
 * Gets a list of all the languages and language families available in Waha. These are stored in the languages.js file.
 * @return {Object[]} - An array of language family objects.
 */
export const getAllLanguagesData = (
  t,
  installedLanguageInstances,
  searchTextInput
) => {
  // Sort the languages to put the language family of the phone's current locale at the top.
  const sortByLocale = (a, b) => {
    if (locale.includes(a.languageFamilyID)) return -1
    else if (locale.includes(b.languageFamilyID)) return 1
    else return 0
  }

  // If search text matches with a language family name, show the whole language family. If it doesn't, show the specific languages it matches with.
  const filterBySearch = languageFamily => {
    if (
      t.languages[languageFamily.languageFamilyID]
        .toLowerCase()
        .includes(searchTextInput.toLowerCase())
    )
      return languageFamily
    else
      return {
        ...languageFamily,
        data: languageFamily.data.filter(
          language =>
            language.nativeName
              .toLowerCase()
              .includes(searchTextInput.toLowerCase()) ||
            t.languages[languageFamily.languageFamilyID]
              .toLowerCase()
              .includes(searchTextInput.toLowerCase()) ||
            language.brandName
              .toLowerCase()
              .includes(searchTextInput.toLowerCase())
        )
      }
  }

  // Filter out language instances that are already installed. Only on SubsequentLanguageInstanceInstallScreen.
  const filterInstalledLanguages = languageFamily => {
    if (installedLanguageInstances)
      return {
        ...languageFamily,
        data: languageFamily.data.filter(language => {
          if (
            installedLanguageInstances.some(
              installedLanguage =>
                installedLanguage.languageID === language.languageID
            )
          ) {
            return false
          } else {
            return true
          }
        })
      }
    else return languageFamily
  }

  // Filter our language families that are empty.
  const filterEmptyLanguageFamilies = languageFamily => {
    if (languageFamily.data.length !== 0) return true
    else return false
  }

  // Create our sections array.
  var sections

  sections = languages
    .sort(sortByLocale)
    .map(filterInstalledLanguages)
    .map(filterBySearch)
    .filter(filterEmptyLanguageFamilies)

  // Finally, return the sorted and filtered array of languages.
  return sections
}

export const getInstalledLanguagesData = (database, groups) => {
  var installedLanguageInstances = []

  for (key in database) {
    if (key.length === 2)
      // Add all of this to the installedLanguageInstances array.
      installedLanguageInstances.push({
        ...info(key),
        data: groups.filter(group => group.language === key)
      })
  }

  // If we have the install times stored, sort the languages by the time installed.
  return installedLanguageInstances.some(
    key => database[key.languageID].installTime === null
  )
    ? installedLanguageInstances
    : installedLanguageInstances.sort(
        (a, b) =>
          database[a.languageID].installTime -
          database[b.languageID].installTime
      )
}
