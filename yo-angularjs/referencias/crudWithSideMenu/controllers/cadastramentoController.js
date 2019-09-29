var cadastramentoController = function (
	config, $scope, $rootScope, $location, $http, $routeParams, $filter) {
	//$rootScope.hideNavBar = ($location.path() === '/login' || $location.path() === '/mentor' || $location.path() === '/mentorado' ||  $location.path() === '/esqueciMinhaSenha');

	var self = this;

	self.usuario = {}; //new UsuarioViewModel({}, $rootScope, $filter);
	self.listaDeEstados = [];

	$http.get(config.apiObterEstados).then(function(response) {
		self.listaDeEstados = response.data;
	});

	//alert(config.apiObterUsuario + '?IdUsuario=' + $rootScope.usuario.IdUsuario);
	$http.get(config.apiObterUsuario + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
		.then(function(response) {
		self.usuario = new UsuarioViewModel(response.data, $rootScope, $filter);
	});

	//if ($rootScope.usuario.IdUsuario == null || $rootScope.usuario.IdUsuario == '')
		//$rootScope.usuario = JSON.parse(localStorage.getItem('mzUsuario'));

	self.toggle = function (item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		}
		else {
			list.push(item);
		}
	};

	self.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};

	self.Salvar = function() {

		if (this.usuario.Genero == null
			|| this.usuario.Genero == '' 
			|| this.usuario.Cidade == '' 
			|| this.usuario.UF == '' 
			|| this.usuario.Periodicidade == null
			|| this.usuario.Periodicidade == '') {

			toastr['error']('Preencha os campos obrigatórios.');

			if (this.usuario.Periodicidade == null)
				setTimeout(function(){ 
					toastr['error']('Preencha a Periodicidade para mentoria.') }, 200);

			return false;
		}

		if (this.usuario.MiniCurriculo == null 
			|| this.usuario.MiniCurriculo == '') {

			toastr['error']('Preencha uma mini apresentação.');

			return false;
		}

		if (this.usuario.Domingo == null 
			&& this.usuario.Segunda == null
			&& this.usuario.Terca == null
			&& this.usuario.Quarta == null
			&& this.usuario.Quinta == null
			&& this.usuario.Sexta == null
			&& this.usuario.Sabado == null) {
			
			setTimeout(function(){ 
				toastr['error']('Preencha a Disponibilidade para mentoria.') }, 400);

			return false;

		} else {

			if (this.usuario.Domingo == true && (
					this.usuario.HorarioDomingo == ''
				||	this.usuario.HorarioDomingo == null
				// ||	this.usuario.HorarioDomingo > 23 
				// ||	this.usuario.HorarioDomingo < 5
				)
			){
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para o Domingo.');
				return false;
			}

			if (this.usuario.Segunda == true && (
					this.usuario.HorarioSegunda == ''
				||	this.usuario.HorarioSegunda == null
				//||	this.usuario.HorarioSegunda > 23 
				//||	this.usuario.HorarioSegunda < 5
				)
			){
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para a Segunda.');
				return false;
			}

			if (this.usuario.Terca == true && (
					this.usuario.HorarioTerca == ''
				||	this.usuario.HorarioTerca == null
				//||	this.usuario.HorarioTerca > 23 
				//||	this.usuario.HorarioTerca < 5
				)
			){
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para a Terça.');
				return false;
			}

			if (this.usuario.Quarta == true && (
					this.usuario.HorarioQuarta == ''
				||	this.usuario.HorarioQuarta == null
				//||	this.usuario.HorarioQuarta > 23 
				//||	this.usuario.HorarioQuarta < 5
				)
			){
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para a Quarta.');
				return false;
			}

			if (this.usuario.Quinta == true && (
					this.usuario.HorarioQuinta == ''
				||	this.usuario.HorarioQuinta == null
				//||	this.usuario.HorarioQuinta > 23 
				//||	this.usuario.HorarioQuinta < 5
				)
			){
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para a Quinta.');
				return false;
			}

			if (this.usuario.Sexta == true && (
					this.usuario.HorarioSexta == ''
				||	this.usuario.HorarioSexta == null
				//||	this.usuario.HorarioSexta > 23 
				//||	this.usuario.HorarioSexta < 5
				)
			){
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para a Sexta.');
				return false;
			}

			if (this.usuario.Sabado == true && (
					this.usuario.HorarioSabado == ''
				||	this.usuario.HorarioSabado == null
				//||	this.usuario.HorarioSabado > 23 
				//||	this.usuario.HorarioSabado < 5
				)
			) {
				toastr['error']('Preencha corretamente um horário (entre 6 e 23 horas) para o Sábado.');
				return false;
			}
				
		}

		// Limitar o cadastro de áreas de interesse em no mínimo 1 e no máximo 5
		if (this.usuario.SubareaSelecionadas == null 
			|| this.usuario.SubareaSelecionadas.length == 0 
			|| this.usuario.SubareaSelecionadas.length > 5) {
			toastr['error']('Para Área de interesse é preciso selecionar no mínimo um registro e no máximo cinco.');
			return false;
		}

		// Gravar as subareas selecionadas no campo AreaDeInteresseOutros
		var subItens = '';
		angular.forEach(this.usuario.SubareaSelecionadas, function(item) {
			subItens += item.Codigo + ',';
		});

		this.usuario.AreaDeInteresseOutros = '';
		this.usuario.AreaDeInteresseOutros = subItens;

		$http.post(config.apiEditarUsuario, self.usuario).then(
			function successCallback(response) {

			setTimeout(function(){ window.location.href = config.appSite }, 5000);

			toastr['success']('Cadastro efetuado com sucesso!');

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