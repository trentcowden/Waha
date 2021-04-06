import React from 'react'
import { StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { removeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { colors ***REMOVED*** from '../styles/colors'

function mapStateToProps (state) {
  return {
    isConnected: state.network.isConnected,
    downloads: state.downloads
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

// renders the icon on the right side of lesson item that shows the download
//  status
const DownloadStatusIndicator = ({
  // Props passed from a parent component.s
  isDownloaded,
  isDownloading,
  showDeleteModal,
  showSaveModal,
  lessonID,
  lessonType,
  // Props passed from redux.
  isConnected,
  downloads,
  removeDownload
***REMOVED***) => {
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
    switch (lessonType) {
      case 'qa':
      case 'a':
        return downloads[lessonID] ? downloads[lessonID].progress * 100 : null
        break
      case 'qav':
        return downloads[lessonID] && downloads[lessonID + 'v']
          ? ((downloads[lessonID].progress +
              downloads[lessonID + 'v'].progress) /
              2) *
              100
          : null
        break
      case 'qv':
      case 'v':
        return downloads[lessonID + 'v']
          ? downloads[lessonID + 'v'].progress * 100
          : null
        break
    ***REMOVED***
  ***REMOVED***

  // if lesson isn't only video
  return lessonType !== 'q' && lessonType !== '' ? (
    // if lesson has audio source
    isDownloaded ? (
      // if lesson is downloaded, show check
      <TouchableOpacity
        onPress={showDeleteModal***REMOVED***
        style={styles.downloadButtonContainer***REMOVED***
      >
        <Icon
          name='cloud-check'
          color={colors.chateau***REMOVED***
          size={22 * scaleMultiplier***REMOVED***
        />
      </TouchableOpacity>
    ) : isConnected ? (
      isDownloading ? (
        // if connected and currently downloading, show progress
        <TouchableOpacity
          style={styles.downloadButtonContainer***REMOVED***
          onPress={() => {
            if (downloads[lessonID]) {
              downloads[lessonID].resumable.pauseAsync()
              removeDownload(lessonID)
            ***REMOVED***
            if (downloads[lessonID + 'v']) {
              downloads[lessonID + 'v'].resumable.pauseAsync()
              removeDownload(lessonID + 'v')
            ***REMOVED***
          ***REMOVED******REMOVED***
        >
          <AnimatedCircularProgress
            size={22 * scaleMultiplier***REMOVED***
            width={4 * scaleMultiplier***REMOVED***
            fill={getDownloadPercentage()***REMOVED***
            tintColor={colors.oslo***REMOVED***
            rotation={0***REMOVED***
            backgroundColor={colors.white***REMOVED***
            padding={2***REMOVED***
          >
            {() => (
              <View
                style={{
                  width: 5 * scaleMultiplier,
                  height: 5 * scaleMultiplier,
                  backgroundColor: colors.shark
                ***REMOVED******REMOVED***
              />
            )***REMOVED***
          </AnimatedCircularProgress>
        </TouchableOpacity>
      ) : (
        // if not downloaded, not downloading, and connected, show download icon
        <TouchableOpacity
          onPress={showSaveModal***REMOVED***
          style={styles.downloadButtonContainer***REMOVED***
        >
          <Icon
            name='cloud-download'
            color={isDownloaded ? colors.chateau : colors.tuna***REMOVED***
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadStatusIndicator)
