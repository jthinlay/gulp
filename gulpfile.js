const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const ugilify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');


/*
    -- TOP LEVEL FUCTIONS --
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.desk - Point to folder to output
    gulp.watch - Watch files and folder for chages 
*/

// Log Message
gulp.task('message', function(done){
    console.log('Gulp is running...')
    done();
});

// Copy All HTML files
gulp.task('copyHTML' , function(done){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

// Optimize Images
gulp.task('imageMin', (done) => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
         done();
        }
);

// Minify Js
// gulp.task('minify', function(done){
//     gulp.src('src/js/*.js')
//         .pipe(ugilify())
//         .pipe(gulp.dest('dist/js'))
//         done();
// });

// Scripts
gulp.task('scripts', function(done){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(ugilify())
        .pipe(gulp.dest('dist/js'))
        done();
});

// Compile Sass
gulp.task('sass', function(done){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
        done();
});

gulp.task('default', gulp.parallel('message', 'copyHTML', 'imageMin', 'sass', 'scripts'));

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHTML'));
})