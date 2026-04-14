"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = exports.RecursoFinanceiro = void 0;
class RecursoFinanceiro {
    id;
    nome;
    tipoDeRecurso;
    tipoDeRecursoNome;
    vagasTotais;
    vagasPreenchidas;
    vagasDisponiveis;
    linkMatriculaOnline;
    constructor(id, nome, tipoDeRecurso, tipoDeRecursoNome, vagasTotais, vagasPreenchidas, vagasDisponiveis, linkMatriculaOnline) {
        this.id = id;
        this.nome = nome;
        this.tipoDeRecurso = tipoDeRecurso;
        this.tipoDeRecursoNome = tipoDeRecursoNome;
        this.vagasTotais = vagasTotais;
        this.vagasPreenchidas = vagasPreenchidas;
        this.vagasDisponiveis = vagasDisponiveis;
        this.linkMatriculaOnline = linkMatriculaOnline;
    }
}
exports.RecursoFinanceiro = RecursoFinanceiro;
class Turma {
    id;
    planoDoCursoId;
    codigoDaTurmaFormatado;
    codigoDoPlano;
    unidadeOperativaId;
    nomeUnidadeOperativa;
    razaoSocialUnidadeOperativa;
    localidade;
    nomeTurma;
    linkMatriculaOnline;
    deveGerarLinkParaMatriculaOnline;
    regionalId;
    formaDeExecucao;
    vagasTotais;
    vagasPreenchidas;
    vagasDisponiveis;
    recursosFinanceiros;
    constructor(id, planoDoCursoId, codigoDaTurmaFormatado, codigoDoPlano, unidadeOperativaId, nomeUnidadeOperativa, razaoSocialUnidadeOperativa, localidade, nomeTurma, linkMatriculaOnline, deveGerarLinkParaMatriculaOnline, regionalId, formaDeExecucao, vagasTotais, vagasPreenchidas, vagasDisponiveis, recursosFinanceiros) {
        this.id = id;
        this.planoDoCursoId = planoDoCursoId;
        this.codigoDaTurmaFormatado = codigoDaTurmaFormatado;
        this.codigoDoPlano = codigoDoPlano;
        this.unidadeOperativaId = unidadeOperativaId;
        this.nomeUnidadeOperativa = nomeUnidadeOperativa;
        this.razaoSocialUnidadeOperativa = razaoSocialUnidadeOperativa;
        this.localidade = localidade;
        this.nomeTurma = nomeTurma;
        this.linkMatriculaOnline = linkMatriculaOnline;
        this.deveGerarLinkParaMatriculaOnline = deveGerarLinkParaMatriculaOnline;
        this.regionalId = regionalId;
        this.formaDeExecucao = formaDeExecucao;
        this.vagasTotais = vagasTotais;
        this.vagasPreenchidas = vagasPreenchidas;
        this.vagasDisponiveis = vagasDisponiveis;
        this.recursosFinanceiros = recursosFinanceiros;
    }
}
exports.Turma = Turma;
