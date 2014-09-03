/*
Download all required plugins
$ sudo npm install gulp gulp-unzip gulp-zip gulp-rename gulp-clean gulp-flatten --save-dev
*/

var gulp = require('gulp'),
	unzip = require('gulp-unzip'),
	zip = require('gulp-zip'),
	rename = require("gulp-rename"),
	clean = require('gulp-clean'),
	flatten = require('gulp-flatten'),
	gulpIgnore = require('gulp-ignore'),
	zipPath = ['./*css/*', './*font/*', './*less/*', './*scss/*'];

// Unzip
gulp.task('unzip', function() {
	return gulp.src("./*.zip")
		.pipe(unzip())
		.pipe(gulp.dest('./gulp-tmp'));
});

// Copy files
gulp.task('copy', ['unzip'], function() {
	gulp.src('./gulp-tmp/*/style.css')
		.pipe(rename("./_icons-alloy.scss"))
		.pipe(gulp.dest('./scss'));

	return gulp.src('./gulp-tmp/*/fonts/*')
		.pipe(flatten())
		.pipe(gulp.dest('font'));
});

// Create zip and clean
gulp.task('createZip', ['copy'], function () {
	gulp.src(zipPath)
		.pipe(zip('alloy-font-awesome-1.0.0.zip'))
		.pipe(gulp.dest('Portal ZIP file'));

	gulp.src('./gulp-tmp', {read: false})
		.pipe(clean());
});

// Default Task
gulp.task('default', ['unzip', 'copy', 'createZip']);