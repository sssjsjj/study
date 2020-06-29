const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

// 경로 별도 지정
const src = 'public';
const distNode = 'dist';
const distBrowser = 'public/dist';
const paths = {
  jsNode: 'es6/*.js',
  jsBrowser: src + '/es6/*.js',
  scss: src + '/scss/*.scss',
  html: '/*.html',
};

// es6를 es5로 변환
gulp.task('scripts', async function(){
  // node
  gulp.src(paths.jsNode)
    .pipe(babel())
    .pipe(gulp.dest(distNode))
  // browser
  gulp.src(paths.jsBrowser)
    .pipe(babel())
    .pipe(gulp.dest(distBrowser))
});

// scss를 css로 변환
gulp.task('styles', async function(){
  gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(distBrowser))
})

//ESLint
gulp.task('eslint', async function(){
  gulp.src([paths.jsNode, paths.jsBrowser])
    .pipe(eslint())
    .pipe(eslint.format());
});

// watch
gulp.task('watch', function () {
	gulp.watch(paths.jsNode, gulp.series('scripts'));
	gulp.watch(paths.scss, gulp.series('styles'));
});


// default Task
gulp.task('default', gulp.parallel('styles', 'scripts', 'eslint',  'watch'))