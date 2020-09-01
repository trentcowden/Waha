import React, { useEffect ***REMOVED*** from 'react'
import { FlatList, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import SetItem from '../components/SetItem'
import WahaButton from '../components/WahaButton'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'

function SetInfoScreen (props) {
  //// STATE

  //// NAV OPTIONS

  function getNavOptions () {
    return {
      title:
        props.route.params.category === 'core'
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

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  // whenever progress or bookmarks update, update the progress and bookmarks for this set
  useEffect(() => {***REMOVED***, [])

  //// FUNCTIONS

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={props.route.params.thisSet***REMOVED*** mode='setinfo' />
      </View>
      <WahaButton
        type='filled'
        color={colors.apple***REMOVED***
        onPress={() => {
          props.addSet(props.activeGroup.name, props.route.params.thisSet.id)
          props.route.params.showSnackbar()
          props.navigation.goBack()
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
        data={props.activeDatabase.lessons.filter(
          lesson => props.route.params.thisSet.id === lesson.setid
        )***REMOVED***
        renderItem={({ item ***REMOVED***) => {
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
                  paddingHorizontal: 40
                ***REMOVED******REMOVED***
              >
                <Text
                  style={{
                    color: colors.shark,
                    textAlign: props.isRTL ? 'right' : 'left',
                    fontSize: 16 * scaleMultiplier,
                    fontFamily: props.font + '-medium'
                  ***REMOVED******REMOVED***
                >
                  {item.title***REMOVED***
                </Text>
                <Text
                  style={{
                    color: colors.chateau,
                    textAlign: props.isRTL ? 'right' : 'left',
                    fontSize: 14 * scaleMultiplier,
                    fontFamily: props.font + '-regular'
                  ***REMOVED******REMOVED***
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
                  paddingHorizontal: 40
                ***REMOVED******REMOVED***
              >
                <Text
                  style={{
                    color: colors.shark,
                    textAlign: props.isRTL ? 'right' : 'left',
                    fontSize: 16 * scaleMultiplier,
                    fontFamily: props.font + '-medium'
                  ***REMOVED******REMOVED***
                >
                  {item.title***REMOVED***
                </Text>
              </View>
            )
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10
  ***REMOVED***,
  studySetItemContainer: {
    width: '100%',
    // height: 80 * scaleMultiplier,
    aspectRatio: 4
  ***REMOVED***
***REMOVED***)

//// REDUX

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
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoScreen)
