import i18n from 'i18n-js'
import { getSystemIsRTL, scaleMultiplier ***REMOVED*** from '../constants'
import { languages ***REMOVED*** from '../languages'

export function StandardTypography (
  props,
  fontSize,
  fontFamily,
  textAlign,
  color
) {
  const fontSizeModifier = props.font === 'NotoSansArabic' ? -1 : 0

  const families = {
    Regular: props.font + '-Regular',
    Bold: props.font + '-Bold',
    Black: props.font + '-Black'
  ***REMOVED***

  const sizes = {
    d: 12 * scaleMultiplier,
    p: 14 * scaleMultiplier,
    h4: 16 * scaleMultiplier,
    h3: 18 * scaleMultiplier,
    h2: 24 * scaleMultiplier,
    h1: 36 * scaleMultiplier
  ***REMOVED***

  const alignments = {
    left: props.isRTL ? 'right' : 'left',
    center: 'center'
  ***REMOVED***

  return {
    fontSize: sizes[fontSize] + fontSizeModifier,
    fontFamily: props.font ? families[fontFamily] : null,
    textAlign: alignments[textAlign],
    color: color
  ***REMOVED***
***REMOVED***

export function SystemTypography (
  isHeader,
  fontSize,
  fontFamily,
  textAlign,
  color,
  overrideFont
) {
  const sizes = {
    d: 12 * scaleMultiplier,
    p: 14 * scaleMultiplier,
    h4: 16 * scaleMultiplier,
    h3: 18 * scaleMultiplier,
    h2: 24 * scaleMultiplier,
    h1: 36 * scaleMultiplier
  ***REMOVED***

  languages.forEach(languageFamily => {
    if (i18n.locale.slice(0, 2) === languageFamily.languageCode) {
      defaultFont = languageFamily.font
      defaultIsRTL = languageFamily.isRTL
    ***REMOVED***
  ***REMOVED***)

  const alignments = {
    left: getSystemIsRTL() ? 'right' : 'left',
    center: 'center'
  ***REMOVED***

  if (isHeader) {
    return {
      fontFamily: overrideFont
        ? overrideFont + '-' + fontFamily
        : getSystemFont() + '-' + fontFamily,
      textAlign: alignments[textAlign],
      color: color
    ***REMOVED***
  ***REMOVED*** else {
    return {
      fontSize: sizes[fontSize],
      fontFamily: overrideFont
        ? overrideFont + '-' + fontFamily
        : getSystemFont() + '-' + fontFamily,
      textAlign: alignments[textAlign],
      color: color
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export function getSystemFont () {
  systemFont = 'Roboto'
  languages.forEach(languageFamily => {
    if (i18n.locale.slice(0, 2) === languageFamily.languageCode) {
      systemFont = languageFamily.font
    ***REMOVED***
  ***REMOVED***)
  return systemFont
***REMOVED***

export function getLanguageFont (languageID) {
  var languageFont
  languages.forEach(languageFamily => {
    if (languageFamily.data.some(language => language.wahaID === languageID))
      languageFont = languageFamily.font
  ***REMOVED***)
  return languageFont
***REMOVED***
