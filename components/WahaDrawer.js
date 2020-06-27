import SafeAreaView from 'react-native-safe-area-view'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import DrawerItem from '../components/DrawerItem'
import SmallDrawerItem from '../components/SmallDrawerItem'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as WebBrowser from 'expo-web-browser'
import AvatarImage from '../components/AvatarImage'

function WahaDrawer (props) {
  //// FUNCTIONS

  // opens a local browser
  async function openBrowser (url) {
    await WebBrowser.openBrowserAsync(url)
  ***REMOVED***

  //// RENDER

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: props.primaryColor ***REMOVED***]***REMOVED***
      forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' ***REMOVED******REMOVED***
    >
      <View style={styles.drawerHeaderContainer***REMOVED***>
        <View style={styles.groupIconContainer***REMOVED***>
          <AvatarImage source={props.activeGroup.imageSource***REMOVED*** size={120***REMOVED*** />
        </View>
        <Text style={[styles.groupName, { fontFamily: props.font + '-black' ***REMOVED***]***REMOVED***>
          {props.activeGroup.name***REMOVED***
        </Text>
        <TouchableOpacity
          style={styles.pencilIconContainer***REMOVED***
          onPress={() =>
            props.navigation.navigate('EditGroup', {
              groupName: props.activeGroup.name
            ***REMOVED***)
          ***REMOVED***
        >
          <Icon name='pencil' size={25 * scaleMultiplier***REMOVED*** color='#FFFFFF' />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 ***REMOVED******REMOVED***>
        <View>
          <DrawerItem
            iconName='group'
            text={props.translations.navigation.drawer.groups***REMOVED***
            onPress={() => props.navigation.navigate('Groups')***REMOVED***
          />
          {/* <DrawerItem
               name="security"
               text="Security Mode"
               onPress={() => {***REMOVED******REMOVED***
            /> */***REMOVED***
          <DrawerItem
            iconName='boat'
            text={props.translations.navigation.drawer.mt***REMOVED***
            onPress={() => props.navigation.navigate('MT')***REMOVED***
          />
          <DrawerItem
            iconName='storage'
            text={props.translations.navigation.drawer.storage***REMOVED***
            onPress={() =>
              props.navigation.navigate('Storage', {
                isRTL: props.isFetching ? null : props.isRTL
              ***REMOVED***)
            ***REMOVED***
          />
        </View>
        <View style={styles.smallDrawerItemsContainer***REMOVED***>
          <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://docs.google.com/forms/d/e/1FAIpQLSeUvdc3Ehib_kIOMqkyBgECyqL7Jaj_ztFercRSfMnCXQ6UwA/viewform?usp=sf_link'
              )
            ***REMOVED***
            label={props.translations.navigation.drawer.feedback***REMOVED***
          />
          <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif'
              )
            ***REMOVED***
            label={props.translations.navigation.drawer.privacy***REMOVED***
          />
          <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://media.giphy.com/media/C4msBrFb6szHG/giphy.gif'
              )
            ***REMOVED***
            label={props.translations.navigation.drawer.credits***REMOVED***
          />
          <Text
            style={[
              styles.versionText,
              { fontFamily: props.font + '-regular' ***REMOVED***
            ]***REMOVED***
          >
            v0.4.2
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
***REMOVED***

//// REDUX

const styles = StyleSheet.create({
  container: {
    flex: 1
  ***REMOVED***,
  drawerHeaderContainer: {
    width: '100%',
    height: 233 * scaleMultiplier,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15
  ***REMOVED***,
  groupIconContainer: {
    alignItems: 'center',
    marginVertical: 10
  ***REMOVED***,
  groupName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25 * scaleMultiplier
  ***REMOVED***,
  pencilIconContainer: {
    alignSelf: 'flex-end'
  ***REMOVED***,
  smallDrawerItemsContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20
  ***REMOVED***,
  versionText: {
    fontSize: 10,
    marginHorizontal: 13,
    color: '#9FA5AD',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor,
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaDrawer)
