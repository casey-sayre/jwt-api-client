'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var ifElse = require('gulp-if-else');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

var less = require('gulp-less');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifycss = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var path = require('path');


gulp.task('connect', function() {
  connect.server({
    root: ['../dev'],
    livereload: true
  });
});

gulp.task('clean', function() {
  return gulp.src('../dev', {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

gulp.task('bower', function() {
  var glob = mainBowerFiles();
  glob.push('!' + path.join(__dirname, 'bower_components/open-sans-fontface/**/*'));
  return gulp.src(glob)
    .pipe(gulp.dest('../dev/vendor/'));
});

gulp.task('fonts', function() {
  return merge(
    gulp.src('./bower_components/open-sans-fontface/fonts/**/*', {
      base: './bower_components/open-sans-fontface/'
    })
    .pipe(gulp.dest('../dev/css/')),
    gulp.src('./bower_components/open-sans-fontface/open-sans.css', {
      base: './bower_components/open-sans-fontface/'
    })
    .pipe(gulp.dest('../dev/css/'))
  );
});

gulp.task('index', ['bower', 'js', 'less', 'fonts'], function() {
  return gulp.src('./index.html')
    .pipe(
      inject(
        merge(
          gulp.src(['./js/**/*.js', './vendor/**/*.js'], {
            cwd: __dirname + '/../dev/'
          }).pipe(angularFilesort()),
          gulp.src(['./css/**/*.css', './vendor/**/*.css'], {
            cwd: __dirname + '/../dev/'
          })
        ), {
          addRootSlash: false
        }
      )
    )
    .pipe(gulp.dest('../dev/'));
});

gulp.task('js', function() {
  var isProd = process.env.NODE_ENV === 'production';
  return gulp.src(['./js/app.module.js', './js/**/*.js'])
    .pipe(ifElse(!isProd,sourcemaps.init))
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(ifElse(!isProd,sourcemaps.write))
    .pipe(gulp.dest('../dev/js/'))
    .pipe(connect.reload());
});

gulp.task('less', function() {
  var isProd = process.env.NODE_ENV === 'production';
  return gulp.src('./less/**/*.less')
    .pipe(less())
    //.pipe(ifElse(isProd,minifycss))
    .pipe(ifElse(!isProd,sourcemaps.init))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('app.css'))
    .pipe(ifElse(!isProd,sourcemaps.write))
    .pipe(gulp.dest('../dev/css/'))
    .pipe(connect.reload());
});

gulp.task('templates', function() {
  return gulp.src(['./templates/**/*.html'], {
      base: '.'
    })
    .pipe(gulp.dest('../dev'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./js/**/*.js'], ['js']);
  gulp.watch(['./less/**/*.less'], ['less']);
  gulp.watch(['./templates/**/*.html'], ['templates']);
  gulp.watch(['./index.html'], ['index']);
});

gulp.task('build', ['js', 'templates', 'index']);

gulp.task('default', ['build', 'connect', 'watch']);
