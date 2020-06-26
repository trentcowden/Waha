import React from 'react'
import { View, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'

function DownloadStatusIndicator (props) {
  //// RENDER

  // WHAT TO RENDER
  // Has audio source?
  //  true: Downloaded?
  //    true: cloud-check
  //    false: Connected?
  // 	    true: Downloading?
  // 	    	true: progress-bar
  // 		    false: cloud-down
  // 	    false: slash
  //  false: null

  // TODO: show download options/progress for lessons with ONLY video
  return props.hasAudioSource ? (
    // if has audio source
    props.isDownloaded ? (
      // if downloaded, show check
      <TouchableOpacity
        onPress={props.showDeleteModal***REMOVED***
        style={styles.downloadButtonContainer***REMOVED***
      >
        <Icon name='cloud-check' color='#9FA5AD' size={22 * scaleMultiplier***REMOVED*** />
      </TouchableOpacity>
    ) : props.isConnected ? (
      props.lessonID in props.downloads ? (
        // if connected and currently downloading, show progress
        <View style={styles.downloadButtonContainer***REMOVED***>
          <AnimatedCircularProgress
            size={22 * scaleMultiplier***REMOVED***
            width={5 * scaleMultiplier***REMOVED***
            fill={
              props.hasQuestionsType
                ? props.hasVideoSource && props.hasAudioSource
                  ? ((props.downloads[props.lessonID] +
                      props.downloads[props.lessonID + 'v']) /
                      2) *
                    100
                  : props.downloads[props.lessonID] * 100
                : props.downloads[props.lessonID + 'v'] * 100
            ***REMOVED***
            tintColor={'#828282'***REMOVED***
            rotation={0***REMOVED***
            backgroundColor='#FFFFFF'
          />
        </View>
      ) : (
        // if not downloaded, not downloading, and connected, show download icon
        <TouchableOpacity
          onPress={props.showSaveModal***REMOVED***
          style={styles.downloadButtonContainer***REMOVED***
        >
          <Icon
            name='cloud-download'
            color={props.isDownloaded ? '#9FA5AD' : '#3A3C3F'***REMOVED***
            size={22 * scaleMultiplier***REMOVED***
          />
        </TouchableOpacity>
      )
    ) : (
      // if not downloaded and not connected, show slash
      <View style={styles.downloadButtonContainer***REMOVED***>
        <Icon name='cloud-slash' color='#3A3C3F' size={22 * scaleMultiplier***REMOVED*** />
      </View>
    )
  ) : // if no audio source, show nothing
  null
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  downloadButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  return {
    isConnected: state.network.isConnected,
    downloads: state.downloads
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(DownloadStatusIndicator)
