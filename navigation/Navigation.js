//navigation imports
import { createStackNavigator ***REMOVED*** from 'react-navigation-stack';
import { createAppContainer ***REMOVED*** from 'react-navigation';

//screen imports
import StudySetScreen from '../screens/StudySetScreen';
import LessonListScreen from '../screens/LessonListScreen';
import PlayScreen from '../screens/PlayScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import OnboardingSlidesScreen from '../screens/OnboardingSlidesScreen';

const DefaultWahaNavigatorOptions = {
    headerStyle: {
        backgroundColor: "white"
    ***REMOVED***
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
    ***REMOVED***,
    {
        defaultNavigationOptions: DefaultWahaNavigatorOptions
    ***REMOVED***
)

export default createAppContainer(WahaNavigator);