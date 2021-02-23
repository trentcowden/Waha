import React, { useEffect, useState ***REMOVED*** from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import Icon from '../../assets/fonts/icon_font_config'
import { getSetInfo, itemHeights, scaleMultiplier ***REMOVED*** from '../../constants'
import MessageModal from '../../modals/MessageModal'
import { addSet ***REMOVED*** from '../../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'
import SVG from '../SVG.js'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    activeDatabase: activeDatabaseSelector(state),
    primaryColor: activeDatabaseSelector(state).primaryColor,
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state),
    translations: activeDatabaseSelector(state).translations
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

function SetItem ({
  // Props passed from a parent component.
  mode,
  thisSet,
  onSetSelect,
  // Props passed from redux.
  isRTL,
  activeDatabase,
  primaryColor,
  font,
  activeGroup,
  translations,
  addSet
***REMOVED***) {
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

  //- sets components of the set items based on the type prop
  useEffect(() => {
    // big switch statement that renders the 2 dynamic components (the big icon,
    // and the action button) of a set item based on mode
    // 1. SHOWN is for sets that have been added to the set screen
    // 2. LESSONLIST is for the set component on the lesson list screen
    // 3. ADDSET is for sets that have not been added and live on the add set screen
    // 4. SETINFO is for the set on the top of the setinfo screen

    switch (mode) {
      case 'shown':
        setProgress()
        setIcon(
          <View style={styles.iconContainer***REMOVED***>
            <AnimatedCircularProgress
              size={78 * scaleMultiplier***REMOVED***
              width={7 * scaleMultiplier***REMOVED***
              fill={progressPercentage * 100***REMOVED***
              tintColor={fullyCompleted ? primaryColor + '50' : primaryColor***REMOVED***
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
                    name={thisSet.iconName***REMOVED***
                    width={70 * scaleMultiplier***REMOVED***
                    height={70 * scaleMultiplier***REMOVED***
                    color={fullyCompleted ? colors.chateau : colors.shark***REMOVED***
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
                color={colors.chateau***REMOVED***
              />
            </View>
          ) : (
            <View style={styles.actionContainer***REMOVED***>
              <Icon
                name={
                  thisSet.id === activeGroup.setBookmark
                    ? isRTL
                      ? 'triangle-left'
                      : 'triangle-right'
                    : null
                ***REMOVED***
                size={30 * scaleMultiplier***REMOVED***
                color={primaryColor***REMOVED***
              />
            </View>
          )
        )
        break
      case 'lessons_screen':
        setProgress()
        setIcon(
          <View style={styles.iconContainer***REMOVED***>
            <AnimatedCircularProgress
              size={78 * scaleMultiplier***REMOVED***
              width={7 * scaleMultiplier***REMOVED***
              fill={progressPercentage * 100***REMOVED***
              tintColor={fullyCompleted ? primaryColor + '50' : primaryColor***REMOVED***
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
                    name={thisSet.iconName***REMOVED***
                    width={70 * scaleMultiplier***REMOVED***
                    height={70 * scaleMultiplier***REMOVED***
                    color={fullyCompleted ? colors.chateau : colors.shark***REMOVED***
                  />
                </View>
              )***REMOVED***
            </AnimatedCircularProgress>
          </View>
        )
        setAction(<View style={styles.actionContainer***REMOVED*** />)
        break
      case 'addset_screen':
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
              name={thisSet.iconName***REMOVED***
              width={80 * scaleMultiplier***REMOVED***
              height={80 * scaleMultiplier***REMOVED***
              color={colors.tuna***REMOVED***
            />
          </View>
        )
        setAction(
          <View style={styles.actionContainer***REMOVED***>
            <Icon
              name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              color={primaryColor***REMOVED***
            />
          </View>
        )
        break
      case 'setinfo_modal':
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
              name={thisSet.iconName***REMOVED***
              width={80 * scaleMultiplier***REMOVED***
              height={80 * scaleMultiplier***REMOVED***
              color={colors.tuna***REMOVED***
            />
          </View>
        )
        setAction(<View style={styles.actionContainer***REMOVED*** />)
        break
    ***REMOVED***
  ***REMOVED***, [
    // need to rerender the sets whenever any progress, bookmarks, or RTL
    //  changes
    progressPercentage,
    fullyCompleted,
    activeGroup.setBookmark,
    activeGroup.addedSets,
    isRTL
  ])

  //- sets the progress through this set
  function setProgress () {
    var setLength = thisSet.lessons.length
    // set the percentage through a set
    setProgressPercentage(
      activeGroup.addedSets.filter(set => set.id === thisSet.id)[0].progress
        .length / setLength
    )
  ***REMOVED***

  //- whenever progress changes for a set, handle the changes
  useEffect(() => {
    progressCases()
  ***REMOVED***, [progressPercentage])

  //- handles special cases regarding changes in progress
  function progressCases () {
    // if it's fully completed, set fully completed to true, which renders
    // the shown and lessonlist variants as grayed out
    if (progressPercentage === 1) {
      setFullyCompleted(true)
    ***REMOVED*** else setFullyCompleted(false)

    // get the set AFTER the one that you're setting progress for
    var nextSet = activeDatabase.sets.filter(
      dbSet =>
        getSetInfo('category', dbSet.id) === 'foundational' &&
        getSetInfo('index', dbSet.id) === getSetInfo('index', thisSet.id) + 1
    )[0]

    // we want to automatically add the next set if the next set exists AND
    if (nextSet) {
      if (
        // we've completed 85% of a set AND
        progressPercentage > 0.85 &&
        // this set is a core set AND
        getSetInfo('category', thisSet.id) === 'foundational' &&
        // the next set after this one hasn't already been added AND
        !activeGroup.addedSets.some(addedSet => addedSet.id === nextSet.id)
      ) {
        addSet(
          activeGroup.name,
          activeGroup.id,
          activeDatabase.sets
            .filter(set => getSetInfo('category', set.id) === 'foundational')
            .filter(
              set =>
                getSetInfo('index', set.id) ===
                getSetInfo('index', thisSet.id) + 1
            )[0]
        )
        setShowUnlockModal(true)
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  //+ RENDER

  return (
    <TouchableOpacity
      style={[
        styles.studySetItem,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          height: itemHeights[font].SetItem
        ***REMOVED***
      ]***REMOVED***
      onPress={onSetSelect***REMOVED***
      // disable feedback if there's no onSetSelect
      activeOpacity={onSetSelect ? 0.2 : 1***REMOVED***
    >
      {/* large icon rendered earlier */***REMOVED***
      {icon***REMOVED***

      {/* title and subtitle */***REMOVED***
      <View
        style={[
          styles.titleContainer,
          {
            marginRight: isRTL ? 20 : 0,
            marginLeft: isRTL ? 0 : 20
          ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'd',
              'Regular',
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
          {thisSet.subtitle***REMOVED***
        </Text>
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'h3',
              'Black',
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
          {thisSet.title***REMOVED***
        </Text>
      </View>

      {/* action button rendered earlier */***REMOVED***
      {action***REMOVED***
      <MessageModal
        isVisible={showUnlockModal***REMOVED***
        hideModal={() => setShowUnlockModal(false)***REMOVED***
        title={translations.general.popups.new_story_set_unlocked_title***REMOVED***
        body={translations.general.popups.new_story_set_unlocked_message***REMOVED***
        confirmText={translations.general.got_it***REMOVED***
        confirmOnPress={() => setShowUnlockModal(false)***REMOVED***
      >
        <Image
          source={require('../../assets/gifs/new_set.gif')***REMOVED***
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
    // aspectRatio: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
    // borderWidth: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(SetItem)
