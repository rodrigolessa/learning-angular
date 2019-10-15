var cadastroController = function (
	config, $scope, $rootScope, $location, $http, $routeParams) {

	var self = this;

	//self.titulo = "Cadastro de Mentorado"
	self.titulo = "Cadastre-se";
	self.usuario = {
		Nome: '',
		Sobrenome: '',
		Email: '',
		Senha: '',
		ConfirmacaoDeSenha: '',
		tds: true,
		AreaDeInteresse: '',
		Tipo: null
	};
	//tds: '',

	if ($location.path() === '/mentor') {
		self.usuario.Tipo = 0;
		//self.titulo = "Cadastro de Mentor";
	}

	if ($location.path() === '/mentorado') {
		self.usuario.Tipo = 1;
		//self.titulo = "Cadastro de Mentor";
	}

	self.listaDeAreaDeInteresse = [];

	//$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	//$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
	//$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Length, X-Requested-With';

	$http.get(config.apiObterAreaDeInteresse).then(function(response) {
		self.listaDeAreaDeInteresse = response.data;
	});

	self.Salvar = function() {

		if (self.usuario.Nome == null
			|| self.usuario.Sobrenome == null
			|| self.usuario.Email == null
			|| self.usuario.Senha == null
			|| self.usuario.ConfirmacaoDeSenha == null 
			|| self.usuario.AreaDeInteresse == null
			|| self.usuario.AreaDeInteresse == ''
			|| self.usuario.Tipo == null) {
			// 500 Internal Server Error
			toastr['error']('Preencha todos os campos obrigatórios.');
			return false;
		}

		if (self.usuario.tds == '' || self.usuario.tds == null) {
			toastr['error']('Você deve aceitar os termos de serviço antes de prosseguir.');
			return false;
		}

		$http.post(config.apiGravarUsuario, self.usuario).then(
			function successCallback(response) {

			setTimeout(function(){ window.location.href = config.appSite + 'login/' }, 5000);

			toastr['success']('Cadastro efetuado com sucesso! Você será redirecionado para a tela de login.');

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

	}

}