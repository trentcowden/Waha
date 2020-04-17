import SafeAreaView from 'react-native-safe-area-view';
import React from 'react';
import { View, Text, StyleSheet ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import DrawerItem from '../components/DrawerItem'
import SmallDrawerItem from '../components/SmallDrawerItem'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as WebBrowser from 'expo-web-browser';
import AvatarImage from '../components/AvatarImage'

function WahaDrawer(props) {

   //// FUNCTIONS

   // opens a local browser 
   async function openBrowser(url) {
      await WebBrowser.openBrowserAsync(url);
   ***REMOVED***

   //// RENDER

   return (
      <SafeAreaView style={styles.container***REMOVED*** forceInset={{ top: 'always', horizontal: 'never' ***REMOVED******REMOVED***>
         <View style={[styles.drawerHeaderContainer, { backgroundColor: props.colors.primaryColor ***REMOVED***]***REMOVED***>
            <View style={styles.groupIconContainer***REMOVED***>
               <AvatarImage source={props.activeGroup.imageSource***REMOVED*** size={120***REMOVED*** />
            </View>
            <Text style={styles.groupName***REMOVED***>{props.activeGroup.name***REMOVED***</Text>
         </View>
         <View style={styles.bigDrawerItemsContainer***REMOVED***>
            <DrawerItem
               name="group"
               text="Groups & Languages"
               onPress={() => props.navigation.navigate('Groups')***REMOVED***
            />
            {/* <DrawerItem
               name="security"
               text="Security Mode"
               onPress={() => {***REMOVED******REMOVED***
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
            <SmallDrawerItem
               onPress={() => { ***REMOVED******REMOVED***
               label={props.translations.navigation.drawer.coaching***REMOVED***
            />
            <SmallDrawerItem
               onPress={() => openBrowser('https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif')***REMOVED***
               label={props.translations.navigation.drawer.privacy***REMOVED***
            />
            <SmallDrawerItem
               onPress={() => openBrowser('https://media.giphy.com/media/C4msBrFb6szHG/giphy.gif')***REMOVED***
               label={props.translations.navigation.drawer.credits***REMOVED***
            />
         </View>
      </SafeAreaView >
   )
***REMOVED***

//// REDUX

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
      flex: 1,
      marginBottom: 20
   ***REMOVED***,
***REMOVED***);

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      colors: state.database[activeGroup.language].colors,
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroup: activeGroup,
      translations: state.database[activeGroup.language].translations
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(WahaDrawer);