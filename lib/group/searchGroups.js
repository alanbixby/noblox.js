// Includes
const http = require('../util/http.js').func

// Args
exports.required = ['keyword']
exports.optional = ['prioritizeExactMatch', 'limit']

// Docs
/**
 * ✅ Searches for groups by keyword
 * @category Group
 * @alias searchGroups
 * @param {string} keyword - The universe id of the game.
 * @param {boolean} prioritizeExactMatch - Whether or not to prioritize the exact match for the keyword
 * @param {Limit} limit - The amount of results per request
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * const groups = await noblox.searchGroups('noblox.js')
**/

// Define
function searchGroups (keyword, prioritizeExactMatch, limit) {
  return http({
    url: `//groups.roblox.com/v1/groups/search?keyword=${keyword}&prioritizeExactMatch=${prioritizeExactMatch}&limit=${limit}`,
    options: {
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { errors, data } = JSON.parse(body)
      if (statusCode !== 200) {
        console.log(errors)
        throw new Error(statusCode, body)
      } else {
        return data
      }
    })
}

exports.func = function ({ keyword, prioritizeExactMatch = true, limit = 100 }) {
  return searchGroups(keyword, prioritizeExactMatch, limit)
}
