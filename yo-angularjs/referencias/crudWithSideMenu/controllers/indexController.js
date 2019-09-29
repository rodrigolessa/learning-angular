var indexController = function (
	config, $scope, $rootScope, $location, $http, $mdDialog, $mdTheming, $filter) {
	//$rootScope.hideNavBar = ($location.path() === '/login' || $location.path() === '/mentor' || $location.path() === '/mentorado' ||  $location.path() === '/esqueciMinhaSenha');

	$rootScope.desabilitaNotificacao = true;
	$rootScope.desabilitaAgenda = true;
	$rootScope.desabilitaMentoria = true;
	$rootScope.desabilitaResumo = true;
	$rootScope.desabilitaBusca = true;
	$rootScope.hideSolicitacoes = true;

	//$rootScope.usuario = new UsuarioViewModel({}, $rootScope, $filter);
	$rootScope.usuario = {};

	$scope.customFullscreen = false;

	//////////////////////////////////////////////////////////////////////
	// Controla animação na transição das páginas
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		$rootScope.animation = currRoute.animation;
	});

	//////////////////////////////////////////////////////////////////////
	// BROWSER - Manipuação de cores
	var removeFunction = $mdTheming.setBrowserColor({
		theme: 'default', // Default is 'default'
		palette: 'primary', // Default is 'primary', any basic material palette and extended palettes are available
		hue: '200' // Default is '800'
    });

	$scope.$on('$destroy', function () {
		removeFunction(); // COMPLETELY removes the browser color
	});

	$rootScope.listaDePeriodicidades = [];
	$rootScope.listaSituacaoDaMentoria = [];
	$rootScope.listaAreasDeInteresse = [];

	//$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	//$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

	$http.get(config.apiObterAreaDeInteresse).then(function(response) {
		$rootScope.listaAreasDeInteresse = response.data;
	});

	$http.get(config.apiObterSituacaoDaMentoria).then(function(response) {
		$rootScope.listaSituacaoDaMentoria = response.data;
	});

	//////////////////////////////////////////////////////////////////////
	// Obter dados do usuário de localstorage
	if (localStorage.getItem('mzUsuario') == null)
		window.location.href = config.appSite + 'login';

	$rootScope.usuario = JSON.parse(localStorage.getItem('mzUsuario'));

	if ($rootScope.usuario.ChaveDeAcesso == null)
		window.location.href = config.appSite + 'login';

	if ($rootScope.usuario.Tipo == 0)
		$rootScope.hideSolicitacoes = false;

	//////////////////////////////////////////////////////////////////////
	// Menu de ações do usuário

    var originatorEv;

	$http.get(config.apiObterFoto + '?IdUsuario=' + $rootScope.usuario.IdUsuario).then(function(response) {
		if (response.data != null && response.data != '')
			$rootScope.usuario.Foto = 'img/avatar/' + response.data;
	});

	this.openMenu = function($mdMenu, ev) {
		originatorEv = ev;
		$mdMenu.open(ev);
    };

	//this.notificationsEnabled = false;
	//this.toggleNotifications = function() {
		//this.notificationsEnabled = !this.notificationsEnabled;
		//$rootScope.desabilitaNotificacao = !this.notificationsEnabled;
    //};

    this.showEditarFoto = function() {
		window.open("avatar.php?IdUsuario=" + $rootScope.usuario.IdUsuario, "uploadAvatar", "menubar=no,titlebar=no,toolbar=no,scrollbars=no,location=no,resizable=no,status=no,width=400,height=300");
    };

    this.showAlteracaoDeSenha = function(ev) {
		$mdDialog.show({
			controller: alterarSenhaController,
			templateUrl: 'dialogAlterarSenha',
			parent: angular.element(document.body),
			targetEvent: originatorEv,
			clickOutsideToClose:true,
			fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
			// Clique no comando da janela
		}, function() {
			// Fechar janela
		});

		originatorEv = null;
    };

	var alterarSenhaController = function (
		config, $scope, $rootScope, $http, $mdDialog) {

		$scope.senhasDoUsuario = {
			Senha: '',
			SenhaAtual: '',
			SenhaConfirmar: ''
		};

		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		// Alterar senha do usuário
		$scope.alterar = function() {

			$rootScope.usuario.Senha = $scope.senhasDoUsuario.Senha;
			$rootScope.usuario.SenhaAtual = $scope.senhasDoUsuario.SenhaAtual;
			$rootScope.usuario.SenhaConfirmar = $scope.senhasDoUsuario.SenhaConfirmar;

			$http.post(config.apiEditarSenha, $rootScope.usuario).then(
				function successCallback(response) {

				toastr['success']('Senha alterada com sucesso!');

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
	}

	this.sair = function() {
		// Zerar sessões/localstorage com dados do usuário
		localStorage.removeItem('mzUsuario');
		// TODO: Remover endereço Application para produção
		window.location.href = config.appSite + 'login';
    };

}
