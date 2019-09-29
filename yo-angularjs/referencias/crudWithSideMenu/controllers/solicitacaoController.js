var solicitacaoController = function (
	config, $scope, $rootScope, $http) {
	//config, $scope, $rootScope, $location, $mdDialog, $http, $routeParams, $timeout, $mdSidenav, $log, $filter) {

	//$rootScope.hideNavBar = ($location.path() === '/login' || $location.path() === '/mentor' || $location.path() === '/mentorado' ||  $location.path() === '/esqueciMinhaSenha');

	var self = this;

	self.lista = [];

	$http.get(config.apiObterMentoria + '?IdUsuario=' + $rootScope.usuario.IdUsuario).then(function(response) {
		angular.forEach(response.data, function(dat) {
			self.lista.push(new MentoriaViewModel(dat));
		});
	});
    
	self.aceitarMentoria = function(ev, item) {

		$http.post(config.apiConfirmarMentoria, item).then(
		function successCallback(response) {
			//response.data
			item.Situacao = 'I';
		}, 
		function errorCallback(response) {

			console.log('Ocorreu um erro no sistema.');
			console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
			console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.

			toastr['error'](response.data);

		});

	};

	self.recusarMentoria = function(ev, item) {

		$http.delete(config.apiCancelarMentoria + '?IdMentoria=' + item.IdMentoria).then(
		function successCallback(response) {
			//response.data
			item.Situacao = 'C';
		}, 
		function errorCallback(response) {

			console.log('Ocorreu um erro no sistema.');
			console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
			console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.

			toastr['error'](response.data);

		});

	};

}