var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: ["./", "./dev"]
        },
        notify: false
    });
});
var sassPaths=[
    'node_modules/normalize-scss/sass',
    'node_modules/foundation-sites/scss',
    'node_modules/font-awesome/scss',
];
gulp.task('sass', function() {
    return gulp.src('dev/sass/**/*.sass')
        .pipe(sass({
            includePaths: sassPaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('icons', function() {
    return gulp.src([
        'node_modules/font-awesome/fonts/**.*'
    ])
        .pipe(gulp.dest('dev/fonts'));
});
gulp.task('libs', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
    ])
        .pipe(uglify())
        .pipe(gulp.dest('dev/js'));
        // .pipe(browserSync.reload({stream:true}));
});
gulp.task('js', function() {
    return gulp.src([
        'dev/js/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', ['sass','js', 'libs', 'icons', 'browser-sync'], function() {
    gulp.watch('dev/sass/**/*.sass', ['sass']);
    gulp.watch(['dev/js/*'], ['js']);
    gulp.watch('dev/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
    return gulp.src('dev/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('assets/img'));
});



gulp.task('build', ['removedist', 'imagemin', 'icons', 'sass', 'js'], function() {

    var buildCss = gulp.src([
        'dev/css/style.min.css'
    ]).pipe(gulp.dest('assets/css'));

    var buildFiles = gulp.src([
        'dev/*.html',
        'dev/.htaccess'
    ]).pipe(gulp.dest('assets'));

    var buildFonts = gulp.src([
        'dev/fonts/*',
        'node_modules/font-awesome/fonts/**.*'
    ]).pipe(gulp.dest('assets/fonts'));

    var buildJs = gulp.src([
        'dev/js/scripts.min.js'
    ]).pipe(gulp.dest('assets/js'));

});

gulp.task('removedist', function() { return del.sync('assets'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);