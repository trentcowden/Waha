import React from 'react';
import { View, Modal ***REMOVED*** from 'react-native';

function WahaModal(props) {

   //// RENDER
    return (
        <Modal
            visible={props.isVisible***REMOVED***
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true***REMOVED***
        >
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-end"***REMOVED******REMOVED***>
                <View style={{backgroundColor: "white", paddingBottom: 20, paddingTop: 5***REMOVED******REMOVED***>
                    {props.children***REMOVED***
                </View>
            </View>
        </Modal>
    )
***REMOVED***

export default WahaModal