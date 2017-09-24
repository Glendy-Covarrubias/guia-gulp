/**
 * [Dependencias de gulp]
 * @type {[type]}
 */
const 
	gulp 		    = require('gulp'),
	concat    	    = require('gulp-concat'),
    minifyJS        = require('gulp-uglify'),
    minifySASS      = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    plumber         = require('gulp-plumber'),
	notify    	    = require('gulp-notify')
;

/**
 * [Tarea que se encarga de minificar los archivos js del proyecto]
 *
 * @author   Glendy Covarrubias <glendycovarrubias@hotmail.com>
 * date 2017-09-13
 * @version [1.0]
 * @param   {[type]} ){	gulp.src('web/public/src/js*.js')	.pipe(concat('main.min.js'))               	.pipe(minifyJS())  	.on("error", errorAlertJS)  	.pipe(plumber())  	.pipe(gulp.dest('web/public/js'))} [description]
 * @return  {[type]}                                                                    [description]
 */
gulp.task('minify-js', function(){
	gulp.src('web/public/src/js/**/*.js')
	.pipe(concat('main.min.js'))
  	.pipe(minifyJS())
  	.on("error", errorAlertJS)
  	.pipe(plumber())
  	.pipe(gulp.dest('web/public/js'))
  	.pipe(notify({
  		message: 'JavaScript Complete'
  	}));
});

/**
 * [Esta tarea se encarga de minificar los estilos scss del proyecto]
 *
 * @author   Glendy Covarrubias <glendycovarrubias@hotmail.com>
 * date 2017-09-24
 * @version [1.0]
 * @param   {[type]} ){                 gulp.src('web/public/src/scss*.scss')    .pipe(concat('main.min.css'))    .pipe(minifySASS({        outputStyle: 'compressed'    }))    .on("error", errorAlertSass)    .pipe(plumber())    .pipe(autoprefixer({        version: ['last 2 browsers']    }))    .pipe(gulp.dest('web/public/css'))    .pipe(notify({        message: 'Sass Complete'    }));} [description]
 * @return  {[type]}     [description]
 */
gulp.task('minify-sass', function(){
    gulp.src('web/public/src/scss/**/*.scss')
    .pipe(concat('main.min.css'))
    .pipe(minifySASS({
        outputStyle: 'compressed'
    }))
    .on("error", errorAlertSass)
    .pipe(plumber())
    .pipe(autoprefixer({
        version: ['last 2 browsers']
    }))
    .pipe(gulp.dest('web/public/css'))
    .pipe(notify({
        message: 'Sass Complete'
    }));
});

/**
 * [Funcion que evita que el gulp watch sea detenido por algun error de copilacion(sintaxis etc..)
 * y te señale el error y donde se encuentra  ALERT PARA EL JS]
 *
 * @author   Glendy Covarrubias <glendycovarrubias@hotmail.com>
 * date 2017-09-13
 * @version [1.0]
 * @param   {[type]} error [description]
 * @return  {[type]}       [description]
 */
function errorAlertJS(error){
	//Aqui configuramos el titulo y subtitulo del mensaje de error,
    notify.onError({
        title    : "Gulp JavaScript",
        subtitle : "Algo esta mal en tu javascript",
        sound    : "Basso"
    })(error);

    //También podemos pintar el error en el terminal
    console.log(error.toString());
    this.emit("end");
}

/**
 * [Funcion que evita que el gulp watch sea detenido por algun error de copilacion(sintaxis etc..)]
 * y te señala el error y donde se encuentra ALERT PARA EL CSS
 *
 * @author   Glendy Covarrubias <glendycovarrubias@hotmail.com>
 * date 2017-09-24
 * @version [1.0]
 * @param   {[type]} error [description]
 * @return  {[type]}       [description]
 */
function errorAlertSass(error){
    //Aqui configuramos el titulo y subtitulo del mensaje de error,
    notify.onError({
        title    : "Gulp Sass",
        subtitle : "Algo esta mal en tu Sass",
        sound    : "Basso"
    })(error);

    //También podemos pintar el error en el terminal
    console.log(error.toString());
    this.emit("end");
}

/**
 * [Tarea que se encarga de copilar las tareas (css,js,imagenes,scss(sass), etc.) (Observar'Monitoriar' cambios)]
 *
 * @author   Glendy Covarrubias <glendycovarrubias@hotmail.com>
 * date 2017-09-13
 * @version [1.0]
 * @param   {[type]} ){	gulp.watch('web/public/src/js*.js', ['minify-js']);} [description]
 * @return  {[type]}                                         [description]
 */
gulp.task('watch', function(){
	gulp.watch('web/public/src/js/**/*.js', ['minify-js']);
    gulp.watch('web/public/src/scss/**/*.scss', ['minify-sass']);
});

/**
 * Tarea que se encarga de Contruir toda la copilacion en general (Construir gulp)
 * Construir gulp: Termino que le doy para entender que va tomar todos los archivos
 * configurados a las tareas y va volver a generar el o los archivos finales
 */
gulp.task('default',['minify-js','minify-sass']);