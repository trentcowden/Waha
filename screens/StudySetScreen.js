//basic imports
import React, { useEffect, useState ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import i18n from 'i18n-js';

//other component imports
import StudySetItem from '../components/StudySetItem';

//redux
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { setFirstOpen ***REMOVED*** from '../redux/actions/databaseActions'

function StudySetScreen(props) {

    //check if we're on first launch (maybe get better solution later;
    //this does an async operation every time this screen opens)
    useEffect(() => {
        if (props.isFirstOpen) {
            props.navigation.replace("LanguageSelect")
        ***REMOVED***
        //props.changeLanguage("english");
        //props.addLanguage("english");
    ***REMOVED***, [])

    FileSystem.getFreeDiskStorageAsync().then(freeDiskStorage => {
        //console.log(freeDiskStorage)
      ***REMOVED***);
    
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
        //console.log(contents)
    ***REMOVED***);

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

    i18n.translations = {
        en: { 
          loadingMessage: "Hang on, we're setting things up..."
        ***REMOVED***,
        es: {
          loadingMessage: "Espera, estamos preparando las cosas..."
        ***REMOVED***
      ***REMOVED***;



    ////////////////////////////////
    ////RENDER/STYLES/NAVOPTIONS////
    ////////////////////////////////

    
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

    //if we're not fetching data, render the flatlist. if we are, render a loading screen
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
                <Text style={{textAlign: "center", fontSize: 30, marginVertical: 20***REMOVED******REMOVED***>{i18n.t('loadingMessage')***REMOVED***</Text>
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

/////////////
////REDUX////
/////////////

function mapStateToProps(state) {
    if(!state.database.isFetching)
        return {
            database: state.database,
            primaryColor: state.database[state.database.currentLanguage].colors.primaryColor,
            secondaryColor: state.database[state.database.currentLanguage].colors.secondaryColor
        ***REMOVED***
    else {
        return {
            isFetching: state.database.isFetching,
            isFirstOpen: state.database.isFirstOpen
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
return {
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language)),
    setFirstOpen: toSet => dispatch(setFirstOpen(toSet))
***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(StudySetScreen);