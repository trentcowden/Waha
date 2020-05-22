import React, { useEffect, useState ***REMOVED*** from 'react'
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import Icon from '../assets/fonts/icons'
import SVG from '../assets/svg.js'

function SetItem (props) {
  //// STATE

  // keeps track of the number of completed lessons in this set
  const [numCompleted, setNumCompleted] = useState(0)

  // keeps track of the number of total lessons in a set
  const [numLessons, setNumLessons] = useState(1)

  // keeps track of whether the set is fully completed or not
  const [fullyCompleted, setFullyCompleted] = useState(false)

  // dynamic set components
  const [icon, setIcon] = useState()
  const [info, setInfo] = useState()
  const [action, setAction] = useState()

  //// CONSTRUCTOR

  useEffect(() => {
    setProgress()

    switch (props.mode) {
      case 'shown':
        setIcon(
          <View style={styles.iconContainer***REMOVED***>
            <AnimatedCircularProgress
              size={85 * scaleMultiplier***REMOVED***
              width={8 * scaleMultiplier***REMOVED***
              fill={(numCompleted / numLessons) * 100***REMOVED***
              tintColor={
                fullyCompleted ? props.primaryColor + '50' : props.primaryColor
              ***REMOVED***
              rotation={0***REMOVED***
              backgroundColor='#FFFFFF'
            >
              {() => (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  ***REMOVED******REMOVED***
                >
                  <SVG
                    // name={'set' + props.thisSet.index***REMOVED***
                    name={''***REMOVED***
                    width={70 * scaleMultiplier***REMOVED***
                    height={70 * scaleMultiplier***REMOVED***
                    fill={fullyCompleted ? '#9FA5AD' : '#1D1E20'***REMOVED***
                  />
                </View>
              )***REMOVED***
            </AnimatedCircularProgress>
            <View style={styles.percentageTextContainer***REMOVED***>
              <Text
                style={[
                  styles.percentageText,
                  { fontFamily: props.font + '-regular' ***REMOVED***
                ]***REMOVED***
              >
                {Math.round((numCompleted / numLessons) * 100)***REMOVED***%
              </Text>
            </View>
          </View>
        )
        setAction(
          fullyCompleted ? (
            <View style={styles.actionContainer***REMOVED***>
              <Icon
                name='check-outline'
                size={30 * scaleMultiplier***REMOVED***
                color='#828282'
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
                size={37 * scaleMultiplier***REMOVED***
                color={props.primaryColor***REMOVED***
              />
            </View>
          )
        )
        break
      case 'small':
        setIcon(
          <View style={styles.iconContainer***REMOVED***>
            <AnimatedCircularProgress
              size={70 * scaleMultiplier***REMOVED***
              width={5 * scaleMultiplier***REMOVED***
              fill={(numCompleted / numLessons) * 100***REMOVED***
              tintColor={
                fullyCompleted ? props.primaryColor + '50' : props.primaryColor
              ***REMOVED***
              rotation={0***REMOVED***
              backgroundColor='#FFFFFF'
            >
              {() => (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  ***REMOVED******REMOVED***
                >
                  <SVG
                    // name={'set' + props.thisSet.index***REMOVED***
                    name={''***REMOVED***
                    width={60 * scaleMultiplier***REMOVED***
                    height={60 * scaleMultiplier***REMOVED***
                    fill={fullyCompleted ? '#9FA5AD' : '#1D1E20'***REMOVED***
                  />
                </View>
              )***REMOVED***
            </AnimatedCircularProgress>
            <View style={styles.percentageTextContainer***REMOVED***>
              <Text
                style={[
                  styles.percentageText,
                  { fontFamily: props.font + '-regular' ***REMOVED***
                ]***REMOVED***
              >
                {Math.round((numCompleted / numLessons) * 100)***REMOVED***%
              </Text>
            </View>
          </View>
        )
        setAction(null)
        break
      case 'hidden':
        setIcon(
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: '#1D1E20',
                borderRadius: (101 * scaleMultiplier) / 2
              ***REMOVED***
            ]***REMOVED***
          >
            <SVG
              // name={'set' + props.thisSet.index***REMOVED***
              name={''***REMOVED***
              width={80 * scaleMultiplier***REMOVED***
              height={80 * scaleMultiplier***REMOVED***
              fill='#FFFFFF'
            />
          </View>
        )
        setAction(
          <View style={styles.actionContainer***REMOVED***>
            <Icon
              name='playlist-add'
              size={30 * scaleMultiplier***REMOVED***
              color={props.primaryColor***REMOVED***
            />
          </View>
        )
        break
      case 'folder':
        setIcon(
          <View
            style={{
              backgroundColor: '#1D1E20',
              width: 101 * scaleMultiplier,
              height: 101 * scaleMultiplier
            ***REMOVED******REMOVED***
          >
            <View
              style={[
                styles.iconContainer,
                {
                  //backgroundColor: '#1D1E20'
                  overflow: 'hidden',
                  borderRadius: (101 * scaleMultiplier) / 2,
                  margin: 0
                ***REMOVED***
              ]***REMOVED***
            >
              <SVG
                // name={'set' + props.thisSet.index***REMOVED***
                name={''***REMOVED***
                width={80 * scaleMultiplier***REMOVED***
                height={80 * scaleMultiplier***REMOVED***
                fill='#FFFFFF'
              />
            </View>
          </View>
        )
        setAction(
          <View style={styles.actionContainer***REMOVED***>
            <Icon
              name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
              size={40 * scaleMultiplier***REMOVED***
              color={props.primaryColor***REMOVED***
            />
          </View>
        )
        break
    ***REMOVED***
  ***REMOVED***, [numCompleted, fullyCompleted])

  useEffect(() => {
    setProgress()
  ***REMOVED***, [props.activeProgress])

  //// FUNCTIONS

  function setProgress () {
    // for (const set of props.activeDatabase.sets) {
    //   if (set.id === props.thisSet.id) {
    //     setNumLessons(set.length)
    //   ***REMOVED***
    // ***REMOVED***
    // setNumCompleted(0)
    // for (const lessonIndex of props.activeProgress) {
    //   if (
    //     props.activeDatabase.lessons.filter(
    //       lesson => lesson.index === lessonIndex
    //     )[0].setid === props.thisSet.id
    //   ) {
    //     setNumCompleted(numCompleted => numCompleted + 1)
    //   ***REMOVED***
    // ***REMOVED***
    // if (numCompleted === numLessons) {
    //   setFullyCompleted(true)
    // ***REMOVED*** else {
    //   setFullyCompleted(false)
    // ***REMOVED***
  ***REMOVED***

  //// RENDER

  return (
    <TouchableOpacity
      style={[
        styles.studySetItem,
        { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={props.onSetSelect***REMOVED***
    >
      {icon***REMOVED***
      <View style={styles.titleContainer***REMOVED***>
        <Text
          style={{
            color: fullyCompleted ? '#9FA5AD' : '#1D1E20',
            textAlign: props.isRTL ? 'right' : 'left',
            fontSize: props.isSmall
              ? 14 * scaleMultiplier
              : 12 * scaleMultiplier,
            textAlignVertical: 'center',
            flexWrap: 'wrap',
            fontFamily: props.font + '-regular'
          ***REMOVED******REMOVED***
        >
          {props.thisSet.subtitle***REMOVED***
        </Text>
        <Text
          style={{
            color: fullyCompleted ? '#9FA5AD' : '#3A3C3F',
            textAlign: props.isRTL ? 'right' : 'left',
            fontSize: props.isSmall
              ? 24 * scaleMultiplier
              : 18 * scaleMultiplier,
            textAlignVertical: 'center',
            flexWrap: 'wrap',
            fontFamily: props.font + '-black'
          ***REMOVED******REMOVED***
        >
          {props.thisSet.title***REMOVED***
        </Text>
      </View>
      {action***REMOVED***
    </TouchableOpacity>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  studySetItem: {
    flexDirection: 'row',
    flex: 1,
    height: 101 * scaleMultiplier,
    justifyContent: 'center',
    marginVertical: 2
  ***REMOVED***,
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
    width: 101 * scaleMultiplier,
    height: 101 * scaleMultiplier
  ***REMOVED***,
  percentageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  ***REMOVED***,
  percentageText: {
    color: '#9FA5AD',
    fontSize: 10
  ***REMOVED***,
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 5
  ***REMOVED***,
  actionContainer: {
    justifyContent: 'center',
    marginRight: 15
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    //activeProgress: activeGroup.progress,
    isRTL: state.database[activeGroup.language].isRTL,
    activeDatabase: state.database[activeGroup.language],
    primaryColor: state.database[activeGroup.language].primaryColor,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SetItem)
