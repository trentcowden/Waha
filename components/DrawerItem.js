import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function DrawerItem(props) {

   //// RENDER

   return (
      <TouchableOpacity style={[styles.settingsItem, { flexDirection: props.isRTL ? "row-reverse" : "row" ***REMOVED***]***REMOVED*** onPress={props.onPress***REMOVED***>
         <View style={styles.iconContainer***REMOVED***>
            <Icon
               name={props.iconName***REMOVED***
               size={50 * scaleMultiplier***REMOVED***
               color="#3A3C3F"
            />
         </View>
         <Text style={[styles.title, {textAlign: props.isRTL ? 'right' : 'left'***REMOVED***]***REMOVED***>{props.text***REMOVED***</Text>
      </TouchableOpacity>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   settingsItem: {
      height: 52 * scaleMultiplier,
      paddingLeft: 5,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      margin: 5
   ***REMOVED***,
   iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 50 * scaleMultiplier
   ***REMOVED***,
   title: {
      color: '#3A3C3F',
      fontSize: 18 * scaleMultiplier,
      textAlignVertical: "center",
      paddingHorizontal: 10,
      fontFamily: 'medium',
      textAlign: "center"
   ***REMOVED***,
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0];
   return {
      isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(DrawerItem);