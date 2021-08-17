export enum LessonType {
  STANDARD_DBS = 'Questions, Audio',
  STANDARD_DMC = 'Questions, Audio, Video',
  VIDEO_ONLY = 'Video',
  STANDARD_NO_AUDIO = 'Questions',
  BOOK = 'BookText',
  AUDIOBOOK = 'BookText, Audio'
}

export enum Chapter {
  FELLOWSHIP = 1,
  STORY = 2,
  TRAINING = 3,
  APPLICATION = 4
}

export type SetInfoRequest = 'language' | 'index' | 'category'
export type LessonInfoRequest =
  | 'language'
  | 'index'
  | 'setID'
  | 'subtitle'
  | 'category'
  | 'audioSource'
  | 'videoSource'

export type LessonIndex = number
export type SetIndex = number

export enum SetCategory {
  FOUNDATIONAL = 'Foundational',
  TOPICAL = 'Topical',
  MOBILIZATION_TOOLS = 'MobilizationTools'
}

export type Language = string
export type SetID = string
export type Subtitle = string
export type AudioSource = string
export type VideoSource = string

export type SetInfo<T> = T extends 'index'
  ? SetIndex
  : T extends 'category'
  ? SetCategory
  : T extends 'language'
  ? Language
  : undefined

export type LessonInfo<T> = T extends 'language'
  ? Language
  : T extends 'index'
  ? LessonIndex
  : T extends 'setID'
  ? SetID
  : T extends 'subtitle'
  ? Subtitle
  : T extends 'category'
  ? SetCategory
  : T extends 'audioSource'
  ? AudioSource
  : T extends 'videoSource'
  ? VideoSource
  : undefined
