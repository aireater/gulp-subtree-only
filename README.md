Gulp Subtree Only
============

A little gulp module to let you push a folder to a git subtree without keeping that folder in your git history. This version differs from Snugug's original (thanks!). It only executes the git subtree command. Your distribution folder will need to be in the repository.

## Requirements

`git subtree` must be previously installed. Older versions of `git` (e.g. Ubuntu 12.04's standard install version) are not bundled with it. The easiest way to check is to see if `git subtree` throws up or not. Gulp will fail silently if the command is not available. See [here](http://engineeredweb.com/blog/how-to-install-git-subtree/) for more info on how to install it.

## Usage

```js
var subtree = require('gulp-subtree-only');

gulp.task('subtree', function () {
  return gulp.src('dist')
    .pipe(subtree());
});
```

## Options

Options can be passed into subtree to choose the remote, branch, and message to push with. By default, it's `origin`, `gh-pages`, and `'Distribution Commit'`.

```js
var subtree = require('gulp-subtree-only');

gulp.task('subtree', function () {
  return gulp.src('dist')
    .pipe(subtree({
      remote: 'upstream',
      branch: 'master',
      message: 'Here We Go!'
    }));
});
```
