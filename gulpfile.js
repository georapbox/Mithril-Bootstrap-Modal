/* jshint ignore:start */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css');

gulp.task('copy', function () {
    gulp.
        src('src/mithril_modal.css').
        pipe(gulp.dest('dist'));
});

gulp.task('js-uglify', function () {
    gulp.
        src('src/mithril_modal.js').
        pipe(uglify()).
        pipe(rename({
            extname: '.min.js'
        })).
        pipe(gulp.dest('dist'));
});

gulp.task('css-minify', function () {
    gulp.
        src('src/mithril_modal.css').
        pipe(minifyCss()).
        pipe(rename({
            extname: '.min.css'
        })).
        pipe(gulp.dest('dist'));
});

gulp.task('build', ['js-uglify', 'css-minify']);
