export type DatabaseConfig = {
  globalGroupCounter: number
  hasOnboarded: boolean
  hasFetchedLanguageData: boolean
  hasInstalledFirstLanguageInstance: boolean
  languageCoreFilesDownloadProgress: number
  languageCoreFilesToUpdate: string[]
  actingLanguageID: string | undefined
  recentActiveGroup: string | undefined
}

export type Database = DatabaseConfig & {
  [languageID: string]: DBLanguageData
}

export interface DBLanguageData {
  files: string[]
  questions: {
    [questionSet: string]: string[]
  }
  installTime: number
  sets: StorySet[]
}

export interface StorySet {
  id: string
  languageID: string
  title: string
  subtitle: string
  iconName: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  hasAudio: boolean
  hasVideo: boolean
  fellowshipType?: string
  applicationType?: string
  text?: string
  videoShareLink?: string
  scripture?: ScripturePassage[]
}

export interface ScripturePassage {
  header: string
  addressID: string
  text: string
}

export type CoreFileCreatedTimes = Record<string, number>
