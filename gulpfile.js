'use strict';

var gulp = require('gulp');
var wrench = require('wrench');


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('build', ['clean'], function () {

});