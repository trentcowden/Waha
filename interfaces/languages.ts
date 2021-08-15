import { Group } from '../redux/reducers/groups'

export interface Language {
  languageID: string
  nativeName: string
  brandName: string
  contactEmail: string
  colors: {
    light: string
    dark: string
  }
  logos: {
    light: string
    dark: string
  }
  versions?: Language[]
  note?: string
}

export interface LanguageFamily {
  languageFamilyID: string
  font: string
  isRTL: boolean
  data: Language[]
}

export type LanguageInfoIntersection = Language & LanguageFamily

// Because LanguageInfo is only for one language, we don't need all the data (array of languages) for the LanguageFamily.
export type LanguageInfo = Omit<LanguageInfoIntersection, 'data'>

export type InfoAndGroupsForLanguage = LanguageInfo & {
  data: Group[]
}

export type InfoAndGroupsForAllLanguages = InfoAndGroupsForLanguage[]
