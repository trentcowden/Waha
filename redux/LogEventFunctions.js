import * as Analytics from 'expo-firebase-analytics'
import * as StoreReview from 'expo-store-review'
import { getLessonInfo, getSetInfo ***REMOVED*** from '../constants'
import { analyticsMode ***REMOVED*** from '../modeSwitch'

/**
 * This file contains a bunch of functions that send log events to Firebase analytics. This allows us to keep track of useful information.
 */

/**
 * Logs the installation of a new language instance.
 * @export
 * @param {string***REMOVED*** languageID - The ID of the language instance.
 * @param {string***REMOVED*** phoneLanguageID - The ID of the phone language.
 */
export async function logInstallLanguage (languageID, phoneLanguageID) {
  console.log(
    `InstallLanguage logged with languageID: ${languageID***REMOVED*** and phoneLanguageID: ${phoneLanguageID***REMOVED***.`
  )
  if (analyticsMode !== 'test')
    await Analytics.logEvent('InstallLanguage', {
      languageID: languageID,
      phoneLanguageID: phoneLanguageID
    ***REMOVED***)
***REMOVED***

/**
 * Logs the completion of a lesson.
 * @export
 * @param {Object***REMOVED*** lesson - The lesson object of the lesson that was completed.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 */
export async function logCompleteLesson (lesson, groupName) {
  console.log(
    `CompleteLesson logged with lessonID: ${lesson.id***REMOVED*** and groupName: ${groupName***REMOVED***.`
  )
  // If the lesson that is completed is the very first one, then request that the user submit a review on the App Store/Play Store.
  if (lesson.id.includes('1.1.1') && lesson.id.length === 8) {
    StoreReview.requestReview()
  ***REMOVED***
  if (analyticsMode !== 'test')
    await Analytics.logEvent('CompleteLesson', {
      languageID: getLessonInfo('language', lesson.id),
      groupName: groupName,
      lessonID: lesson.id,
      lessonIndex: getLessonInfo('index', lesson.id),
      setID: getLessonInfo('setID', lesson.id),
      lessonSubtitle: getLessonInfo('subtitle', lesson.id),
      lessonCategory: getLessonInfo('category', lesson.id)
    ***REMOVED***)
***REMOVED***

/**
 * Logs the completion of a Story Set.
 * @export
 * @param {Object***REMOVED*** set - The set object for the set that was completed.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 */
export async function logCompleteStorySet (set, groupName) {
  console.log(
    `CompleteStorySet logged with setID: ${set.id***REMOVED*** and groupName: ${groupName***REMOVED***.`
  )
  StoreReview.requestReview()
  if (analyticsMode !== 'test')
    await Analytics.logEvent('CompleteStorySet', {
      languageID: getSetInfo('language', set.id),
      groupName: groupName,
      setID: set.id,
      setIndex: getSetInfo('index', set.id),
      setCategory: getSetInfo('category', set.id)
    ***REMOVED***)
***REMOVED***

/**
 * Logs the creation of a new group.
 * @export
 * @param {string***REMOVED*** languageID - The ID of the active group's language.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 * @param {number***REMOVED*** groupNumber - The number of the new group.
 */
export async function logCreateGroup (languageID, groupName, groupNumber) {
  console.log(
    `CreateGroup logged with languageID: ${languageID***REMOVED***, groupName: ${groupName***REMOVED***, and groupNumber: ${groupNumber***REMOVED***.`
  )
  if (analyticsMode !== 'test')
    await Analytics.logEvent('CreateGroup', {
      languageID: languageID,
      groupName: groupName,
      groupNumber: groupNumber
    ***REMOVED***)
***REMOVED***

/**
 * Logs enabling the Mobilization Tools for a specific group.
 * @export
 * @param {string***REMOVED*** languageID - The ID of the active group's language.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 * @param {number***REMOVED*** groupNumber - The number of the new group.
 */
export async function logEnableMobilizationToolsForAGroup (
  languageID,
  groupName,
  groupNumber
) {
  console.log(
    `EnableMobilizationToolsForAGroup logged with languageID: ${languageID***REMOVED***, groupName: ${groupName***REMOVED***, and groupNumber: ${groupNumber***REMOVED***.`
  )
  if (analyticsMode !== 'test')
    await Analytics.logEvent('EnableMobilizationToolsForAGroup', {
      languageID: languageID,
      groupName: groupName,
      groupNumber: groupNumber
    ***REMOVED***)
***REMOVED***

/**
 * Logs adding a new story set.
 * @export
 * @param {Object***REMOVED*** set - The set object for the set that was added.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 */
export async function logAddStorySet (set, groupName) {
  console.log(
    `AddStorySet logged with setID: ${set.id***REMOVED*** and groupName: ${groupName***REMOVED***.`
  )
  if (analyticsMode !== 'test')
    await Analytics.logEvent('AddStorySet', {
      languageID: getSetInfo('language', set.id),
      groupName: groupName,
      setID: set.id,
      setIndex: getSetInfo('index', set.id),
      setCategory: getSetInfo('category', set.id)
    ***REMOVED***)
***REMOVED***

/**
 * Logs sharing the app URL.
 * @export
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 */
export async function logShareApp (groupName) {
  console.log(`ShareApp logged with groupName: ${groupName***REMOVED***.`)
  if (analyticsMode !== 'test')
    await Analytics.logEvent('ShareApp', {
      groupName: groupName
    ***REMOVED***)
***REMOVED***

/**
 * Logs sharing the scripture text for a lesson.
 * @export
 * @param {Object***REMOVED*** lesson - The lesson object for the lesson the user is doing when they share the scripture text.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 */
export async function logShareText (lesson, groupName) {
  console.log(
    `ShareText logged with lessonID: ${lesson.id***REMOVED*** and groupName: ${groupName***REMOVED***.`
  )
  if (analyticsMode !== 'test')
    await Analytics.logEvent('ShareText', {
      lessonID: lesson.id,
      groupName
    ***REMOVED***)
***REMOVED***

/**
 * Logs sharing the app Story chapter mp3.
 * @export
 * @param {Object***REMOVED*** lesson - The lesson object for the lesson the user is doing when they share the Story chapter mp3.
 * @param {string***REMOVED*** groupName - The name of the currently active group.
 */
export async function logShareAudio (lesson, groupName) {
  console.log(
    `ShareAudio logged with lessonID: ${lesson.id***REMOVED*** and groupName: ${groupName***REMOVED***.`
  )
  if (analyticsMode !== 'test')
    await Analytics.logEvent('ShareAudio', {
      lessonID: lesson.id,
      groupName
    ***REMOVED***)
***REMOVED***
