import i18n from 'i18n-js'
import {
  getSystemFont,
  getSystemIsRTL,
  languages,
  scaleMultiplier
***REMOVED*** from '../constants'

const lineSpacingStandard = {
  roboto: 4,
  tajawal: 8
***REMOVED***

const lineSpacingSystem = {
  en: 4,
  ar: 8
***REMOVED***

export function StandardTypography (
  props,
  fontSize,
  fontFamily,
  textAlign,
  color
) {
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
    lineHeight: sizes[fontSize] + lineSpacingStandard[props.font]
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
      lineHeight: lineSpacingSystem[i18n.locale.slice(0, 2)]
        ? sizes[fontSize] + lineSpacingSystem[i18n.locale.slice(0, 2)]
        : null
    ***REMOVED***
  ***REMOVED***
***REMOVED***
