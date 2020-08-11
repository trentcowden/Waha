import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import LoadingScreen from '../screens/LoadingScreen'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'

function Root (props) {
  // const [appState, setAppState] = useState('')

  // function handleAppStateChange (change) {
  //   setAppState(change)
  // ***REMOVED***

  // useEffect(() => {
  //   const appStateUnsubscribe = AppState.addEventListener(
  //     'change',
  //     handleAppStateChange
  //   )
  //   return function cleanup () {
  //     AppState.removeEventListener('change', handleAppStateChange)
  //   ***REMOVED***
  // ***REMOVED***, [])
  if (
    props.haveFinishedInitialFetch &&
    !props.isFetching &&
    props.haveFinishedOnboarding
  ) {
    // if (appState === 'inactive' || appState === 'background') {
    //   return <GameScreen />
    // ***REMOVED*** else
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
