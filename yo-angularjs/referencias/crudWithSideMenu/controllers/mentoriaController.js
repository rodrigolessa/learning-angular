// Controle de video conferência
var mentoriaController = function (
	config, $scope, $rootScope, $http, $sce, $routeParams) {

	$scope.sala = '';

	var self = this;

	self.IdMentoria = '';
	self.IdUsuarioMentor = '';
	self.Sala = 'JitsiMeetAPIExample';
	//self.UrlSala = '';
	self.Nome = '#####';
	self.Sobrenome = '##########';
	self.Nivel = 0;
	self.Foto = 'img/sem-imagem.png';
	self.Anotacao = '';

	self.IdMentoria = $routeParams.id;

	if (self.IdMentoria != null && self.IdMentoria != ''){

		$http.get(config.apiObterMentoria + '?IdMentoria=' + self.IdMentoria)
			.then(function(response) {

			self.IdMentoria = response.data[0].IdMentoria;
			self.IdUsuarioMentor = response.data[0].IdUsuarioMentor;
			self.Nome = response.data[0].NomeMentor;
			self.Sobrenome = response.data[0].SobrenomeMentor;
			//self.Nivel = response.data[0].Nivel;
			//self.Sala = response.data.SalaHash;
			//alert(response.data[0].SalaHash);

			if (response.data[0].FotoMentor != null && response.data[0].FotoMentor != '')
				self.Foto = 'img/avatar/' + response.data[0].FotoMentor;
			
			//$scope.sala = $sce.trustAsResourceUrl('https://appear.in/mentorize' + response.data[0].SalaHash);
			self.Sala = 'mentorize' + response.data[0].SalaHash;

		});

	} else {

		$http.get(config.apiObterMentor + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
			.then(function(response) {

			self.IdMentoria = response.data.IdMentoria;
			self.IdUsuarioMentor = response.data.IdUsuario;
			self.Nome = response.data.Nome;
			self.Sobrenome = response.data.Sobrenome;
			self.Nivel = response.data.Nivel;
			//self.Sala = response.data.SalaHash;

			if (response.data.Foto != null && response.data.Foto != '')
				self.Foto = 'img/avatar/' + response.data.Foto;
			
			//$scope.sala = $sce.trustAsResourceUrl('https://appear.in/mentorize' + response.data.SalaHash);
			self.Sala = 'mentorize' + response.data.SalaHash;

		});

	}

	setTimeout(
		function()
		{ 
	    	document.getElementById('meet').innerHTML = "";

			var domain = "meet.jit.si";
			var room = self.Sala;
			var width = 950;
			var height = 500;
			var htmlElement = document.querySelector('#meet');
			var api = new JitsiMeetExternalAPI(domain, room, width, height, htmlElement);

			api.executeCommand('toggleFilmStrip');

		}, 2000);

	/*
        var domain = "meet.jit.si";
        var room = "mentorize" + self.Sala;
        var width = 700;
        var height = 500;
        var htmlElement = document.querySelector('#meet');
        var configOverwrite = {};
        var interfaceConfigOverwrite = {
            filmStripOnly: true,
            SHADOW_COLOR: '#ffffff',
            DEFAULT_BACKGROUND: '#474747',
        };

        var api = new JitsiMeetExternalAPI(domain, room, width, height,
            htmlElement, configOverwrite, interfaceConfigOverwrite);
	*/

	self.salvarAnotacoes = function() {

		//if (self.DiaDaSemanaSelecionado == null || self.DiaDaSemanaSelecionado == '')
			//toastr['error']('Seleciona um dia da semana para sua mentoria.', 'Campo obrigatório.');

		$http.post(config.apiGravarResumo, {
				IdMentoria:self.IdMentoria,
				Anotacao:self.Anotacao
			})
		.then(
			function successCallback(response) {

				toastr['success']('Salvo com sucesso.', 'Anotação');
			},
			function errorCallback(response) {

				console.log('Ocorreu um erro no sistema:');
				console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
				console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.

				toastr['error']('Digite sua anotação para salvar.', 'Campo obrigatório.');

			});
	};

	self.finalizarSessao = function() {

		setTimeout(function(){ window.location.href = config.appSite }, 5000);

	};

}