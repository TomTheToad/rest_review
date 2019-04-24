const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require('del');

// Compile css
function style() {
    // scss file location
    return gulp.src('./src/scss/**/*.scss')
        // compile
        .pipe(sass().on('error', sass.logError))
        // css save file location
        .pipe(gulp.dest('./public/css'))
        // browser synch all browsers`
        .pipe(browserSync.stream());
}

// TODO: test before using
function _clean() {
    return del(['./public/'])
}

// TODO: test
function _copyHTML() {
    return gulp
        .src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
}

function _copyJS() {
    return gulp
        .src('./src/js/*.js')
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
}

function _copyData() {
    return gulp
        .src('./src/data/*.json')
        .pipe(gulp.dest('./public/data'))
        .pipe(browserSync.stream());
}

function _copyIMG() {
    return gulp
        .src('./src/img/*.jpg')
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.stream());
}

const rebuild = gulp.series(_clean, _copyData, _copyIMG, _copyJS, _copyHTML, style);

function watch() {
    browserSync.init({
        server: {
            baseDir: './public/',
            port: 3000
        }
    });

    // sass - css
    gulp.watch('./src/scss/**/*.scss');

    // html
    gulp.watch('./src/*.html').on('change', _copyHTML);
    gulp.watch('./src/*.html').on('change', browserSync.reload);

    // js
    gulp.watch('./src/js/**/*.js').on('change', _copyJS);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

// Define tasks
exports.rebuild = rebuild;
exports.style = style;
exports.watch = watch;