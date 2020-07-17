import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
  Clipboard,
  Alert,
  Switch
***REMOVED*** from 'react-native'

function GameScreen (props) {
  //// STATE

  const [pattern, setPattern] = useState('')

  //// CONSTRUCTOR

  useEffect(() => {
    console.log(pattern)
    if (pattern.includes('brownblueyellow'))
      props.navigation.replace('SetsRoot')
  ***REMOVED***, [pattern])

  //// RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <View style={{ flexDirection: 'row', flex: 1, width: '66%', margin: 10 ***REMOVED******REMOVED***>
        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#3362F2' ***REMOVED***]***REMOVED***
          onPress={() => setPattern(pattern => pattern + 'blue')***REMOVED***
        />
        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#CB36FF' ***REMOVED***]***REMOVED***
          onPress={() => setPattern(pattern => pattern + 'purple')***REMOVED***
        />
      </View>
      <View style={{ flexDirection: 'row', flex: 1 ***REMOVED******REMOVED***>
        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#E84E3C' ***REMOVED***]***REMOVED***
          onPress={() => setPattern(pattern => pattern + 'red')***REMOVED***
        />
        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#CF912D' ***REMOVED***]***REMOVED***
          onPress={() => setPattern(pattern => pattern + 'brown')***REMOVED***
        />
        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#FFFD51' ***REMOVED***]***REMOVED***
          onPress={() => setPattern(pattern => pattern + 'yellow')***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    padding: 50
  ***REMOVED***,
  key: {
    flex: 1,
    height: '100%',
    margin: 5,
    borderRadius: 10
  ***REMOVED***
***REMOVED***)

export default GameScreen
