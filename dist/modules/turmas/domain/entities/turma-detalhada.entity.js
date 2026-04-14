"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaDetalhada = exports.InfoPlanoCurso = exports.RecursoFinanceiroDetalhado = exports.OfertaDetalhada = exports.FormaDePagamentoDetalhada = void 0;
class FormaDePagamentoDetalhada {
    meioDePagamentoDescricao;
    numeroDeParcelas;
    valorDaParcela;
    totalPagamento;
    disponivelParaWeb;
    constructor(meioDePagamentoDescricao, numeroDeParcelas, valorDaParcela, totalPagamento, disponivelParaWeb) {
        this.meioDePagamentoDescricao = meioDePagamentoDescricao;
        this.numeroDeParcelas = numeroDeParcelas;
        this.valorDaParcela = valorDaParcela;
        this.totalPagamento = totalPagamento;
        this.disponivelParaWeb = disponivelParaWeb;
    }
}
exports.FormaDePagamentoDetalhada = FormaDePagamentoDetalhada;
class OfertaDetalhada {
    nome;
    cargaHorariaTotalDaOferta;
    formasDePagamento;
    constructor(nome, cargaHorariaTotalDaOferta, formasDePagamento
    // Ignorando array puramente de letreiros de 'UnidadesCurriculares' pois não tem tanta utilidade no funil imediato comercial, mas pode ser adicionado
    ) {
        this.nome = nome;
        this.cargaHorariaTotalDaOferta = cargaHorariaTotalDaOferta;
        this.formasDePagamento = formasDePagamento;
    }
}
exports.OfertaDetalhada = OfertaDetalhada;
class RecursoFinanceiroDetalhado {
    recursoFinanceiroId;
    nome;
    tipoDeRecurso;
    tipoDeRecursoNome;
    vagasDisponiveis;
    linkMatriculaOnlineDoRecursoFinanceiroNovo;
    constructor(recursoFinanceiroId, nome, tipoDeRecurso, tipoDeRecursoNome, // Importante pra validar "Comercial, PSG, DR"
    vagasDisponiveis, linkMatriculaOnlineDoRecursoFinanceiroNovo) {
        this.recursoFinanceiroId = recursoFinanceiroId;
        this.nome = nome;
        this.tipoDeRecurso = tipoDeRecurso;
        this.tipoDeRecursoNome = tipoDeRecursoNome;
        this.vagasDisponiveis = vagasDisponiveis;
        this.linkMatriculaOnlineDoRecursoFinanceiroNovo = linkMatriculaOnlineDoRecursoFinanceiroNovo;
    }
}
exports.RecursoFinanceiroDetalhado = RecursoFinanceiroDetalhado;
class InfoPlanoCurso {
    nome;
    eixoTecnologico;
    segmento;
    justificativa;
    objetivos;
    perfilDoPessoalDocenteETecnico;
    perfilProfissional;
    orientacoesMetodologicas;
    avaliacao;
    requisitos;
    constructor(nome, eixoTecnologico, segmento, justificativa, // HTML raw do SIG
    objetivos, // HTML raw do SIG
    perfilDoPessoalDocenteETecnico, // HTML
    perfilProfissional, // Raw text
    orientacoesMetodologicas, // HTML
    avaliacao, // HTML
    requisitos // array de requisitos brutos
    ) {
        this.nome = nome;
        this.eixoTecnologico = eixoTecnologico;
        this.segmento = segmento;
        this.justificativa = justificativa;
        this.objetivos = objetivos;
        this.perfilDoPessoalDocenteETecnico = perfilDoPessoalDocenteETecnico;
        this.perfilProfissional = perfilProfissional;
        this.orientacoesMetodologicas = orientacoesMetodologicas;
        this.avaliacao = avaliacao;
        this.requisitos = requisitos;
    }
}
exports.InfoPlanoCurso = InfoPlanoCurso;
class TurmaDetalhada {
    id;
    planoDoCursoId;
    codigoDaTurma;
    nomeTurma;
    nomeUnidadeOperativa;
    cargaHoraria;
    horarios;
    localidade;
    vagasTotais;
    vagasPreenchidas;
    vagasDisponiveis;
    dataPeriodoExecucaoInicialFormatada;
    dataPeriodoExecucaoFinalFormatada;
    preco;
    situacao;
    estadoDaTurma;
    recursosFinanceiros;
    ofertas;
    informacoesDoPlanoDoCurso;
    constructor(id, planoDoCursoId, codigoDaTurma, nomeTurma, nomeUnidadeOperativa, cargaHoraria, horarios, localidade, vagasTotais, vagasPreenchidas, vagasDisponiveis, dataPeriodoExecucaoInicialFormatada, dataPeriodoExecucaoFinalFormatada, preco, situacao, // 'Ativo'
    estadoDaTurma, // 'Liberado Para Matrícula'
    recursosFinanceiros, ofertas, informacoesDoPlanoDoCurso) {
        this.id = id;
        this.planoDoCursoId = planoDoCursoId;
        this.codigoDaTurma = codigoDaTurma;
        this.nomeTurma = nomeTurma;
        this.nomeUnidadeOperativa = nomeUnidadeOperativa;
        this.cargaHoraria = cargaHoraria;
        this.horarios = horarios;
        this.localidade = localidade;
        this.vagasTotais = vagasTotais;
        this.vagasPreenchidas = vagasPreenchidas;
        this.vagasDisponiveis = vagasDisponiveis;
        this.dataPeriodoExecucaoInicialFormatada = dataPeriodoExecucaoInicialFormatada;
        this.dataPeriodoExecucaoFinalFormatada = dataPeriodoExecucaoFinalFormatada;
        this.preco = preco;
        this.situacao = situacao;
        this.estadoDaTurma = estadoDaTurma;
        this.recursosFinanceiros = recursosFinanceiros;
        this.ofertas = ofertas;
        this.informacoesDoPlanoDoCurso = informacoesDoPlanoDoCurso;
    }
}
exports.TurmaDetalhada = TurmaDetalhada;
