(function() {
	'use strict';

    // Definindo Cores para o tema padrão do AngularJS Material

    angular.module('mentorizeApp')
        .config(function($mdThemingProvider) {

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('amber')
                .warnPalette('red');

            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
              .primaryPalette('light-blue')
              .accentPalette('amber')
              .dark();

            // Enable browser color
            $mdThemingProvider.enableBrowserColor({
                theme: 'default', // Default is 'default'
                palette: 'primary', // Default is 'primary', any basic material palette and extended palettes are available
                hue: '200' // Default is '800'
            });

        });

})();