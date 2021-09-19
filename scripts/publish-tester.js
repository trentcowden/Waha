import { expoLoginPersonal, expoLoginTester } from './expo-logins'
import { spawnPromise } from './util'
const args = process.argv

// npm run publish-tester languageID
const languageID = process.argv[2]

spawnPromise('expo', ['logout'])
  .then(() => {
    return spawnPromise('expo', [
      'login',
      '-u',
      expoLoginTester.username,
      '-p',
      expoLoginTester.password
    ])
  })
  .then(() => {
    return spawnPromise('expo', ['publish', '--release-channel', languageID])
  })
  .then(() => {
    spawnPromise('expo', ['logout'])
  })
  .then(() => {
    return spawnPromise('expo', [
      'login',
      '-u',
      expoLoginPersonal.username,
      '-p',
      expoLoginPersonal.password
    ])
  })
