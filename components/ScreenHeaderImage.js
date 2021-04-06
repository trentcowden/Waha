import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Image ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { activeGroupSelector ***REMOVED*** from '../redux/reducers/activeGroup'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    database: state.database
  ***REMOVED***
***REMOVED***

const ScreenHeaderImage = ({
  // Props passed from redux.
  activeGroup,
  database
***REMOVED***) => {
  return (
    <Image
      style={{
        resizeMode: 'contain',
        width: 150,
        flex: 1,
        alignSelf: 'center'
      ***REMOVED******REMOVED***
      source={{
        uri: FileSystem.documentDirectory + activeGroup.language + '-header.png'
      ***REMOVED******REMOVED***
    />
  )
***REMOVED***

export default connect(mapStateToProps)(ScreenHeaderImage)
