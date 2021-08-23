const gulp = require('gulp');
const {series , parallel, dest} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');

const html = () => {
    return gulp.src('src/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('build'))
}

const styles = () => {
    return gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
}

const images = () => {
    return gulp.src('src/images/*.*')
    .pipe(gulp.dest('build/images'))
}


const server = () => {
    browserSync.init({
        server: {
            baseDir: "build",
            notify: false
        }
    });
    browserSync.watch('build', browserSync.reload)
}

const deleteBuild = (cb) => {
    return del('build/**/*.*').then(() => { cb() })
}

const watch = () => {
    gulp.watch('src/pug/*.html', html);
    gulp.watch('src/styles/*.scss', styles);
    gulp.watch('src/images/*.*', images)
}

exports.default = series(
    deleteBuild,
    parallel(html, styles, images),
    parallel(server, watch)
)