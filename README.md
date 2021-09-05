<!-- <p align=center>
<img src="assets/icons/waha_icon.png" width=150 style="border-radius:15%">
<h3 align=center><strong>Waha</strong></h3>
<h4 align=center>Discover God's Story</h4>
</p> -->

<h1 align="center">
  <a href="https://waha.app/">
    Waha
  </a>
</h1>

<p align="center">
  <strong>Discover God's Story</strong><br>
  Mobilize the Believer & Make Disciples of the Lost
</p>

<h3 align="center">
  <a href="#download-from-the-app-store">Download</a>
  <span> · </span>
  <a href="https://partner.waha.app">Get your language on Waha</a>
  <span> · </span>
  <a href="https://github.com/kingdomstrategies/Waha/issues">Report a Bug</a>
</h3>
<br>

# About This Project

Waha is a multi-language, audio-based Discovery Bible Study and DMM training app. Small groups gather to listen to curated Discovery Bible Study stories and discuss the questions. Additionally, Waha is a system for pre-existing believers to be envisioned, trained, and mobilized to make disciples that multiply.

Some notable features of Waha are:

- **Secure**: Data is end-to-end encrypted and the app works offline. Waha comes with a "security mode", so that those in more conscious areas can use Waha without worry.
- **Curated Story Sets**: Curated Discovery Bible Study sets lead groups through Creation to Christ, making a decision about Jesus, and becoming healthy disciples, churches, and leaders.
- **Audio First**: Since Waha narrates every question and the story, group members only have to focus on discussion and discovery.
- **Obedience Based**: The DMM training (Mobilization Tools) encourages application over simply information-intake, so that believers can begin practicing disciple making habits from their very first few meetings.
- **Space Efficient**: Many users don't have a lot of space on their phones, so we made Waha use as little storage as possible and for all lessons to be downloadable from the cloud. This means people with all types of phones can use Waha.

## Built With

- React Native
- Expo
  
# Getting Started

## Download From the App Store

Waha is currently available on iOS and Android. You can download it here:

