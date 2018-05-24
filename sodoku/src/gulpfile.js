const gulp = require ("gulp");

// translate javascript
gulp.task ("webpack", () => {
    const webpack = require ("webpack-stream");
    const config = require ("./webpack.config.js");
    gulp.src ("./js/**/*.json") // source file 
        .pipe (webpack (config)) // process by webpack
        .pipe (gulp.dest ("../www/js")); // output into destion folder 
});

// compile less -> css 
gulp.task ("less", () => {
    const less  = require ("gulp-less");
    gulp.src ("./less/*.less") // source file 
        .pipe (less ()) // process by less 
        .pipe (gulp.dest ("../www/css")); // output  to destion folder 
});

gulp.task ("default", ["webpack", "less"]);
gulp.task("watch",() => {
    gulp.watch("less/**/*.less", ["less"]);
    gulp.watch("js/**/*.js", ["webpack"]);
});


