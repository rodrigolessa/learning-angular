var resumoController = function (
	config, $scope, $rootScope, $http) 
{

	var self = this;

	self.listaDeResumos = [];

	$http.get(config.apiObterResumo + '?IdUsuario=' + $rootScope.usuario.IdUsuario)
		.then(function(response) {
			self.listaDeResumos = response.data;
			//if (response.data!=null && response.data.length > 0)
			//angular.forEach(response.data, function(item) {
				// Adiciona na lista o tipo da classe de agendamentos
				//self.listaDeAgendamentos.push(new AgendamentoViewModel(item));
			//});
	});

}