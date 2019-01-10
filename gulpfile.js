const gulp = require("gulp");
const rename = require("gulp-rename");
const cssMinifier = require("gulp-clean-css");

const path = "./static";

gulp.task("default", () => {
  gulp
    .src(`${path}/**/*.css`)
    .pipe(cssMinifier())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path));
});
