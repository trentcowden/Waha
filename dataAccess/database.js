// abstract API for reading (and optionally writing) structured data

class Database {
    isOffline() {
        // returns true or false
        // if false, submitFeedback() will be a no-op
    }
    getLanguage(key) {
        // returns Promise which resolves to data for the language
    }

    getSetsForLanguage(key) {
        // returns Promis which reslves to sets for the language
    }

    submitFeedback(feedbackRecord) {
        // returns a Promise which resolves to the result of
        // the submission. Immediately resolves to an
        // error if isOffline() is true
    }
}
