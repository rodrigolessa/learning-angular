var MentoriaViewModel = function (d) {

	var vm = this;

	vm.IdMentoria = d.IdMentoria;
	vm.Situacao = d.Situacao;

	if (d.Situacao == 'S') {
		vm.SituacaoDescricao = 'Solicitação';
	} else if (d.Situacao == 'I') {
		vm.SituacaoDescricao = 'Aceita';
	} else if (d.Situacao == 'A') {
		vm.SituacaoDescricao = 'Ativa';
	} else if (d.Situacao == 'C') {
		vm.SituacaoDescricao = 'Cancelada';
	} else if (d.Situacao == 'F') {
		vm.SituacaoDescricao = 'Finalizada';
	}

	vm.IdUsuario = d.IdUsuario;
	vm.NomeUsuario = d.NomeUsuario;
	vm.SobrenomeUsuario = d.SobrenomeUsuario;
	vm.CidadeUsuario = d.CidadeUsuario;
	vm.UFUsuario = d.UFUsuario;
	//vm.FotoUsuario = d.FotoUsuario;
	if (d.FotoUsuario != null && d.FotoUsuario != '') {
		vm.FotoUsuario = 'img/avatar/' + d.FotoUsuario;
	} else {
		vm.FotoUsuario = 'img/sem-imagem.png';
	}

	vm.IdUsuarioMentor = d.IdUsuarioMentor;
	vm.NomeMentor = d.NomeMentor;
	vm.SobrenomeMentor = d.SobrenomeMentor;
	//vm.FotoMentor = d.FotoMentor;
	if (d.FotoMentor != null && d.FotoMentor != '') {
		vm.FotoMentor = 'img/avatar/' + d.FotoMentor;
	} else {
		vm.FotoMentor = 'img/sem-imagem.png';
	}

	vm.Mentor = vm.NomeMentor + ' ' + vm.SobrenomeMentor;
	vm.Mentorado = vm.NomeUsuario + ' ' + vm.SobrenomeUsuario;

	vm.MiniCurriculo = d.MiniCurriculo;

	vm.Periodicidade = d.Periodicidade;

	if (vm.Periodicidade == 'S') {
		vm.PeriodicidadeDescricao = 'Semanalmente';
	} else if (vm.Periodicidade == 'Q') {
		vm.PeriodicidadeDescricao = 'Quinzenalmente';
	} else if (vm.Periodicidade == 'M') {
		vm.PeriodicidadeDescricao = 'Mensalmente';
	}

	vm.DiaDaSemana = d.DiaDaSemana;

	if (vm.DiaDaSemana == 1) {
		vm.DiaDaSemanaDescricao = 'Domingo';
	} else if (vm.DiaDaSemana == 2) {
		vm.DiaDaSemanaDescricao = 'Segunda';
	} else if (vm.DiaDaSemana == 3) {
		vm.DiaDaSemanaDescricao = 'Terça';
	} else if (vm.DiaDaSemana == 4) {
		vm.DiaDaSemanaDescricao = 'Quarta';
	} else if (vm.DiaDaSemana == 5) {
		vm.DiaDaSemanaDescricao = 'Quinta';
	} else if (vm.DiaDaSemana == 6) {
		vm.DiaDaSemanaDescricao = 'Sexta';
	} else if (vm.DiaDaSemana == 7) {
		vm.DiaDaSemanaDescricao = 'Sábado';
	}

	vm.Horario = d.Horario;

	vm.Disponibilidade = vm.PeriodicidadeDescricao + ', ' + vm.DiaDaSemanaDescricao + ' às ' + vm.Horario + ':00 horas';

	vm.DataDaSolicitacao = d.DataDaSolicitacao;
	vm.DataDaAlteracao = d.DataDaAlteracao;

	return vm;
}