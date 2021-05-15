import * as FileSystem from 'expo-file-system'
import firebase from 'firebase'

// firebase online implementation of abastract API for reading file content
export class Files {
  constructor(languageBaseUrl) {
    this.languageBaseUrl = languageBaseUrl
  }

  __buildLanguageFileUrl(language, fileName, fileExtension) {
    // Set the firebase storage URL to download from. The file structure in firebase must be set up exactly right for this link to work.
    return url = `${this.languageBaseUrl}/${language}%2Fother%2F${fileName}.${fileExtension}?alt=media`
  }

  fetchLanguageFile(language, fileName, fileExtension) {
    // Set the firebase storage URL to download from. The file structure in firebase must be set up exactly right for this link to work.
    const url = this.__buildLanguageFileUrl(language, fileName, fileExtension)

    // TODO - this should either be an input or else part of the result - logic currently duped at
    //        call sites
    // Set the local storage path to download to and the name of the file. The format is simple: FileSystem/languageID-fileName.fileExtension.

    // For when file name includes "v1".
    var localPath = `${
        FileSystem.documentDirectory
      }${language}-${fileName.slice(0, -3)}.${fileExtension}`

    // For when file name DOESN'T includes "v1".
    // var localPath = `${FileSystem.documentDirectory}${language}-${fileName}.${fileExtension}`

    // Create the download object. Uses url and localPath from above, an empty parameters object, and an empty callback function.
    console.log(`downloading from ${url}\nto${localPath}`)
    download = FileSystem.createDownloadResumable(
      url,
      localPath,
      {},
      () => {}
    )
    return download
      .downloadAsync()
  }

  fetchLanguageFileMetadata(language, fileName, fileExtension) {
    const url = this.__buildLanguageFileUrl(language, fileName, fileExtension)
    return firebase
      .storage()
      .refFromURL(url)
      .getMetadata()
  }

  getAudioUrl(lessonId) {
    // returns a url (possibly file://) for the audio for the specified lesson
  }

  getVideoUrl(lessonId) {
    // returns a url (possibly file://) for the video for the specified lesson
  }

  getLogoUrl(languageCode) {
    // returns url for the logo for the specified language
  }

  getOnboardingUrl() {
    // returns url for the onboarding image
  }

}
