import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import SetItem from '../components/list-items/SetItem'
import WahaButton from '../components/standard/WahaButton'
import { colors, getLanguageFont, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
import { StandardTypography ***REMOVED*** from '../styles/typography'
import ModalScreen from './ModalScreen'

function SetInfoModal (props) {
  //+ FUNCTIONS

  function renderLessonInfoItem (item) {
    if (item.scripture) {
      var scriptureList = item.scripture[0].header
      item.scripture.forEach((chunk, index) => {
        if (index !== 0) scriptureList += ', ' + chunk.header
      ***REMOVED***)

      return (
        <View
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40,
            width: Dimensions.get('window').width
          ***REMOVED******REMOVED***
        >
          <Text
            style={StandardTypography(
              props,
              'h4',
              'Bold',
              'left',
              colors.shark
            )***REMOVED***
          >
            {item.title***REMOVED***
          </Text>
          <Text
            style={StandardTypography(
              props,
              'p',
              'Regular',
              'left',
              colors.chateau
            )***REMOVED***
          >
            {scriptureList***REMOVED***
          </Text>
        </View>
      )
    ***REMOVED*** else
      return (
        <View
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40,
            width: Dimensions.get('window').width
          ***REMOVED******REMOVED***
        >
          <Text
            style={StandardTypography(
              props,
              'h4',
              'Bold',
              'left',
              colors.shark
            )***REMOVED***
          >
            {item.title***REMOVED***
          </Text>
        </View>
      )
  ***REMOVED***

  return (
    <ModalScreen
      title={props.translations.add_set.header_set_details***REMOVED***
      hideModal={props.hideModal***REMOVED***
      isVisible={props.isVisible***REMOVED***
    >
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={props.thisSet***REMOVED*** mode='setinfo' />
      </View>
      <WahaButton
        type='filled'
        color={colors.apple***REMOVED***
        onPress={() => {
          props.addSet(
            props.activeGroup.name,
            props.activeGroup.id,
            props.thisSet
          )
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
      <FlatList
        keyExtractor={item => item.id***REMOVED***
        data={props.thisSet.lessons***REMOVED***
        renderItem={({ item ***REMOVED***) => renderLessonInfoItem(item)***REMOVED***
        contentContainerStyle={{ flexGrow: 1 ***REMOVED******REMOVED***
      />
    </ModalScreen>
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
    font: getLanguageFont(activeGroup.language)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoModal)
