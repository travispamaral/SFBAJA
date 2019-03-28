var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        options: {
            reloadDelay: 250
        },
        notify: true
    });
});

gulp.task('sass', function () {
	return gulp.src('scss/app.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('styles.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
	//watch any and all HTML files and refresh when something changes
	return gulp.src('*.html')
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('default', ['browserSync', 'sass'], function() {
	//a list of watchers, so it will watch all of the following files waiting for changes
	gulp.watch('scss/**', ['sass']);
	gulp.watch('*.html', ['html']);
});

gulp.task('build', ['sass'])
