// ライブラリの読み込み
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssMin = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const del = require('del');
const webserver  = require('gulp-webserver');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config.js');
const env = process.env.NODE_ENV;

// jsとcssの削除
gulp.task('clean', () => {
  del(['./dist/js/**', './dist/css/**']);
});

// TypeScriptのコンパイルとwebpackの実行
gulp.task('webpack', () => {
  gulp.src(['./src/ts/*.ts'])
  .pipe(plumber())
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./dist'));
});

// 簡易サーバーを立ち上げる
gulp.task('serve', () => {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
      open: true
    }));
});

// sassのコンパイル
gulp.task('sass', () => {
  gulp.src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

// css圧縮
gulp.task('cssMin', () => {
  gulp.src('./dist/css/*.css')
    .pipe(plumber())
    .pipe(cssMin())
    .pipe(gulp.dest('./dist/css'));
});

// tsとsassの監視
gulp.task('watch', () => {
  gulp.watch('./src/**/*.ts', ['webpack']);
  gulp.watch('./src/scss/*.scss', ['sass']);
});

// デフォルトタスク
gulp.task('default', () => {
  if (env === 'production') {
    runSequence('clean', ['webpack', 'sass'], 'cssMin');
  } else {
    runSequence('clean', ['webpack', 'sass'], 'watch', 'serve');
  }
});
