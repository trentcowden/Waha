export const STORE_DOWNLOADS = 'STORE_DOWNLOADS'

/**
 * Stores an array of download resumable objects.
 * @export
 * @param {Object[]***REMOVED*** resumables - The array of download resumable objects.
 * @return {Object***REMOVED*** - Object to send to the reducer.
 */
export function storeDownloads (resumables) {
  return {
    type: STORE_DOWNLOADS,
    resumables
  ***REMOVED***
***REMOVED***
