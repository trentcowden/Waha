import React from 'react';
import { View, StyleSheet, Text, Dimensions ***REMOVED*** from 'react-native';
import i18n from 'i18n-js';
import { connect ***REMOVED*** from 'react-redux'
import * as Progress from 'react-native-progress';

function LoadingScreen(props) {
   i18n.translations = {
      en: {
         loadingMessage: "Hang on, we're setting things up..."
      ***REMOVED***,
      te: {
         loadingMessage: "aliquet eget sit amet tellus cras..."
      ***REMOVED***,
   ***REMOVED***;
   return (
      <View style={styles.screen***REMOVED***>
         <Text style={styles.loadingMessageText***REMOVED***>{i18n.t('loadingMessage')***REMOVED***</Text>
         <View style={styles.progressBarContainer***REMOVED***>
            <Progress.Bar 
               progress={props.progress***REMOVED*** 
               width={Dimensions.get('window').width - 50***REMOVED*** 
               color={"black"***REMOVED***
            />
         </View>
         {/* <ActivityIndicator size="large" color="black" /> */***REMOVED***
      </View>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "center",
   ***REMOVED***,
   loadingMessageText: {
      textAlign: "center",
      fontSize: 30,
      padding: 10,
      fontFamily: "medium"
   ***REMOVED***,
   progressBarContainer: {
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center'
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   return {
      progress: state.database.currentFetchProgress
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(LoadingScreen);