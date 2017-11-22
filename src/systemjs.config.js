(function (global) {
    System.config({
        map: {
            'app': 'app',
            '@angular/animations': '@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': '@angular/animations/bundles/animations-browser.umd.js',
            '@angular/core': '@angular/core/bundles/core.umd.js',
            '@angular/common': '@angular/common/bundles/common.umd.js',
            '@angular/compiler': '@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser/animations': '@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': '@angular/http/bundles/http.umd.js',
            '@angular/router': '@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': '@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': '@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': '@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static': '@angular/upgrade/bundles/upgrade-static.umd.js',
            'rxjs': 'rxjs',
			'sweetalert2': 'sweetalert2/dist/sweetalert2.min.js'
        },
        packages: {
            app: {
                main: './dist/main.js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            '/': {
                defaultExtension: 'js',
            }
        }
    });
})(this);
