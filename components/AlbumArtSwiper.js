import React, { useEffect, useRef, useState ***REMOVED*** from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import SVG from '../assets/svg'
import SwipeBar from '../components/SwipeBar'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function AlbumArtSwiper (props) {
  //+ STATE

  // keeps track of whether we're in the middle pane or not
  const [isMiddle, setIsMiddle] = useState(true)

  const [layoutWidth, setLayoutWidth] = useState(60)
  const [marginWidth, setMarginWidth] = useState(80)

  // refs for determining when we're in the middle
  // todo: is extremely jank and inconsistent but functional
  const onViewRef = useRef(info => {
    if (info.viewableItems.some(item => item.index === 0)) setIsMiddle(true)
    else setIsMiddle(false)
  ***REMOVED***)
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

  // data for album art flatlist
  const albumArtData = [
    {
      key: '0',
      type: 'text'
    ***REMOVED***,
    {
      key: '1',
      type: 'image',
      svgName: props.iconName
    ***REMOVED***,
    {
      key: '2',
      type: 'text'
    ***REMOVED***
  ]

  useEffect(() => {
    if (Dimensions.get('window').width >= 600) {
      setLayoutWidth(240)
      setMarginWidth(200)
    ***REMOVED***
  ***REMOVED***, [])

  //+ ANIMATION STUFF

  // opacities for the scroll bar opacities
  const [middleScrollBarOpacity, setMiddleScrollBarOpacity] = useState(
    new Animated.Value(0)
  )
  const [sideScrollBarOpacity, setSideScrollBarOpacity] = useState(
    new Animated.Value(0.8)
  )

  //- whenever we switch to and from the middle pane, change which scroll bars
  //-   are visible
  useEffect(() => {
    if (isMiddle)
      Animated.sequence([
        Animated.timing(middleScrollBarOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***),
        Animated.timing(sideScrollBarOpacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***)
      ]).start()
    else {
      Animated.sequence([
        Animated.timing(sideScrollBarOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***),
        Animated.timing(middleScrollBarOpacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***)
      ]).start()
    ***REMOVED***
  ***REMOVED***, [isMiddle])

  //- render either text or album art
  function renderAlbumArtItem ({ item ***REMOVED***) {
    // for text panes
    if (item.type === 'text') {
      return (
        <View
          style={[
            styles.albumArtContainer,
            {
              width: Dimensions.get('window').width - marginWidth,
              height: Dimensions.get('window').width - marginWidth
            ***REMOVED***
          ]***REMOVED***
        >
          <SwipeBar
            isMiddle={false***REMOVED***
            side='left'
            opacity={sideScrollBarOpacity***REMOVED***
          />
          <SwipeBar
            isMiddle={false***REMOVED***
            side='right'
            opacity={sideScrollBarOpacity***REMOVED***
          />
          <FlatList
            data={
              props.thisLesson.fellowshipType
                ? // render questions on the first pane and scripture on the last
                  item.key === '0'
                  ? props.activeDatabase.questions[
                      props.thisLesson.fellowshipType
                    ]
                      // combine fellowship and application questions
                      .concat(
                        props.activeDatabase.questions[
                          props.thisLesson.applicationType
                        ]
                      )
                      // add newline after each question for spacing
                      .map(question => {
                        return { ...question, text: question.text + '\n' ***REMOVED***
                      ***REMOVED***)
                  : props.thisLesson.scripture
                : []
            ***REMOVED***
            renderItem={renderTextContent***REMOVED***
            keyExtractor={item => item.header***REMOVED***
            showsVerticalScrollIndicator={false***REMOVED***
            ListHeaderComponent={() => <View style={{ height: 10 ***REMOVED******REMOVED*** />***REMOVED***
          />
        </View>
      )
    ***REMOVED*** else {
      return (
        <View
          style={[
            styles.albumArtContainer,
            {
              width: Dimensions.get('window').width - marginWidth,
              height: Dimensions.get('window').width - marginWidth
            ***REMOVED***
          ]***REMOVED***
        >
          <SwipeBar
            isMiddle={true***REMOVED***
            side='left'
            opacity={middleScrollBarOpacity***REMOVED***
          />
          <SwipeBar
            isMiddle={true***REMOVED***
            side='right'
            opacity={middleScrollBarOpacity***REMOVED***
          />
          <View
            style={{
              zIndex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <TouchableHighlight
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              ***REMOVED******REMOVED***
              onPress={props.playHandler***REMOVED***
              underlayColor={colors.white + '00'***REMOVED***
              activeOpacity={1***REMOVED***
            >
              <SVG
                name={item.svgName***REMOVED***
                width={Dimensions.get('window').width - marginWidth***REMOVED***
                height={Dimensions.get('window').width - marginWidth***REMOVED***
                fill='#1D1E20'
              />
            </TouchableHighlight>
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              opacity: props.playOpacity,
              transform: [
                {
                  scale: props.playOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 1]
                  ***REMOVED***)
                ***REMOVED***
              ],
              zIndex: props.animationZIndex
            ***REMOVED******REMOVED***
          >
            <Icon
              name={props.isMediaPlaying ? 'play' : 'pause'***REMOVED***
              size={100 * scaleMultiplier***REMOVED***
              color={colors.white***REMOVED***
            />
          </Animated.View>
        </View>
      )
    ***REMOVED***
  ***REMOVED***
  // renders the questions/scripture text content
  function renderTextContent (textList) {
    return (
      <View style={{ paddingHorizontal: 20 ***REMOVED******REMOVED***>
        <Text style={Typography(props, 'h3', 'medium', 'left', colors.shark)***REMOVED***>
          {textList.item.header***REMOVED***
        </Text>
        <Text style={Typography(props, 'h3', 'regular', 'left', colors.shark)***REMOVED***>
          {textList.item.text***REMOVED***
        </Text>
      </View>
    )
  ***REMOVED***
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      ***REMOVED******REMOVED***
    >
      <FlatList
        data={albumArtData***REMOVED***
        renderItem={renderAlbumArtItem***REMOVED***
        ref={ref => props.setAlbumArtSwiperRef(ref)***REMOVED***
        horizontal={true***REMOVED***
        pagingEnabled={true***REMOVED***
        snapToAlignment={'start'***REMOVED***
        snapToInterval={Dimensions.get('window').width - layoutWidth***REMOVED***
        decelerationRate={'fast'***REMOVED***
        showsHorizontalScrollIndicator={false***REMOVED***
        ItemSeparatorComponent={() => (
          <View style={{ width: 20, height: '100%' ***REMOVED******REMOVED*** />
        )***REMOVED***
        ListHeaderComponent={() => <View style={{ width: 40 ***REMOVED******REMOVED*** />***REMOVED***
        ListFooterComponent={() => <View style={{ width: 40 ***REMOVED******REMOVED*** />***REMOVED***
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width - layoutWidth,
          offset: Dimensions.get('window').width - layoutWidth * index,
          index
        ***REMOVED***)***REMOVED***
        initialScrollIndex={1***REMOVED***
        viewabilityConfig={viewConfigRef.current***REMOVED***
        onViewableItemsChanged={onViewRef.current***REMOVED***
        disableIntervalMomentum={true***REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  albumArtContainer: {
    borderRadius: 10,
    backgroundColor: colors.porcelain,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.chateau,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeGroup: activeGroup,
    activeDatabase: state.database[activeGroup.language],
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(AlbumArtSwiper)
