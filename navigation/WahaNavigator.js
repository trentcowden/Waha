import React from 'react';
import DrawerNavigator from './DrawerNavigator'
import OnboardingNavigator from './OnboaringNavigator'
import LoadingScreen from '../screens/LoadingScreen'
import { connect ***REMOVED*** from 'react-redux'

function WahaNavigator(props) {
   if (props.haveFinishedInitialFetch && !props.isFetching && props.haveFinishedOnboarding) {
      return <DrawerNavigator/>
   // ***REMOVED*** else if ((props.haveFinishedOnboarding && props.isFetching && !props.haveFinishedInitialFetch) || (props.haveFinishedOnboarding && props.fetchError)) {
   //    return <LoadingScreen/>
   ***REMOVED*** else if (!props.haveFinishedInitialFetch) {
      return <OnboardingNavigator/>
   ***REMOVED*** else {
      return <LoadingScreen/>
   ***REMOVED***
***REMOVED***

function mapStateToProps(state) {
   return {
      haveFinishedOnboarding: state.database.haveFinishedOnboarding,
      haveFinishedInitialFetch: state.database.haveFinishedInitialFetch,
      isFetching: state.fetchingStatus.isFetching,
      fetchError: state.fetchingStatus.fetchError
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(WahaNavigator);