import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { connect ***REMOVED*** from 'react-redux'
import HomeworkItem from '../components/list-items/HomeworkItem'
import WahaItemDescription from '../components/standard/standard/WahaItemDescription'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

// modal variant that shows some information
const HomeworkModal = props => {
  function renderHomeworkItem (homeworkList) {
    return (
      <HomeworkItem
        title={homeworkList.item.title***REMOVED***
        description={homeworkList.item.description***REMOVED***
      />
    )
  ***REMOVED***
  //+ RENDER
  return (
    <Modal
      isVisible={props.isVisible***REMOVED***
      style={{ justifyContent: 'space-between', flex: 1, margin: 0 ***REMOVED******REMOVED***
    >
      <View style={styles.contentContainer***REMOVED***>
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            marginTop: 30
          ***REMOVED******REMOVED***
        >
          <Icon name='list' size={60 * scaleMultiplier***REMOVED*** color={colors.tuna***REMOVED*** />
          <Text
            style={{
              color: colors.shark,
              fontFamily: props.font + '-Black',
              fontSize: 36 * scaleMultiplier,
              textAlign: 'center',
              marginBottom: 10
            ***REMOVED******REMOVED***
          >
            Homework
          </Text>
          <WahaItemDescription text='blah blah blah blah blah blah blah blah blah blah blah blah blah blah ' />
          <FlatList
            data={props.homework***REMOVED***
            style={{ width: '100%', paddingHorizontal: 20 ***REMOVED******REMOVED***
            renderItem={renderHomeworkItem***REMOVED***
            keyExtractor={item => item.title***REMOVED***
            persistentScrollbar={true***REMOVED***
          />
        </View>
        <TouchableOpacity
          style={{
            // marginVertical: 10,
            width: '100%',
            height: 80 * scaleMultiplier,
            justifyContent: 'center'
            // backgroundColor: 'blue'
          ***REMOVED******REMOVED***
          onPress={props.hideModal***REMOVED***
        >
          <Text
            style={{
              fontFamily: props.font + '-Bold',
              fontSize: 24 * scaleMultiplier,
              color: colors.red,
              textAlign: 'center'
            ***REMOVED******REMOVED***
          >
            {props.translations.general.close***REMOVED***
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
***REMOVED***

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    translations: activeDatabaseSelector(state).translations,
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(HomeworkModal)
