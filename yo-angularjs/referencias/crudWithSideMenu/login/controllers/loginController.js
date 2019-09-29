//var loginController = function ($scope, $rootScope, $window, $location, $mdDialog, $mdToast) {
var loginController = function (
	config, $scope, $http, $mdDialog) {

	localStorage.removeItem('mzUsuario');

	$scope.usuario = {
		Email: '',
		Senha: ''
	};

    $scope.showGerarNovaSenha = function(ev) {
		$mdDialog.show({
			controller: novaSenhaController,
			templateUrl: 'dialogNovaSenha',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: false
		})
		.then(function(answer) {
			// Clique no comando da janela
		}, function() {
			// Fechar janela
		});
    };

	var novaSenhaController = function ($scope, $mdDialog) {

		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		// Gerar nova senha para o usuário
		$scope.recuperarSenha = function() {

			$http.post(config.apiNovaSenha, $scope.usuario).then(
				function successCallback(response) {

				toastr['success']('Sua senha foi enviada com sucesso!');

				$mdDialog.hide('Senha alterada!');

			}, 
				function errorCallback(response) {

				console.log('Ocorreu um erro no sistema.');
				console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
				console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.
													// – {string} – HTTP status text of the response.
				//console.log(response.headers); // – {function([headerName])} – Header getter function.
				//console.log(response.config); // – {Object} – The configuration object that was used to generate the request.

				toastr['error'](response.data);

			});
			
		};
	};

	$scope.Entrar = function() {

		//$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
		//$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
		
		$http.post(config.apiValidarLogin, $scope.usuario).then(
		function successCallback(response) {

			//$scope.mzUsuario = response.data;
			localStorage.setItem('mzUsuario', JSON.stringify(response.data));

			window.location.href = config.appSite;
		}, 
		function errorCallback(response) {

			console.log('Ocorreu um erro no sistema.');
			console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
			console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.
												// – {string} – HTTP status text of the response.
			//console.log(response.headers); // – {function([headerName])} – Header getter function.
			//console.log(response.config); // – {Object} – The configuration object that was used to generate the request.

			toastr['error']('E-mail ou senha inválidos.');

		});

	};
}