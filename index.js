'use strict';
var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var chalk = require('chalk');

//////////////////////////////
// Execute with Callback
//////////////////////////////
function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(error, stdout); });
};

module.exports = function(options) {
  return es.map(function(file, cb) {

    //////////////////////////////
    // Does not work with buffers
    //////////////////////////////
    if (file.isBuffer()) {
      return cb(
        new gutil.PluginError("gulp-subtree", "Gulp Subtree is only supported for folders"),
        file
      );
    }

    var folder = file.path.replace(file.cwd + path.sep, '');

    var remote = 'origin';
    var branch = 'gh-pages';
    var message = 'Distribution Commit';
    if (options !== undefined) {
      remote = options.remote || remote;
      branch = options.branch || branch;
      message = options.message || message;
    }

    gutil.log('Pushing ' + chalk.magenta(folder) + ' to ' + chalk.cyan(remote) + '/' + chalk.cyan(branch));
    execute('git subtree push --prefix ' + folder + ' ' + remote + ' ' + branch, function(error) {
      return cb(error, file);
    });

  });
};
