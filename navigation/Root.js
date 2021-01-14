import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import LoadingScreen from '../screens/LoadingScreen'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'

function Root ({
  hasOnboarded,
  hasInstalledFirstLanguageInstance,
  isInstallingLanguageInstance
***REMOVED***) {
  // conditionally render the right navigator
  // if we're done with onboarding/fetching, render the main drawer
  // if we're not done with those things, render the onboarding screens
  // otherwise, we're fetching, so render the loading screen
  if (
    hasInstalledFirstLanguageInstance &&
    !isInstallingLanguageInstance &&
    hasOnboarded
  ) {
    return <MainDrawer />
  ***REMOVED*** else if (
    !hasInstalledFirstLanguageInstance ||
    (hasInstalledFirstLanguageInstance && !hasOnboarded)
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
