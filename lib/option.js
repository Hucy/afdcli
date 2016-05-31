var path = require('path')
var metadata = require('read-metadata')
var exists = require('fs').existsSync

/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */

module.exports = function options (dir) {
  var opts = getMetadata(dir)

  return opts
}

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata (dir) {
  var json = path.join(dir, 'meta.json')
  var js = path.join(dir, 'meta.js')
  var opts = {}

  if (exists(json)) {
    opts = metadata.sync(json)
  } else if (exists(js)) {
    var req = require(js)
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object')
    }
    opts = req
  }

  return opts
}

