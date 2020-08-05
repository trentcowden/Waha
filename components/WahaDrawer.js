import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { connect ***REMOVED*** from 'react-redux'
import AvatarImage from '../components/AvatarImage'
import DrawerItem from '../components/DrawerItem'
import SmallDrawerItem from '../components/SmallDrawerItem'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
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
          <AvatarImage
            style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
            emoji={props.activeGroup.emoji***REMOVED***
            size={120***REMOVED***
          />
        </View>
        <Text
          style={[styles.groupName, { fontFamily: props.font + '-black' ***REMOVED***]***REMOVED***
          numberOfLines={2***REMOVED***
        >
          {props.activeGroup.name***REMOVED***
        </Text>
        <View style={styles.pencilIconContainer***REMOVED***>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditGroup', {
                groupName: props.activeGroup.name
              ***REMOVED***)
            ***REMOVED***
          >
            <Icon
              name='pencil'
              size={25 * scaleMultiplier***REMOVED***
              color={colors.white***REMOVED***
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: colors.white, flex: 1 ***REMOVED******REMOVED***>
        <View style={{ flex: 1 ***REMOVED******REMOVED***>
          <DrawerItem
            iconName='group'
            text={props.translations.groups.header***REMOVED***
            onPress={() => props.navigation.navigate('Groups')***REMOVED***
          />
          <DrawerItem
            iconName='security'
            text='Security Mode'
            onPress={() => props.navigation.navigate('Security')***REMOVED***
          />
          <DrawerItem
            iconName='boat'
            text={props.translations.mobilization_tools.header***REMOVED***
            onPress={() => props.navigation.navigate('MT')***REMOVED***
          />
          <DrawerItem
            iconName='storage'
            text={props.translations.storage.header***REMOVED***
            onPress={() =>
              props.navigation.navigate('Storage', {
                isRTL: props.isFetching ? null : props.isRTL
              ***REMOVED***)
            ***REMOVED***
          />
          <DrawerItem
            iconName='bug'
            text={props.translations.general.bug_report***REMOVED***
            onPress={() =>
              openBrowser('https://airtable.com/shrGQY4b3FSPprzmt')
            ***REMOVED***
          />
        </View>
        <SafeAreaView
          style={[
            styles.smallDrawerItemsContainer,
            {
              flexDirection:
                Dimensions.get('window').height < 550
                  ? props.isRLT
                    ? 'row-reverse'
                    : 'row'
                  : 'column'
            ***REMOVED***
          ]***REMOVED***
        >
          <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif'
              )
            ***REMOVED***
            label={props.translations.general.privacy***REMOVED***
          />
          <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://media.giphy.com/media/C4msBrFb6szHG/giphy.gif'
              )
            ***REMOVED***
            label={props.translations.general.credits***REMOVED***
          />
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 10,
              marginVertical: 5
            ***REMOVED******REMOVED***
          >
            <Text
              style={[
                styles.versionText,
                {
                  fontFamily: props.font + '-regular',
                  textAlign: props.isRTL ? 'right' : 'left'
                ***REMOVED***
              ]***REMOVED***
            >
              v0.5.0.2
            </Text>
          </View>
        </SafeAreaView>
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
    height: 225 * scaleMultiplier,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 35
  ***REMOVED***,
  groupIconContainer: {
    alignItems: 'center',
    marginVertical: 10
  ***REMOVED***,
  groupName: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 25 * scaleMultiplier
  ***REMOVED***,
  pencilIconContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    height: '100%'
  ***REMOVED***,
  smallDrawerItemsContainer: {
    width: '100%',
    justifyContent: 'center'
  ***REMOVED***,
  versionText: {
    fontSize: 10 * scaleMultiplier,
    color: colors.chateau,
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
