import SafeAreaView from 'react-native-safe-area-view';
import React from 'react';
import { View, Text, StyleSheet, Button ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import DrawerItem from '../components/DrawerItem'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler';
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as WebBrowser from 'expo-web-browser';
import AvatarImage from '../components/AvatarImage'

function WahaDrawer(props) {
   async function openBrowser(url) {
      await WebBrowser.openBrowserAsync(url);
   ***REMOVED***

   return (
      <SafeAreaView
         style={styles.container***REMOVED***
         forceInset={{ top: 'always', horizontal: 'never' ***REMOVED******REMOVED***
      >
         <View style={[styles.drawerHeaderContainer, { backgroundColor: props.colors.primaryColor ***REMOVED***]***REMOVED***>
            <View style={styles.groupIconContainer***REMOVED***>
               <AvatarImage source={props.activeGroupImageSource***REMOVED*** size={120***REMOVED***/>
            </View>
            <Text style={styles.groupName***REMOVED***>{props.activeGroupName***REMOVED***</Text>
         </View>
         <View style={styles.bigDrawerItemsContainer***REMOVED***>
            <DrawerItem
               name="group"
               text="Groups & Languages"
               onPress={() => props.navigation.navigate('Groups', { isRTL: props.isFetching ? null : props.isRTL ***REMOVED***)***REMOVED***
            />
            {/* <DrawerItem
               name="md-glasses"
               text="Incognito Mode (todo)"
            /> */***REMOVED***
            <DrawerItem
               name="email"
               text="Submit Feedback"
               onPress={() => openBrowser('https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif')***REMOVED***
            />
            <DrawerItem
               name="storage"
               text="Storage"
               onPress={() => props.navigation.navigate('Storage', { isRTL: props.isFetching ? null : props.isRTL ***REMOVED***)***REMOVED***
            />
         </View>
         <View style={styles.smallDrawerItemsContainer***REMOVED***>
            <TouchableOpacity style={[styles.smallDrawerItemContainer, {direction: props.isRTL ? "rtl" : "ltr"***REMOVED***]***REMOVED*** onPress={() => { ***REMOVED******REMOVED***>
               {/* <Text style={styles.smallDrawerItemText***REMOVED***>Coaching Tools (todo)</Text> */***REMOVED***
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallDrawerItemContainer, {direction: props.isRTL ? "rtl" : "ltr"***REMOVED***]***REMOVED*** onPress={() => openBrowser('https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif')***REMOVED***>
               <Text style={styles.smallDrawerItemText***REMOVED***>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallDrawerItemContainer, {direction: props.isRTL ? "rtl" : "ltr"***REMOVED***]***REMOVED*** onPress={() => openBrowser('https://media.giphy.com/media/C4msBrFb6szHG/giphy.gif')***REMOVED***>
               <Text style={styles.smallDrawerItemText***REMOVED***>View Credits</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView >
   )
***REMOVED***

const styles = StyleSheet.create({
   container: {
      flex: 1,
   ***REMOVED***,
   drawerHeaderContainer: {
      width: "100%",
      height: 233 * scaleMultiplier,
      justifyContent: "center",
      alignContent: "center",
      padding: 15
   ***REMOVED***,
   groupIconContainer: {
      alignItems: "center",
      marginVertical: 10
   ***REMOVED***,
   groupName: {
      color: "white",
      textAlign: "center",
      fontFamily: "bold",
      fontSize: 25 * scaleMultiplier
   ***REMOVED***,
   smallDrawerItemsContainer: {
      justifyContent: "flex-end",
      flex: 1
   ***REMOVED***,
   smallDrawerItemContainer: {
      margin: 5,
      padding: 5
   ***REMOVED***,
   smallDrawerItemText: {
      fontFamily: 'medium',
      fontSize: 18 * scaleMultiplier,
      color: '#82868D',
      textAlign: 'left'
   ***REMOVED***
***REMOVED***);

/////////////
////REDUX////
/////////////

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      database: state.database,
      colors: state.database[activeGroup.language].colors,
      appProgress: state.appProgress,
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroupName: activeGroup.name,
      activeGroupImageSource: activeGroup.imageSource,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(WahaDrawer);