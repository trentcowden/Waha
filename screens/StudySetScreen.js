//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Button ***REMOVED*** from 'react-native';
import { AppLoading ***REMOVED*** from 'expo'
//data import
import { STUDYSETS ***REMOVED*** from '../data/dummy-data';
import { AsyncStorage ***REMOVED*** from 'react-native';
import db from '../config'

//other component imports
import StudySetItem from '../components/StudySetItem';

//redux
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { changeLanguage ***REMOVED*** from '../redux/actions/currentLanguageActions'

function StudySetScreen(props) {

    //state to do stuff on first launch (use for onboarding)
    const [isFirstLaunch, setIsFirstLaunch] = useState(false);

    async function checkFirstLaunch() {
        //UNCOMMENT TO CLEAR ASYNC STORAGE
        //   const asyncStorageKeys = await AsyncStorage.getAllKeys();
        // if (asyncStorageKeys.length > 0) {
        //     AsyncStorage.clear();
        // ***REMOVED***  
        try {
            await AsyncStorage
                .getItem('alreadyLaunched')
                .then(value => {
                    if (value == null) {
                        AsyncStorage.setItem('alreadyLaunched', 'true');
                        setIsFirstLaunch(true);
                    ***REMOVED***
                ***REMOVED***)
        ***REMOVED*** catch (error) {
            console.log(error);
        ***REMOVED***
    ***REMOVED***


    //check if we're on first launch (maybe get better solution later;
    //this does an async operation every time this screen opens)
    useEffect(() => {
        checkFirstLaunch();
    ***REMOVED***, [])

    //function to navigate to the lesson list screen
    //props.navigation.navigate takes us to lessonlist screen
    //params is the information we want to pass to lessonlist screen
    function navigateToLessonList(item) {
        props.navigation.navigate({
            routeName: "LessonList",
            params: {
                title: item.title,
                studySetID: item.id
            ***REMOVED***
        ***REMOVED***)
    ***REMOVED***

    //function to render the studyset items
    //includes onSelect which navigates to the appropriate lesson list screen
    function renderStudySetItem(studySetList) {
        return (
            <StudySetItem
                title={studySetList.item.title***REMOVED***
                onStudySetSelect={() => navigateToLessonList(studySetList.item)***REMOVED***
            />
        )
    ***REMOVED***

    function dummyLanguageSetup() {
        props.changeLanguage("english")
        props.addLanguage("english");
    ***REMOVED***

    return (
        <View style={styles.screen***REMOVED***>
            <FlatList
                data={STUDYSETS***REMOVED***
                renderItem={renderStudySetItem***REMOVED***
            />
            <View style={{height: 100***REMOVED******REMOVED***>
                <Button title="fetch data" onPress={dummyLanguageSetup***REMOVED***/>
            </View>
        </View>
    )
***REMOVED***

StudySetScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Study Sets'
    ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
    console.log(state)
    return {
        database: state.database,
        currentLanguage: state.language.currentLanguage
    ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
return {
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language))
***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(StudySetScreen);