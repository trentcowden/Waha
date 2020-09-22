import React from 'react'
import { StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// renders the icon on the right side of lesson item that shows the download
//  status
function DownloadStatusIndicator (props) {
  //+ RENDER

  // HERE'S WHAT IS GOING ON
  // Has questionsType (i.e. isn't only video) ?
  //  true: Has audio source ?
  //    true: Downloaded ?
  //      true: cloud-check (downloaded)
  //      false: Connected ?
  // 	      true: Downloading ?
  // 	    	  true: progress-bar (downloading)
  // 		      false: cloud-down (able to download)
  // 	      false: slash (unable to download)
  //    false: null (nothing)
  //  false: cloud-down (able to download)

  function getDownloadPercentage () {
    switch (props.lessonType) {
      case 'qa':
      case 'a':
        return props.downloads[props.lessonID] * 100
        break
      case 'qav':
        return (
          ((props.downloads[props.lessonID] +
            props.downloads[props.lessonID + 'v']) /
            2) *
          100
        )
        break
      case 'qv':
      case 'v':
        return props.downloads[props.lessonID + 'v'] * 100
        break
    ***REMOVED***
  ***REMOVED***

  // if lesson isn't only video
  return props.lessonType !== 'q' && props.lessonType !== '' ? (
    // if lesson has audio source
    props.isDownloaded ? (
      // if lesson is downloaded, show check
      <TouchableOpacity
        onPress={props.showDeleteModal***REMOVED***
        style={styles.downloadButtonContainer***REMOVED***
      >
        <Icon
          name='cloud-check'
          color={colors.chateau***REMOVED***
          size={22 * scaleMultiplier***REMOVED***
        />
      </TouchableOpacity>
    ) : props.isConnected ? (
      props.isDownloading ? (
        // if connected and currently downloading, show progress
        <View style={styles.downloadButtonContainer***REMOVED***>
          <AnimatedCircularProgress
            size={22 * scaleMultiplier***REMOVED***
            width={4 * scaleMultiplier***REMOVED***
            fill={getDownloadPercentage()***REMOVED***
            tintColor={colors.oslo***REMOVED***
            rotation={0***REMOVED***
            backgroundColor={colors.white***REMOVED***
            padding={2***REMOVED***
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
            color={props.isDownloaded ? colors.chateau : colors.tuna***REMOVED***
            size={22 * scaleMultiplier***REMOVED***
          />
        </TouchableOpacity>
      )
    ) : (
      // if not downloaded and not connected, show slash
      <View style={styles.downloadButtonContainer***REMOVED***>
        <Icon
          name='cloud-slash'
          color={colors.tuna***REMOVED***
          size={22 * scaleMultiplier***REMOVED***
        />
      </View>
    )
  ) : // if no audio source, show nothing
  null
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  downloadButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  return {
    isConnected: state.network.isConnected,
    downloads: state.downloads
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(DownloadStatusIndicator)
