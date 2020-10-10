import React, { useEffect ***REMOVED*** from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import SetItem from '../components/SetItem'
import WahaButton from '../components/WahaButton'
import { colors, getLessonInfo, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'

function SetInfoScreen (props) {
  //+ STATE

  //+ NAV OPTIONS

  function getNavOptions () {
    return {
      title:
        props.category === 'core'
          ? props.translations.add_set.header_foundational
          : props.translations.add_set.header_topical,
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //+ CONSTRUCTOR

  useEffect(() => {
    // props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ FUNCTIONS

  function renderLessonInfoItem (item) {
    if (item.scripture) {
      var scriptureList = item.scripture[0].header
      item.scripture.forEach((chunk, index) => {
        if (index !== 0) scriptureList += ', ' + chunk.header
      ***REMOVED***)

      return (
        <TouchableOpacity
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40
          ***REMOVED******REMOVED***
        >
          <Text style={Typography(props, 'h4', 'medium', 'left', colors.shark)***REMOVED***>
            {item.title***REMOVED***
          </Text>
          <Text
            style={Typography(props, 'p', 'regular', 'left', colors.chateau)***REMOVED***
          >
            {scriptureList***REMOVED***
          </Text>
        </TouchableOpacity>
      )
    ***REMOVED*** else
      return (
        <TouchableOpacity
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40
          ***REMOVED******REMOVED***
        >
          <Text style={Typography(props, 'h4', 'medium', 'left', colors.shark)***REMOVED***>
            {item.title***REMOVED***
          </Text>
        </TouchableOpacity>
      )
  ***REMOVED***

  return (
    <SafeAreaView>
      <Modal
        isVisible={props.isVisible***REMOVED***
        hasBackdrop={true***REMOVED***
        onBackdropPress={props.hideModal***REMOVED***
        backdropOpacity={0.3***REMOVED***
        onSwipeComplete={props.hideModal***REMOVED***
        swipeDirection={['down']***REMOVED***
        propagateSwipe={true***REMOVED***
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          margin: 0,
          marginTop: 30
          // marginVertical: 20 * scaleMultiplier
        ***REMOVED******REMOVED***
      >
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          ***REMOVED******REMOVED***
        >
          <View
            style={{
              width: '100%',
              // height: 50 * scaleMultiplier,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10
            ***REMOVED******REMOVED***
          >
            <TouchableOpacity
              onPress={() => {
                props.hideModal()
              ***REMOVED******REMOVED***
              style={{
                width: 45 * scaleMultiplier,
                height: 45 * scaleMultiplier
              ***REMOVED******REMOVED***
            >
              <Icon
                name='cancel'
                size={45 * scaleMultiplier***REMOVED***
                color={colors.oslo***REMOVED***
              />
            </TouchableOpacity>
            <View style={{ flex: 1 ***REMOVED******REMOVED***>
              <Text
                style={Typography(
                  props,
                  'h3',
                  'medium',
                  'center',
                  colors.shark
                )***REMOVED***
              >
                {props.type === 'AddGroup'
                  ? props.translations.add_edit_group.header_add
                  : props.translations.add_edit_group.header_edit***REMOVED***
              </Text>
            </View>
            <View
              style={{
                width: 45 * scaleMultiplier,
                height: 45 * scaleMultiplier
              ***REMOVED******REMOVED***
            />
          </View>
          <View style={styles.studySetItemContainer***REMOVED***>
            <SetItem thisSet={props.thisSet***REMOVED*** mode='setinfo' />
          </View>
          <WahaButton
            type='filled'
            color={colors.apple***REMOVED***
            onPress={() => {
              props.addSet(props.activeGroup.name, props.thisSet)
              props.showSnackbar()
              props.hideModal()
            ***REMOVED******REMOVED***
            style={{ marginHorizontal: 20, marginVertical: 10 ***REMOVED******REMOVED***
            label={props.translations.add_set.add_new_story_set_button_label***REMOVED***
            extraComponent={
              <Icon
                style={{ marginHorizontal: 10 ***REMOVED******REMOVED***
                color={colors.white***REMOVED***
                size={36 * scaleMultiplier***REMOVED***
                name='playlist-add'
              />
            ***REMOVED***
          />
          {/* <ScrollView> */***REMOVED***
          <View
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center'
            ***REMOVED******REMOVED***
            onStartShouldSetResponder={(): boolean => true***REMOVED***
          >
            <FlatList
              nestedScrollEnabled
              keyExtractor={item => item.id***REMOVED***
              data={props.activeDatabase.lessons.filter(
                lesson => props.thisSet.id === getLessonInfo('setID', lesson.id)
              )***REMOVED***
              renderItem={({ item ***REMOVED***) => renderLessonInfoItem(item)***REMOVED***
            />
          </View>
          {/* <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          <FlatList
            data={groupIcons***REMOVED***
            bounces={false***REMOVED***
            nestedScrollEnabled
            renderItem={({ item ***REMOVED***) => (
              <View
                style={{
                  width: 50 * scaleMultiplier,
                  height: 50 * scaleMultiplier,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  // borderWidth: 0,
                  // borderColor: item === emoji ? colors.blue : null,
                  borderRadius: 10
                  // backgroundColor: item === emoji ? colors.blue + '38' : null
                ***REMOVED******REMOVED***
                // onPress={() => setEmoji(item)***REMOVED***
              >
                <Image
                  style={{
                    width: 40 * scaleMultiplier,
                    height: 40 * scaleMultiplier
                  ***REMOVED******REMOVED***
                  source={groupIconSources[item]***REMOVED***
                />
              </View>
            )***REMOVED***
            keyExtractor={item => item***REMOVED***
            numColumns={Math.floor(
              (Dimensions.get('window').width - 50) / (50 * scaleMultiplier)
            )***REMOVED***
          />
        </View> */***REMOVED***
          {/* </ScrollView> */***REMOVED***
        </View>
      </Modal>
    </SafeAreaView>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10
  ***REMOVED***,
  studySetItemContainer: {
    width: '100%',
    height: 100 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    downloads: state.downloads,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, set) => {
      dispatch(addSet(groupName, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoScreen)
