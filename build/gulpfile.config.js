var SRC_DIR = './src/'; // 源文件目录
var DIST_DIR = './dist/'; // 文件处理后存放的目录
var REV_DIR = './dist/rev/'; // 存放版本对应json文件的目录
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件

var Config = {
  src: SRC_DIR,
  dist: DIST_DIR,
  dist_files: DIST_FILES,
  html: {
    dir: SRC_DIR,
    src: SRC_DIR + '*.html',
    dist: DIST_DIR
  },
  assets: {
    dir: SRC_DIR + 'assets',
    src: SRC_DIR + 'assets/**/*', // assets目录：./src/assets
    dist: DIST_DIR + 'assets' // assets文件build后存放的目录：./dist/assets
  },
  css: {
    dir: SRC_DIR + 'css',
    src: SRC_DIR + 'css/**/*.css', // CSS目录：./src/css/
    dist: DIST_DIR + 'css' // CSS文件build后存放的目录：./dist/css
  },
  sass: {
    dir: SRC_DIR + 'sass',
    src: SRC_DIR + 'sass/**/*.scss', // SASS目录：./src/sass/
    dist: DIST_DIR + 'css' // SASS文件生成CSS后存放的目录：./dist/css
  },
  js: {
    dir: SRC_DIR + 'js',
    src: SRC_DIR + 'js/**/*.js', // JS目录：./src/js/
    dist: DIST_DIR + 'js', // JS文件build后存放的目录：./dist/js
    build_name: 'build.js' // 合并后的js的文件名
  },
  img: {
    dir: SRC_DIR + 'images',
    src: SRC_DIR + 'images/**/*', // images目录：./src/images/
    dist: DIST_DIR + 'images' // images文件build后存放的目录：./dist/images
  },
  rev: {
    src: DIST_DIR + '*.html', // 要替换资源的html页面路径：./dist/*.html
    json_path: REV_DIR + '**/*.json', // html 页面替换静态资源依据清单
    dist: REV_DIR // 映射清单存放目录：./dist/rev
  }
};

module.exports = Config;