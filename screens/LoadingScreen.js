import React from 'react';
import { View, ActivityIndicator, Text ***REMOVED*** from 'react-native';
import i18n from 'i18n-js';

function LoadingScreen(props) {
   i18n.translations = {
      en: {
         loadingMessage: "aliquet eget sit amet tellus cras..."
      ***REMOVED***,
   ***REMOVED***;
   return (
      <View style={{ flex: 1, justifyContent: "center" ***REMOVED******REMOVED***>
         <Text style={{ textAlign: "center", fontSize: 30, padding: 10, fontFamily: "medium" ***REMOVED******REMOVED***>{i18n.t('loadingMessage')***REMOVED***</Text>
         <ActivityIndicator size="large" color="black" />
      </View>
   )
***REMOVED***

export default LoadingScreen