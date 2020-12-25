const gulp = require('gulp');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const fs = require('fs');
// const data = require('gulp-data');
const replace = require('gulp-replace');
// const sass = require('gulp-sass');
// const sassGlob = require("gulp-sass-glob");
const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const del = require('del');

// ファイルパス：コンパイル前
const srcJsonFiles = './src/json/**/*.json';
const srcDataJson = './src/json/data.json';
const srcEjsFiles = './src/ejs/**/*.ejs';
const srcEjsPartial = '!./src/ejs/**/_*.ejs';
const srcTailwindFiles = './src/styles/**/*.css';
const srcTsFiles = './src/ts/**/*.ts';
const srcImgFiles = './src/img/**/*'
const srcImgFileType = '{jpg,jpeg,png,gif,svg}';


// ファイルパス：コンパイル後
const destDir = './dest/';
const destFiles = './dest//**/**/*';
const destHtmlFiles = './dest/*.html';
const destIndexHtml = 'index.html';
const destCssDir = './dest/assets/css';
const destCssFiles = './dest/assets/css/style.css';
const destJsDir = './dest/assets/js';
const destJSFiles = './dest/assets/js/*.js';
const destImtDir = './dest/assets/img';
const destImgFiles = './dest/assets/img/*';


// EJSコンパイル
const compileEjs = (done) => {
  const data = JSON.parse(fs.readFileSync(srcDataJson));
  gulp.src([srcEjsFiles, srcEjsPartial])
  .pipe(plumber())
  .pipe(ejs(data))
  .pipe(ejs({}, {}, {ext: '.html'}))
  .pipe(rename({extname: '.html'}))
  .pipe(replace(/^[ \t]*\n/gmi, ''))
  .pipe(gulp.dest(destDir));
  done();
};


// tailwind
const compileCss = (done) => {
  gulp.src(srcTailwindFiles)
  .pipe(postcss([
    require("tailwindcss"),
    // require('postcss-100vh-fix'),
    require("autoprefixer"),
  ]))
  .pipe(gulp.dest(destCssDir));
  done();
};


// TypeScriptをwebpackでバンドル
const bundleWebpack = (done) => {
  webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest(destJsDir));
  done();
};


// リロードするhtml
const reloadFile = (done) => {
  browserSync.init({
    server: {
      baseDir: destDir,
      index: destIndexHtml,
    },
  });
  done();
};


// リロード設定
const reloadBrowser = (done) => {
  browserSync.reload();
  done();
};


// 画像圧縮
const minifyImage = (done) => {
  gulp.src(srcImgFiles + srcImgFileType)
  .pipe(imagemin(
    [
      pngquant({quality: [0.65, 0.8], speed: 1}),
      mozjpeg({quality: 80}),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]
  ))
  .pipe(gulp.dest(destImtDir));
  done();
};


// destフォルダのファイル削除
const clean = (done) => {
  del([destFiles, '!' + destCssDir, '!' + destJsDir, '!' + destImtDir]);
  done();
};


// HTMLファイル削除
const htmlClean = (done) => {
  del([destHtmlFiles]);
  done();
};


// 画像ファイル削除
const imgClean = (done) => {
  del([destImgFiles]);
  done();
};


// タスク化
exports.compileEjs = compileEjs;
exports.compileCss = compileCss;
exports.bundleWebpack = bundleWebpack;
exports.reloadFile = reloadFile;
exports.reloadBrowser = reloadBrowser;
exports.minifyImage = minifyImage;
exports.clean = clean;
exports.htmlClean = htmlClean;
exports.imgClean = imgClean;


// 監視ファイル
const watchFiles = (done) => {
  gulp.watch([srcEjsFiles, srcJsonFiles], gulp.series(htmlClean, compileEjs));
  gulp.watch(destHtmlFiles, reloadBrowser);
  gulp.watch(srcTailwindFiles, compileCss);
  gulp.watch(destCssFiles, reloadBrowser);
  gulp.watch([srcTsFiles, srcJsonFiles], bundleWebpack);
  gulp.watch(destJSFiles, reloadBrowser);
  gulp.watch(srcImgFiles, gulp.series(imgClean, minifyImage));
  gulp.watch(destImgFiles, reloadBrowser);
  done();
};


// タスク実行
exports.default = gulp.series(
  clean, watchFiles, reloadFile, compileEjs, compileCss, bundleWebpack, minifyImage
);