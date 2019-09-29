(function() {
	'use strict';

	var mentorizeApp = angular.module('mentorizeApp', 
		[
			'ngMaterial', 
			'ngAnimate',
			'ngMessages', 
			'ngRoute',
			'ngAria'
		]);

	mentorizeApp.controller('indexController', indexController);
	mentorizeApp.controller('principalController', principalController);
	mentorizeApp.controller('buscaController', buscaController);
	mentorizeApp.controller('cadastramentoController', cadastramentoController);
	mentorizeApp.controller('solicitacaoController', solicitacaoController);
	mentorizeApp.controller('agendamentoController', agendamentoController);
	mentorizeApp.controller('mentoriaController', mentoriaController);
	mentorizeApp.controller('resumoController', resumoController);

})();

//,
//			'material.svgAssetsCache'