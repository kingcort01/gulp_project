var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream : true
		}))
});

gulp.task('browserSync', function(){
	browserSync.init({
		server : 'app'
	})
});

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify())) // MINIFY JAVASCRIPT
		.pipe(gulpIf('*.css', cssnano())) // MINIFY CSS
		.pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function(){
	return del.sync('dist');
});

//gulp.watch('app/scss/**/*.scss', ['sass']);
gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', reload);
	gulp.watch('app/js/**/*.js', reload);
});

gulp.task('build', function(callback){
	runSequence('clean:dist', ['sass','useref'], callback)
});

gulp.task('default', function(callback){
	runSequence(['sass','browserSync','watch'], callback)
});





