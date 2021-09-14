import * as Localization from 'expo-localization'
import { setIsInstallingLanguageInstance } from 'redux/reducers/isInstallingLanguageInstance'
import { AppDispatch } from 'redux/store'
import db from '../firebase/db'
import {
  InfoAndGroupsForAllLanguages,
  InfoAndGroupsForLanguage,
  LanguageFamilyMetadata,
  LanguageID,
  LanguageInfo,
  languages
} from '../languages'
import {
  Database,
  storeLanguageSets,
  storeOtherLanguageContent,
  StorySet
} from '../redux/reducers/database'
import { Group } from '../redux/reducers/groups'
import { Translations } from '../translations/translationsConfig'

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
 * Fetches all the data for a language from the Firestore Database. This includes the various Story Sets from the 'sets' collection and the Language info from the 'languages' collection. It's an async function and doesn't resolve until all the information has been fetched and stored. If any fetch fails, it throws an error.
 */
export const fetchLanguageData = async (
  languageID: LanguageID,
  dispatch: AppDispatch,
  setIsFetchingLanguageData: (isFetching: boolean) => void
) => {
  // Set the installingLanguageInstance redux variable to true since we're now installing a language instance.
  dispatch(setIsInstallingLanguageInstance({ toSet: true }))

  // Set the isFetchingFirebaseData local state to true so that the continue button shows the activity indicator.
  setIsFetchingLanguageData(true)

  // Fetch all the Story Sets with the language ID of the selected language and store them in redux.
  await db
    .collection('sets')
    .where('languageID', '==', languageID)
    .get()
    .then(querySnapshot => {
      // If the data is valid and the current Waha version is greater than or equal to the version in Firebase (we set the shouldWrite variable earlier)...
      if (!querySnapshot.empty) {
        // Create a temp array to hold Story Sets.
        var sets: StorySet[] = []

        // Add Story Sets to our temp array.
        querySnapshot.forEach(doc => {
          var storySetItem: StorySet = {
            id: doc.id,
            languageID: doc.data().languageID,
            title: doc.data().title,
            subtitle: doc.data().subtitle,
            iconName: doc.data().iconName,
            lessons: doc.data().lessons,
            tags: doc.data().tags
          }
          sets.push(storySetItem)
        })

        // Write all of the Story Sets to redux.
        dispatch(storeLanguageSets({ sets, languageID }))
      }
    })
    .catch(error => {
      console.log(error)
      throw error
    })

  // Fetch the Language info for the selected language and store it in redux.
  await db
    .collection('languages')
    .doc(languageID)
    .get()
    .then(async doc => {
      var languageData = doc.data()

      // If we get some legitimate data back...
      if (doc.exists && languageData !== undefined) {
        // Store our Language info in redux.
        dispatch(
          storeOtherLanguageContent({
            files: languageData.files,
            questionSets: languageData.questions,
            languageID
          })
        )
      }
    })
    .catch(error => {
      console.log(error)
      throw error
    })
  return
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
          if (language.versions !== undefined) {
            return !language.versions.every(version =>
              installedLanguageInstances.some(
                installedLanguage =>
                  installedLanguage.languageID === version.languageID
              )
            )
          }
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
