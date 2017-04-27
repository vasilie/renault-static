// /////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    reload = browserSync.reload;

// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////

gulp.task("scripts",function(){
    gulp.src([
      "app/bower_components/jquery/dist/jquery.js",
      "app/bower_components/jquery-fadethis/src/jquery.fadethis.js",
      "app/bower_components/slick-carousel/slick/slick.js",
      "app/bower_components/horizons/horizons.js",
      "app/bower_components/video.js/dist/video.js",
      "app/bower_components/velocity/velocity.js",
      "app/js/**/*.js", '!app/js/**/*.min.js',

    ])
    .pipe(concat('main.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////

gulp.task("styles",function(){
    gulp.src("app/sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      style:"compressed"
    }))
    .pipe(gulp.dest("app/assets/css/"))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////

gulp.task("html", function(){
    gulp.src("app/**/*.html")
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    ghostMode: false,
    server:{
      baseDir:"./app/"
    }
  })
});

// /////////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////////

gulp.task("watch",function(){
  gulp.watch("app/js/**/*.js",['scripts']);
  gulp.watch("app/sass/**/*.scss",['styles']);
  gulp.watch("app/**/*.html",['html']);
});


// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default",[ 'styles', 'scripts', 'html', 'browser-sync', 'watch']);
