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
import { colors ***REMOVED*** from '../../styles/colors'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

// renders a simple touchable item within the main navigation drawer
const HomeworkItem = props => {
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
            fontFamily: props.font + '-Black',
            marginVertical: 5
          ***REMOVED******REMOVED***
        >
          {props.title***REMOVED***
        </Text>
        <Text
          style={{
            fontSize: 14 * scaleMultiplier,
            color: colors.tuna,
            fontFamily: props.font + '-Regular'
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
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(HomeworkItem)
