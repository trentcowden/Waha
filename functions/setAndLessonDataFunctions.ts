import * as FileSystem from 'expo-file-system'
import { DBLanguageData, Lesson, StorySet } from 'redux/reducers/database'
import { isInOfflineMode } from '../constants'
import { Group } from '../redux/reducers/groups'
import { Translations } from '../translations/translationsConfig'

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

/**
 * Gets specific information about a Story Set.
 */
export const getSetInfo = <T extends SetInfoRequest>(
  type: T,
  setID: string
): SetInfo<T> => {
  // Split the ID up into separate sections.
  var idComponents = setID.split('.')

  // An example setID is "en.1.1".
  switch (type) {
    case 'language':
      return idComponents[0] as SetInfo<T>
    case 'index':
      return parseInt(idComponents[2]) as SetInfo<T>
    case 'category':
      switch (idComponents[1]) {
        case '1':
          return SetCategory.FOUNDATIONAL as SetInfo<T>
        case '2':
          return SetCategory.TOPICAL as SetInfo<T>
        case '3':
          return SetCategory.MOBILIZATION_TOOLS as SetInfo<T>
        default:
          return SetCategory.FOUNDATIONAL as SetInfo<T>
      }
    default:
      return undefined as SetInfo<T>
  }
}

/**
 * Gets specific information about a lesson.
 */
export const getLessonInfo = <T extends LessonInfoRequest>(
  type: T,
  lessonID: string
): LessonInfo<T> => {
  // Split the ID up into separate sections.
  var idComponents = lessonID.split('.')

  // An example lessonID is "en.1.1.1".
  switch (type) {
    case 'language':
      return idComponents[0] as LessonInfo<T>
    case 'index':
      return parseInt(idComponents[3]) as LessonInfo<T>
    case 'setID':
      return (idComponents[0] +
        '.' +
        idComponents[1] +
        '.' +
        idComponents[2]) as LessonInfo<T>
    case 'subtitle':
      return (idComponents[1] +
        '.' +
        idComponents[2] +
        '.' +
        idComponents[3]) as LessonInfo<T>
    case 'category':
      switch (idComponents[1]) {
        case '1':
          return SetCategory.FOUNDATIONAL as LessonInfo<T>
        case '2':
          return SetCategory.TOPICAL as LessonInfo<T>
        case '3':
          return SetCategory.MOBILIZATION_TOOLS as LessonInfo<T>
        default:
          return SetCategory.FOUNDATIONAL as LessonInfo<T>
      }
    case 'audioSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] +
        '.' +
        idComponents[2]}%2F${lessonID}.mp3?alt=media` as LessonInfo<T>
    case 'videoSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] + '.' + idComponents[2]}%2F${lessonID +
        'v'}.mp4?alt=media` as LessonInfo<T>
    default:
      return undefined as LessonInfo<T>
  }
}

/**
 * Gets a filtered list of Story Sets.
 */
