import React from 'react';
import { TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants';

function BackButton(props) {
   return (
         <TouchableOpacity
            style={[styles.backButtonContainer, {justifyContent: props.isRTL ? 'flex-end' : 'flex-start'***REMOVED***]***REMOVED***
            onPress={props.onPress***REMOVED***
         >
            <Icon
               name={props.isRTL ? 'arrow-right' : 'arrow-left'***REMOVED***
               size={45 * scaleMultiplier***REMOVED***
               color="#828282"
            />
         </TouchableOpacity>
   )
***REMOVED***

const styles = StyleSheet.create({
   backButtonContainer: {
      flexDirection: "row",
      width: 100,
   ***REMOVED***
***REMOVED***)

export default BackButton