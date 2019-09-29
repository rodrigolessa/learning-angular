var AgendamentoViewModel = function (d) {

	var vm = this;
	var descricao = 'Solicitação aguardando aprovação';
	var icone = '';
	var desabilita = false;
	var habilitaSala = false;

	if (d.Situacao == 'A') {
		descricao = 'Agendada';
		icone = '_available';
	} else if (d.Situacao == 'X') {
		descricao = 'Recusada';
		icone = '_busy';
		desabilita = true;
	} else if (d.Situacao == 'R') {
		descricao = 'Realizada';
		icone = '_note';
		desabilita = true;
	} else {
		// C - Cancelada
		descricao = 'Cancelada';
		icone = '_busy';
		desabilita = true;
	}

	var dtdiff = moment(d.Data).diff(moment());
	if (dtdiff < 1197678)
		desabilita = true;

	if (dtdiff > -887678 && dtdiff < 1197678)
		habilitaSala = true;

	//moment.locale('pt-BR');
	//moment().format('MMMM Do YYYY, h:mm:ss a'); // Maio 3º 2017, 2:52:10 pm
	//moment().endOf('day').fromNow();          // em 9 horas
	//moment().calendar();                      // Hoje às 14:54
	//moment().format('L');    // 03/05/2017
	vm.IdMentoria = d.IdMentoria;
	vm.Data = d.Data;
	vm.Descricao = d.Descricao + ', ' + moment(d.Data).calendar();
	vm.Situacao = d.Situacao;
	vm.SituacaoDescricao = descricao;
	vm.DesabilitaCancelamento = desabilita;
	vm.HabilitaSala = habilitaSala;
	vm.Opcoes = {
		'Offset': false,
		'Icone': icone,
		'IconeAvatar': true
	};

	return vm;
}


