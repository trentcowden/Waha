#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var firebaseAdmin = require("firebase-admin");
require("firebase/firestore");
var fs = require("fs");
var setAndLessonDataFunctions_1 = require("../functions/setAndLessonDataFunctions");
var modeSwitch_1 = require("../modeSwitch");
var util_1 = require("./util");
var serviceAccount = modeSwitch_1.dbMode === 'test'
    ? require('./service-account-TEST.json')
    : require('./service-account-PROD.json');
var admin = firebaseAdmin;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
});
var firestore = admin.firestore();
var bundledLanguages = process.argv.slice(2);
process.env.BUNDLED_LANGUAGES = bundledLanguages.join(',');
var releaseChannel = 'offline-' + process.env.BUNDLED_LANGUAGES.replace(',', '');
// Clear existing downloads folder.
var targetDirectory = './assets/downloaded';
if (fs.existsSync(targetDirectory)) {
    fs.rmdirSync(targetDirectory, {
        recursive: true
        // force: true
    });
}
// Make a fresh downloads folder.
fs.mkdirSync(targetDirectory);
// Create a new file called master-list. This will be full of require statements for the various Question Set mp3 and Lesson content assets to be used offline.
var assetListFile = fs.createWriteStream('./assets/downloaded/master-list.js');
// Add the start of the module exports to the new file.
assetListFile.write('module.exports = {');
var bundle = firestore.bundle(releaseChannel);
Promise.all(bundledLanguages.map(function (languageID) {
    // Determine full list of assets to download.
    // TODO: make this work for Language versions.
    var promises = [];
    promises.push(firestore
        .collection('languages')
        .doc(languageID)
        .get()
        .then(function (doc) {
        if (doc.exists && doc.data()) {
            bundle.add(doc);
        }
    }));
    promises.push(firestore
        .collection('sets')
        .where('languageID', '==', languageID)
        .get()
        .then(function (result) {
        var assets = [];
        bundle.add("language-" + languageID, result);
        result.docs.map(function (set) {
            if (set.exists && set.data()) {
                // Queue download of video/audio for lesson if available
                set.data().lessons.forEach(function (lesson) {
                    if (lesson.hasAudio) {
                        assets.push({
                            lessonID: lesson.id,
                            assetType: 'audio',
                            assetURL: setAndLessonDataFunctions_1.getLessonInfo('audioSource', lesson.id)
                        });
                    }
                    if (lesson.hasVideo) {
                        assets.push({
                            lessonID: lesson.id,
                            assetType: 'video',
                            assetURL: setAndLessonDataFunctions_1.getLessonInfo('videoSource', lesson.id)
                        });
                    }
                });
            }
        });
        return assets;
    }));
    return Promise.all(promises);
}))
    .then(function (results) {
    // Flatten the nested arrays of URLs into one array.
    var allLessonURLs = [];
    results.forEach(function (languageData) {
        languageData.forEach(function (lessonURLs) {
            if (lessonURLs)
                lessonURLs.forEach(function (url) {
                    allLessonURLs.push(url);
                });
        });
    });
    // const coalesce = (fileOrFiles: (void | LessonURLsForALanguage)[][] | string | LessonURLsForALanguage | LessonURLsForALanguage[]) => {
    //   if (typeof fileOrFiles === 'string') {
    //     files.push(fileOrFiles)
    //   } else if (typeof fileOrFiles === 'object') {
    //     fileOrFiles.forEach(object => {
    //       coalesce(object)
    //     })
    //   }
    // }
    // coalesce(results)
    return allLessonURLs;
})
    .then(function (allLessonURLs) {
    // Write bundle to file.
    var file = "./assets/downloaded/all.firebase-bundle";
    assetListFile.write("\r\n\tbundle: require('../." + file + "')");
    fs.writeFile(file, bundle.build(), { encoding: 'binary' }, function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log("Built Firebase bundle: " + file);
        }
    });
    // Download audio/video files.
    var fileDownloads = [];
    console.log('Downloading audio/video files...');
    allLessonURLs.forEach(function (lessonURL) {
        // Get the information from the lesson URL object.
        var lessonID = lessonURL.lessonID, assetType = lessonURL.assetType, assetURL = lessonURL.assetURL;
        // Get the correct file end based on the asset type.
        var fileEnd = assetType === 'audio' ? '.mp3' : '.mp4';
        // Finally, create a local path to download the lesson content mp3 or mp4 to.
        var localFilePath = targetDirectory + "/" + lessonID + fileEnd;
        fileDownloads.push(util_1.requestPromise(lessonURL.assetURL).then(function (response) {
            var buffer = Buffer.from(response.body);
            // fs.mkdirSync(
            //   localFilePath
            //     .split('/')
            //     .slice(0, -1)
            //     .join('/'),
            //   { recursive: true }
            // )
            var file = fs.createWriteStream(localFilePath);
            file.write(buffer);
            file.close();
            assetListFile.write(",\r\n\t" + lessonID + ": require('../." + localFilePath + "')");
        }, function (reason) {
            console.log('WARN: Failed to download ' + lessonURL);
        }));
    });
    return Promise.all(fileDownloads);
})
    .then(function (_) {
    assetListFile.write('}');
    assetListFile.close();
    // Publish to update assets
    // return spawnPromise('expo', [
    //   'publish',
    //   '--release-channel',
    //   releaseChannel
    // ])
})
    .then(function (_) {
    // Run APK build
    // return spawnPromise('expo', [
    //   'build:android',
    //   '-t',
    //   'apk',
    //   '--release-channel',
    //   releaseChannel
    // ])
})
    .then(function (_) {
    process.exit(0);
}, function (error) {
    // Handle all the errors here.
    console.error(error);
    process.exit(1);
});
