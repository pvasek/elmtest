var gulp = require("gulp");
var fs = require("fs");
var del = require("del");
var ts = require('gulp-typescript');
var shell = require('gulp-shell')

gulp.task('clean', function () {
    return del([
        './dist/ts/**/*'
    ]);
});

gulp.task('ts', ['clean'], function() {
  var tsProject = ts.createProject('tsconfig.json');
  
  return tsProject
    .src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./dist/ts'));
});

gulp.task('test', ['ts'], shell.task([
  'tape ./dist/ts/**/__tests__/* | faucet',
]));
