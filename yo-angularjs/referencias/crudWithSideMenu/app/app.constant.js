(function() {
	'use strict';

	//var apiUrlBase = 'http://localhost:8080/mentorize/api/';
	var apiUrlBase = 'https://mentorize.com.br/app/api/';

	angular.module('mentorizeApp')
	.constant('config', 
	{
		appName: 'Mentorize',
		appVersion: 1.0,
		appSite: '/app/', ///app//mentorize/'

		// Domínios
		//apiObterAreaDeAtuacao: apiUrlBase + 'areaDeAtuacao.json',
		apiObterAreaDeInteresse: apiUrlBase + 'areaDeInteresse.json',
		//apiObterDisponibilidadeParaFazerMentoria: apiUrlBase + 'disponibilidadeParaFazerMentoria.json',
		apiObterEstados: apiUrlBase + 'estados.json',
		//apiObterObjetivoDaMentoria: 'objetivoDaMentoria.json',
		apiObterPeriodicidadeDaMentoria: 	apiUrlBase + 'periodicidadeDaMentoria.json',
		apiObterSituacaoDaMentoria: 		apiUrlBase + 'situacaoDaMentoria.json',
		//apiObterTempoDeFormacao: apiUrlBase + 'tempoDeFormacao.json',
		//apiObterTempoParaMentoria: apiUrlBase + 'tempoParaMentoria.json',

		// Usuário
		apiValidarLogin:    	apiUrlBase + 'usuarios/validarLogin.php',
		apiObterUsuario:    	apiUrlBase + 'usuarios/obter.php',
		apiObterMentor:     	apiUrlBase + 'usuarios/obterMentor.php',
		apiObterSituacao:   	apiUrlBase + 'usuarios/obterSituacao.php',
		apiObterFoto:   		apiUrlBase + 'usuarios/obterFoto.php',
		apiHabilitaBloqueio:   	apiUrlBase + 'usuarios/HabilitaBloqueio.php',
		apiGravarUsuario:   	apiUrlBase + 'usuarios/gravar.php',
		apiEditarUsuario:   	apiUrlBase + 'usuarios/editar.php',
		apiExcluirUsuario:  	apiUrlBase + 'usuarios/excluir.php',
		apiEditarNivel:     	apiUrlBase + 'usuarios/editarNivel.php',
		apiEditarSenha:     	apiUrlBase + 'usuarios/editarSenha.php',
		apiNovaSenha:     		apiUrlBase + 'usuarios/novaSenha.php',
		apiGraficoAreas:    	apiUrlBase + 'usuarios/graficoAreas.php',
		apiGraficoTotal:    	apiUrlBase + 'usuarios/graficoTotalUsuarios.php',
		apiGraficoTipos:    	apiUrlBase + 'usuarios/graficoTipoUsuarios.php',
		apiGraficoSituacao: 	apiUrlBase + 'usuarios/graficoSituacao.php',

		// Mentoria
		apiObterMentoria: 		apiUrlBase + 'mentorias/obter.php',
		apiSolicitarMentoria: 	apiUrlBase + 'mentorias/solicitar.php',
		apiConfirmarMentoria: 	apiUrlBase + 'mentorias/confirmar.php',
		apiCancelarMentoria: 	apiUrlBase + 'mentorias/cancelar.php',
		apiDesistirMentoria: 	apiUrlBase + 'mentorias/desistir.php',
		apiAgendarMentoria: 	apiUrlBase + 'mentorias/agendar.php',
		apiGraficoTotalAtivas: 	apiUrlBase + 'mentorias/graficoTotalMentorias.php',

		// Resumo
		apiGravarResumo: 		apiUrlBase + 'resumos/gravar.php',
		apiObterResumo: 		apiUrlBase + 'resumos/obter.php',
		apiExisteResumo: 		apiUrlBase + 'resumos/existe.php',

		// Agenda
		apiAgendamento: 		apiUrlBase + 'agendas/agendar.php',
		apiObterAgendamento: 	apiUrlBase + 'agendas/obter.php',
		apiCancelarAgendamento: apiUrlBase + 'agendas/cancelar.php',

		// Notificação
		apiObterNotificacao: 	apiUrlBase + 'notificacoes/obter.php'
	}
	);

})();