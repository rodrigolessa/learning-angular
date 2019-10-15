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

	mentorizeApp.controller('loginController', loginController);
	mentorizeApp.controller('cadastroController', cadastroController);
    mentorizeApp.controller('senhaController', senhaController);

})();