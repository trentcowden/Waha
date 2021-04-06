import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import WahaButton from '../components/standard/WahaButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {***REMOVED***
***REMOVED***

/**
 *
 */
function MTUnlockSuccessfulScreen ({
  navigation: { navigate ***REMOVED***,
  activeGroup,
  activeDatabase,
  isRTL,
  font
***REMOVED***) {
  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      {/* <Image
        source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED***
        style={{
          height: 200 * scaleMultiplier,
          margin: 20,
          resizeMode: 'contain',
          borderRadius: 20,
          overflow: 'hidden'
        ***REMOVED******REMOVED***
      /> */***REMOVED***
      <Icon name='lock-open' size={200***REMOVED*** color={colors.tuna***REMOVED*** />
      <Text
        style={[
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h2',
            'Black',
            'center',
            colors.shark
          ),
          { marginVertical: 10 ***REMOVED***
        ]***REMOVED***
      >
        Mobilization Tools unlocked successfully!
      </Text>
      <WahaButton
        type='filled'
        color={colors.apple***REMOVED***
        onPress={() => navigate('SetsTabs', { screen: 'MobilizationTools' ***REMOVED***)***REMOVED***
        label='Check it out'
        style={{
          width: Dimensions.get('window').width - 40,
          marginHorizontal: 20,
          height: 68 * scaleMultiplier,
          bottom: 0,
          position: 'absolute'
        ***REMOVED******REMOVED***
      />
    </SafeAreaView>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.porcelain,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MTUnlockSuccessfulScreen)
