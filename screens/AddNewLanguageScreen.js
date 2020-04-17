import React, { useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, Image ***REMOVED*** from 'react-native';
import BackButton from '../components/BackButton'
import { scaleMultiplier, headerImages ***REMOVED*** from '../constants'
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage ***REMOVED*** from '../redux/actions/databaseActions'

function AddNewLanguageScreen(props) {

   //// CONSTRUCTOR

   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [])

   //// NAV OPTIONS

   function getNavOptions() {
      return {
         headerRight: props.isRTL ?
            () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** /> :
            () => <View></View>,
         headerLeft: props.isRTL ?
            () => <View></View> :
            () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />,
      ***REMOVED***
   ***REMOVED***

   // manually updated list of all available languages to cross check with downloaded languages
   var languageInstanceList = [
      {
         id: 'en',
         displayName: 'English'
      ***REMOVED***,
      {
         id: 'kl',
         displayName: 'Klingon'
      ***REMOVED***,
   ]

   // set list of installed languages
   var installedLanguageInstances = []
   for (key in props.database) {
      if (key.length === 2) {
         installedLanguageInstances.push(key)
      ***REMOVED***
   ***REMOVED***

   //// RENDER

   function renderLanguageInstanceItem(languageInstanceList) {
      return (
         <TouchableOpacity
            style={[styles.languageInstanceItem, { direction: props.isRTL ? 'rtl' : 'ltr' ***REMOVED***]***REMOVED***
            onPress={() => Alert.alert(
               props.translations.alerts.addNewLanguage.header,
               props.translations.alerts.addNewLanguage.body,
               [{
                  text: props.translations.alerts.options.cancel,
                  onPress: () => {***REMOVED***
               ***REMOVED***, {
                  text: props.translations.alerts.options.ok,
                  onPress: () => props.addLanguage(languageInstanceList.item.id)
               ***REMOVED***]
            )***REMOVED***
         >
            <Text style={styles.languageInstanceText***REMOVED***>{languageInstanceList.item.displayName***REMOVED***</Text>
            <Image style={styles.languageLogo***REMOVED*** source={headerImages[languageInstanceList.item.id]***REMOVED*** />
         </TouchableOpacity>
      )
   ***REMOVED***

   return (
      <View style={styles.screen***REMOVED***>
         <FlatList
            data={languageInstanceList.filter(item => !installedLanguageInstances.includes(item.id))***REMOVED***
            renderItem={renderLanguageInstanceItem***REMOVED***
         />
      </View>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#F7F7F7"
   ***REMOVED***,
   languageInstanceItem: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
      height: 60,
      margin: 5,
      borderWidth: 2,
      borderColor: "#9FA5AD"
   ***REMOVED***,
   languageInstanceText: {
      color: '#82868D',
      paddingLeft: 10,
      fontSize: 18,
      fontFamily: 'regular'
   ***REMOVED***,
   languageLogo: {
      resizeMode: "stretch",
      width: 96 * scaleMultiplier,
      height: 32 * scaleMultiplier,
      marginRight: 10
   ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      isRTL: state.database[activeGroup.language].isRTL,
      database: state.database,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
      addLanguage: language => dispatch(addLanguage(language)),
   ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddNewLanguageScreen);