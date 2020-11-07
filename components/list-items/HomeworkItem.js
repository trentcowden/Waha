import React, { useState ***REMOVED*** from 'react'
import {
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'

// renders a simple touchable item within the main navigation drawer
function HomeworkItem (props) {
  // RENDER
  const [isChecked, setIsChecked] = useState(false)
  return (
    <View
      style={{
        flexDirection: props.isRTL ? 'row-reverse' : 'row',
        width: '100%',
        marginBottom: 10
      ***REMOVED******REMOVED***
    >
      <TouchableOpacity
        onPress={() => setIsChecked(old => !old)***REMOVED***
        style={{
          width: 30 * scaleMultiplier,
          height: 30 * scaleMultiplier,
          borderWidth: isChecked ? 0 : 2,
          borderColor: colors.tuna,
          borderRadius: 5,
          backgroundColor: isChecked ? colors.blue : null
        ***REMOVED******REMOVED***
      >
        {isChecked ? (
          <Icon name='check' size={30 * scaleMultiplier***REMOVED*** color={colors.white***REMOVED*** />
        ) : null***REMOVED***
      </TouchableOpacity>
      <View style={{ flex: 1, marginHorizontal: 20 ***REMOVED******REMOVED***>
        <Text
          style={{
            fontSize: 16 * scaleMultiplier,
            color: colors.shark,
            fontFamily: props.font + '-black',
            marginVertical: 5
          ***REMOVED******REMOVED***
        >
          {props.title***REMOVED***
        </Text>
        <Text
          style={{
            fontSize: 14 * scaleMultiplier,
            color: colors.tuna,
            fontFamily: props.font + '-regular'
          ***REMOVED******REMOVED***
        >
          {props.description***REMOVED***
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          Share.share({
            message: props.title + '\n' + props.description
          ***REMOVED***)
        ***REMOVED***
      >
        <Icon
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'***REMOVED***
          size={35 * scaleMultiplier***REMOVED***
          color={colors.apple***REMOVED***
        />
      </TouchableOpacity>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(HomeworkItem)
