(function() {
	'use strict';

	angular.module('mentorizeApp')
        .config(
		[
			'$locationProvider', 
			'$routeProvider',
            '$httpProvider',
			function config($locationProvider, $routeProvider, $httpProvider) {

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
				
				$locationProvider.hashPrefix('!');

				$routeProvider
                    .when('/', {
                        controller: 'loginController',
                        templateUrl: 'login.html'
                    })
                    .when('/cadastro', {
                        controller: 'cadastroController',
                        templateUrl: 'cadastro.html'
                    })
                    .when('/mentor', {
                        controller: 'cadastroController',
                        templateUrl: 'cadastro.html'
                    })
                    .when('/mentorado', {
                        controller: 'cadastroController',
                        templateUrl: 'cadastro.html'
                    })
                    .when('/esqueciMinhaSenha', {
                        controller: 'senhaController',
                        templateUrl: 'senha.html'
                    })
        			.otherwise({
                        redirectTo: '/'
                    });

    		}
  		]);

})();