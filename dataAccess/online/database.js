// abstract API for reading (and optionally writing) structured data

class Database {
  constructor(db) {
    this.db = db
  }

  isOffline() {
    return false
  }

  getLanguage(key) {
    // Promise<doc>
    return this.db.collection('languages')
               .doc(key)
               .get()
  }

  getSetsForLanguage(key) {
    // Promise<querySnapshot>
    return db.collection('sets')
             .where('languageID', '==', key)
             .get()
  }

  submitFeedback(feedbackRecord) {
    return db.collection('feedback')
             .add(feedbackRecord)
  }
}