- [App Store (iOS)](https://apps.apple.com/us/app/waha-discover-gods-story/id1530116294)
- [Google Play Store (Android)](https://play.google.com/store/apps/details?id=com.kingdomstrategies.waha)

## Prerequisites

1. Make sure you have `Node.js` and `npm` installed. You can download them [here](https://nodejs.org/en/).
2. If you want to run the app on your mobile device from your local repository, you'll need the "Expo Go" app downloaded on that device.

## Installation

1. Get the necessary Firebase config files and put them the `/firebase` folder.
2. Clone this repository:

    ```shellscript
    git clone https://github.com/kingdomstrategies/Waha
    ```

3. Install `npm` packages in the newly created directory:

    ```shellscript
    npm install
    ```

4. Start the Expo development server:

    ```shellscript
    npm start
    ```

5. Scan the QR code that appears in the terminal from the Expo app on your mobile device to open the app. If you're using an emulator, you can press "i" to automatically open it on an iOS emulator and "a" to automatically open it on an Android emulator.

# Directory Structure

- `/appStoreLocales/`: Contains small json files that simply make languages show up under "Supported Languages" on the App Store.
- `/assets/`: Contains all images and sound effects.
- `/classes/`: Contains any classes that are used in Waha.
- `/components/`: Contains all of the React Native components.
- `/firebase/`: Contains the file `db.js` which exports the Firestore database object to be used throughout the app. This is where you'll put the extra Firebase configuration files as well.
- `/functions/`: Contains various files of grouped-together functions that are used around Waha.
- `/modals/`: Contains all of the modal React Native components.
- `/navigation`: Contains all of the different `react-navigation` navigators.
- `/redux/`: Contains the redux store, combiner, and all of the action and reducer files.
- `/screens/`: Contains all of the screen React Native components.
- `/styles/`: Contains a few files for global styles, notably typography and colors.
- `/translations/`: Contains `.json` objects of translations for all supported languages, the Babel-Edit application file used to add and update translations, and the config file used by components to retrieve translations.
- `/app.json`: Expo configuration file.
- `/App.tsx`: The most top-level navigation component and the start of all rendering for Waha.
- `/constants.ts`: Some miscellaneous constant variables used throughout Waha.
- `/COPYING.txt`: Waha's license.
- `/languages.ts`: Contains metadata for all the languages available in Waha.
- `/modeSwitch.ts`: Controls whether the app is in `prod` or `test` mode. Also used to store the current version number.
- `/tsconfig.json`: The configuration file for TypeScript.

# Glossary

Waha has a lot of confusing and specific terminology! This document exists to be used as a reference for understanding all those terms, both conceptually and in how they are used in Waha's code.

## What is Waha?

**Waha** is an multi-language audio-based Bible study app designed to be used in a Group.

## Languages

Waha contains many **Languages**, also called Language Instances. Each Language has a unique 2-letter ID. Usually, this ID is the ISO language code for the Language. For example, the ID for English is `en`. All the data for the installed Languages on a user's phone is stored in a local database called redux. See `/redux/README.md` for more info.

We have partners for each Language which are in charge of translating and recording content for their Language. These people are **Language Instance Partners**, or LIPs for short.

## Story Sets and Lessons

Waha's Bible studies, or **Lessons** as they will be called from now on, are organized into **Story Sets**. Each Story Set usually contains 12 or so Lessons.

Story Sets are organized into 3 categories:

1. **Foundational**: The standard curriculum which is designed to lead someone into learning and understanding the Bible and who Jesus is, making a decision to follow Him, and growing as a Disciple, Leader, and member of His Church. They are meant to be done in order.
2. **Topical**: These Story Sets are groups of Scriptures about a specific topic. Examples include Courage, Love, or Teachings of Jesus. They can be done in any order and are meant to allow Groups to dive into specific relevant Biblical topics should they choose.
3. **Mobilization** Tools: These Sets are designed to create a simple, decentralized, & reproducible way of getting people moving forward in disciple-making practices that lead to movement and are designed for existing believers. These lessons sometimes contain videos. They have to be unlocked by a specific code (281820) that is passed from user to user. For unlock functionality, see `/redux/reducers/areMobilizationToolsUnlocked.ts` and `/redux/reducers/mtUnlockAttempts.ts`.

These categories are separated by 3 tabs on the main screen of the app. The tabs are called **Foundations**, **Topics**, and **Mobilization** respectively. See `/navigation/SetsTabs.tsx` for how this is laid out in code.

To give Story Sets a bit more character, each one has a graphic that represents it. We refer to these as the **Album Arts** for a Story Set. They are displayed with the Lesson Title on the Play Screen.

Story Sets and Lessons are fetched from Firestore, the database used with Waha, and stored in redux. For type definitions for Story Sets and Lessons which list and explain all of their specific attributes, see `/redux/reducers/database.ts`.

## Helpful Story Set Types

There are 2 main types that a Story Set usually falls into. These are separate from the Categories and are more just for helpful reference.

1. DBS, or Discovery Bible Study, which refers to a standard Lesson containing the Fellowship, Story, and Application chapter. All Foundational and Topical Lessons are in this category.
2. DMC, or Disciple Making Community, which refers to Lessons that focus on moving groups forward in disciple-making practices that lead to movement. Story Set 3.2 in the Mobilization Tools is an example of this.

There are some unique Story Sets which don't fall into these categories but most do.

## ID's

Story Set ID's have 3 parts. The first is the ID of the language. The second is the category: 1 for Foundational, 2 for Topics, and 3 for Mobilization Tools. The last is the index of the Story Set within its category. `en.2.5` refers to the 5th Story Set in the Topics category for English.

Lesson ID's have 4 parts. The first 3 are the ID of the Story Set the Lesson is a part of, and the last one is the index of the Lesson within its Story Set. `en.2.5.4` refers to the 4th Lesson in the 5th Story Set in the Topics category for English.

## Chapters

A Lesson is organized into 3 or 4 sections, called **Chapters**. Each chapter is an individual audio file but Waha switches between them seamlessly so that the lessons feel continuous. Additionally, each Chapter is displayed on the Play Screen in text form in the **Lesson Text Viewer** component as well for those that like to read along. The chapters are as follows:

1. **Fellowship**: A series of questions, called a **Question Set**, designed to help the Group connect, remember what they committed to during their last meeting, pray for each other, and prepare to listen to the Scripture.
2. **Story**: A reading of Scripture.
3. **Training**: Used only in some Mobilization Tools lessons, this chapter contains a video that the Group watches together.
4. **Application**: Another Question Set designed to lead the Group through discussing and applying what they heard/read in the Story chapter and potentially the Training Chapter.

The Chapters fall into 1 of two categories: a Question Set or a piece of Lesson Content.

The Fellowship and Application Chapters are Question Sets. Question Sets are reused across multiple lessons since they aren't dependent on specific Scripture. However, there are still some Question Set variants for each of the 2 Chapters. All of these variants are downloaded when the user installs a new Language. See `downloadLanguageCoreFiles` in `/redux/reducers/database.ts` and `/redux/reducers/storedDownloads.ts`. They are named by a simple convention. We'll take the standard Fellowship Chapter Question Set name as an example: `ft-f-standard`. `ft` refers to a Question Set that is used in a Foundational or Topical lesson. The other option is `mt` which means it's used in Mobilization Tools lessons. `f` means this Question Set is used for Fellowship Chapters. The other option is `a` which means it's used for Application Chapters. Finally, `standard` means this Question Set is the Question Set that the other variants are based off of. For other Question Sets, this part is unique to how a variant differs from its standard. As an example, Story Set en.1.4 focuses on Growing as a Disciple of Jesus and contains one additional question related to that. Though it only differs in that one question, a fully separate Question Set (and audio file) is necessary. There are 11 different Question Sets used in the Standard Waha curriculum. These names are also the file names used for the mp3s for these Question Sets.

- `ft-f-standard`: DBS Standard Fellowship Questions used in all Foundational and all Topical Story Sets.
- `ft-a-standard`: DBS Standard Application Questions used in all Topical Story Sets and Foundational Story Sets 1.1, 1.2, and 1.3.
- `ft-a-disciples`: DBS Application Questions w/ “Being Disciples?” used in Foundational Story Sets “1.4 Being Disciples” and “1.7 Growing as Disciples”.
- `ft-a-church`: DBS Application Questions w/ “Being the Church?” used in Foundational Story Sets “1.5 Being the Church” and “1.8 Growing as the Church”.
- `ft-a-leaders`: DBS Application Questions w/ “Being Leaders?” used in Foundational Story Sets “1.6 Being Leaders” and “1.9 Growing as Leaders”.
- `mt-f-standard`: DMC Standard Fellowship Questions used in Mobilization Tools lessons 3.2.3, 3.2.4, 3.2.5, 3.2.6, and 3.2.7.
- `mt-f-no-prayer`: DMC Fellowship Questions w/o “Prayer?” used in Mobilization Tools lessons 3.2.1 and 3.2.2.
- `mt-s-addendum`: DMC Standard Application Questions Part 1 used in Mobilization Tools Story Set 3.2.
- `mt-a-standard`: DMC Standard Application Questions Part 2 used in Mobilization Tools lessons 3.2.4, 3.2.5, 3.2.6, and 3.2.7.
- `mt-a-no-engagement`: DMC Application Questions Part 2 w/o “Engaging Lost?” used in Mobilization Tools lessons 3.2.1, 3.2.2, and 3.2.3.
- `mt-a-no-video`: DMC Full Application Questions w/o “Training Video" used in all future Mobilization Tools Story Sets that do not contain training videos (4 story sets are currently in development).

The Story and Training Chapters are pieces of Lesson Content. These are audio/video files that are unique to a specific Lesson. They are downloaded on a lesson-by-lesson basis when the user manually decides to download them. See `/redux/reducers/downloads.ts`. They are also downloaded automatically whenever the user opens up a lesson whose content isn't downloaded yet. These are not downloaded with a Language installation like the Question Set mp3s because there are potentially hundreds of them and they would take up way too much memory on a user's device. Story Chapters are named by the ID of the Lesson they are a part of and Training Chapters are the same with a "v" attached at the end. For example, the Story Chapter mp3 for Lesson `en.1.3.4` would be called `en.1.3.4.mp3`, and the Training Chapter mp4 for Lesson `en.3.2.2` would be called `en.3.2.2v.mp4`.

Relevant files:  

- `/redux/reducers/database.ts`
- `/redux/reducers/storedDownloads.ts`
- `/redux/reducers/downloads.ts`
- `/screens/GroupsScreen.tsx`
- `/modals/AddEditGroupModal.tsx`
- `/components/ChapterSelector.tsx`
- `/components/ChapterButton.tsx`
- `/components/GroupItem.tsx`
- `/components/GroupAvatar.tsx`
- `/components/GroupListHeader.tsx`
- `/components/GroupItemMT.tsx`

## Lesson Types

Not all Lessons fall into simple categories however. To make things work smoothly under the hood, Lessons have a variety of different types referred to as **Lesson Types** that are used to populate the Play Screen with the relevant content and components. See `interfaces/setAndLessonInfo.ts` for the type definition for `LessonType`. A Lesson's Type is built using the content that it has. The 4 possible pieces of content a Lesson can contain are:

1. `Questions`: A Fellowship and Application Chapter.
2. `Audio`: Audio for the Story Chapter.
3. `Video`: Video for the Training Chapter.
4. `BookText`: Book Text used for Book Lessons.

Using these building blocks, the supported Lesson Types in Waha are as follows:

1. `STANDARD_DBS`, which contains Questions and Audio. Used for most Foundational and Topical Story Sets. Uses a standard `<PlayScreen />` with 3 Chapter buttons.
2. `STANDARD_DMC`, which contains Questions, Audio, Video. Used for the DMC Story Sets in the Mobilization Tools. Uses a slightly-altered `<PlayScreen />` with an additional Chapter button for the Training Chapter. When switching to the Training Chapter, a video component appears, replacing the Lesson Text Viewer.
3. `VIDEO_ONLY`, which contains only Video content. Used for Lessons that are just videos. Uses an altered `<PlayScreen />` that has the Chapter buttons removed, since the only part of the Lesson is the video.
4. `STANDARD_NO_AUDIO`, which contains Questions. Used for Foundational and Topical Lessons that have Scripture but for whatever reason don't have any Story Chapter audio. Uses a standard `<PlayScreen />` with 3 Chapter buttons, but tapping on the Story Chapter button takes you to the text for the Scripture automatically since there's no audio.
5. `BOOK`, which contains BookText. Used for Lessons that are actually just chapters of a book. Uses an altered `<PlayScreen />` that contains only the Lesson Text Viewer.
6. `AUDIOBOOK`, which contains BookText and Audio. Used for Lessons that are actually just chapters of an audio book. Uses an altered `<PlayScreen />` that has the Chapter buttons removed and starts on the Lesson Text Viewer.

These types are used all over the place in Waha's code as a way to download the write content for a Lesson, show the right components on the Play Screen for a Lesson, and handle various other Lesson-specific tasks.

Relevant files:  

- `/functions/setAndLessonDataFunctions.ts`
- `/components/VideoPlayer.tsx`
- `/components/AlbumArt.tsx`
- `/components/PlayScreenTitle.tsx`

## Groups

Waha is designed to be used in a group! Groups are stored locally in the app using redux. See `redux/reducers/groups.ts` for the type definition for a Group which lists all of its attributes. The important aspect of them for this document is that each Group has a specific Language associated with it, and this is how the Language to be displayed in the app is decided. Waha has an **Active Group** at all times, and the Language that the app is in is determined by the Active Group.

Relevant files:  

- `/redux/reducers/activeGroup.ts`
- `/redux/reducers/groups.ts`
- `/screens/GroupsScreen.tsx`
- `/modals/AddEditGroupModal.tsx`
- `/components/GroupNameTextInput.tsx`
- `/components/EmojiViewer.tsx`
- `/components/GroupItem.tsx`
- `/components/GroupAvatar.tsx`
- `/components/GroupListHeader.tsx`
- `/components/GroupItemMT.tsx`

## Progress

User's can track their progress through their Lessons as they go through with their groups. Lesson/Story Set progress is stored on a group-by-group basis and is a part of the Group object stored in redux. If you switch Groups, you'll see that your progress changes to that of the Group you just switched to.

## Bookmarks

**Bookmarks** are designed to help the user remember where they are in Waha's large curriculum. They are represented by a small triangle displayed on a Story Set or Lesson.

Each Group has a single **Story Set Bookmark** which usually refers to the last Story Set the user has made progress in. It starts at Story Set 1.1 when the user creates a new Group.

Each Story Set within a Group has a **Lesson Bookmark**, which refers to the next Lesson in a Story Set that the user should do. It is always the earliest incomplete Lesson in a Story Set, so it always starts at the first Lesson in a Story Set.

For more information on how the logic behind updating these bookmarks works, see the `UpdateProgress` action in `/redux/reducers/groups.ts`.

## Security Mode

Waha has what we call **Security Mode**. When enabled, every time the user exits and comes back to the app after a custom amount of time (defaults to instantly), the app will open to a Piano Player app instead of whatever the user was on before. Each piano keys has a number on it and entering a user-set code on the keys "unlocks" the app and takes them to the last screen they were on, similar to the unlock screen on a phone. This is to hide Waha's content from prying eyes for those in security-conscious areas.

# Other Info

## License

Distributed under the GNU GENERAL PUBLIC LICENSE. See COPYING.txt for more information.

## Contact

Email developer@kingdomstrategies.co with questions or concerns.
