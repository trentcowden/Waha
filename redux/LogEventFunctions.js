import * as Analytics from 'expo-firebase-analytics'
import { getSetInfo ***REMOVED*** from '../constants'
import { analyticsMode ***REMOVED*** from '../modeSwitch'
// switch between prod and test
// test doesn't keep track of analytics

export async function logInstallLanguage (languageName, phoneLanguage) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('InstallLanguage', {
      languageName: languageName,
      phoneLanguage: phoneLanguage
    ***REMOVED***)
***REMOVED***

export async function logCompleteLesson (lesson, set, currentLanguage) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('CompleteLesson', {
      lessonID: lesson.id,
      setID: set.id,
      setCategory: getSetInfo('category', set.id),
      language: currentLanguage
    ***REMOVED***)
***REMOVED***

export async function logCompleteStorySet (set, currentLanguage) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('CompleteStorySet', {
      setID: set.id,
      setCategory: getSetInfo('category', set.id),
      language: currentLanguage
    ***REMOVED***)
***REMOVED***
export async function logUnlockMobilizationTools (currentLanguage) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('UnlockMobilizationTools', {
      language: currentLanguage
    ***REMOVED***)
***REMOVED***
export async function logCreateGroup (currentLanguage) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('CreateGroup', {
      language: currentLanguage
    ***REMOVED***)
***REMOVED***
export async function logEnableMobilizationToolsForAGroup (currentLanguage) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('EnableMobilizationToolsForAGroup', {
      currentLanguage: currentLanguage
    ***REMOVED***)
***REMOVED***
export async function logAddStorySet (set) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('AddStorySet', {
      setID: set.id,
      setCategory: getSetInfo('category', set.id)
    ***REMOVED***)
***REMOVED***
export async function logShareApp (lesson) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('ShareApp', {
      lessonID: lesson.id
    ***REMOVED***)
***REMOVED***
export async function logShareText (lesson) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('ShareText', {
      lessonID: lesson.id
    ***REMOVED***)
***REMOVED***
export async function logShareAudio (lesson) {
  if (analyticsMode !== 'test')
    await Analytics.logEvent('ShareAudio', {
      lessonID: lesson.id
    ***REMOVED***)
***REMOVED***
