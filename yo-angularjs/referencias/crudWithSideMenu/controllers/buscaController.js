var buscaController = function (
	config, $scope, $rootScope, $location, $mdDialog, $http, $routeParams, $timeout, $mdSidenav, $log, $filter) {

	//$rootScope.hideNavBar = ($location.path() === '/login' || $location.path() === '/mentor' || $location.path() === '/mentorado' ||  $location.path() === '/esqueciMinhaSenha');

	var self = this;

 	self.Nome = '';
 	self.AreaDeInteresse = '';
 	self.SubAreaDeInteresse = null;
 	self.TipoDeCliente = '';
	self.listaDeUsuarios = [];
	self.limiteCards = 50;

	$http.get(config.apiObterUsuario + '?Tipo=0').then(function(response) {
		angular.forEach(response.data, function(dat) {
			self.listaDeUsuarios.push(new UsuarioViewModel(dat, $rootScope, $filter));
		});
	});

	self.limpar = function() {
		self.Nome = '';
		self.AreaDeInteresse = '';
		self.SubAreaDeInteresse = null;
	};

	self.buscar = function() {
		// TODO: Criar API de consulta com filtros
	};

	// self.showAlert = function(ev) {
	// 	// Appending dialog to document.body to cover sidenav in docs app
	// 	// Modal dialogs should fully cover application
	// 	// to prevent interaction outside of dialog
	// 	$mdDialog.show(
	// 		$mdDialog.alert()
	// 			.parent(angular.element(document.querySelector('#menuSuperior')))
	// 			.clickOutsideToClose(false)
	// 			.title('Sua solicitação foi enviada!')
	// 			.textContent('Em breve você receberá um retorno sobre a sua solicitação de mentoria. Fique atento(a) à sua caixa de mensagens.')
	// 			.ariaLabel('Confirmação de Mentoria')
	// 			.ok('Ciente!')
	// 			.targetEvent(ev)
	// 	);
	// };

	// self.showConfirm = function(ev) {
	// 	// Appending dialog to document.body to cover sidenav in docs app
	// 	var confirm = $mdDialog.confirm()
	// 		.title('Ocultar perfil')
	// 		.textContent('Você realmente gostaria de remover este mentor de sua busca?')
	// 		.ariaLabel('Confirmação de exclusão de mentor')
	// 		.targetEvent(ev)
	// 		.ok('Confirmar!')
	// 		.cancel('Cancelar');

	// 	$mdDialog.show(confirm).then(function() {
	// 		//$scope.status = 'teste';
	// 	}, function() {
	// 		//$scope.status = 'cancelar';
	// 	});
	// };

	/*******************************************************/
	/* 
		Sidenav Toogle Animation 

	*/

	$scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
	function debounce(func, wait, context) {
		var timer;

		return function debounced() {
			var context = $scope,
			args = Array.prototype.slice.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
		return debounce(function() {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
		}, 200);
    }

    
	/*******************************************************/
    /* 
    	Resultados das buscas 

    */

	$rootScope.PerfilDoMentor = {};

	self.showPerfil = function(ev, item) {

		$rootScope.PerfilDoMentor = item;

		$mdDialog.show({
			controller:perfilDoMentorController,
			templateUrl:'dialogPerfil',
			parent:angular.element(document.body),
			targetEvent:ev,
			clickOutsideToClose:false,
			fullscreen:false
		})
		.then(function(answer) {
			// Clique no comando da janela
		}, function() {
			// Fechar janela
		});
	};

	var perfilDoMentorController = function (config, $scope, $rootScope, $mdDialog) {

		$scope.Perfil = $rootScope.PerfilDoMentor;

		$scope.solicitarMentoria = function() {

			var solicitacao = {
				IdUsuario: $rootScope.usuario.IdUsuario,
				IdUsuarioMentor: $scope.Perfil.IdUsuario
			};

			$http.post(config.apiSolicitarMentoria, solicitacao).then(
			// Se foi gravada com sucesso
			function successCallback(response) {
				// Redirecionar para a tela principal
				//setTimeout(function(){ window.location.href = config.appSite }, 5000);

				$mdDialog.show(
					$mdDialog.alert()
						//.parent(angular.element(document.querySelector('#menuSuperior')))
						.clickOutsideToClose(false)
						.title('Solicitação de Mentoria enviada!')
						.textContent('Em breve você receberá um retorno sobre a sua solicitação de mentoria. Fique atento(a) à sua caixa de mensagens.')
						.ariaLabel('Solicitação de Mentoria')
						.ok('Contiuar')
						//.targetEvent(ev)
				).then(function() { window.location.href = config.appSite });

			},	
			// Verifica se possui algum erro ao solicitar a mentoria
			function errorCallback(response) {

				console.log('Ocorreu um erro no sistema.');
				console.log(response.data);
				console.log(response.status + ' - ' + response.statusText);

				toastr['error'](response.data);

				$mdDialog.hide();

			});
			
		};

		$scope.hide = function() {
			$mdDialog.hide();
			var index = self.listaDeUsuarios.indexOf($scope.Perfil);
  			self.listaDeUsuarios.splice(index, 1); 
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}

}