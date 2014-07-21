'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

function onError(error) {
  console.log(error);
}

gulp.task('browserify', function() {
  return gulp.src('public/scripts/main.js')
    .pipe(plumber(onError))
    .pipe(browserify({
      //debug: true,
      transform: ['reactify', 'debowerify'],
      extensions: ['.jsx', '.js']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/build/'));
});

gulp.task('fonts', function() {
  var fonts = [
    'bower_components/ratchet/dist/fonts/*.*'
  ];

  return gulp.src(fonts)
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('sass', function() {
  var sources = [
    'bower_components/ratchet/dist/css/ratchet.css',
    'bower_components/ratchet/dist/css/ratchet-theme-ios.css',
    'public/styles/partials/*.scss',
    'public/styles/**/*.scss'
  ];

  return gulp.src(sources)
    .pipe(plumber(onError))
    .pipe(concat('main.css'))
    .pipe(sass())
    .pipe(gulp.dest('public/build/'));
});

gulp.task('watch', function() {
  gulp.watch(['public/styles/**/*.scss'], ['sass']);
  gulp.watch(['public/scripts/**/*.*'], ['browserify']);
});

gulp.task('dev', function() {
  nodemon({
    script: 'server.js',
    ignore: ['public/**/*.*'],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', ['fonts', 'sass', 'watch']);
});

gulp.task('deploy', ['fonts', 'sass', 'browserify']);

gulp.task('default', ['fonts', 'sass', 'browserify']);

