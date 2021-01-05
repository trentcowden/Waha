import React from 'react'
import { FlatList, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { StandardTypography ***REMOVED*** from '../styles/typography'

function BookView (props) {
  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: colors.porcelain,
        borderWidth: 4,
        borderColor: colors.chateau,
        marginHorizontal: 10,
        marginTop: 10,
        flex: 1
      ***REMOVED******REMOVED***
    >
      <FlatList
        data={props.thisLesson.text.split('\n')***REMOVED***
        renderItem={paragraphList => (
          <Text
            style={[
              StandardTypography(props, 'h4', 'regular', 'left', colors.shark),
              { marginHorizontal: 10 ***REMOVED***
            ]***REMOVED***
          >
            {paragraphList.item + '\n'***REMOVED***
          </Text>
        )***REMOVED***
        keyExtractor={item => item***REMOVED***
        ListHeaderComponent={
          <View style={{ marginVertical: 20 ***REMOVED******REMOVED***>{props.titleSection***REMOVED***</View>
        ***REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  topPortion: {
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  topImage: {
    resizeMode: 'contain',
    height: 170 * scaleMultiplier,
    alignSelf: 'center'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(BookView)
