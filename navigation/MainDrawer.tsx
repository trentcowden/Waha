import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import firebase from 'firebase'
import { LanguageID } from 'languages'
import React, { FC, ReactElement, useEffect } from 'react'
import { isTablet, scaleMultiplier } from '../constants'
import db from '../firebase/db'
import { info } from '../functions/languageDataFunctions'
import { appVersion } from '../modeSwitch'
import { selector, useAppDispatch } from '../redux/hooks'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import {
  storeLanguageSets,
  storeOtherLanguageContent,
  StorySet,
} from '../redux/reducers/database'
import { addLanguageCoreFileToUpdate } from '../redux/reducers/languageInstallation'
import MainStack from './MainStack'
import WahaDrawer from './WahaDrawer'

export type MainDrawerParams = {
  MainStack: undefined
}

// Create the drawer navigator.
const Drawer = createDrawerNavigator<MainDrawerParams>()

/**
 * This component renders a drawer navigator that contains Waha's navigation drawer. It's placed around the MainStack navigator. It also contains a ton of logic related to things that happen globally in the background, such as updating the connection status and retrieving updates from Firestore.
 */
const MainDrawer: FC = ({}): ReactElement => {
  const isRTL = selector(
    (state) => info(activeGroupSelector(state).language).isRTL
  )
  const database = selector((state) => state.database)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const security = selector((state) => state.security)
  const languageCoreFilesCreatedTimes = selector(
    (state) => state.languageInstallation.languageCoreFilesCreatedTimes
  )
  const languageCoreFilesToUpdate = selector(
    (state) => state.languageInstallation.languageCoreFilesToUpdate
  )

  const downloads = selector((state) => state.downloads)

  const dispatch = useAppDispatch()

  /** useEffect function that checks for database updates for other installed languages besides the active one. */
  useEffect(() => {
    Object.keys(database).forEach((key) => {
      if (key.length === 2 && key !== activeGroup.language) {
        var languageID = key as LanguageID
        // Whether the app should write the new Firestore changes to redux or not. The only reason that it wouldn't is if the app version is behind the database version.
        var shouldWrite = false

        // Fetch data from the languages Firestore collection.
        db.collection('languages')
          .doc(languageID)
          .get()
          .then(async (doc) => {
            var languageData = doc.data()
            // If we get some legitimate data back...
            if (doc.exists && languageData !== undefined) {
              // If the Waha version is greater than or equal to the app version in the database...
              if (languageData.appVersion <= appVersion) {
                // Set shouldWrite to true. This way, when we fetch data for the Story Sets for this language, we know we're safe to write to redux.
                shouldWrite = true

                // Store our language info in redux.
                dispatch(
                  storeOtherLanguageContent({
                    files: languageData.files,
                    questionSets: languageData.questions,
                    languageID,
                  })
                )
              }
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('Error retrieving languages data from Firestore.')
          })

        // Fetch data from the Story Sets Firestore collection. Get all Story Sets of the current language.
        db.collection('sets')
          .where('languageID', '==', languageID)
          .get()
          .then((querySnapshot) => {
            // If the data is valid and the current Waha version is greater than or equal to the version in Firebase (we set the shouldWrite variable earlier)...
            if (!querySnapshot.empty) {
              if (shouldWrite) {
                // Add each Story Set to a temporary set array...
                var sets: StorySet[] = []

                querySnapshot.forEach((doc) => {
                  var storySetItem: StorySet = {
                    id: doc.id,
                    languageID: doc.data().languageID,
                    title: doc.data().title,
                    subtitle: doc.data().subtitle,
                    iconName: doc.data().iconName,
                    lessons: doc.data().lessons,
                    tags: doc.data().tags,
                  }

                  sets.push(storySetItem)
                })
                /// ...and write all of them to redux.
                dispatch(storeLanguageSets({ sets, languageID }))
              }
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('Error retrieving sets data from Firestore.')
          })
      }
    })
  }, [])

  /** useEffect function that checks for database updates for the active language. This function gets triggered whenever a user downloads a new lesson and whenever the active group changes. */
  useEffect(() => {
    // Whether the app should write the new Firestore changes to redux or not. The only reason that it wouldn't is if the app version is behind the database version.
    var shouldWrite = false

    // Fetch data from the languages Firestore collection.
    db.collection('languages')
      .doc(activeGroup.language)
      .get()
      .then(async (doc) => {
        // Get our langauge data.
        var languageData = doc.data()

        // If we get some legitimate data back...
        if (doc.exists && languageData !== undefined) {
          // If the Waha version is greater than or equal to the app version in the database...
          if (languageData.appVersion <= appVersion) {
            // Set shouldWrite to true. This way, when we fetch data for the Story Sets for this language, we know we're safe to write to redux.
            shouldWrite = true

            // console.log(t.groups)
            // Store our language info in redux.
            dispatch(
              storeOtherLanguageContent({
                files: languageData.files,
                questionSets: languageData.questions,
                languageID: activeGroup.language,
              })
            )

            // Check if we need replacements for already downloaded Core Files by comparing the created times of downloaded Core Files in redux with the created times of the current Firebase storage Core Files. If the created times don't match, it means a Core File has been updated and we need to queue the new Core File to download.
            languageData.files.forEach((fileName: string) => {
              // Set the file extension for the Core File we're currently checking.
              var fileExtension = fileName.includes('header') ? 'png' : 'mp3'

              var url = `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${activeGroup.language}%2Fother%2F${fileName}.${fileExtension}?alt=media`

              // Check the timeCreated of this Core File in Firebase storage.
              firebase
                .storage()
                .refFromURL(url)
                .getMetadata()
                .then(({ timeCreated }) => {
                  // If the created time of this Core File has already been stored previously AND the created time of the Core File in Firebase is different from the created time that's stored in redux...
                  if (
                    languageCoreFilesCreatedTimes[
                      `${activeGroup.language}-${fileName}`
                    ] &&
                    timeCreated !==
                      languageCoreFilesCreatedTimes[
                        `${activeGroup.language}-${fileName}`
                      ]
                  ) {
                    // Add the Core File to our redux array of files to update, assuming that it hasn't already been added.
                    if (
                      !languageCoreFilesToUpdate.includes(
                        `${activeGroup.language}-${fileName}`
                      )
                    ) {
                      console.log(`${fileName} needs to be replaced.\n`)
                      dispatch(
                        addLanguageCoreFileToUpdate({
                          fileName: `${activeGroup.language}-${fileName}`,
                        })
                      )
                    }
                  }
                })
            })

            if (FileSystem.documentDirectory !== null) {
              // Read the contents of Waha's file directory to check which Core Files are downloaded.
              FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
                (contents) => {
                  // console.log(contents)
                  // For each Core File listed in Firestore, verify that it's already downloaded.
                  if (languageData !== undefined)
                    languageData.files.forEach((fileName: string) => {
                      var fileExtension = fileName.includes('header')
                        ? 'png'
                        : 'mp3'
                      // If it isn't downloaded...
                      if (
                        !contents.includes(
                          `${activeGroup.language}-${fileName}.${fileExtension}`
                        )
                      ) {
                        // Add the Core File to our redux array of files to download, assuming that it hasn't already been added.
                        if (
                          !languageCoreFilesToUpdate.includes(
                            `${activeGroup.language}-${fileName}`
                          )
                        ) {
                          console.log(`${fileName} needs to be added.`)
                          dispatch(
                            addLanguageCoreFileToUpdate({
                              fileName: `${activeGroup.language}-${fileName}`,
                            })
                          )
                        }
                      }
                    })
                }
              )
            }
          }
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(
          'Error retrieving languages data from Firestore (in checking created times part).'
        )
      })

    // Fetch data from the Story Sets Firestore collection. Get all Story Sets of the current language.
    db.collection('sets')
      .where('languageID', '==', activeGroup.language)
      .get()
      .then((querySnapshot) => {
        // If the data is valid and the current Waha version is greater than or equal to the version in Firebase (we set the shouldWrite variable earlier)...
        if (!querySnapshot.empty) {
          if (shouldWrite) {
            // Add each Story Set to a temporary set array...
            var sets: StorySet[] = []

            querySnapshot.forEach((doc) => {
              var storySetItem: StorySet = {
                id: doc.id,
                languageID: doc.data().languageID,
                title: doc.data().title,
                subtitle: doc.data().subtitle,
                iconName: doc.data().iconName,
                lessons: doc.data().lessons,
                tags: doc.data().tags,
              }

              sets.push(storySetItem)
            })
            /// ...and write all of them to redux.
            dispatch(
              storeLanguageSets({ sets, languageID: activeGroup.language })
            )
          }
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('Error retrieving sets data from Firestore.')
      })
  }, [Object.keys(downloads).length, activeGroup])

  /**
   * Determines whether a screen should be able to access the navigation drawer via gesture. Should only return true on the SetsTabs navigator because this is the only spot we should be able to swipe to open the drawer.
   * @param {string} route - The route passed from the navigation component.
   * @return {boolean} - Whether gestures should be enabled or not.
   */
  function getGestureEnabled(route: RouteProp<MainDrawerParams, 'MainStack'>) {
    const routeName = getFocusedRouteNameFromRoute(route)

    if (routeName === undefined) return security.securityEnabled ? false : true
    else return routeName === 'SetsTabs' ? true : false
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition={isRTL ? 'right' : 'left'}
        drawerType={'back'}
        drawerContent={(props) => <WahaDrawer {...props} />}
        drawerStyle={{
          width: isTablet ? '50%' : '80%',
        }}
        edgeWidth={75 * scaleMultiplier}
        initialRouteName='MainStack'
      >
        <Drawer.Screen
          options={({ route }) => ({
            gestureEnabled: getGestureEnabled(route),
          })}
          name='MainStack'
          component={MainStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default MainDrawer
