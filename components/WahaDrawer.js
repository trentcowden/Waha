import * as WebBrowser from 'expo-web-browser'
import React, { useState ***REMOVED*** from 'react'
import { Dimensions, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { connect ***REMOVED*** from 'react-redux'
import GroupAvatar from '../components/GroupAvatar'
import DrawerItem from '../components/list-items/DrawerItem'
import SmallDrawerItem from '../components/list-items/SmallDrawerItem'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import AddEditGroupModal from '../modals/AddEditGroupModal'
import { BrandTypography ***REMOVED*** from '../styles/typography'

function WahaDrawer (props) {
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

  //+ FUNCTIONS

  // opens a local browser
  async function openBrowser (url) {
    await WebBrowser.openBrowserAsync(url, { dismissButtonStyle: 'cancel' ***REMOVED***)
  ***REMOVED***

  //+ RENDER

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: props.primaryColor ***REMOVED***]***REMOVED***
      forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' ***REMOVED******REMOVED***
    >
      <View style={styles.drawerHeaderContainer***REMOVED***>
        <View style={styles.groupIconContainer***REMOVED***>
          <GroupAvatar
            style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
            emoji={props.activeGroup.emoji***REMOVED***
            size={120***REMOVED***
            onPress={() => setShowEditGroupModal(true)***REMOVED***
          />
        </View>
        <Text
          style={BrandTypography(props, 'h2', 'black', 'center', colors.white)***REMOVED***
          numberOfLines={2***REMOVED***
        >
          {props.activeGroup.name***REMOVED***
        </Text>
        {/* <View style={styles.pencilIconContainer***REMOVED***>
          <TouchableOpacity onPress={() => setShowEditGroupModal(true)***REMOVED***>
            <Icon
              name='pencil'
              size={25 * scaleMultiplier***REMOVED***
              color={colors.white***REMOVED***
            />
          </TouchableOpacity>
        </View> */***REMOVED***
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
            text={props.translations.security.header***REMOVED***
            onPress={() => props.navigation.navigate('Security')***REMOVED***
          />
          <DrawerItem
            iconName='boat'
            text={props.translations.mobilization_tools.header***REMOVED***
            onPress={() => props.navigation.navigate('MobilizationTools')***REMOVED***
          />
          <DrawerItem
            iconName='storage'
            text={props.translations.storage.header***REMOVED***
            onPress={() => props.navigation.navigate('Storage')***REMOVED***
          />
          <DrawerItem
            iconName='email'
            text={props.translations.general.feedback***REMOVED***
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
                  ? props.isRTL
                    ? 'row-reverse'
                    : 'row'
                  : 'column'
            ***REMOVED***
          ]***REMOVED***
        >
          <SmallDrawerItem
            onPress={() => openBrowser('https://waha.app/privacy-policy/')***REMOVED***
            label={props.translations.general.privacy***REMOVED***
          />
          {/* <SmallDrawerItem
            onPress={() =>
              openBrowser(
                'https://media.giphy.com/media/C4msBrFb6szHG/giphy.gif'
              )
            ***REMOVED***
            label={props.translations.general.credits***REMOVED***
          /> */***REMOVED***
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 10,
              marginVertical: 5
            ***REMOVED******REMOVED***
          >
            <Text
              style={BrandTypography(
                props,
                'd',
                'regular',
                'left',
                colors.chateau
              )***REMOVED***
            >
              v1.0.2
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <AddEditGroupModal
        isVisible={showEditGroupModal***REMOVED***
        hideModal={() => setShowEditGroupModal(false)***REMOVED***
        type='EditGroup'
        groupName={props.activeGroup.name***REMOVED***
      />
    </SafeAreaView>
  )
***REMOVED***

//+ REDUX

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
    justifyContent: 'space-between'
  ***REMOVED***
***REMOVED***)

//+ REDUX

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
