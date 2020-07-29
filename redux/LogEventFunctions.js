import * as Analytics from 'expo-firebase-analytics'

export async function logInstallLanguage (languageName, phoneLanguage) {
  await Analytics.logEvent('InstallLanguage', {
    languageName: languageName,
    phoneLanguage: phoneLanguage
  ***REMOVED***)
***REMOVED***

export async function logCompleteLesson (lesson, set, currentLanguage) {
  await Analytics.logEvent('CompleteLesson', {
    lessonID: lesson.id,
    setID: set.id,
    setCategory: set.category,
    currentLanguage: currentLanguage
  ***REMOVED***)
***REMOVED***
export async function logCompleteStorySet (set, currentLanguage) {
  await Analytics.logEvent('CompleteStorySet', {
    setID: set.id,
    setCategory: set.category,
    currentLanguage: currentLanguage
  ***REMOVED***)
***REMOVED***
export async function logUnlockMobilizationTools (currentLanguage) {
  await Analytics.logEvent('UnlockMobilizationTools', {
    currentLanguage: currentLanguage
  ***REMOVED***)
***REMOVED***
export async function logCreateGroup (currentLanguage) {
  await Analytics.logEvent('CreateGroup', {
    currentLanguage: currentLanguage
  ***REMOVED***)
***REMOVED***
export async function logEnableMobilizationToolsForAGroup (currentLanguage) {
  await Analytics.logEvent('EnableMobilizationToolsForAGroup', {
    currentLanguage: currentLanguage
  ***REMOVED***)
***REMOVED***
export async function logAddStorySet (set) {
  await Analytics.logEvent('AddStorySet', {
    setID: set.id,
    setCategory: set.category
  ***REMOVED***)
***REMOVED***
export async function logShareApp (lesson) {
  await Analytics.logEvent('ShareApp', {
    lessonID: lesson.id
  ***REMOVED***)
***REMOVED***
export async function logShareText (lesson) {
  await Analytics.logEvent('ShareText', {
    lessonID: lesson.id
  ***REMOVED***)
***REMOVED***
export async function logShareAudio (lesson) {
  await Analytics.logEvent('ShareAudio', {
    lessonID: lesson.id
  ***REMOVED***)
***REMOVED***
