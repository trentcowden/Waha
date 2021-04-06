import React from 'react'
import { FlatList, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

const BookView = ({
  // Props passed from a parent component.
  thisLesson,
  titleSection,
  // Props passed from redux.
  font,
  activeGroup,
  isRTL
***REMOVED***) => {
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
        data={thisLesson.text.split('\n')***REMOVED***
        renderItem={paragraphList => (
          <Text
            style={[
              StandardTypography(
                { font, isRTL ***REMOVED***,
                'h4',
                'Regular',
                'left',
                colors.shark
              ),
              { marginHorizontal: 10 ***REMOVED***
            ]***REMOVED***
          >
            {paragraphList.item + '\n'***REMOVED***
          </Text>
        )***REMOVED***
        keyExtractor={item => item***REMOVED***
        ListHeaderComponent={
          <View style={{ marginVertical: 20 ***REMOVED******REMOVED***>{titleSection***REMOVED***</View>
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

export default connect(mapStateToProps)(BookView)
