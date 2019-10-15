//$rootScope.hideNavBar = ($location.path() === '/login' || $location.path() === '/mentor' || $location.path() === '/mentorado' ||  $location.path() === '/esqueciMinhaSenha');

var principalController = function (
	config, $scope, $rootScope, $location, $mdDialog, $http, $routeParams, $timeout, $mdSidenav, $log) {	

	var self = this;

	self.subhead = 'Você ainda não tem';
	self.Nome = 'Mentor';
	self.Sobrenome = '';
	self.Nivel = 0;
	self.Cidade = '__';
	self.UF = '__';
	self.Foto = 'img/sem-imagem.png';

	self.limiteCards = 50;

	self.listaDeAgendamentos = [];
	self.listaDeAvisos = [];

	self.obterAgendamentos = function() {
		// Limpar lista de agendamentos
		self.listaDeAgendamentos = [];
		// Obter agendamento por usuário, todos da mentoria ativa:
		$http.get(config.apiObterAgendamento + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
		.then(function(response) {
			//if (response.data!=null && response.data.length > 0)
			angular.forEach(response.data, function(item) {
				// Adiciona na lista o tipo da classe de agendamentos
				self.listaDeAgendamentos.push(new AgendamentoViewModel(item));
				// Verifica se ainda possui algum agendamento ativo. Somente para o mentorado
				if (item.Situacao == 'A' && $rootScope.usuario.Tipo == '1') {
					$rootScope.desabilitaAgenda = false;
					//TODO: Verificar se existe alguma mentoria agendada para menos de 15 minutos!
					console.log(moment(item.Data).format())
					console.log(moment(item.Data).diff(moment()));
					var difftime = moment(item.Data).diff(moment());
					if (difftime > 0 && difftime < 1197678)
						$rootScope.desabilitaMentoria = false;
				}
			});
		});
	};

	// Obtem Notificações e Agendamentos

	if ($rootScope.usuario.IdUsuario != null) {

		$http.get(config.apiObterSituacao + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
		.then(function(response) {
			if (response.data == 'A') {
				$rootScope.usuario.Situacao = 'A';
				//$rootScope.desabilitaBusca = false;
			}
		});

		// Obter dados de NOTIFICAÇÕES

		//TESTE: https://mentorize.com.br/app/api/notificacoes/obter.php?IdUsuario=1
		$http.get(config.apiObterNotificacao + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
		.then(function(response) {
			//if (response.data!=null && response.data.length > 0)
			angular.forEach(response.data, function(item) {
				self.listaDeAvisos.push(new NotificacaoViewModel(item));
				if (item.Feito == null || !item.Feito)
					$rootScope.desabilitaNotificacao = false;
			});
		});

		self.obterAgendamentos();

	}

	// Obtem informações somente para os mentorados

	if ($rootScope.usuario.IdUsuario != null && $rootScope.usuario.Tipo == '1') {

		// Obter dados do MENTOR associado

		$http.get(config.apiObterMentor + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
			.then(function(response) {
			if (response.data != null && response.data != '') {
				self.subhead = 'Meu mentor:';
				self.Nome = response.data.Nome;
				self.Sobrenome = response.data.Sobrenome;
				self.Nivel = response.data.Nivel;
				self.Cidade = response.data.Cidade;
				self.UF = response.data.UF;
				if (response.data.Foto != null && response.data.Foto != '')
					self.Foto = 'img/avatar/' + response.data.Foto;
				//$rootScope.desabilitaBusca = true;
			}
		});

		$http.get(config.apiHabilitaBloqueio + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
			.then(function(response) {
			if (response.data == 1)
				$rootScope.desabilitaBusca = true;
			else 
				$rootScope.desabilitaBusca = false;
		});

		// Resumos para cada reunião de mentoria

		//https://mentorize.com.br/app/api/resumos/existe.php?IdUsuario=11
		$http.get(config.apiExisteResumo + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
			.then(function(response) {
			if (response.data > 0) {
				$rootScope.desabilitaResumo = false;
			}
		});

	}

	// Ações para o MENTOR

	if ($rootScope.usuario.Tipo == '0') {

		self.subhead = '';
		$rootScope.desabilitaBusca = true;

	}

	// Objeto Notificação

	self.exibirNotificacao = function(ev, item) {
		// Se o notificação já foi executada impede a ação
		if (item.Feito || item.Feito == 1)
			return false;

		// Modal de confirmação para agendar e confirmar mentoria
		if (item.Tipo == 'A') {
			var confirmaAgendamento = $mdDialog.confirm()
	          .title(item.Descricao)
	          .textContent(item.Texto)
	          .ariaLabel('Notificações')
	          .targetEvent(ev)
	          .ok('Confirmar e marcar')
	          .cancel('Desistir do Mentor');
	          //.ok(item.LinkDescricao);

		    $mdDialog.show(confirmaAgendamento).then(
		    	function() {
		      		//$scope.status = 'You decided to ...';
		      		window.location.href = item.Link;
		    	}, 
		    	function() {
		    		//$scope.status = 'You decided to keep ...';
					$http.delete(config.apiDesistirMentoria + '?IdMentoria=' + item.IdMentoria).then(
					function successCallback(response) {
						//response.data
						toastr['info']('Cancelada com sucesso.', 'Mentoria');
					}, 
					function errorCallback(response) {

						console.log('Ocorreu um erro no sistema:');
						console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
						console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.

						toastr['error'](response.data, 'Ocorreu um erro no sistema.');

					});
		    	}
		    );
		} else if (item.Link) {
			var confirm = $mdDialog.confirm()
		          .title(item.Descricao)
		          .textContent(item.Texto)
		          .ariaLabel('Notificações')
		          .targetEvent(ev)
		          .ok(item.LinkDescricao);
		          //.cancel('Sounds like a ...');

		    $mdDialog.show(confirm).then(
		    	function() {
			      //$scope.status = 'You decided to ...';
			      window.location.href = item.Link;
			    }//, function() { //$scope.status = 'You decided to keep ...'; }
		    );
		} else {
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#menuSuperior')))
					.clickOutsideToClose(false)
					.title(item.Descricao)
					.textContent(item.Texto)
					.ariaLabel('Notificações')
					.ok('Ciente!')
					.targetEvent(ev)
			);
		}
	};

	// Objeto Agendamento

	self.cancelarAgendamento = function(ev, item) {

		$http.post(config.apiCancelarAgendamento, item)
		.then(
			function successCallback(response) {
				//if (response.data != null && response.data != '') {

				toastr['info']('Cancelado com sucesso.', 'Agendamento');

				self.obterAgendamentos();
				//}
			}, 
			function errorCallback(response) {

				console.log('Ocorreu um erro no sistema:');
				console.log(response.data); // – {string|Object} – The response body transformed with the transform functions.
				console.log(response.status + ' - ' + response.statusText);	// – {number} – HTTP status code of the response.

				toastr['error'](response.data, 'Ocorreu um erro no sistema.');

			}
		);
	};

	self.irParaMentoria = function(ev, item) {
		window.location.href = '#!/mentoria/' + item.IdMentoria;
	};

}