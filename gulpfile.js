var gulp = require("gulp");
var pug = require("gulp-pug");
var stylus = require("gulp-stylus");
var rupture = require("rupture");
var browserSync = require("browser-sync");

var pathsView = [
    "src/index.pug",
    "!src/blocks/*.pug",
    "!src/blocks/**/*.pug"
];
var pathsViewToWatch = [
    "src/*.pug",
    "src/**/*.pug"
];

var pathsStyles = [
    "src/styles/index.styl"
];
var pathsStylesToWatch = [
    "src/styles/*.styl",
    "src/styles/**/*.styl"
];

var pathsScripts = [
    "src/scripts/app.js",
    "src/scripts/**/*.js"
];
var pathsScriptsToWatch = [
    "src/scripts/*.js",
    "src/scripts/**/*.js"
];

var pathVendor = [
    "vendor/**"
];
var pathsVendorToWatch = [
    "vendor/*",
    "vendor/**/*",
];

var pathData = [
    "src/*.json"
];

var taskPugSelf = function(){
    return gulp.src(pathsView)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./public"));
};
gulp.task("view", function(){
    return taskPugSelf();
});

var taskStylusSelf = function(){
    return gulp.src(pathsStyles)
        .pipe(stylus({
            use:[rupture()]
        }))
        .pipe(gulp.dest("./public/styles"));
};

gulp.task("styles", function(){
    return taskStylusSelf();
});

var taskScriptsSelf = function(){
    return gulp.src(pathsScripts)
        .pipe(gulp.dest("./public/scripts"));
};
gulp.task("scripts", function(){
    return taskScriptsSelf();
});

gulp.task("data", function(){
    return gulp.src(pathData)
        .pipe(gulp.dest("./public/"));
});

var taskVendorSelf = function(){
    return gulp.src(pathVendor)
        .pipe(gulp.dest("./public/vendor"));
};
gulp.task("vendor", function(){
    return taskVendorSelf();
});

gulp.task("watch", function(){
    gulp.watch(pathsViewToWatch, function(){
        taskPugSelf();
    });

    gulp.watch(pathsStylesToWatch, function(){
        taskStylusSelf();
    });

    gulp.watch(pathsScriptsToWatch, function(){
        taskScriptsSelf();
    });

    gulp.watch(pathsVendorToWatch, function(){
        taskVendorSelf();
    });

    gulp.watch("./public/*.*").on("change", browserSync.reload);
    gulp.watch("./public/**/*.*").on("change", browserSync.reload);
});

gulp.task("ServerBrowserSync", function(){
    browserSync.init({
        port: 8089,
        server: {
            baseDir: "./public/"
        }
    });
});

gulp.task("build", ["view", "styles", "scripts", "data", "vendor"]);
gulp.task("server", ["build", "ServerBrowserSync", "watch"]);
