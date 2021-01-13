const http = require('../util/http.js').func

// Args
exports.required = ['placeId']

// Docs
/**
 * Get the universe id from a place id.
 * @category Game
 * @alias getUniverseId
 * @param {number} placeId - The id of the place.
 * @returns {Promise<number>}
 * @example const noblox = require("noblox.js")
 * const universeId = await noblox.getUniverseId(41324860)
 **/

// Define
function getUniverseId (placeId) {
  const httpOpt = {
    url: `//api.roblox.com/universes/get-universe-containing-place?placeId=${placeId}`,
    options: {
      resolveWithFullResponse: true,
      method: 'GET'
    }
  }
  return http(httpOpt)
    .then(function (res) {
      if (res.statusCode === 200) {
        return JSON.parse(res.body).UniverseId
      } else if (res.statusCode === 400) {
        throw new Error(`placeId ${placeId} does not exist`)
      } else {
        throw new Error(`An unexpected error occurred with status code ${res.statusCode}`)
      }
    })
}

exports.func = function (args) {
  const placeId = args.placeId
  return getUniverseId(placeId)
}
