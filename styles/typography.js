import { colors, scaleMultiplier ***REMOVED*** from '../constants'
export const typography = props =>
  StyleSheet.create({
    setTitle: {
      color: props.iconColor,
      fontSize: props.iconSize
    ***REMOVED***,
    setSubtitle: {***REMOVED***,
    lessonTitle: {***REMOVED***,
    lessonSubtitle: {***REMOVED***,
    blurb: {
      textAlign: 'center',
      fontSize: 14 * scaleMultiplier,
      fontFamily: props.font + '-regular',
      color: colors.shark
    ***REMOVED***,
    chapterSelectText: {
      fontSize: 14 * scaleMultiplier
    ***REMOVED***,
    drawerItem: {
      color: colors.tuna,
      textAlign: props.isRTL ? 'right' : 'left',
      fontFamily: props.font + '-medium',
      fontSize: 18 * scaleMultiplier,
      textAlignVertical: 'center',
      paddingHorizontal: 10
    ***REMOVED***,
    groupName: {
      textAlign: props.isRTL ? 'right' : 'left',
      fontFamily: props.font + '-black',
      color: colors.shark,
      fontSize: 18 * scaleMultiplier
    ***REMOVED***,
    groupBookmark: {
      textAlign: props.isRTL ? 'right' : 'left',
      fontFamily: props.font + '-regular',
      fontSize: 12 * scaleMultiplier,
      color: colors.chateau
    ***REMOVED***,
    groupHeader: {
      textAlign: props.isRTL ? 'right' : 'left',
      fontFamily: props.font + '-regular',
      fontSize: 18 * scaleMultiplier,
      color: colors.chateau,
      flex: 1
    ***REMOVED***,
    groupHeaderMT: {
      textAlign: props.isRTL ? 'right' : 'left',
      fontFamily: props.font + '-medium',
      fontSize: 18 * scaleMultiplier,
      color: colors.chateau
    ***REMOVED***
  ***REMOVED***)
