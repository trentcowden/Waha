import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'
import { connect ***REMOVED*** from 'react-redux'

function PlayScreenHeaderButtons(props) {
   return (
      <View style={[styles.headerButtonsContainer, {direction: props.isRTL ? 'rtl' : 'ltr'***REMOVED***]***REMOVED***>
         <TouchableOpacity
            onPress={props.shareOnPress***REMOVED***
         >
            <Icon
               name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'***REMOVED***
               size={32 * scaleMultiplier***REMOVED***
               color="#828282"
            />
         </TouchableOpacity>
         <TouchableOpacity
            style={{marginLeft: 5, marginRight: 10***REMOVED******REMOVED***
            onPress={props.completeOnPress***REMOVED***
         >
            <Icon
               name={props.completeCondition ? "check-filled" : "check-unfilled"***REMOVED***
               size={35 * scaleMultiplier***REMOVED***
               color='#828282'
            />
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   headerButtonsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      isRTL: state.database[activeGroup.language].isRTL
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(PlayScreenHeaderButtons);