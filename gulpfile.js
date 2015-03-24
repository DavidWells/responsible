var gulp    = require('gulp'),
    karma   = require('gulp-karma'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    header  = require('gulp-header'),
    uglify  = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    clean   = require('gulp-clean'),
    rename  = require('gulp-rename'),
    markdox = require("gulp-markdox"),
    package = require('./package.json');

var paths = {
  output : 'dist/',
  scripts : [
    'src/responsible.js'
  ],
  test: [
    'test/spec/**/*.js'
  ]
};

var banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

/*
gulp.task("readme", function() {
    gulp.src("src/*.js")
        .pipe(markdox())
        .pipe(rename({
            basename: 'README',
            extname: ".md"
        }))
        .pipe(gulp.dest("./"));
});
*/

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('demo/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('demo/js/'));

});

gulp.task('watch', function() {
    //gulp.watch('shared/assets/js/frontend/analytics-src/*.js', ['lint', 'scripts']);
    gulp.watch('src/*.js', ['default']);
    //gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
  return gulp.src(paths.output, { read: false })
    .pipe(plumber())
    .pipe(clean());
});


gulp.task('test', function() {
  return gulp.src(paths.scripts.concat(paths.test))
    .pipe(plumber())
    .pipe(karma({ configFile: 'test/karma.conf.js' }))
    .on('error', function(err) { throw err; });
});

gulp.task('default', [
  'lint',
  'clean',
  'scripts',
  //'readme'
  //'test'
]);
