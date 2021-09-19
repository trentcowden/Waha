import { Group } from './redux/reducers/groups'

/*
  When adding a new language:
    1. Add the Language ID to the LanguageID type below.
    2. If necessary, create a new Language Family for the Language. 
    3. Add the new Language as an object in the data array of an existing or the new Language Family.
*/

// All of the available language IDs. Languages that are actually live are marked as such.
export type LanguageID =
  | 'en' // English, live
  | 'ga' // Gulf Arabic, live
  | 'ma' // Moroccan Arabic, in-progress
  | 'hc' // Hindi (Muslim version), live
  | 'hi' // Hindi (Hindu version), live
  | 'mr' // Marathi, live
  | 'ro' // Romanian, in-progress
  | 'ru' // Russian, in-progress
  | 'tr' // Turkish, in-progress
  | 'tu' // Tunisian Arabic, in-progress
  | 'rf' // Tarifit, in-progress
  | 'fr' // French, live
  | 'te' // For a test language.

export type LanguageMetadata = {
  // The ID for a language.
  languageID: LanguageID
  // The name of a language in its own script, i.e. "English".
  nativeName: string
  // The name of the language's brand, i.e. "Discovering God".
  brandName: string
  // An email to send feedback to for users who are using a language.
  contactEmail: string
  // Accent colors for light mode and dark mode for a language in hex form.
  colors: {
    light: string
    dark: string
  }
  // Links to the headers for light mode and dark mode for a language. Thought we download these with a language install, we need the links to display them on the <LanguageSelectScreen /> before the user has selected a language.
  headers: {
    light: string
    dark: string
  }
  // Some languages have multiple versions. This is basically a nested array of languages within a language.
  versions?: LanguageMetadata[]
  // If this object is in the "versions" key for a language, the note would contain a brief description of who that version is targeted to. This helps users decide which version is best for them.
  note?: string
}

// Language families contain multiple languages as well as an ID, a font to be used for all languages in the family, and whether or not the languages in the family are right-to-left.
export interface LanguageFamilyMetadata {
  languageFamilyID: string
  font: string
  isRTL: boolean
  data: LanguageMetadata[]
}

// We want to combine the data for a language family and a language because when we're getting information about a language, we usually need information about its family as well.
export type LanguageInfoIntersection = LanguageMetadata & LanguageFamilyMetadata

// Because LanguageInfo is only for one language, we don't need all the data (array of languages) from the LanguageFamily.
export type LanguageInfo = Omit<LanguageInfoIntersection, 'data'>

// Used for populating screens that have lists of Groups on them, this combines the info for a language with a "data" key which contains an array of Groups for that language.
export type InfoAndGroupsForLanguage = LanguageInfo & {
  data: Group[]
}

// This is an array of info and groups for multiple languages.
export type InfoAndGroupsForAllLanguages = InfoAndGroupsForLanguage[]

/**
 * This is the actual array of languages and language families. Languages that are testing but not live could be commented out.
 */
export const languages: LanguageFamilyMetadata[] = [
  {
    languageFamilyID: 'en',
    font: 'Roboto',
    isRTL: false,
    data: [
      {
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
      // {
      //   languageID: 'te',
      //   nativeName: 'English (Test)',
      //   brandName: 'Discovering God',
      //   contactEmail: 'developer@waha.app',
      //   colors: {
      //     light: '#E74D3D',
      //     dark: '#EA8E84'
      //   },
      //   headers: {
      //     light:
      //       'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader.png?alt=media',
      //     dark:
      //       'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader-dark.png?alt=media'
      //   }
      // }
    ]
  },
  {
    languageFamilyID: 'ar',
    font: 'NotoSansArabic',
    isRTL: true,
    data: [
      {
        languageID: 'ga',
        nativeName: 'الخليج العربي',
        brandName: 'طريق الواحة',
        contactEmail: 'simskimm@protonmail.com',
        colors: {
          light: '#DAA520',
          dark: '#DBBA69'
        },
        headers: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/ga%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/ga%2Fother%2Fheader-dark.png?alt=media'
        }
      }
      // {
      //   languageID: 'ma',
      //   nativeName: 'الدارجة المغربية',
      //   brandName: 'معرفة الله',
      //   contactEmail: 'hello@waha.app',
      //   colors: {
      //     light: '#006233',
      //     dark: '#76B798'
      //   },
      //   headers: {
      //     light:
      //       'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader.png?alt=media',
      //     dark:
      //       'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader-dark.png?alt=media'
      //   }
      // }
    ]
  },
  {
    languageFamilyID: 'fr',
    font: 'Roboto',
    isRTL: false,
    data: [
      {
        languageID: 'fr',
        nativeName: 'Français',
        brandName: 'Découvrir Dieu',
        contactEmail: 'developer@waha.app',
        colors: {
          light: '#318CE7',
          dark: '#70AAE4'
        },
        headers: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/fr%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/fr%2Fother%2Fheader-dark.png?alt=media'
        }
      }
    ]
  },
  {
    languageFamilyID: 'mr',
    font: 'Roboto',
    isRTL: false,
    data: [
      {
        languageID: 'mr',
        nativeName: 'मराठी',
        brandName: 'देवाची शोध',
        contactEmail: 'zach@quikmail.org',
        colors: {
          light: '#ff9933',
          dark: '#FFC58B'
        },
        headers: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/mr%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/mr%2Fother%2Fheader-dark.png?alt=media'
        }
      }
    ]
  },
  {
    languageFamilyID: 'hi',
    font: 'Roboto',
    isRTL: false,
    data: [
      {
        languageID: 'hi',
        nativeName: 'हिन्दी',
        // Some of this info is redundant due to Hindi having multiple versions. For instance, the brandName, contactEmail, colors, and headers will never be used here because only the 2 different versions will be used to get the language information. They're mostly here so that TypeScript doesn't freak out.
        brandName: 'परमेश्वर को खोजना',
        contactEmail: 'zach@quikmail.org',
        colors: {
          light: '#FF9933',
          dark: '#FFC58B'
        },
        headers: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hi%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hi%2Fother%2Fheader-dark.png?alt=media'
        },
        versions: [
          {
            languageID: 'hi',
            nativeName: 'हिन्दी',
            brandName: 'परमेश्वर को खोजना',
            contactEmail: 'zach@quikmail.org',
            colors: {
              light: '#FF9933',
              dark: '#FFC58B'
            },
            headers: {
              light:
                'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hi%2Fother%2Fheader.png?alt=media',
              dark:
                'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hi%2Fother%2Fheader-dark.png?alt=media'
            },
            note: 'उन लोगों के लिए जो हिंदी के साथ अधिक सहज हैं।'
          },
          {
            languageID: 'hc',
            nativeName: 'हिन्दी',
            brandName: 'इब्राहीम की औलाद',
            contactEmail: 'zach@quikmail.org',
            colors: {
              light: '#2C7A1F',
              dark: '#89C17F'
            },
            headers: {
              light:
                'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hc%2Fother%2Fheader.png?alt=media',
              dark:
                'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hc%2Fother%2Fheader-dark.png?alt=media'
            },
            note: 'उन लोगों के लिए जो उर्दू के साथ अधिक सहज हैं।'
          }
        ]
      }
    ]
  }
]
