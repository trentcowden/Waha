import en from './en.json'
import ga from './ga.json'
import hc from './hc.json'
import hi from './hi.json'
import ma from './ma.json'
import mr from './mr.json'
import ro from './ro.json'
import ru from './ru.json'
import tr from './tr.json'

export const getTranslations = languageID => {
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
