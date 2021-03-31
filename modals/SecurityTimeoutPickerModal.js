import React from 'react'
import { StyleSheet ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OptionsModalButton from '../components/OptionsModalButton'
import Separator from '../components/standard/Separator'
import { scaleMultiplier ***REMOVED*** from '../constants'
import OptionsModal from '../modals/OptionsModal'
import {
  setSecurityEnabled,
  setTimeoutDuration
***REMOVED*** from '../redux/actions/securityActions'
import { activeDatabaseSelector ***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'

function mapStateToProps (state) {
  return {
    translations: activeDatabaseSelector(state).translations,
    security: state.security
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setSecurityEnabled: toSet => dispatch(setSecurityEnabled(toSet)),
    setTimeoutDuration: ms => dispatch(setTimeoutDuration(ms))
  ***REMOVED***
***REMOVED***

/**
 * A modal that allows the user to change the security timeout. Displays a list of options using the OptionsModal component.
 * @param {boolean***REMOVED*** isVisible - Whether the modal should be visible or not.
 * @param {Function***REMOVED*** hideModal - Function to hide the modal.
 */
function SecurityTimeoutPickerModal ({
  isVisible,
  hideModal,
  // Props passed from redux.
  translations,
  security,
  setSecurityEnabled,
  setTimeoutDuration
***REMOVED***) {
  return (
    <OptionsModal
      isVisible={isVisible***REMOVED***
      hideModal={hideModal***REMOVED***
      closeText={translations.general.cancel***REMOVED***
    >
      {/* Button to set the timeout duration to instant. */***REMOVED***
      <OptionsModalButton
        title={translations.security.instant_label***REMOVED***
        onPress={() => {
          setTimeoutDuration(0), hideModal()
        ***REMOVED******REMOVED***
      >
        {security.timeoutDuration === 0 ? (
          <Icon
            name='check'
            color={colors.apple***REMOVED***
            size={30 * scaleMultiplier***REMOVED***
            style={styles.checkIcon***REMOVED***
          />
        ) : null***REMOVED***
      </OptionsModalButton>
      <Separator />
      {/* Button to set the timeout duration to 1 minute. */***REMOVED***
      <OptionsModalButton
        title={translations.security.one_minute_label***REMOVED***
        onPress={() => {
          setTimeoutDuration(60000), hideModal()
        ***REMOVED******REMOVED***
      >
        {security.timeoutDuration === 60000 ? (
          <Icon
            name='check'
            color={colors.apple***REMOVED***
            size={30 * scaleMultiplier***REMOVED***
            style={styles.checkIcon***REMOVED***
          />
        ) : null***REMOVED***
      </OptionsModalButton>
      <Separator />
      {/* Button to set the timeout duration to 5 minutes. */***REMOVED***
      <OptionsModalButton
        title={translations.security.five_minutes_label***REMOVED***
        onPress={() => {
          setTimeoutDuration(300000), hideModal()
        ***REMOVED******REMOVED***
      >
        {security.timeoutDuration === 300000 ? (
          <Icon
            name='check'
            color={colors.apple***REMOVED***
            size={30 * scaleMultiplier***REMOVED***
            style={styles.checkIcon***REMOVED***
          />
        ) : null***REMOVED***
      </OptionsModalButton>
      <Separator />
      {/* Button to set the timeout duration to 15 minutes. */***REMOVED***
      <OptionsModalButton
        title={translations.security.fifteen_minutes_label***REMOVED***
        onPress={() => {
          setTimeoutDuration(900000), hideModal()
        ***REMOVED******REMOVED***
      >
        {security.timeoutDuration === 900000 ? (
          <Icon
            name='check'
            color={colors.apple***REMOVED***
            size={30 * scaleMultiplier***REMOVED***
            style={styles.checkIcon***REMOVED***
          />
        ) : null***REMOVED***
      </OptionsModalButton>
      <Separator />
      {/* Button to set the timeout duration to 1 hour. */***REMOVED***
      <OptionsModalButton
        title={translations.security.one_hour_label***REMOVED***
        onPress={() => {
          setTimeoutDuration(3600000), hideModal()
        ***REMOVED******REMOVED***
      >
        {security.timeoutDuration === 3600000 ? (
          <Icon
            name='check'
            color={colors.apple***REMOVED***
            size={30 * scaleMultiplier***REMOVED***
            style={styles.checkIcon***REMOVED***
          />
        ) : null***REMOVED***
      </OptionsModalButton>
    </OptionsModal>
  )
***REMOVED***

const styles = StyleSheet.create({
  checkIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityTimeoutPickerModal)
