import i18n from 'i18n-js'
import {
  getSystemFont,
  getSystemIsRTL,
  languages,
  scaleMultiplier
***REMOVED*** from '../constants'

const lineHeightByFont = {
  roboto: 5,
  tajawal: 9
***REMOVED***

const lineHeightBySystemLanguage = {
  en: 5,
  ar: 9
***REMOVED***

export function StandardTypography (
  props,
  fontSize,
  fontFamily,
  textAlign,
  color
) {
  const lineHeightModifier = fontFamily === 'black' ? 2 : 0

  const families = {
    regular: props.font + '-regular',
    medium: props.font + '-medium',
    black: props.font + '-black'
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
    fontSize: sizes[fontSize],
    fontFamily: props.font ? families[fontFamily] : null,
    textAlign: alignments[textAlign],
    color: color,
    lineHeight:
      sizes[fontSize] + lineHeightByFont[props.font] + lineHeightModifier
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
      color: color,
      lineHeight: lineHeightBySystemLanguage[i18n.locale.slice(0, 2)]
        ? sizes[fontSize] + lineHeightBySystemLanguage[i18n.locale.slice(0, 2)]
        : null
    ***REMOVED***
  ***REMOVED***
***REMOVED***
