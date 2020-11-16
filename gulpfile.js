const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber')
const browsersync = require('browser-sync')


const server = browsersync.create();

//sass

gulp.task('sass', () => 
gulp.src('./dev/sass/main.scss')
.pipe(sass())
.pipe(gulp.dest('./public/'))
);

// html
gulp.task('html', () =>
gulp.src('./public/*.html')

);

gulp.task('server', () => {
    server.init({
        server: {
            baseDir: './public/'
        }
    })

    gulp.watch('./dev/sass/**/*.scss', gulp.series('sass')).on('change', server.reload);
    gulp.watch('./public/**/*.html', gulp.series('html')).on('change', server.reload)
})