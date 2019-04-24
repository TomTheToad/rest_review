const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

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
    gulp
        .src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
}

function _copyJS() {
    gulp
        .src('./src/js/*.js')
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
}

function _copyData() {
    gulp
        .src('./src/data/*.json')
        .pipe(gulp.dest('./public/data'))
        .pipe(browserSync.stream());
}

function _copyIMG() {
    gulp
        .src('./src/img/*.jpg')
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.stream());
}

function rebuildPublic() {
    clean();
    _copyData();
    _copyIMG();
    _copyJS();
    _copyHTML();
}

function watch() {
    browserSync.init({
        server: { baseDir: './public' }
    });

    // sass - css
    gulp.watch('./src/scss/**/*.scss');

    // html
    gulp.watch('./src/*.html').on('change', _copyHTML);
    gulp.watch('./src/*.html').on('change', browserSync.reload);

    gulp.watch('./src/js/**/*.js').on('change', _copyJS);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

// Define tasks
exports.rebuildPublic = rebuild;
exports.style = style;
exports.watch = watch;