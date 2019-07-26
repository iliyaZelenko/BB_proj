const gulp            = require('gulp'),
    browserSync       = require('browser-sync'),
    gulpLoadPlugins   = require('gulp-load-plugins'),
    plugins           = gulpLoadPlugins();

let paths = {
    pug: 'src/pug/',
    sass: 'src/sass/',
    css: 'src/css/',
    scripts: 'src/scripts/',
    images: 'src/img/',
    blocks_sass: 'src/blocks/',
    blocks_pug: 'src/blocks/'
};

gulp.task('pug-compilation', () =>
    gulp.src(paths.pug+'index.pug')
        .pipe(plugins.pug({pretty: true}))
        .pipe(gulp.dest('./src'))
);
gulp.task('sass-compilation', () =>
    gulp.src(paths.sass+'main.sass')
        .pipe(plugins.sass({'include css': true}))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.css))
);
gulp.task('js-compilation', () =>
    gulp.src(paths.scripts+'components/**/*.js')
    // .pipe(plugins.uglifyjs())
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(paths.scripts))
);
gulp.task('image-minify', () =>
    gulp.src(paths.images+'*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(paths.images))
);
gulp.task('project-size', () =>
    gulp.src('./src/**')
        .pipe(plugins.size({showFiles: true}))
);
gulp.task('browser-sync', () =>
    browserSync.init({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
);

gulp.task('watch',
    ['sass-compilation', 'pug-compilation', 'js-compilation', 'browser-sync'],
    function() {
        gulp.watch([paths.blocks_sass+'**/*.sass', paths.sass+'**/*.sass'], ['sass-compilation']).on('change', browserSync.reload);
        gulp.watch([paths.blocks_pug+'**/*.pug', paths.pug+'index.pug'], ['pug-compilation']).on('change', browserSync.reload);
        gulp.watch(paths.scripts+'**/*.js', ['js-compilation']).on('change', browserSync.reload);
        gulp.watch(paths.images+"**/*").on('change', browserSync.reload);

    });


gulp.task('build_html', () =>
    gulp.src(paths.pug+'index.pug')
        .pipe(plugins.pug({pretty: true}))
        .pipe(gulp.dest('./dist/'))
);
gulp.task('build_css', () =>
    gulp.src(paths.stylus+'main.styl')
        .pipe(plugins.stylus({'include css': true}))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'))
);
gulp.task('build_js', () =>
    gulp.src(paths.scripts+'components/**/*.js')
    // .pipe(uglifyjs())
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest('./dist/scripts/'))
);
gulp.task('build_assets', () =>
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets/'))
);
gulp.task('build_img', () =>
    gulp.src(paths.images+'**/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('./dist/img/'))
);
gulp.task('project-size', () =>
    gulp.src('./dist/**')
        .pipe(plugins.size({ showFiles: true }))
);

gulp.task('build', ['build_html', 'build_css', 'build_js', 'build_assets', 'build_img', 'project-size']);