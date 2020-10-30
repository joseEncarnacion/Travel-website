const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber')



//  task

gulp.task('pug', () => {
    gulp.src('./dev/pug/pages/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/'))
});



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


gulp.task('server', () => {
    server.init()

})