//navigation imports
import { createStackNavigator ***REMOVED*** from 'react-navigation-stack';
import { createAppContainer ***REMOVED*** from 'react-navigation';
import { scaleMultiplier ***REMOVED*** from '../constants'
//screen imports
import StudySetScreen from '../screens/StudySetScreen';
import LessonListScreen from '../screens/LessonListScreen';
import PlayScreen from '../screens/PlayScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import OnboardingSlidesScreen from '../screens/OnboardingSlidesScreen';
import SettingsScreen from '../screens/SettingsScreen'
import LanguageInstancesScreen from '../screens/LanguageInstancesScreen';

const DefaultWahaNavigatorOptions = {
    headerStyle: {
        height: 90 * scaleMultiplier,
    ***REMOVED***,
    headerTitleAlign: "center",
    //gestureDirection: "horizontal-inverted"
***REMOVED***

const WahaNavigator = createStackNavigator(
    {
        StudySet: {
            screen: StudySetScreen 
        ***REMOVED***,
        LessonList: {
            screen: LessonListScreen
        ***REMOVED***,
        Play: {
            screen: PlayScreen
        ***REMOVED***,
        LanguageSelect: {
            screen: LanguageSelectScreen
        ***REMOVED***,
        OnboardingSlides: {
            screen: OnboardingSlidesScreen
        ***REMOVED***, 
        Settings: {
           screen: SettingsScreen
        ***REMOVED***,
        LanguageInstances: {
           screen: LanguageInstancesScreen
        ***REMOVED***
    ***REMOVED***,
    {
        defaultNavigationOptions: DefaultWahaNavigatorOptions
    ***REMOVED***
)

export default createAppContainer(WahaNavigator);