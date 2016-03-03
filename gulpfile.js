var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    include = require('gulp-include'),
    fileinclude = require('gulp-file-include'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer');

var muraRoot = '../plugins/MuraFW1/thermae/includes/assets';

gulp.task('default', ['sass', 'js', 'watch', 'fileinclude', 'assets']);

gulp.task('mura', ['sass', 'js', 'watch', 'fileinclude', 'assets', 'muraSass', 'assetsMura', 'watchMura', 'muraJS']);

// Sass
gulp.task('sass', function () {
    return gulp.src('dev/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(require('gulp-autoprefixer')({
        //     browsers: [ 'last 2 versions' ]
        // }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/css'));
});

// JS
gulp.task('js', function () {
    //Custom JS
    gulp.src('./dev/js/*.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest('public/assets/js/'));

    //Vendor JS
    gulp.src('./dev/js/libs/vendor.js')
        .pipe(include())
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest('public/assets/js/'));
});

// Watch js, sass & html
gulp.task('watch', function () {
    gulp.watch('./dev/js/**/*.js', ["js"]);
    gulp.watch('./dev/sass/**/*.sass', ["sass"]);
    gulp.watch('./dev/html/**/*.html', ["fileinclude"]);
});

// Include html files
gulp.task('fileinclude', function () {
    gulp.src(['dev/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./public/'));
});

// Assests to public
gulp.task('assets', function () {
    gulp.src('./dev/images/**/*')
        .pipe(gulp.dest('./public/assets/images/'));
    gulp.src('./dev/fonts/*')
        .pipe(gulp.dest('./public/assets/fonts/'));
    gulp.src('./dev/css/*')
        .pipe(gulp.dest('./public/assets/css/'));
    gulp.src('./dev/media/*')
        .pipe(gulp.dest('./public/assets/media/'));
});


/** Mura **/

//Mura Sass
gulp.task('muraSass', function () {
    return gulp.src('dev/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(muraRoot + '/css'));
});

// Assests to Mura
gulp.task('assetsMura', function () {
    gulp.src('./dev/images/**/*')
        .pipe(gulp.dest(muraRoot + '/images/'));
    gulp.src('./dev/fonts/*')
        .pipe(gulp.dest(muraRoot + '/fonts/'));
    gulp.src('./dev/css/*')
        .pipe(gulp.dest(muraRoot + '/css/'));
    gulp.src('./dev/media/*')
        .pipe(gulp.dest(muraRoot + '/media/'));
});

//Mura JS
gulp.task('muraJS', function () {
    //Custom JS
    gulp.src('./dev/js/*.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(concat("thermae.min.js"))
        .pipe(gulp.dest(muraRoot + '/js/'));

    //Vendor JS
    gulp.src('./dev/js/libs/vendor.js')
        .pipe(include())
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest(muraRoot + '/js/'));
});

// Watch js, sass & html
gulp.task('watchMura', function () {
    gulp.watch('dev/js/**/*.js', ["muraJS"]);
    gulp.watch('dev/sass/**/*.sass', ["muraSass"]);
});

