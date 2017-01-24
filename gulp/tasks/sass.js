var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
    config = require('../config').sass,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.settings).on('error', sass.logError))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dest))
		.pipe(global.browserSync.stream({match: '**/*.css'}));
});
