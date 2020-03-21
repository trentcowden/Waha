//imports
import React, { useState, useEffect ***REMOVED*** from 'react';
import { View, StyleSheet, Text, Button, Image ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';

//redux imports
import { toggleComplete ***REMOVED*** from '../redux/actions/appProgressActions'
import { setFirstOpen ***REMOVED*** from '../redux/actions/databaseActions'
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'


function OnboardingSlidesScreen(props) {

  
  //////////////////////////////////////////
  ////STATE, CONSTRUCTOR, AND NAVIGATION////
  //////////////////////////////////////////


  function navigateToLoading() {
    props.navigation.replace("StudySet")
  ***REMOVED***

  useEffect(() => {
    props.setFirstOpen(false)
    var language = props.navigation.getParam("selectedLanguage")
    props.changeLanguage(language)
    props.addLanguage(language)
  ***REMOVED***, [])

  const [pageNumber, setPageNumber] = useState(1)

  ///////////////////////
  ////OTHER FUNCTIONS////
  ///////////////////////

  function incrementPageNumber(direction) {
    if (direction === "next") {
      setPageNumber(oldPageNumber =>  oldPageNumber += 1)
    ***REMOVED*** else {
      setPageNumber(oldPageNumber => oldPageNumber -= 1)
    ***REMOVED***
  ***REMOVED***

  useEffect(() => {
    console.log(pageNumber)
  ***REMOVED***, [pageNumber])

  
  ////////////////////////////////
  ////RENDER/STYLES/NAVOPTIONS////
  ////////////////////////////////
  var image;
  var title;
  var body;
  switch (pageNumber) {
    case 1:
      image = <Image source={require('../assets/meme1.png')***REMOVED*** style={styles.image***REMOVED***/>
      title = <Text style={styles.title***REMOVED***>Welcome to the app!</Text>
      body = <Text style={styles.body***REMOVED***>Jeff keeps adding new features for me to do :)</Text>
      break;
    case 2:
      image = <Image source={require('../assets/meme2.jpg')***REMOVED*** style={styles.image***REMOVED***/>
      title = <Text style={styles.title***REMOVED***>I enjoy it though</Text>
      body = <Text style={styles.body***REMOVED***>Here's a picture of me as a kid</Text>
      break;
    case 3:
      image = <Image source={require('../assets/meme3.jpg')***REMOVED*** style={styles.image***REMOVED***/>
      title = <Text style={styles.title***REMOVED***>Sometimes when I code</Text>
      body = <Text style={styles.body***REMOVED***>I get frustrated and make the face of this cat</Text>
      break;
    case 4:
      image = <Image source={require('../assets/meme4.jpg')***REMOVED*** style={styles.image***REMOVED***/>
      title = <Text style={styles.title***REMOVED***>And then I ask myself</Text>
      body = <Text style={styles.body***REMOVED***>Why do I do it?</Text>
      break;
    default:
      console.log('out of page number bounds')
  ***REMOVED***

  //create modal in here, pass state to show it to lesson item so lesson item
  //can change it and show the modal on this screen
  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.pageContainer***REMOVED***>
        <View style={styles.imageContainer***REMOVED***>
          {image***REMOVED***
        </View>
        <View style={styles.titleContainer***REMOVED***>
          {title***REMOVED***
        </View>
        <View style={styles.bodyContainer***REMOVED***>
          {body***REMOVED***
        </View>
      </View>
      <View style={styles.buttonsContainer***REMOVED***>
        <View>
          {pageNumber > 1 ? <Button title="Prev" onPress={() => incrementPageNumber("prev")***REMOVED***/>: null***REMOVED***
        </View>
        <View>
          <Button title={pageNumber !== 4 ? "Next" : "Finish"***REMOVED*** onPress={pageNumber !== 4 ? () => incrementPageNumber("next") : () => props.navigation.replace("StudySet")***REMOVED***/>
        </View>
      </View>
    </View>
  )
***REMOVED***

OnboardingSlidesScreen.navigationOptions = navigationData => {
  return {
    headerShown: false
  ***REMOVED***;
***REMOVED***;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  ***REMOVED***,
  pageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    flex: 1
  ***REMOVED***,
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  ***REMOVED***,
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "20%",
    padding: 100
  ***REMOVED***,
  titleContainer: {
    width: "100%",
    padding: 20,
  ***REMOVED***,
  title: {
    textAlign: "center",
    fontSize: 50,
    flexWrap: "wrap",
  ***REMOVED***,
  bodyContainer: {
    width: "100%",
    padding: 20,
  ***REMOVED***,
  body: {
    textAlign: "center",
    fontSize: 20,
    flexWrap: "wrap",
  ***REMOVED***,
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  ***REMOVED***
***REMOVED***)


/////////////
////REDUX////
/////////////


function mapStateToProps(state) {
  //console.log(state)
  return {
  ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
  return {
    setFirstOpen: toSet => dispatch(setFirstOpen(toSet)),
    addLanguage: language => dispatch(addLanguage(language)),
    changeLanguage: language => dispatch(changeLanguage(language)),
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSlidesScreen);