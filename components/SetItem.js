import React, { useEffect, useState ***REMOVED*** from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import Icon from '../assets/fonts/icons'
import SVG from '../assets/svg.js'
import MessageModal from '../components/MessageModal'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
function SetItem (props) {
  //+ STATE

  // keeps track of the number of completed lessons in this set
  const [progressPercentage, setProgressPercentage] = useState(0)

  // keeps track of the number of total lessons in a set
  const [numLessons, setNumLessons] = useState(1)

  // keeps track of whether the set is fully completed or not
  const [fullyCompleted, setFullyCompleted] = useState(false)

  const [showUnlockModal, setShowUnlockModal] = useState(false)

  // dynamic set components
  const [icon, setIcon] = useState()
  const [action, setAction] = useState()

  //+ CONSTRUCTOR

  useEffect(() => {
    // big switch statement that renders the 2 dynamic components (the big icon,
    // and the action button) of a set item based on props.mode
    // 1. SHOWN is for sets that have been added to the set screen
    // 2. LESSONLIST is for the set component on the lesson list screen
    // 3. HIDDEN is for sets that have not been added and live on the add set screen
    // 4. FOLDER is for set folders in the add set screen

    switch (props.mode) {
      case 'shown':
        setProgress()
        setIcon(
          <View style={styles.iconContainer***REMOVED***>
            <AnimatedCircularProgress
              size={78 * scaleMultiplier***REMOVED***
              width={7 * scaleMultiplier***REMOVED***
              fill={progressPercentage * 100***REMOVED***
              tintColor={
                fullyCompleted ? props.primaryColor + '50' : props.primaryColor
              ***REMOVED***
              rotation={0***REMOVED***
              backgroundColor={colors.white***REMOVED***
            >
              {() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  ***REMOVED******REMOVED***
                >
                  <SVG
                    name={props.thisSet.iconName***REMOVED***
                    width={70 * scaleMultiplier***REMOVED***
                    height={70 * scaleMultiplier***REMOVED***
                    fill={fullyCompleted ? colors.chateau : colors.shark***REMOVED***
                  />
                </View>
              )***REMOVED***
            </AnimatedCircularProgress>
          </View>
        )
        setAction(
          fullyCompleted ? (
            <View style={styles.actionContainer***REMOVED***>
              <Icon
                name='check-outline'
                size={30 * scaleMultiplier***REMOVED***
                color={colors.oslo***REMOVED***
              />
            </View>
          ) : (
            <View style={styles.actionContainer***REMOVED***>
              <Icon
                name={
                  props.thisSet.id === props.activeGroup.setBookmark
                    ? props.isRTL
                      ? 'triangle-left'
                      : 'triangle-right'
                    : null
                ***REMOVED***
                size={30 * scaleMultiplier***REMOVED***
                color={props.primaryColor***REMOVED***
              />
            </View>
          )
        )
        break
      case 'lessonlist':
        setProgress()
        setIcon(
          <View style={styles.iconContainer***REMOVED***>
            <AnimatedCircularProgress
              size={78 * scaleMultiplier***REMOVED***
              width={7 * scaleMultiplier***REMOVED***
              fill={progressPercentage * 100***REMOVED***
              tintColor={
                fullyCompleted ? props.primaryColor + '50' : props.primaryColor
              ***REMOVED***
              rotation={0***REMOVED***
              backgroundColor={colors.white***REMOVED***
            >
              {() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  ***REMOVED******REMOVED***
                >
                  <SVG
                    name={props.thisSet.iconName***REMOVED***
                    width={70 * scaleMultiplier***REMOVED***
                    height={70 * scaleMultiplier***REMOVED***
                    fill={fullyCompleted ? colors.chateau : colors.shark***REMOVED***
                  />
                </View>
              )***REMOVED***
            </AnimatedCircularProgress>
          </View>
        )
        setAction(<View style={styles.actionContainer***REMOVED*** />)
        break
      case 'addset':
        setIcon(
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.white,
                borderRadius: 14,
                overflow: 'hidden',
                borderWidth: 7,
                borderColor: colors.tuna
              ***REMOVED***
            ]***REMOVED***
          >
            <SVG
              name={props.thisSet.iconName***REMOVED***
              width={80 * scaleMultiplier***REMOVED***
              height={80 * scaleMultiplier***REMOVED***
              fill={colors.tuna***REMOVED***
            />
          </View>
        )
        setAction(
          <View style={styles.actionContainer***REMOVED***>
            <Icon
              name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              color={props.primaryColor***REMOVED***
            />
          </View>
        )
        break
      case 'setinfo':
        setIcon(
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.white,
                borderRadius: 14,
                overflow: 'hidden',
                borderWidth: 7,
                borderColor: colors.tuna
              ***REMOVED***
            ]***REMOVED***
          >
            <SVG
              name={props.thisSet.iconName***REMOVED***
              width={80 * scaleMultiplier***REMOVED***
              height={80 * scaleMultiplier***REMOVED***
              fill={colors.tuna***REMOVED***
            />
          </View>
        )
        setAction(<View style={styles.actionContainer***REMOVED*** />)
        break
    ***REMOVED***
  ***REMOVED***, [
    progressPercentage,
    fullyCompleted,
    props.activeGroup.setBookmark,
    props.activeGroup.addedSets,
    props.isRTL
  ])

  //+ FUNCTIONS

  useEffect(() => {
    progressCases()
  ***REMOVED***, [progressPercentage])

  function progressCases () {
    // if it's fully completed, set fully completed to true, which renders
    // the shown and lessonlist variants as grayed out
    if (progressPercentage === 1) setFullyCompleted(true)
    else setFullyCompleted(false)

    // get the set AFTER the one that you're setting progress for
    var nextSet = props.activeDatabase.sets.filter(
      dbSet =>
        dbSet.category === 'core' && dbSet.index === props.thisSet.index + 1
    )[0]

    // we want to automatically add the next set if the next set exists AND
    if (nextSet) {
      if (
        // we've completed 75% of a set AND
        progressPercentage > 0.85 &&
        // this set is a core set AND
        props.thisSet.category === 'core' &&
        // the next set after this one hasn't already been added AND
        !props.activeGroup.addedSets.some(
          addedSet => addedSet.id === nextSet.id
        )
      ) {
        props.addSet(
          props.activeGroup.name,
          props.activeDatabase.sets
            .filter(set => set.category === 'core')
            .filter(set => set.index === props.thisSet.index + 1)[0].id
        )
        showModal()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  // sets the progress through this set
  function setProgress () {
    // set the percentage through a set
    setProgressPercentage(
      props.activeGroup.addedSets.filter(set => set.id === props.thisSet.id)[0]
        .progress.length / props.thisSet.length
    )
  ***REMOVED***

  function showModal () {
    setShowUnlockModal(true)
  ***REMOVED***

  //+ RENDER

  return (
    <TouchableOpacity
      style={[
        styles.studySetItem,
        { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={props.onSetSelect***REMOVED***
    >
      {/* large icon rendered earlier */***REMOVED***
      {icon***REMOVED***

      {/* title and subtitle */***REMOVED***
      <View
        style={[
          styles.titleContainer,
          {
            marginRight: props.isRTL ? 20 : 0,
            marginLeft: props.isRTL ? 0 : 20
          ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={[
            Typography(
              props,
              'd',
              'regular',
              'left',
              fullyCompleted ? colors.chateau : colors.shark
            ),
            {
              textAlignVertical: 'center',
              flexWrap: 'wrap'
            ***REMOVED***
          ]***REMOVED***
          numberOfLines={1***REMOVED***
        >
          {props.thisSet.subtitle***REMOVED***
        </Text>
        <Text
          style={[
            Typography(
              props,
              'h3',
              'black',
              'left',
              fullyCompleted ? colors.chateau : colors.shark
            ),
            {
              textAlignVertical: 'center',
              flexWrap: 'wrap'
            ***REMOVED***
          ]***REMOVED***
          numberOfLines={2***REMOVED***
        >
          {props.thisSet.title***REMOVED***
        </Text>
      </View>

      {/* action button rendered earlier */***REMOVED***
      {action***REMOVED***
      <MessageModal
        isVisible={showUnlockModal***REMOVED***
        hideModal={() => setShowUnlockModal(false)***REMOVED***
        title={props.translations.general.popups.new_story_set_unlocked_title***REMOVED***
        body={props.translations.general.popups.new_story_set_unlocked_message***REMOVED***
        confirmText={props.translations.general.got_it***REMOVED***
        confirmOnPress={() => setShowUnlockModal(false)***REMOVED***
      >
        <Image
          // source={require('../assets/splash.png')***REMOVED***
          style={{
            height: 200 * scaleMultiplier,
            margin: 20,
            // padding: 20,
            resizeMode: 'contain'
          ***REMOVED******REMOVED***
        />
      </MessageModal>
    </TouchableOpacity>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  studySetItem: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    // height: 100 * scaleMultiplier,
    aspectRatio: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  ***REMOVED***,
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80 * scaleMultiplier,
    height: 80 * scaleMultiplier
  ***REMOVED***,
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  ***REMOVED***,
  actionContainer: {
    justifyContent: 'center',
    width: 30 * scaleMultiplier,
    height: 30 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    activeDatabase: state.database[activeGroup.language],
    primaryColor: state.database[activeGroup.language].primaryColor,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetItem)

// case 'folder':
//   setIcon(
//     <View style={styles.iconContainer***REMOVED***>
//       <SVG
//         name={props.thisSet.icon***REMOVED***
//         width={80 * scaleMultiplier***REMOVED***
//         height={80 * scaleMultiplier***REMOVED***
//         fill='#1D1E20'
//       />
//     </View>
//   )
//   setAction(
//     <View style={styles.actionContainer***REMOVED***>
//       <Icon
//         name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
//         size={30 * scaleMultiplier***REMOVED***
//         color={props.primaryColor***REMOVED***
//       />
//     </View>
//   )
//   setInfo()
//   // INFO BUTTON (keep for later)
//   // <TouchableOpacity
//   //   style={[
//   //     styles.actionContainer,
//   //     {
//   //       marginRight: props.isRTL ? 0 : 10,
//   //       marginLeft: props.isRTL ? 10 : 0
//   //     ***REMOVED***
//   //   ]***REMOVED***
//   //   onPress={() => {***REMOVED******REMOVED***
//   // >
//   //   <Icon name='info' size={30 * scaleMultiplier***REMOVED*** color={colors.chateau***REMOVED*** />
//   // </TouchableOpacity>
//   break
