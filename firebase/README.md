# Waha Firebase Configuration/Schema

## Folder Contents

This folder contains 3 critical files for using Firebase with Waha:

1. `db.ts`: This file contains the main configuration object for Firebase. It also creates and exports the Firestore database object so that any other file in the app can access it.
2. `prodConfig.ts`: Contains the configuration/API key for the production database.
3. `testConfig.ts`: Contains the configuration/API key for the test database.
4. `google-services.json`: A config file that allows Firebase to be used with Expo on Android devices. Referenced in app.json under the `expo.android.googleServicesFile` key.
5. `GoogleService-Info.plist`: Another config file that allows Firebase to be used with Expo on iOS devices. Referenced in app.json under the `expo.ios.googleServicesFile` key.

For obvious reasons, all except `db.ts` are git-ignored.

## Firestore Database

### Organization

The organization for Firestore is similar to the organization for the Database type (see redux/reducers/database) with a few key differences outlined below.

Firestore's data in general is organized into collections. Each collection contains various documents, with each document being basically a JSON file. In our case, we have 3 collections:

`collections/languages`: Each document is named the ID of a language available in Waha and contains the Question Sets (see `LanguageQuestionSets` type in `redux/reducers/database`), Core Files (see `LanguageCoreFiles` type in `redux/reducers/database`), and app version that this version of the Database data should match up with. This app version exists so that we can have some Database data update on a user's phone only AFTER they update Waha to the version in this Firebase key. This was useful when App Translations were stored in Firestore but may no longer be necessary.

`collections/sets`: Each document is named the ID of a Story Set for a language in Waha. All Story Sets for all languages are stored in this collection. See the `StorySet` type in `redux/reducers/database`.

`collections/feedback`: Contains user feedback submitted through the `<ContactUs />` screen. The keys in each document are the text the user submits and some other useful data like the language they're on and the version of Waha they're currently using.

If you've checked out redux/reducers/database, you're probably wondering why the Story Sets in Firestore are stored in a separate collection from the rest of the content for a language instead of within the object for a language like it is in the local Database. For example:

In Firestore:

```javascript
languagesCollection: {
  en: {
    // files...
    // questions...
  }
  // more languages...
}

setsCollection: {
  en.1.1: {
    // title...
    // lessons...
    // etc...
  }
  // more Story Sets...
}
```

In the local redux Database:

```javascript
database: {
  en: {
    // files...
    // questions...
    sets: [
      {
        // Note that the ID is stored with the title, lessons, etc. 
        //  instead of as the key for an object like it is in Firestore.
        id: en.1.1
        // title...
        // lessons...
        // etc...
      }
    ]
  }
}
```

This is because Firestore has a 1MB limit per document. This is important because some languages have a lot of Story Sets, which, with all of their Scripture text, take up more than 1MB. So, we separate out the Story Sets into separate documents to avoid this 1MB limit. However, it's significantly easier to store the Story Sets for a language in an array within the same object as the rest of a language's data locally, so we store them that way in the local Database. That's why they aren't organized exactly the same between Firestore and the local redux Database. In summary:

1. In the redux Database, Story Sets are stored as objects in an array in the `sets` key of a language's Database object.
2. In Firestore, Story Sets are stored as objects in a separate Collection with their keys being their IDs.

The only important aspect of this difference when fetching the Story Sets from Firebase is that we need to store the ID for a Story Set within its object, instead of as a key to an object, since the Story Set lives in an array when it's stored locally. All this means is that we take all of the data for a Story Set stored in Firestore, add the ID as another key, and store THAT object in redux.

### Adding/Updating Data

Adding or updating Firestore Database data is done through in a different repo called `firebase-import`. See that project for documentation on how to add/update data.

### Testing

There is a test database and a production database for Waha, called Waha-Test and Waha-Prod respectively. To use test data with the Firestore Database, just switch the `dbMode` variable in `modeSwitch.ts` from 'prod' to 'test'.

## Firebase Storage

### Organization

Waha uses Firebase Storage to store all of the various media for its languages. Here's how the file structure is laid out:

`root`: Contains folders that store the media for the languages that are available in Waha.

`root/en/`: The media for a specific language, in this case English with language ID `en`.
  
`root/en/sets/`: Contains folders for each Story Set available for a language.
  
`root/en/sets/1.1/`: These folders must be called the ID of a Story Set without the language ID. In this case, Story Set `1.1`. The language ID is removed mostly because it's not necessary. Contains mp3 files for the Story chapters for each lesson in a Story Set. Remember, the mp3s for the Fellowship and Application chapters are not unique to each lesson and are stored separately in Firebase Storage.

