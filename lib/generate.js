var Metalsmith = require('metalsmith')
var Handlebars = require('handlebars')
var async = require('async')
var render = require('consolidate').handlebars.render
var path = require('path')
var getOptions = require('./option')



/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */

module.exports = function generate (name, src, dest, done) {
  var opts = getOptions(src)
  var metalsmith = Metalsmith(path.join(src, 'template'))
  var data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    noEscape: true
  },opts)
  metalsmith
    .use(renderTemplateFiles)
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build(function (err) {
      done(err)
      logMessage(opts.completeMessage, data)
    })
}


/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles (files, metalsmith, done) {
  var keys = Object.keys(files)
  var metalsmithMetadata = metalsmith.metadata()
  async.each(keys, function (file, next) {
    var str = files[file].contents.toString()
    // do not attempt to render files that do not have mustaches
    if (!/{{([^{}]+)}}/g.test(str)) {
      return next()
    }
    render(str, metalsmithMetadata, function (err, res) {
      if (err) return next(err)
      files[file].contents = new Buffer(res)
      next()
    })
  }, done)
}

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 * @param {Function} cb
 */

function logMessage (message, data) {
  if (!message) return
  render(message, data, function (err, res) {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(function (line) {
        return '   ' + line
      }).join('\n'))
    }
  })
}
