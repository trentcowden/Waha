import * as Analytics from 'expo-firebase-analytics'
import { LanguageID } from 'languages'
import { Lesson, StorySet } from 'redux/reducers/database'
import { isInOfflineMode } from '../constants'
import { analyticsMode } from '../modeSwitch'
import { getLessonInfo, getSetInfo } from './setAndLessonDataFunctions'

/**
 * Logs the installation of a new language instance.
 */
export async function logInstallLanguage (
  languageID: LanguageID,
  phoneLanguageID: string
) {
  console.log(
    `InstallLanguage logged with languageID: ${languageID} and phoneLanguageID: ${phoneLanguageID}.`
  )
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('InstallLanguage', {
      languageID: languageID,
      phoneLanguageID: phoneLanguageID
    })
}

/**
 * Logs the completion of a lesson.
 */
export async function logCompleteLesson (lesson: Lesson, groupID: number) {
  console.log(
    `CompleteLesson logged with lessonID: ${lesson.id} and groupID: ${groupID}.`
  )
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('CompleteLesson', {
      languageID: getLessonInfo('language', lesson.id),
      groupID: groupID,
      lessonID: lesson.id,
      lessonIndex: getLessonInfo('index', lesson.id),
      setID: getLessonInfo('setID', lesson.id),
      lessonSubtitle: getLessonInfo('subtitle', lesson.id),
      lessonCategory: getLessonInfo('category', lesson.id)
    })
}

/**
 * Logs the completion of a Story Set.
 */
export async function logCompleteStorySet (set: StorySet, groupID: number) {
  console.log(
    `CompleteStorySet logged with setID: ${set.id} and groupID: ${groupID}.`
  )
  // StoreReview.requestReview()
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('CompleteStorySet', {
      languageID: getSetInfo('language', set.id),
      groupID: groupID,
      setID: set.id,
      setIndex: getSetInfo('index', set.id),
      setCategory: getSetInfo('category', set.id)
    })
}

/**
 * Logs the creation of a new group.
 */
export async function logCreateGroup (
  languageID: LanguageID,
  groupID: number,
  groupNumber: number
) {
  console.log(
    `CreateGroup logged with languageID: ${languageID}, groupID: ${groupID}, and groupNumber: ${groupNumber}.`
  )
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('CreateGroup', {
      languageID: languageID,
      groupID: groupID,
      groupNumber: groupNumber
    })
}

/**
 * Logs unlocking the Mobilization Tools.
 */
export async function logUnlockMobilizationTools (languageID: LanguageID) {
  console.log(`UnlockMobilizationTools logged with languageID: ${languageID}.`)
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('UnlockMobilizationTools', {
      languageID: languageID
    })
}

/**
 * Logs adding a new Story Set.
 */
export async function logAddStorySet (set: StorySet, groupID: number) {
  console.log(
    `AddStorySet logged with setID: ${set.id} and groupID: ${groupID}.`
  )
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('AddStorySet', {
      languageID: getSetInfo('language', set.id),
      groupID: groupID,
      setID: set.id,
      setIndex: getSetInfo('index', set.id),
      setCategory: getSetInfo('category', set.id)
    })
}

/**
 * Logs sharing the app URL.
 */
export async function logShareApp (groupID: number) {
  console.log(`ShareApp logged with groupID: ${groupID}.`)
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('ShareApp', {
      groupID: groupID
    })
}

/**
 * Logs sharing the scripture text for a lesson.
 */
export async function logShareText (lesson: Lesson, groupID: number) {
  console.log(
    `ShareText logged with lessonID: ${lesson.id} and groupID: ${groupID}.`
  )
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('ShareText', {
      lessonID: lesson.id,
      groupID
    })
}

/**
 * Logs sharing the app Story chapter mp3.
 */
export async function logShareAudio (lesson: Lesson, groupID: number) {
  console.log(
    `ShareAudio logged with lessonID: ${lesson.id} and groupID: ${groupID}.`
  )
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('ShareAudio', {
      lessonID: lesson.id,
      groupID
    })
}

/**
 * Logs the first enabling of Security Mode.
 */
export async function logEnableSecurityMode (groupID: number) {
  console.log(`EnableSecurityMode logged with groupID: ${groupID}.`)
  if (analyticsMode !== 'test' && !isInOfflineMode)
    await Analytics.logEvent('EnableSecurityMode', {
      groupID: groupID
    })
}
