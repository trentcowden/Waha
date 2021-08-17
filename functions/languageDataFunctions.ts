import * as Localization from 'expo-localization'
import { Translations } from 'interfaces/translations'
import {
  InfoAndGroupsForAllLanguages,
  InfoAndGroupsForLanguage,
  LanguageFamilyMetadata,
  LanguageID,
  LanguageInfo,
  LanguageMetadata,
  languages
} from '../languages'
import { Database } from '../redux/reducers/database'
import { Group } from '../redux/reducers/groups'

/**
 * Gets various information about a language.
 */
export const info = (languageID: LanguageID): LanguageInfo => {
  // Default values in case the language can't be found.
  var languageInfo: LanguageInfo = {
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
    headers: {
      light:
        'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader.png?alt=media',
      dark:
        'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader-dark.png?alt=media'
    }
  }

  // Go through each language family to try and find the language we're looking for.
  languages.forEach(languageFamily => {
    // If we're passing in a language family ID for some reason, return the info for the first language in the family.
    if (languageFamily.languageFamilyID === languageID) {
      languageInfo = {
        ...languageFamily.data[0],
        languageFamilyID: languageFamily.languageFamilyID,
        isRTL: languageFamily.isRTL,
        font: languageFamily.font
      }
    } else
      languageFamily.data.forEach(language => {
        // If our language has multiple versions, check through each version to find the language we want.
        if (language.versions !== undefined) {
          language.versions.forEach(version => {
            if (version.languageID === languageID) {
              languageInfo = {
                ...version,
                languageFamilyID: languageFamily.languageFamilyID,
                font: languageFamily.font,
                isRTL: languageFamily.isRTL
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
 * Gets a list of all the languages and language families available in Waha after passing the data through some filters. All languages are stored in the languages.ts file.
 */
export const getAllLanguagesData = (
  t: Translations,
  installedLanguageInstances: InfoAndGroupsForAllLanguages,
  searchTextInput: string
) => {
  // Sort the languages to put the language family of the phone's current locale at the top.
  const sortByLocale = (
    language1: LanguageFamilyMetadata,
    language2: LanguageFamilyMetadata
  ) => {
    if (Localization.locale.includes(language1.languageFamilyID)) return -1
    else if (Localization.locale.includes(language2.languageFamilyID)) return 1
    else return 0
  }

  // If search text matches with a language family name, show the whole language family. If it doesn't, show the specific languages it matches with.
  const filterBySearch = (languageFamily: LanguageFamilyMetadata) => {
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
            t.languages[language.languageID]
              .toLowerCase()
              .includes(searchTextInput.toLowerCase()) ||
            language.brandName
              .toLowerCase()
              .includes(searchTextInput.toLowerCase())
        )
      }
  }

  // Filter out language instances that are already installed. Only on SubsequentLanguageInstanceInstallScreen.
  const filterInstalledLanguages = (languageFamily: LanguageFamilyMetadata) => {
    if (installedLanguageInstances)
      return {
        ...languageFamily,
        data: languageFamily.data.filter(language => {
          if (
            installedLanguageInstances.some(
              (installedLanguage: LanguageMetadata) =>
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
  const filterEmptyLanguageFamilies = (
    languageFamily: LanguageFamilyMetadata
  ) => {
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

/**
 * Gets the info and groups for all installed languages. Used for populating the <GroupsScreen /> and <MobilizationToolsScreen /> since both of those display lists of Groups.
 */
export const getInstalledLanguagesInfoAndGroups = (
  database: Database,
  groups: Group[]
): InfoAndGroupsForAllLanguages => {
  var installedLanguageInstances: InfoAndGroupsForLanguage[] = []

  Object.keys(database).forEach(key => {
    if (key.length === 2)
      // Add all of this to the installedLanguageInstances array.
      installedLanguageInstances.push({
        ...info(key as LanguageID),
        data: groups.filter(group => group.language === key)
      })
  })

  // If we have the install times stored, sort the languages by the time installed.
  installedLanguageInstances = installedLanguageInstances.some(
    key => database[key.languageID].installTime === undefined
  )
    ? installedLanguageInstances
    : installedLanguageInstances.sort(
        (a, b) =>
          database[a.languageID].installTime -
          database[b.languageID].installTime
      )

  return installedLanguageInstances
}

/**
 * Gets the total number of languages currently installed on the user's phone.
 */
export const getTotalNumberOfLanguages = () => {
  var numLanguages = 0

  languages.forEach(languageFamily => {
    languageFamily.data.forEach(language => {
      if (language.versions !== undefined) {
        language.versions.forEach(() => (numLanguages += 1))
      } else numLanguages += 1
    })
  })
  return numLanguages
}
