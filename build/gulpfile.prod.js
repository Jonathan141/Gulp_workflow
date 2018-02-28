var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀
var fileinclude = require('gulp-file-include'); // 文件公共部分合并
var rename = require('gulp-rename'); //重命名
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var cleancss = require('gulp-clean-css'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
var uglify = require('gulp-uglify'); //js压缩
var concat = require('gulp-concat'); //合并文件
var imagemin = require('gulp-imagemin'); //图片压缩
var Config = require('./gulpfile.config.js');
var autoprefixerOption = {
  browsers: [
    "last 2 versions",
    "> 0.1%",
    "> 5% in US",
    "ie 6-8",
    "Firefox < 20",
    "Android >= 4.0",
    "iOS >= 7"
  ],
  cascade: true, //是否美化属性值 默认：true
  remove: true //是否去掉不必要的前缀 默认：true
}
var rev = require('gulp-rev'); // 静态资源添加版本号
var revCollector = require('gulp-rev-collector'); // 替换引入文件的版本号
var sequence = require('gulp-sequence'); // 定义task的执行顺序
//======= gulp build 打包资源 ===============
function prod() {
  /**
   * HTML处理
   */
  gulp
    .task('html', function () {
      return gulp
        .src(Config.html.src)
        .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
        .pipe(gulp.dest(Config.html.dist));
    });
  /**
   * assets文件夹下的所有文件处理
   */
  gulp.task('assets', function () {
    return gulp
      .src(Config.assets.src)
      .pipe(gulp.dest(Config.assets.dist));
  });
  /**
   * CSS样式处理
   */
  gulp.task('css', function () {
    return gulp
      .src(Config.css.src)
      .pipe(autoprefixer(autoprefixerOption))
      .pipe(cleancss({
        compatibility: 'ie8', // 保留 ie8 以下兼容写法
        keepSpecialComments: '*' // 保留所有特殊前缀，使用 autoprefixer 时开启
      }))
      .pipe(rev()) // 设置版本号 hash key
      .pipe(gulp.dest(Config.css.dist))
      .pipe(rev.manifest({path: 'rev-manifest-css.json'})) // 设置版本号对应 json 文件
      .pipe(gulp.dest(Config.rev.dist)); // disthash key json
  });
  /**
   * SASS样式处理
   */
  gulp.task('sass', function () {
    return gulp
      .src(Config.sass.src)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerOption))
      .pipe(cleancss({
        compatibility: 'ie8', // 保留 ie8 以下兼容写法
        keepSpecialComments: '*' // 保留所有特殊前缀，使用 autoprefixer 时开启
      }))
      .pipe(rev()) // 设置版本号 hash key
      .pipe(gulp.dest(Config.sass.dist))
      .pipe(rev.manifest({path: 'rev-manifest-sass.json'})) // 设置版本号对应 json 文件
      .pipe(gulp.dest(Config.rev.dist)); // disthash key json
  });
  /**
   * js处理
   */
  gulp.task('js', function () {
    return gulp
      .src(Config.js.src)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest(Config.js.dist))
      .pipe(rev.manifest({path: 'rev-manifest-js.json'})) // 设置版本号对应 json 文件
      .pipe(gulp.dest(Config.rev.dist));
  });
  /**
   * 合并所有js文件并做压缩处理
   */
  gulp.task('js-concat', function () {
    return gulp
      .src(Config.js.src)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat(Config.js.build_name))
      .pipe(gulp.dest(Config.js.dist))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(Config.js.dist));
  });
  /**
   * 图片处理
   */
  gulp.task('images', function () {
    return gulp
      .src(Config.img.src)
      .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
      .pipe(rev())
      .pipe(gulp.dest(Config.img.dist))
      .pipe(rev.manifest({path: 'rev-manifest-img.json'})) // 设置版本号对应 json 文件
      .pipe(gulp.dest(Config.rev.dist));
  });
  /**
   * 版本后缀
   */
  gulp.task('rev', function () {
    return gulp
      .src([Config.rev.json_path, Config.rev.src])
      .pipe(revCollector({
        replaceReved: true // 替换已经替换过的引用
      }))
      .pipe(gulp.dest(Config.dist));
  });
  gulp.task('build', sequence([
    'html',
    'css',
    'sass',
    'js',
    'assets',
    'images'
  ], 'rev'));
}
module.exports = prod;