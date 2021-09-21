import '@firebase/firestore'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import firebase from 'firebase'
import 'firebase/firestore/bundle'
import { bundledAssets, isInOfflineMode } from '../constants'
import { dbMode } from '../modeSwitch'
import { prodConfig } from './prodConfig'
import { testConfig } from './testConfig'

/**
 * This file contains configuration information for using Firebase in Waha,initializes the Firestore database, and exports it so that any other file can access it. The google-services.json and GoogleService-Info.plist files also contained in the firebase folder are required to use Firebase with expo, so they should not be deleted. They are referenced in app.json.
 */

// Configurations for the Waha-Test Firestore database and Waha-Prod Firestore database. If switching to production, you must have the correct prod config file.
const config = dbMode === 'test' ? testConfig : prodConfig

// Create the Firebase object.
firebase.initializeApp(config)

// Create the database object for Firestore.
const db = firebase.firestore()

// If we have many bundled assets, we must be in an offline build. In that case, we need to load a Firestore bundle for offline use.
if (isInOfflineMode) {
  db.disableNetwork()

  Asset.loadAsync(bundledAssets.bundle).then(response => {
    if (response[0].localUri !== null)
      FileSystem.readAsStringAsync(response[0].localUri).then(contents => {
        db.loadBundle(contents)
          .then(response => console.log(response))
          .catch(error => console.log(error))
      })
  })
}

// Finally, export the Firestore database object so that other files can have access to it.
export default db
