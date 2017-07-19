var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('dev/sass/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('dev/sass/**/*.scss', ['sass']);
    // Other watchers
});