`root/en/sets/1.1/en.1.1.1.mp3`: An mp3 file for a Story chapter for a specific lesson in Waha. Must be named the full ID of the lesson. In this case, `en.1.1.1.mp3`. The file name contains the language ID because these Story chapter files are all downloaded to the same directory in Waha's local storage, and a user could have multiple languages installed at once. For instance, a user might have `en.1.1.1.mp3` and `fr.1.1.1.mp3` downloaded; these mp3s must have unique names.

`root/en/sets/1.1/en.1.1.1v.mp4`: Some lessons have videos associated with them as well as audio. These videos are viewed during the Training chapter of a lesson. These files have the same name as the Story chapter mp3 except they have a 'v' at the end and use the `.mp4` extension instead of `.mp3`.

`root/en/other/`: Contains all of the Core Files necessary for using a language. These are all downloaded when the user installs a language. This folder will usually contain:

* `header.png`: The header, or logo, for a language.
* `header-dark.png`: The header for a language that works on a dark background used with dark mode.
* `dummy-story.mp3`: An mp3 that plays when a lesson doesn't have audio for a Story chapter.
* `ft-f-standard.mp3`: The standard Fellowship chapter Question Set audio.
* `ft-a-standard.mp3`: The standard Application chapter Question Set audio.
* Any other Question Set mp3s this language requires.

The file structure is very specific because we download all of these various mp3/png files dynamically, not using custom links for all of them, since we want to be able to use the same functionality no matter what language or Story Set we're downloading content for. For instance, in the app, you might see something like `https://firestoreURL/${languageID}/other/header.png/` to download the header for a language dynamically.

As an important reminder, the Story chapter mp3s in the `root/sets/` folder are downloaded on a lesson-by-lesson basis as the user decides. The Fellowship and Application chapter Question Sets are downloaded during the language installation. This is because these are reused across many Lessons.

### Adding/Updating Files

Since Firebase Storage has a nice UI, adding and updating files is super easy. Just go to the folder you want to add files to, click "Upload File", and select the file you want. Conveniently, when uploading a file of a name that already exists in the folder, the old file is automatically replaced with the new one. NEVER delete a file to replace it unless you're absolutely sure nothing will go wrong. Always use this auto-replace functionality. You don't want to have any time where a Core file or Story chapter mp3

When adding or updating files before a language is live on Waha, or when adding/updating Story chapter mp3s for Story Sets that aren't live for a language yet, no precautions are necessary. Just upload as you see fit.

When adding or updating a Core File stored in `root/other/` after a language is live, use caution. Waha has a built in system for handling these situations. See `navigation/MainDrawer` for how this works.

When updating Story chapter mp3s/Training chapter mp4s, a user who downloads a Story/Training chapter for a lesson AFTER you make the change will download the newest version. If they already have the Story/Training chapter downloaded for that lesson, that file won't automatically be replaced, and the user might have a different audio for the Scripture than what's displayed for the text. They would have to delete and re-download the Story chapter mp3 to see the newest one. While this isn't ideal, this situation happens so little that it's not worth building out something to deal with it.

You should almost never be adding Story chapter mp3s for a Story Set after the Story Set is live, since a Story Set should have all its audio uploaded to Firebase Storage because it goes live. If, for some reason, a language wants to add a Story Set that doesn't have audio, the `dummy-story.mp3` file will be played in the app if audio isn't available. This functionality uses the `hasAudio` key for a Lesson to check if it should play the `dummy-story.mp3` file or not. If a Lesson has `hasAudio` set to true, but doesn't have an audio file uploaded to Firebase Storage, the app will bug out and the user will have to exit the lesson to play any audio again. If a language previously didn't have audio for Lessons in a Story Set but wants to add them, simply upload the Story chapters for the lessons to Firebase Storage and change the `hadAudio` keys for those lessons from `false` to `true` after the Story chapter mp3s have been uploaded.

You should never be adding Training chapter mp4s for a Story Set after the Story Set is live since the app has no functionality built in to handle this. Before launching a Story Set that has lessons with videos, make sure all of the video files are uploaded to Firebase Storage.

### Testing

Currently, there is no functionality set up to use the Firebase Storage in Waha-Test, so you'll have to use Firebase Storage in Waha-Prod. Usually, this isn't an issue, because the only time you'd be testing stuff with Core Files is before a language has launched when it doesn't matter if you use Waha-Prod.
