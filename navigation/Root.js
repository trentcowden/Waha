import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import { groupNames ***REMOVED*** from '../constants'
import { changeActiveGroup, createGroup ***REMOVED*** from '../redux/actions/groupsActions'
import LoadingScreen from '../screens/LoadingScreen'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'

function Root (props) {
  // Below are some failsafes to keep the app functioning in case of group errors.
  if (props.activeGroup) {
    // If somehow, every group got deleted, create a new group in one of the installed languages so that the app can still function.
    if (props.groups.length === 0) {
      var languageID
      Object.keys(props.database).forEach(key => {
        if (key.length === 2) {
          languageID = key
        ***REMOVED***
      ***REMOVED***)
      props.createGroup(groupNames[languageID], languageID, 'default')
      props.changeActiveGroup(groupNames[languageID])
      // If somehow, we switch to a group that doesn't exist, fall back to the first group in the groups redux array so that the app can still function.
    ***REMOVED*** else if (!props.groups.some(group => props.activeGroup === group.name)) {
      props.changeActiveGroup(props.groups[0].name)
    ***REMOVED***
  ***REMOVED***

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
  if (state.activeGroup)
    return {
      hasOnboarded: state.database.hasOnboarded,
      hasInstalledFirstLanguageInstance:
        state.database.hasInstalledFirstLanguageInstance,
      isInstallingLanguageInstance: state.isInstallingLanguageInstance,
      activeGroup: state.activeGroup,
      groups: state.groups,
      database: state.database
    ***REMOVED***
  else
    return {
      hasOnboarded: state.database.hasOnboarded,
      hasInstalledFirstLanguageInstance:
        state.database.hasInstalledFirstLanguageInstance,
      isInstallingLanguageInstance: state.isInstallingLanguageInstance
    ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***,
    createGroup: (groupName, language, emoji) =>
      dispatch(createGroup(groupName, language, emoji))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Root)
