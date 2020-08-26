"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const phpIn = require('gulp-connect-php');

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
    ' * Start Apps - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> \n',
    ' */\n',
    '\n'
].join('');

// BrowserSync

function browserSync(done) {
    phpIn.server({ base: './', port: 8010, keepalive: true });
    browsersync.init({
        proxy: "localhost:8010",
        baseDir: "./",
        open: true,
        notify: true
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean vendor
function clean() {
    return del("./dist");
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {

    var bootstrap = gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.js')
        .pipe(gulp.dest('./dist/js/vendor'));

    // Simple line icons
    var simpleLineIcons = gulp.src('./node_modules/simple-line-icons/fonts/**')
        .pipe(gulp.dest('./dist/fonts/simple-line-icons'));

    // Font Awesome Webfonts
    var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(gulp.dest('./dist/fonts/webfonts'));

    // Morphext
    var morphext = gulp.src('./node_modules/morphext/dist/morphext.js')
        .pipe(gulp.dest('./dist/js/vendor'));

    // easing js
    var easing = gulp.src('./node_modules/jquery.easing/bower_components/jquery-easing-original/jquery.easing.js')
        .pipe(gulp.dest('./dist/js/vendor'));

    // waypoint js
    var waypoint = gulp.src([
        './node_modules/waypoints/src/waypoint.js',
        './node_modules/waypoints/lib/jquery.waypoints.js'
    ])
        .pipe(gulp.dest('./dist/js/vendor'));

    // waypoint js
    var wowjs = gulp.src([
        './node_modules/wow.js/dist/WOW.js'
    ])
        .pipe(gulp.dest('./dist/js/vendor'));

    // counterupjs
    var counterup = gulp.src([
        './node_modules/jquery.counterup/jquery.counterup.js'
    ])
        .pipe(gulp.dest('./dist/js/vendor'));

    // isotep
    var isotope = gulp.src([
        './node_modules/isotope-layout/dist/isotope.pkgd.js'
    ])
        .pipe(gulp.dest('./dist/js/vendor'));

    // jQuery
    var jquery = gulp.src([
        './node_modules/jquery/dist/jquery.js*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./dist/js/vendor'));
    return merge(bootstrap, simpleLineIcons, fontAwesomeWebfonts, jquery, morphext, easing, waypoint, wowjs, counterup, isotope);
}

// CSS task
function css() {
    return gulp
        .src("./resources/assets/styles/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browsersync.stream());
}

// JS task
function js() {
    return gulp
        .src([
            './resources/assets/scripts/*.js',
            '!./resources/assets/scripts/*.min.js',
        ])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browsersync.stream());
}

function jsVendor() {
    return gulp
        .src([
            './dist/js/vendor/*.js',
            '!./dist/js/vendor/*.min.js',
        ])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/vendor'))
        .pipe(browsersync.stream());
}

function images() {
    return gulp
        .src(['resources/assets/images/*.{gif,jpg,png,svg}'])
        .pipe(gulp.dest('./dist/images'));
};

// Watch files
function watchFiles() {
    gulp.watch("./resources/assets/styles/**/*", css);
    gulp.watch(["./resources/assets/scripts/*.js", "!./resources/assets/scripts/**/*.min.js"], js);
    gulp.watch("./**/*.php", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js, jsVendor, images));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
