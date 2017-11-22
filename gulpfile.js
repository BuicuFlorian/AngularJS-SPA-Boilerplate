const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const tsProject = ts.createProject('./tsconfig.json');


gulp.task('compile:client', () => {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult =
        gulp.src('src/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(tsProject());
    return tsResult.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: './src' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('lint:client', () => {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: 'verbose',
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('static', () => {
    return gulp.src('./src/**/*.+(html|css|js)')
        .pipe(gulp.dest('./build'));
});

gulp.task('default', () => {
    runSequence('static', 'compile:client');
});