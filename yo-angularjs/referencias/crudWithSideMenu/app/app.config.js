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
                        controller: 'principalController',
                        templateUrl: 'principal.html',
                        animation: 'first'
                    })
        			.when('/busca', {
                        controller: 'buscaController',
                        templateUrl: 'busca.html',
                        animation: 'second'
        			})
                    .when('/cadastro', {
                        controller: 'cadastramentoController',
                        templateUrl: 'cadastramento.html',
                        animation: 'second'
                    })
                    .when('/solicitacoes', {
                        controller: 'solicitacaoController',
                        templateUrl: 'solicitacoes.html',
                        animation: 'second'
                    })
                    .when('/agendamento', {
                        controller: 'agendamentoController',
                        templateUrl: 'agendamento.html',
                        animation: 'first'
                    })
                    .when('/mentoria', {
                        controller: 'mentoriaController',
                        templateUrl: 'mentoria.html',
                        animation: 'second'
                    })
                    .when('/mentoria/:id', {
                        controller: 'mentoriaController',
                        templateUrl: 'mentoria.html',
                        animation: 'second'
                    })
                    .when('/resumo', {
                        controller: 'resumoController',
                        templateUrl: 'resumo.html',
                        animation: 'second'
                    })
        			.otherwise({
                        redirectTo: '/'
                    });

    		}
  		]);

})();