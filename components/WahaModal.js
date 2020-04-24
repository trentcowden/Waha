import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import Modal from 'react-native-modal'
import { scaleMultiplier ***REMOVED*** from '../constants';

function WahaModal(props) {

   //// RENDER
   return (
      <Modal
         isVisible={props.isVisible***REMOVED***
         hasBackdrop={true***REMOVED***
         onBackdropPress={props.hideModal***REMOVED***
         backdropOpacity={0.3***REMOVED***
         style={{ justifyContent: "flex-end" ***REMOVED******REMOVED***
      >
         <View>
            <View style={styles.buttonsContainer***REMOVED***>
               {props.children***REMOVED***
            </View>
            <View style={styles.closeButtonContainer***REMOVED***>
               <TouchableOpacity onPress={props.hideModal***REMOVED*** style={styles.closeButtonContainer***REMOVED***>
                  <Text style={{ textAlign: 'center', fontFamily: 'medium', fontSize: 21 * scaleMultiplier, color: "#FF0800" ***REMOVED******REMOVED***>{props.closeText***REMOVED***</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   )
***REMOVED***

const styles = StyleSheet.create({
   buttonsContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10
   ***REMOVED***,
   closeButtonContainer: {
      width: "100%",
      height: 70 * scaleMultiplier,
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      marginVertical: 5
   ***REMOVED***,
***REMOVED***)

export default WahaModal