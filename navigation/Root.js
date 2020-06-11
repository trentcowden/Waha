import React from 'react'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'
import LoadingScreen from '../screens/LoadingScreen'
import { connect ***REMOVED*** from 'react-redux'

function Root (props) {
  if (
    props.haveFinishedInitialFetch &&
    !props.isFetching &&
    props.haveFinishedOnboarding
  ) {
    return <MainDrawer />
    // ***REMOVED*** else if ((props.haveFinishedOnboarding && props.isFetching && !props.haveFinishedInitialFetch) || (props.haveFinishedOnboarding && props.fetchError)) {
    //    return <LoadingScreen/>
  ***REMOVED*** else if (
    !props.haveFinishedInitialFetch ||
    (props.haveFinishedInitialFetch && !props.haveFinishedOnboarding)
  ) {
    return <Onboarding />
  ***REMOVED*** else {
    return <LoadingScreen />
  ***REMOVED***
***REMOVED***

function mapStateToProps (state) {
  return {
    haveFinishedOnboarding: state.database.haveFinishedOnboarding,
    haveFinishedInitialFetch: state.database.haveFinishedInitialFetch,
    isFetching: state.fetchingStatus.isFetching,
    fetchError: state.fetchingStatus.fetchError
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(Root)
