var UsuarioViewModel = function (d, $rootScope, $filter) {

	var m2 = this;

	m2.IdUsuario = d.IdUsuario;
	m2.Nome = d.Nome;
	m2.Sobrenome = d.Sobrenome;
	m2.NomeCompleto = d.Nome + ' ' + d.Sobrenome;
	m2.Genero = d.Genero;

	m2.Endereco = d.Endereco; //VARCHAR(255) NULL
	m2.Cidade = d.Cidade; //VARCHAR(45) NULL
	m2.CEP = d.CEP; //VARCHAR(45) NULL
	m2.UF = d.UF;
	m2.Telefone = d.Telefone; // VARCHAR(15) NULL
	m2.Celular = d.Celular;
	m2.Email = d.Email; // VARCHAR(100) NULL

	m2.AreaDeInteresse = d.AreaDeInteresse;
	m2.AreaDeInteresseSelecionado = $filter('filter')(
		$rootScope.listaAreasDeInteresse, function (a) {
			return a.Codigo == m2.AreaDeInteresse;
		})[0];

	//if (m2.AreaDeInteresse == 'J')
		//m2.AreaDeInteresseDescricao = 'Jornalismo';
	//else if (m2.AreaDeInteresse == 'P')
		//m2.AreaDeInteresseDescricao = 'Publicidade e Propaganda';
	//else if (m2.AreaDeInteresse == 'M')
		//m2.AreaDeInteresseDescricao = 'Marketing';

	m2.AreaDeInteresseOutros = '';
	m2.SubareaSelecionadas = [];
	
	if (d.AreaDeInteresseOutros != null && d.AreaDeInteresseOutros != undefined) {
		
		m2.AreaDeInteresseOutros = d.AreaDeInteresseOutros;

		var arrSubareas = m2.AreaDeInteresseOutros.split(',');

		angular.forEach(m2.AreaDeInteresseSelecionado.Subarea, function(item) {
			if (arrSubareas.indexOf(item.Codigo.toString()) !== -1)
				m2.SubareaSelecionadas.push(item);
		});
	}

	m2.MiniApresentacao = d.MiniApresentacao;
	m2.MiniCurriculo = d.MiniCurriculo;

	m2.Tipo = d.Tipo;
	if (m2.Tipo == 0)
		m2.TipoDescricao = 'Mentor';
	else
		m2.TipoDescricao = 'Mentorado';
	m2.Nivel = d.Nivel;
	
	if (d.Foto != null && d.Foto != '') {
		m2.Foto = 'img/avatar/' + d.Foto;
	} else {
		m2.Foto = 'img/sem-imagem.png';
	}

	m2.Situacao = d.Situacao;
	if (m2.Situacao == 'P')
		m2.SituacaoDescricao = 'Pendente';
	else if (m2.Situacao == 'A')
		m2.SituacaoDescricao = 'Ativo';
	else if (m2.Situacao == 'C')
		m2.SituacaoDescricao = 'Cadastro Pendente';
	else if (m2.Situacao == 'X')
		m2.SituacaoDescricao = 'Administrador';
	else
		m2.SituacaoDescricao = 'Bloqueado';
	m2.DataDeCadastro = d.DataDeCadastro;

	m2.Senha = '';
	m2.SenhaAtual = '';
	m2.SenhaConfirmar = '';

	m2.ChaveDeAcesso = '';

	// Disponibilidade

	// Periodicidade escolhida -- S - semanalmente -- Q - quinzenalmente -- M - mensalmente
	m2.Periodicidade = d.Periodicidade;

	// Dias selecionados
	m2.Domingo 	= (d.Domingo == 1); //` BIT NULL
	m2.Segunda 	= (d.Segunda == 1); //` BIT NULL
	m2.Terca 	= (d.Terca == 1); ///` BIT NULL
	m2.Quarta 	= (d.Quarta == 1); //` BIT NULL
	m2.Quinta 	= (d.Quinta == 1); //` BIT NULL
	m2.Sexta 	= (d.Sexta == 1); //` BIT NULL
	m2.Sabado 	= (d.Sabado == 1); //` BIT NULL

	// Horário escolhido para cada dia -- De 6 até 23 horas
	if (d.HorarioDomingo != null)
		m2.HorarioDomingo = new Date('1970-01-01T' + d.HorarioDomingo + 'Z'); //d.HorarioDomingo; //` TIME NULL
	else
		m2.HorarioDomingo = null;

	if (d.HorarioSegunda != null)
		m2.HorarioSegunda = new Date('1970-01-01T' + d.HorarioSegunda + 'Z'); //` TIME NULL
	else
		m2.HorarioSegunda = null;
	
	if (d.HorarioTerca != null)
		m2.HorarioTerca = new Date('1970-01-01T' + d.HorarioTerca + 'Z'); //` TIME NULL
	else
		m2.HorarioTerca = null;

	if (d.HorarioQuarta != null)
		m2.HorarioQuarta = new Date('1970-01-01T' + d.HorarioQuarta + 'Z'); //` TIME NULL
	else
		m2.HorarioQuarta = null;

	if (d.HorarioQuinta != null)
		m2.HorarioQuinta = new Date('1970-01-01T' + d.HorarioQuinta + 'Z'); //` TIME NULL
	else
		m2.HorarioQuinta = null;

	if (d.HorarioSexta != null)
		m2.HorarioSexta = new Date('1970-01-01T' + d.HorarioSexta + 'Z'); //` TIME NULL
	else
		m2.HorarioSexta = null;

	if (d.HorarioSabado != null)
		m2.HorarioSabado = new Date('1970-01-01T' + d.HorarioSabado + 'Z'); //` TIME NULL
	else
		m2.HorarioSabado = null;

	return m2;
}