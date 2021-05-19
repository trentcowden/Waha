// abstract API for reading (and optionally writing) structured data

export class Database {
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
    return this.db.collection('sets')
             .where('languageID', '==', key)
             .get()
  }

  submitFeedback(feedbackRecord) {
    return this.db.collection('feedback')
             .add(feedbackRecord)
  }
}
