import { scaleMultiplier ***REMOVED*** from '../constants'

export default Typography = (props, fontSize, fontFamily, textAlign, color) => {
  const sizes = {
    d: 12 * scaleMultiplier,
    p: 14 * scaleMultiplier,
    h4: 16 * scaleMultiplier,
    h3: 18 * scaleMultiplier,
    h2: 24 * scaleMultiplier,
    h1: 36 * scaleMultiplier
  ***REMOVED***

  const families = {
    regular: props.font + '-regular',
    medium: props.font + '-medium',
    black: props.font + '-black'
  ***REMOVED***

  const alignments = {
    left: props.isRTL ? 'right' : 'left',
    center: 'center'
  ***REMOVED***
  return {
    fontSize: sizes[fontSize],
    fontFamily: props.font ? families[fontFamily] : null,
    textAlign: alignments[textAlign],
    color: color
  ***REMOVED***
***REMOVED***

// export default Typography = props => {
//   const sizes = {
//     detail: 12 * scaleMultiplier,
//     body: 14 * scaleMultiplier,
//     heading4: 16 * scaleMultiplier,
//     heading3: 18 * scaleMultiplier,
//     heading2: 24 * scaleMultiplier,
//     heading1: 36 * scaleMultiplier
//   ***REMOVED***

//   const families = {
//     regular: props.font + '-regular',
//     medium: props.font + '-medium',
//     black: props.font + '-black'
//   ***REMOVED***

//   const alignments = {
//     left: props.isRTL ? 'right' : 'left',
//     center: 'center'
//   ***REMOVED***

//   return StyleSheet.create({
//     setTitle: {
//       color: fullyCompleted ? colors.chateau : colors.shark,
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontSize: 18 * scaleMultiplier,
//       textAlignVertical: 'center',
//       flexWrap: 'wrap',
//       fontFamily: props.font + '-black'
//     ***REMOVED***,
//     setSubtitle: {
//       color: fullyCompleted ? colors.chateau : colors.shark,
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontSize: 12 * scaleMultiplier,
//       textAlignVertical: 'center',
//       flexWrap: 'wrap',
//       fontFamily: props.font + '-regular'
//     ***REMOVED***,
//     lessonTitle: {
//       fontSize: sizes.heading4,
//       fontFamily: families.medium,
//       textAlign: alignments.left,
//       // if a lesson is complete, render the title as gray
//       color: props.isComplete ? colors.chateau : colors.shark
//     ***REMOVED***,
//     lessonSubtitle: {
//       fontSize: sizes.detail,
//       fontFamily: families.regular,
//       textAlign: alignments.left,
//       color: colors.chateau
//     ***REMOVED***,
//     blurb: {
//       fontSize: sizes.body,
//       fontFamily: families.regular,
//       textAlign: alignments.center,
//       color: colors.shark
//     ***REMOVED***,
//     chapterSelectText: {
//       fontSize: sizes.body
//     ***REMOVED***,
//     drawerItem: {
//       color: colors.tuna,
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-medium',
//       fontSize: 18 * scaleMultiplier,
//       textAlignVertical: 'center',
//       paddingHorizontal: 10
//     ***REMOVED***,
//     groupName: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-black',
//       color: colors.shark,
//       fontSize: 18 * scaleMultiplier
//     ***REMOVED***,
//     groupBookmark: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-regular',
//       fontSize: 12 * scaleMultiplier,
//       color: colors.chateau
//     ***REMOVED***,
//     groupHeader: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-regular',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.chateau,
//       flex: 1
//     ***REMOVED***,
//     groupHeaderMT: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-medium',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.chateau
//     ***REMOVED***,
//     keyLabel: {
//       fontFamily: props.font + '-medium',
//       fontSize: 22 * scaleMultiplier,
//       color: colors.shark
//     ***REMOVED***,
//     languageNameNative: {
//       color: colors.shark,
//       fontSize: 18 * scaleMultiplier,
//       fontWeight: 'bold',
//       textAlign: 'left'
//     ***REMOVED***,
//     languageNameLocal: {
//       color: colors.shark,
//       fontSize: 14 * scaleMultiplier
//     ***REMOVED***,
//     storageHeader: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-regular',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.chateau
//     ***REMOVED***,
//     mbLabel: {
//       fontFamily: props.font + '-medium',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.tuna
//     ***REMOVED***,
//     storageUsedLabel: {
//       fontFamily: props.font + '-regular',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.tuna,
//       flex: 1,
//       paddingHorizontal: 20,
//       textAlign: props.isRTL ? 'right' : 'left'
//     ***REMOVED***,
//     messageModalCancelButton: {
//       fontFamily: props.font + '-medium',
//       fontSize: 24 * scaleMultiplier,
//       color: colors.red
//     ***REMOVED***,
//     messageModalConfirmButton: {
//       fontFamily: props.font + '-medium',
//       fontSize: 24 * scaleMultiplier,
//       color: colors.apple,
//       textAlign: 'center'
//     ***REMOVED***,
//     messageModalTitle: {
//       color: colors.shark,
//       fontFamily: props.font + '-black',
//       fontSize: 36 * scaleMultiplier,
//       marginVertical: 10,
//       textAlign: 'center'
//     ***REMOVED***,
//     messageModalBody: {
//       color: colors.shark,
//       fontFamily: props.font + '-medium',
//       fontSize: 18 * scaleMultiplier,
//       textAlign: 'center',
//       paddingHorizontal: 20
//     ***REMOVED***,
//     modalButton: {
//       color: colors.shark,
//       textAlign: 'center',
//       fontSize: 19.5 * scaleMultiplier,
//       fontFamily: props.font + '-regular'
//     ***REMOVED***,
//     onboardingTitle: {
//       fontFamily: props.font ? props.font + '-medium' : null,
//       fontWeight: props.font ? null : 'bold',
//       textAlign: 'center',
//       fontSize: 24 * scaleMultiplier,
//       color: colors.shark
//     ***REMOVED***,
//     onboardingBody: {
//       textAlign: 'center',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.oslo,
//       marginVertical: 20,
//       fontFamily: props.font ? props.font + '-regular' : null
//     ***REMOVED***,
//     optionsModalCancelButton: {
//       textAlign: 'center',
//       fontFamily: props.font + '-medium',
//       fontSize: 21 * scaleMultiplier,
//       color: colors.red
//     ***REMOVED***,
//     smallDrawerItem: {
//       fontSize: 18 * scaleMultiplier,
//       color: colors.chateau,
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-medium'
//     ***REMOVED***,
//     timeText: {
//       color: colors.shark,
//       fontSize: 12 * scaleMultiplier,
//       fontFamily: props.font + '-regular'
//     ***REMOVED***,
//     wahaButton: {
//       textAlign: 'center',
//       fontSize: 18 * scaleMultiplier,
//       flex: 1,
//       fontFamily: props.font ? props.font + '-medium' : null,
//       color:
//         props.type === 'outline'
//           ? props.color
//           : props.type === 'filled'
//           ? colors.white
//           : colors.chateau,
//       fontWeight: props.font ? null : 'bold'
//     ***REMOVED***,
//     groupNameDrawer: {
//       color: colors.white,
//       textAlign: 'center',
//       fontSize: 25 * scaleMultiplier,
//       fontFamily: props.font + '-black'
//     ***REMOVED***,
//     versionText: {
//       fontSize: 10 * scaleMultiplier,
//       color: colors.chateau,
//       justifyContent: 'center',
//       alignItems: 'center',
//       fontFamily: props.font + '-regular',
//       textAlign: props.isRTL ? 'right' : 'left'
//     ***REMOVED***,
//     wahaItemTitle: {
//       fontFamily: props.font + '-medium',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.shark
//     ***REMOVED***,
//     wahaItemDescription: {
//       fontFamily: props.font + '-regular',
//       fontSize: 14 * scaleMultiplier,
//       color: colors.oslo,
//       textAlign: props.isRTL ? 'right' : 'left'
//     ***REMOVED***,
//     addEditGroupInputLabel: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-regular',
//       fontSize: 14 * scaleMultiplier,
//       color: colors.chateau
//     ***REMOVED***,
//     noMoreSetsLabel: {
//       fontFamily: props.font + '-regular',
//       color: colors.chateau,
//       fontSize: 14 * scaleMultiplier,
//       textAlign: 'center'
//     ***REMOVED***,
//     gameTitle: {
//       fontFamily: props.font + '-medium',
//       paddingHorizontal: 10,
//       fontSize: 32 * scaleMultiplier
//     ***REMOVED***,
//     recordCountdown: {
//       fontFamily: props.font + '-regular',
//       fontSize: 24 * scaleMultiplier,
//       color: colors.white
//     ***REMOVED***,
//     editButtonText: {
//       fontFamily: props.font + '-regular',
//       color: colors.shark,
//       fontSize: 18 * scaleMultiplier
//     ***REMOVED***,
//     addGroupButton: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-medium',
//       color: colors.blue,
//       fontSize: 18 * scaleMultiplier
//     ***REMOVED***,
//     addNewLanguageButton: {
//       textAlign: props.isRTL ? 'right' : 'left',
//       fontFamily: props.font + '-medium',
//       fontSize: 18 * scaleMultiplier,
//       color: colors.chateau
//     ***REMOVED***
//   ***REMOVED***)
// ***REMOVED***
