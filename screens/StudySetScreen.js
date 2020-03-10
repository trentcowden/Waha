//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator ***REMOVED*** from 'react-native';
import { purgeStoredState ***REMOVED*** from 'redux-persist'

//data import
import { AsyncStorage ***REMOVED*** from 'react-native';


//other component imports
import StudySetItem from '../components/StudySetItem';

//redux
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'

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
        props.changeLanguage("english");
        props.addLanguage("english");
    ***REMOVED***, [])

    //function to navigate to the lesson list screen
    //props.navigation.navigate takes us to lessonlist screen
    //params is the information we want to pass to lessonlist screen
    function navigateToLessonList(item) {
        props.navigation.navigate({
            routeName: "LessonList",
            params: {
                title: item.title,
                studySetID: item.id,
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

    if (!props.isFetching) {
        return (
            <View style={styles.screen***REMOVED***>
                <FlatList
                    data={props.database[props.database.currentLanguage].studySets***REMOVED***
                    renderItem={renderStudySetItem***REMOVED***
                />
                <Text style={{...styles.text, color: props.primaryColor***REMOVED******REMOVED***>This text is the primary color from the database! How cool!</Text>
                <Text style={{...styles.text, color: props.secondaryColor***REMOVED******REMOVED***>This text is the secondary color from the database! Radical!</Text>
            </View>
        )
    ***REMOVED*** else {
        return (
            <View style={{flex: 1, justifyContent: "center"***REMOVED******REMOVED***>
                <Text style={{textAlign: "center", fontSize: 30, marginVertical: 20***REMOVED******REMOVED***>Hang on, we're setting things up...</Text>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    ***REMOVED***
***REMOVED***

StudySetScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Study Sets'
    ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    ***REMOVED***,
    text: {
        textAlign: "center",
        margin: 40
    ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
    console.log(state)
    if(!state.database.isFetching)
        return {
            database: state.database,
            primaryColor: state.database[state.database.currentLanguage].colors.primaryColor,
            secondaryColor: state.database[state.database.currentLanguage].colors.secondaryColor
        ***REMOVED***
    else {
        return {
            isFetching: state.database.isFetching,
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
return {
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language))
***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(StudySetScreen);