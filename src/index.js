var Base64 = require( '@lassehaslev/sass-asset-inliner' ).default;
var extend = require( 'extend' );

/*
 * Extend sass function
 * include base64 encoding of images and fonts
 */
var extendSass = function( mix ) {
    var sassFunction = mix.sass;
    mix.sass = function(src, output, pluginOptions = {}) {
        pluginOptions = {
            functions: Base64,
        }
        return sassFunction.call( this, src, output, pluginOptions );
    }
}

/*
 * Highjack mix browsersync cause
 * it seems like it will not asllow you to set server option
 * cause it adds proxy behind the scenes.
 */
var extendBrowserSync = function( mix ) {
    var browserSync = mix.browserSync;
    mix.browserSync = function( config ) {

        var options = {
            server: true,
            proxy: null,
            files: [
                'dist/*.js',
                'dist/*.css',
                'index.html',
            ]
        };

        extend( options, config )

        return browserSync.call( this, options );
    }
}

/*
 * Exports extend method
 * for extending laravel-mix
 */
module.exports = {
    extend: function( mix ) {
        extendSass.call( this, mix );
        extendBrowserSync.call( this, mix );
        return mix;
    },
}
