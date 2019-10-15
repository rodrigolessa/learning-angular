var agendamentoController = function (
	config, $scope, $rootScope, $location, $http, $routeParams) {

	var self = this;

	self.IdMentoria = '';
	self.IdUsuarioMentor = '';
	self.Nome = '#####';
	self.Sobrenome = '##########';
	self.Nivel = 0;
	self.Cidade = '#####';
	self.UF = '######';
	self.Foto = 'img/sem-imagem.png';
	self.Observacao = '';
	self.Periodicidade = '';
	self.PeriodicidadeDescricao = '';
	self.ListaDiasDaSemana = [];
	self.DiaDaSemanaSelecionado = '';

	$http.get(config.apiObterMentor + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
		.then(function(response) {

		if (response.data != null && response.data != '') {

			self.IdMentoria = response.data.IdMentoria;
			self.IdUsuarioMentor = response.data.IdUsuario;
			self.Nome = response.data.Nome;
			self.Sobrenome = response.data.Sobrenome;
			self.Nivel = response.data.Nivel;
			self.Cidade = response.data.Cidade;
			self.UF = response.data.UF;

			if (response.data.Foto != null && response.data.Foto != '')
				self.Foto = 'img/avatar/' + response.data.Foto;
			
			self.Periodicidade = response.data.Periodicidade;
			
			if (self.Periodicidade == 'S') {
				self.PeriodicidadeDescricao = 'Semanalmente';
			} else if (self.Periodicidade == 'Q') {
				self.PeriodicidadeDescricao = 'Quinzenalmente';
			} else if (self.Periodicidade == 'M') {
				self.PeriodicidadeDescricao = 'Mensalmente';
			}

			if (response.data.Domingo == 1) {
				self.ListaDiasDaSemana.push({ Codigo:1, Horario:response.data.HorarioDomingo, Descricao:'Domingo, ' + response.data.HorarioDomingo.toString() + 'hs' });
			}

			if (response.data.Segunda == 1) {
				self.ListaDiasDaSemana.push({ Codigo:2, Horario:response.data.HorarioSegunda, Descricao:'Segunda, ' + response.data.HorarioSegunda.toString() + 'hs' });
			}

			if (response.data.Terca == 1) {
				self.ListaDiasDaSemana.push({ Codigo:3, Horario:response.data.HorarioTerca, Descricao:'Terça, ' + response.data.HorarioTerca.toString() + 'hs' });
			}

			if (response.data.Quarta == 1) {
				self.ListaDiasDaSemana.push({ Codigo:4, Horario:response.data.HorarioQuarta, Descricao:'Quarta, ' + response.data.HorarioQuarta.toString() + 'hs' });
			}

			if (response.data.Quinta == 1) {
				self.ListaDiasDaSemana.push({ Codigo:5, Horario:response.data.HorarioQuinta, Descricao:'Quinta, ' + response.data.HorarioQuinta.toString() + 'hs' });
			}

			if (response.data.Sexta == 1) {
				self.ListaDiasDaSemana.push({ Codigo:6, Horario:response.data.HorarioSexta, Descricao:'Sexta, ' + response.data.HorarioSexta.toString() + 'hs' });
			}

			if (response.data.Sabado == 1) {
				self.ListaDiasDaSemana.push({ Codigo:7, Horario:response.data.HorarioSabado, Descricao:'Sábado, ' + response.data.HorarioSabado.toString() + 'hs' });
			}

		}
	});

	self.Agendar = function() {

		if (self.DiaDaSemanaSelecionado == null || self.DiaDaSemanaSelecionado == '')
			toastr['error']('Seleciona um dia da semana para sua mentoria.', 'Campo obrigatório.');

		$http.post(config.apiAgendarMentoria, {
				IdMentoria:self.IdMentoria,
				Observacao:self.Observacao,
				Periodicidade:self.Periodicidade,
				DiaDaSemana:self.DiaDaSemanaSelecionado.Codigo,
				Horario:self.DiaDaSemanaSelecionado.Horario
			})
		.then(
			function successCallback(response) {

				setTimeout(function(){ window.location.href = config.appSite }, 5000);

				toastr['success']('Sua mentoria foi agenda com sucesso.', 'Mentoria');
			},
			function errorCallback(response) {

				console.log('Ocorreu um erro no sistema:');
				console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
				console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.

				toastr['error'](response.data, 'Ocorreu um erro no agendamento.');

			});

	};

}