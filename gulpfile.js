'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var debowerify = require('debowerify');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

var PROD = (process.env.NODE_ENV === 'production');

var EXTERNALS = [
  // NPM
  { name: 'underscore' },
  { name: 'director' },
  // Bower
  { name: 'jquery', path: './bower_components/jquery/dist/jquery.js' },
  { name: 'fastclick', path: './bower_components/fastclick/lib/fastclick.js' },
  { name: 'ratchet', path: './bower_components/ratchet/dist/js/ratchet.js' },
  { name: 'react', path: './bower_components/react/react-with-addons.js' }
];

function onError(error) {
  console.log(error);
}

gulp.task('browserify:vendor', function() {
  var b = browserify()
    .transform(debowerify);

  // Package up all vendor scripts
  EXTERNALS.forEach(function(lib) {
    b.require(lib.path || lib.name);
  });

  var stream = b.bundle()
    .pipe(plumber(onError));

  if (PROD) {
    stream.pipe(uglify());
  }

  return stream
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('./public/build/'));
});

gulp.task('browserify:app', function() {
  var b = browserify({
    entries: './public/scripts/main.js',
    extensions: ['.jsx', '.js']
  })
    .transform(reactify)
    .transform(debowerify);

  // Set all vendor libs as externals
  EXTERNALS.forEach(function(lib) {
    b.external(lib.name);
  });

  var stream = b.bundle()
    .pipe(plumber(onError));

  if (PROD) {
    stream.pipe(uglify())
  }

  return stream
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/build/'));
});

gulp.task('fonts', function() {
  return gulp.src('bower_components/ratchet/dist/fonts/*.*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('sass:vendor', function() {
  var sources = [
    'bower_components/ratchet/dist/css/ratchet.css',
    'bower_components/ratchet/dist/css/ratchet-theme-ios.css'
  ];

  return gulp.src(sources)
    .pipe(plumber(onError))
    .pipe(concat('vendor.css'))
    .pipe(sass())
    .pipe(gulp.dest('public/build/'));
});

gulp.task('sass:app', function() {
  var sources = [
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
  gulp.watch(['public/styles/**/*.scss'], ['sass:app']);
  gulp.watch(['public/scripts/**/*.*'], ['browserify:app']);
});

gulp.task('develop', function() {
  nodemon({
    script: 'server.js',
    ignore: ['public/**/*.*'],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', ['deploy', 'watch']);
});

gulp.task('deploy', [
  'fonts',
  'sass:vendor',
  'sass:app',
  'browserify:vendor',
  'browserify:app'
]);

gulp.task('default', [
  'fonts',
  'sass:vendor',
  'sass:app',
  'browserify:vendor',
  'browserify:app'
]);

