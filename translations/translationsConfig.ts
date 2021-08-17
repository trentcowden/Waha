import { Translations } from 'interfaces/translations'
import en from './en.json'
import ga from './ga.json'
import hc from './hc.json'
import hi from './hi.json'
import ma from './ma.json'
import mr from './mr.json'
import ro from './ro.json'
import ru from './ru.json'
import tr from './tr.json'

/**
 * Gets the translation object for a language given its ID. Note: the parameter is not of type LanguageID because it's possible this function will be called with a language that isn't on Waha. When this happens, we want to return English. There are also keys in the switch statement below that aren't actual languages in Waha. This is because we sometimes need translations based off of a user's phone language. For instance, if a user's phone is set to Arabic, or "ar", we want to return a relevant translations object even though Arabic isn't a language on Waha. Instead, we return the Gulf Arabic translations object.
 */
export const getTranslations = (languageID: string): Translations => {
  switch (languageID) {
    case 'en':
      return en
    case 'ar':
    case 'ga':
      return ga
    case 'ma':
      return ma
    case 'hc':
      return hc
    case 'hi':
      return hi
    case 'mr':
      return mr
    case 'ro':
      return ro
    case 'ru':
      return ru
    case 'tr':
      return tr
    default:
      return en
  }
}
