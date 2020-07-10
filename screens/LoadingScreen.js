import React from 'react'
import { View, StyleSheet, Text, Dimensions ***REMOVED*** from 'react-native'
import i18n from 'i18n-js'
import { connect ***REMOVED*** from 'react-redux'
import * as Progress from 'react-native-progress'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { setFetchError, addLanguage ***REMOVED*** from '../redux/actions/databaseActions'
// translations import
import en from '../translations/en.json'
import fr from '../translations/fr.json'
import ar from '../translations/ar.json'

function LoadingScreen (props) {
  i18n.translations = {
    en,
    ar,
    fr
  ***REMOVED***

  function retry () {
    props.setFetchError(false, null)
    props.addLanguage(props.errorLanguage)
  ***REMOVED***

  return props.fetchError ? (
    <View style={styles.screen***REMOVED***>
      <Text style={styles.loadingMessageText***REMOVED***>{i18n.t('errorMessage')***REMOVED***</Text>
      <TouchableOpacity onPress={retry***REMOVED*** style={styles.button***REMOVED***>
        <Text style={styles.buttonTitle***REMOVED***>{i18n.t('retry')***REMOVED***</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.screen***REMOVED***>
      <Text style={styles.loadingMessageText***REMOVED***>{i18n.t('loadingMessage')***REMOVED***</Text>
      <View style={styles.progressBarContainer***REMOVED***>
        <Progress.Bar
          progress={props.progress***REMOVED***
          width={Dimensions.get('window').width - 50***REMOVED***
          color={'black'***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  loadingMessageText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10
  ***REMOVED***,
  progressBarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1E20',
    borderRadius: 5
  ***REMOVED***,
  buttonTitle: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    color: '#FFFFFF'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  console.log(state.fetchingStatus)
  return {
    progress: state.database.currentFetchProgress,
    fetchError: state.fetchingStatus.fetchError,
    errorLanguage: state.fetchingStatus.errorLanguage
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addLanguage: language => {
      dispatch(addLanguage(language))
    ***REMOVED***,
    setFetchError: (status, language) => {
      dispatch(setFetchError(status, language))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
