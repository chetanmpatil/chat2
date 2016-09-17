var gulp=require('gulp');
var ts=require('gulp-typescript');
var sourcemap=require('gulp-sourcemaps');

var tsconfig=ts.createProject('tsconfig.json');

var vendor='public/javascripts/vendor';
gulp.task('compile',function()
{
     return gulp.src('app/**/*.ts')
                .pipe(ts(tsconfig))
                .pipe(gulp.dest('public/javascripts/production'));
});

gulp.task('build-copy',function()
{
   return gulp.src('app/**/*.{html,htm,css,js}')
              .pipe(gulp.dest('public/javascripts/production'));
});

gulp.task('vendor', function() {
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));

    gulp.src('node_modules/core-js/**')
        .pipe(gulp.dest(vendor + '/core-js'));

    gulp.src('node_modules/angular2-in-memory-web-api/**')
        .pipe(gulp.dest(vendor+'/angular2-in-memory-web-api/'));    

    //reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata/'));

    //rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs/'));

    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs/'));

    //bootstrap
    gulp.src('node_modules/bootstrap/**')
        .pipe(gulp.dest(vendor + '/bootstrap/'));

    //moment
    gulp.src('node_modules/moment/**')
        .pipe(gulp.dest(vendor + '/moment/'));

    //zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js/'));
});


gulp.task('watch',function()
{
    gulp.watch('app/**/*.{html,htm,css}',['build-copy'])
    gulp.watch('app/**/*.ts',['compile'])
});

gulp.task('default',['watch','compile','build-copy','vendor']);