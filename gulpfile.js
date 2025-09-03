/**
 * Gulp configuration file for WordPress plugin release package building
 * 
 * This file contains tasks for cleaning, copying files, and creating a distribution zip
 * for the Store Order WordPress plugin.
 */

'use strict';

// Import required packages
const gulp = require('gulp');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

// Plugin configuration
const config = {
  pluginName: 'store-order',
  pluginVersion: packageJson.version,
  buildDir: './build',
  distDir: './dist',
  srcFiles: [
    './**/*.php',
    './assets/**/*',
    './includes/**/*',
    './languages/**/*',
    './vendor/**/*',
    './README.md',
    './store-order.php',
    // Exclude unnecessary files
    '!./node_modules/**',
    '!./src/**',
    '!./.git/**',
    '!./build/**',
    '!./dist/**',
    '!./gulpfile.js',
    '!./webpack.config.js',
    '!./postcss.config.js',
    '!./tailwind.config.js',
    '!./.gitignore',
    '!./package.json',
    '!./package-lock.json',
    '!./composer.json',
    '!./composer.lock'
  ]
};

// Clean build directory
gulp.task('clean', function() {
  return gulp.src([config.buildDir, config.distDir], { allowEmpty: true, read: false })
    .pipe(clean({ force: true }));
});

// Copy files to build directory
gulp.task('copy', function() {
  return gulp.src(config.srcFiles, { base: './' })
    .pipe(gulp.dest(config.buildDir + '/' + config.pluginName));
});

// Create zip file
gulp.task('zip', function() {
  const zipFileName = `${config.pluginName}-${config.pluginVersion}.zip`;
  
  return gulp.src(config.buildDir + '/**/*', { base: config.buildDir })
    .pipe(zip(zipFileName))
    .pipe(gulp.dest(config.distDir));
});

// Create directories if they don't exist
gulp.task('create-dirs', function(done) {
  if (!fs.existsSync(config.buildDir)) {
    fs.mkdirSync(config.buildDir, { recursive: true });
  }
  
  if (!fs.existsSync(config.distDir)) {
    fs.mkdirSync(config.distDir, { recursive: true });
  }
  
  done();
});

// Build task - runs all tasks in sequence
gulp.task('build', gulp.series('clean', 'create-dirs', 'copy', 'zip'));

// Default task
gulp.task('default', gulp.series('build'));