// abstract API for reading file content

class Files {
    fetchLanguageFile(language, filename, extension) {
        // returns a Promise which resolves to the specified file contents
    }

    fetchLanguageFileMetadata(language, filename, extension) {
        // returns a Promise which resolves to the metadata (timeCreated, at a minimum)
        // for the specified file
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
