import { spawn } from 'child_process'
import { request } from 'https'
var fs = require('fs')
var axios = require('axios')

/**
 * Downloads an asset from a URL and saves it to a path. Used to download audio, video, and image files.
 */
export const downloadAsset = (url, path, callback) => {
  var file = fs.createWriteStream(path)
  return axios({
    url,
    responseType: 'stream'
  })
    .then(
      response =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(file)
            .on('finish', () => {
              file.close(() => {
                callback()
                resolve()
              })
            })
            .on('error', e => reject(e))
        })
    )
    .catch(error =>
      console.log(`Error with lesson: ${path}. Error message: ${error}`)
    )
}

/**
 * Gets the URL for a piece of Lesson content.
 */
export const getLessonAssetURL = (type, lessonID) => {
  // Split the ID up into separate sections.
  var idComponents = lessonID.split('.')

  // An example lessonID is "en.1.1.1".
  switch (type) {
    case 'audioSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] +
        '.' +
        idComponents[2]}%2F${lessonID}.mp3?alt=media`
    case 'videoSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] + '.' + idComponents[2]}%2F${lessonID +
        'v'}.mp4?alt=media`
    default:
      return undefined
  }
}

/**
 * Gets the URL for a Language Core File.
 */
export const getCoreFileURL = (fileName, languageID) => {
  const urlStart = `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${languageID}%2Fother%2F`

  const urlEnd = fileName.includes('header')
    ? '.png?alt=media'
    : '.mp3?alt=media'

  return `${urlStart}${fileName}${urlEnd}`
}

// Helper function to do an HTTP request and return a promise for its completion
// from https://gist.github.com/ktheory/df3440b01d4b9d3197180d5254d7fb65 (modified slightly)
export const requestPromise = (urlOptions, file) => {
  return new Promise((resolve, reject) => {
    const req = request(urlOptions, res => {
      let body = ''
      res.on('data', chunk => (body += chunk.toString()))
      res.on('error', reject)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          res.pipe(file)
          file.on('finish', () => {
            file.close()
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: body
            })
          })
        } else {
          reject(
            'Request failed. status: ' + res.statusCode + ', body: ' + body
          )
        }
      })
    })
    req.on('error', reject)
    // if (data) {
    //   req.write(data, 'binary')
    // }
    req.end()
  })
}

// Helper function to run an external executable via spawn, pipe back output, and report the result via a promise
export const spawnPromise = (command, args) => {
  args = args || []
  return new Promise((resolve, reject) => {
    console.log('SPAWNING: ' + command + ' ' + args.join(' '))
    const build = spawn(command, args, {
      shell: true
    })

    build.stdout.on('data', data => {
      console.log(`${data}`)
    })

    build.stderr.on('data', data => {
      console.error(`${data}`)
    })

    build.on('error', error => {
      console.error(`ERROR: ${error.message}`)
    })

    build.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(`Child process exited with code ${code}`)
      }
    })
  })
}
