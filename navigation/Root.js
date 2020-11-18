import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import LoadingScreen from '../screens/LoadingScreen'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'

function Root (props) {
  // conditionally render the right navigator
  // if we're done with onboarding/fetching, render the main drawer
  // if we're not done with those things, render the onboarding screens
  // otherwise, we're fetching, so render the loading screen
  if (
    props.hasInstalledFirstLanguageInstance &&
    !props.isInstallingLanguageInstance &&
    props.hasOnboarded
  ) {
    return <MainDrawer />
  ***REMOVED*** else if (
    !props.hasInstalledFirstLanguageInstance ||
    (props.hasInstalledFirstLanguageInstance && !props.hasOnboarded)
  ) {
    return <Onboarding />
  ***REMOVED*** else {
    return <LoadingScreen />
  ***REMOVED***
***REMOVED***

function mapStateToProps (state) {
  return {
    hasOnboarded: state.database.hasOnboarded,
    hasInstalledFirstLanguageInstance:
      state.database.hasInstalledFirstLanguageInstance,
    isInstallingLanguageInstance: state.isInstallingLanguageInstance
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(Root)
