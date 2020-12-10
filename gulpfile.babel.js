var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var pipeline = require('readable-stream').pipeline;
 
gulp.task('compress', function () {
  return pipeline(
        gulp.src('src/**/*.js'),
        uglify(),
        gulp.dest('./dist/')
  );
});

gulp.task('copy', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copyres', function() {
  return gulp.src('src/res/**/*')
  .pipe(gulp.dest('./dist/res/'));
});

gulp.task('copycss', function() {
  return gulp.src('src/**/*.css')
  .pipe(gulp.dest('./dist/'));
});