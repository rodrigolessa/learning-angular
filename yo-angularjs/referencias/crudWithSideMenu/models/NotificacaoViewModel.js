var NotificacaoViewModel = function (d) {

	var vm = this;

	vm.IdUsuario = d.IdUsuario;
	vm.IdMentoria = d.IdMentoria;
	vm.Descricao = d.Descricao;
	vm.Texto = d.Texto;
	vm.Tipo = d.Tipo;
    if (d.Tipo == 'C') {
    	// Complete seu cadastro
    	//vm.Link = '#!/cadastro/' + d.IdUsuario;
    	vm.Link = '#!/cadastro';
    	vm.LinkDescricao = 'concluir cadastro';
	} else if (d.Tipo == 'M') {
		// Solicitação de Mentoria
    	vm.Link = '#!/solicitacoes';
    	vm.LinkDescricao = 'solicitações';
	} else if (d.Tipo == 'A') {
		// Solicitação de Agendamento
    	vm.Link = '#!/agendamento';
    	vm.LinkDescricao = 'Confirmar e marcar';
    }

	vm.Feito = d.Feito;
	vm.Opcoes = {
		'Offset': false,
		'Icone': '',
		'IconeAvatar': true
	};

	return vm;
}