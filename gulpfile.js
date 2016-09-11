var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = process.argv;

const copyHTML = require('@denysvuika/ionic-gulp-html-copy');
const buildTypeScript = require('@denysvuika/ionic-gulp-build-typescript');
const copyImages = require('@denysvuika/ionic-gulp-images-copy');

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildSass = require('ionic-gulp-sass-build');
// var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');
var tslint = require('ionic-gulp-tslint');

var isRelease = argv.indexOf('--release') > -1;

gulp.task('watch', ['clean'], function(done){
  runSequence(
    ['sass', 'fonts', 'html', 'scripts', 'images', 'copy-modules', 'build-ts'],
    function(){
      gulpWatch('app/**/*.scss', function(){ gulp.start('sass'); });
      gulpWatch('app/**/*.html', function(){ gulp.start('html'); });
      gulpWatch('app/assets/images/*.svg', () => gulp.start('images'));
      gulpWatch('app/**/*.ts', () => gulp.start('build-ts'));
      buildBrowserify({ watch: true }).on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function(done){
  runSequence(
    ['sass', 'fonts', 'html', 'scripts', 'images', 'copy-modules', 'build-ts'],
    function(){
      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', done);
    }
  );
});

gulp.task('copy-modules', () => {
  var scripts = [
    'node_modules/@angular/common/bundles/common.umd.js',
    'node_modules/@angular/compiler/bundles/compiler.umd.js',
    'node_modules/@angular/core/bundles/core.umd.js',
    'node_modules/@angular/forms/bundles/forms.umd.js',
    'node_modules/@angular/http/bundles/http.umd.js',
    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/**/*.*',
    'node_modules/ionic-angular/**/*.*',
    'node_modules/ionic-native/**/*.*',

    'node_modules/intl/dist/Intl.min.js',
    'node_modules/intl/locale-data/jsonp/en.js',

    'node_modules/alfresco-js-api/dist/alfresco-js-api.js',
    'node_modules/ionic-alfresco/build/**/*.*'
  ];
  return gulp.src(scripts, { base: '.' })
    .pipe(gulp.dest('www/build'));
});

gulp.task('build-ts', buildTypeScript);
gulp.task('images', copyImages);
gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function(){
  return del('www/build');
});
gulp.task('lint', tslint);
