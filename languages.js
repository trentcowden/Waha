/**
 * This file contains all of the language families and languages in Waha. This is used to populate the LanguageInstanceInstall screen, get the i18n keys for translation, and get the font and RTL status of a language family or language.
 * @param {string} languages[].i18nKey - This is the key that i18n will use to get the translation of this language family’s name in a different language.
 * @param {string} languages[].languageFamilyID - This is language code for this language family. Must be the same as the code for this language used in i18n.
 * @param {string} languages[].font - This is the name of the font that this language family uses.
 * @param {boolean} languages[].isRTL - Whether this language family’s script is RTL or not.
 * @param {Object[]} languages[].data - This is an array of the language instances that are in this language family.
 * @param {string} languages[].data[].nativeName - This is the same as the displayName key in Firestore and will be how the language instance is displayed in-app.
 * @param {string} languages[].data[].languageID - This is the language instance’s 2-letter ID. Must match up with the ID used in Firestore.
 * @param {string} languages[].data[].i18nKey - This is the key that i18n will use to get the translation of this language’s name in a different language. For instance, if the user’s app is set to Arabic, the app will look for an Arabic translation of the “English” language instance in the ar.json translations object (which is the language family, not the language instance) using the i18nKey property in the english language instance object.
 * @param {string} languages[].data[].logoSource - This is the Firebase URL for this language instance’s logo. This is used only to display the logo on the LanguageSelectScreen before any logos have been downloaded to the user’s device.
 */
export const languages = [
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
        logos: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/en%2Fother%2Fheader-dark.png?alt=media'
        },
        versions: null
      }
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
        logos: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/ga%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/ga%2Fother%2Fheader-dark.png?alt=media'
        },
        versions: null
      },
      {
        languageID: 'ma',
        nativeName: 'الدارجة المغربية',
        brandName: 'معرفة الله',
        contactEmail: 'hello@waha.app',
        colors: {
          light: '#006233',
          dark: '#76B798'
        },
        logos: {
          light:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/ma%2Fother%2Fheader.png?alt=media',
          dark:
            'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/ma%2Fother%2Fheader-dark.png?alt=media'
        },
        versions: null
      }
    ]
  }
  // {
  //   languageFamilyID: 'hi',
  //   i18nKey: 'hindi',
  //   font: 'Roboto',
  //   isRTL: false,
  //   data: [
  //     {
  //       languageID: 'hi',
  //       i18nKey: 'hindi',
  //       nativeName: 'हिन्दी',
  //       font: 'Roboto',
  //       versions: [
  //         {
  //           languageID: 'hi',
  //           brandName: 'परमेश्वर को खोजना',
  //           contactEmail: 'zach@quikmail.org',
  //           note: 'Recommended for Hindi backgrounds',
  //           colors: {
  //             light: '#FF9933',
  //             dark: '#FFC58B'
  //           },
  //           logos: {
  //             light:
  //               'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hi%2Fother%2Fheader.png?alt=media',
  //             dark: ''
  //           },
  //           versions: null
  //         },
  //         {
  //           languageID: 'hc',
  //           brandName: 'इब्राहीम की औलाद',
  //           contactEmail: 'zach@quikmail.org',
  //           note: 'Recommended for Muslim backgrounds',
  //           colors: {
  //             light: '2C7A1F',
  //             dark: '#89C17F'
  //           },
  //           logos: {
  //             light:
  //               'https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/hc%2Fother%2Fheader.png?alt=media',
  //             dark: ''
  //           },
  //           versions: null
  //         }
  //       ]
  //     }
  //   ]
  // }
]
