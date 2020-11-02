const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber')
const browsersync = require('browser-sync')


const server = browsersync.create();



//  task

gulp.task('pug', () => {
    gulp.src('./dev/pug/pages/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/'))
});


// Sass

gulp.task('sass', () => {
    gulp.src('./dev/sass/**/*main.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/main css/'))
    .pipe(browsersync.stream())

})


// imagesmin

gulp.task('imagemin', () => 
gulp.src('./dev/images/**/*')
.pipe(plumber())
.pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
.pipe(gulp.dest('./public/images'))
);


gulp.task('html', () => 
gulp.src('./public/**/*html')
)

// server

gulp.task('server', () => {
    server.init({
    server: {
        baseDir: "./public"
    }
})


gulp.watch('./dev/sass/**/*.scss', gulp.series('sass')).on('change', server.reload);
gulp.watch('./public/**/*.html', gulp.series('html')).on('change', server.reload);


});