export const getSetData = (
  activeDatabase: DBLanguageData | undefined,
  activeGroup: Group,
  category: SetCategory,
  setsToShow: 'saved' | 'unsaved',
  downloadedFiles: string[],
  selectedTag?: string,
  t?: Translations
): StorySet[] => {
  /**
   * Filters Story Sets of a specific category.
   */
  const filterBySetCategory = (
    set: StorySet,
    category: SetCategory
  ): boolean => {
    return getSetInfo('category', set.id) === category
  }

  /**
   * Filters Story Sets based on whether we want to show sets that have been saved (<SetsScreen />) or sets that haven't been saved (<AddSetScreen />).
   */
  const filterBySetsToShow = (
    set: StorySet,
    setsToShow: 'saved' | 'unsaved',
    activeGroup: Group
  ): boolean => {
    if (setsToShow === 'saved') {
      return activeGroup.addedSets.some(savedSet => savedSet.id === set.id)
    } else {
      return !activeGroup.addedSets.some(savedSet => savedSet.id === set.id)
    }
  }

  /**
   * Filter for Story Sets that have a given Topical Story Set tag.
   */
  const filterByTag = (
    set: StorySet,
    selectedTag: string,
    t: Translations
  ): boolean => {
    if (set.tags !== undefined) {
      // If the selected tag is blank (meaning nothing has been selected) or 'All' is selected, show all the Topical Story Sets. Otherwise, filter by the selected tag.
      return selectedTag === '' || selectedTag === t.general.all
        ? true
        : set.tags.some(tag => selectedTag === tag)
    } else return true
  }

  /**
   * Filter for Story Sets that have all of their necessary Question Set mp3s downloaded.
   */
  const filterForDownloadedQuestionSets = (
    set: StorySet,
    downloadedFiles: string[],
    activeGroup: Group
  ): boolean => {
    if (isInOfflineMode) return true
    // Create an array to store the necessary question set mp3s for this set.
    var requiredQuestionSets: string[] = []

    // Go through each set and add all necessary question set mp3s to requiredQuestionSets array.
    set.lessons.forEach(lesson => {
      // Only filter if the lessons have a fellowship/application chapter. For sets like 3.1 which only has video lessons, we don't want to filter.
      if (lesson.fellowshipType) {
        if (!requiredQuestionSets.includes(lesson.fellowshipType)) {
          requiredQuestionSets.push(lesson.fellowshipType)
        }
      }
      if (lesson.applicationType) {
        if (!requiredQuestionSets.includes(lesson.applicationType)) {
          requiredQuestionSets.push(lesson.applicationType)
        }
      }
    })

    // If every required file is present, return true. Otherwise, return false.
    if (
      requiredQuestionSets.every(questionSet =>
        downloadedFiles.includes(
          activeGroup.language + '-' + questionSet + '.mp3'
        )
      )
    )
      return true
    else return false
  }

  /**
   * Sort the Story Sets.
   */
  const sortSets = (
    sortType: 'orderAdded' | 'id',
    storySet1: StorySet,
    storySet2: StorySet,
    activeGroup: Group
  ): number => {
    if (sortType === 'orderAdded') {
      return (
        activeGroup.addedSets.indexOf(
          activeGroup.addedSets.filter(
            savedSet => savedSet.id === storySet1.id
          )[0]
        ) -
        activeGroup.addedSets.indexOf(
          activeGroup.addedSets.filter(
            savedSet => savedSet.id === storySet2.id
          )[0]
        )
      )
    } else {
      const storySet1IDMatches = storySet1.id.match(/[0-9]*$/)
      const storySet2IDMatches = storySet2.id.match(/[0-9]*$/)

      if (storySet1IDMatches && storySet2IDMatches)
        return parseInt(storySet1IDMatches[0]) -
          parseInt(storySet2IDMatches[0]) <
          0
          ? -1
          : 1
      else return 1
    }
  }

  if (activeDatabase)
    return (
      activeDatabase.sets
        // Firstly, filter by category.
        .filter(set => filterBySetCategory(set, category))
        // Secondly, filter by whether we want to show sets that haven't been added already (<AddSetScreen />) or sets that have been added (<SetsScreen />).
        .filter(set => filterBySetsToShow(set, setsToShow, activeGroup))
        // Thirdly, if we're showing Topical Sets and have a specific tag given, filter for Story Sets that have the given tag.
        .filter(set => {
          if (selectedTag && t && category === SetCategory.TOPICAL)
            return filterByTag(set, selectedTag, t)
          else return true
        })
        // Fourthly, if any Story Sets don't have the necessary question set mp3s downloaded, filter those out too.
        .filter(set =>
          filterForDownloadedQuestionSets(set, downloadedFiles, activeGroup)
        )
        // Lastly, sort the Story Sets based on the category and which sets we're showing.
        .sort((storySet1, storySet2) => {
          if (
            (category === SetCategory.TOPICAL ||
              category === SetCategory.MOBILIZATION_TOOLS) &&
            setsToShow === 'saved'
          )
            return sortSets('orderAdded', storySet1, storySet2, activeGroup)
          else return sortSets('id', storySet1, storySet2, activeGroup)
        })
    )
  else return []
}

export const getDownloadedLessons = (thisSet: StorySet): Promise<string[]> => {
  var downloadedLessons: string[] = []
  if (FileSystem.documentDirectory)
    return FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        thisSet.lessons.forEach(lesson => {
          if (contents.includes(lesson.id + '.mp3'))
            downloadedLessons.push(lesson.id)
          if (contents.includes(lesson.id + 'v.mp4')) {
            downloadedLessons.push(lesson.id + 'v')
          }
        })
        return downloadedLessons
      }
    )
  else return new Promise(() => [])
}

/**
 * Gets the type of a specific lesson. While every lesson's type stays constant, this information isn't stored in the database for single source of truth reasons.
 */
export const getLessonType = (lesson: Lesson | undefined): LessonType => {
  if (lesson) {
    if (lesson.fellowshipType && lesson.hasAudio && !lesson.hasVideo)
      return LessonType.STANDARD_DBS
    else if (lesson.fellowshipType && lesson.hasAudio && lesson.hasVideo)
      return LessonType.STANDARD_DMC
    else if (lesson.hasVideo) return LessonType.VIDEO_ONLY
    else if (lesson.fellowshipType) return LessonType.STANDARD_NO_AUDIO
    else if (lesson.text && lesson.hasAudio) return LessonType.AUDIOBOOK
    else return LessonType.BOOK
  } else return LessonType.STANDARD_DBS
}
