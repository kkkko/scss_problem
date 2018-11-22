var Encore = require('@symfony/webpack-encore');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

//If in subfolder
// if (Encore.isProduction()) {
//         Encore
//             .setPublicPath('/invest/public_html/assets')
//             .setManifestKeyPrefix('assets')
// }
Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/assets/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/assets')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('admin', './assets/js/admin.js')
    .addEntry('site', './assets/js/site.js')

    .addStyleEntry('site-styles', './assets/scss/site.scss')
    .addStyleEntry('admin-styles', [
        'quill/dist/quill.core.css',
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'cropperjs/dist/cropper.common.js',
        'cropperjs/dist/cropper.css',
        './assets/scss/admin.scss',
    ])

    .createSharedEntry('vendor', [
        'jquery',
        'bootstrap/dist/js/bootstrap.bundle.js',
        'fullpage.js/dist/fullpage.min.js',
        'swiper/dist/js/swiper.min.js',
        //For frontend

        // you can also extract CSS - this will create a 'vendor.css' file
        // this CSS will *not* be included in page1.css or page2.css anymore
        'bootstrap/scss/bootstrap.scss',
        '@fortawesome/fontawesome-free/css/all.css',
        'fullpage.js/dist/fullpage.min.css',
        'swiper/dist/css/swiper.min.css',
    ])

    .enableSassLoader(function (sassOptions) {
        sassOptions.resolveUrlLoader = false;
    })
    // .enableVueLoader()
    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())

    // create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
;

const config = Encore.getWebpackConfig();

if (Encore.isProduction()) {
    config.plugins = config.plugins.filter(
        plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin));
    config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
