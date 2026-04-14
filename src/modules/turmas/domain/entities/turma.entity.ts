export class RecursoFinanceiro {
  constructor(
    public id: number,
    public nome: string,
    public tipoDeRecurso: number,
    public tipoDeRecursoNome: string,
    public vagasTotais: number,
    public vagasPreenchidas: number,
    public vagasDisponiveis: number,
    public linkMatriculaOnline: string | null
  ) {}
}

export class Turma {
  constructor(
    public id: number,
    public planoDoCursoId: number,
    public codigoDaTurmaFormatado: string,
    public codigoDoPlano: string,
    public unidadeOperativaId: number,
    public nomeUnidadeOperativa: string,
    public razaoSocialUnidadeOperativa: string,
    public localidade: string,
    public nomeTurma: string,
    public linkMatriculaOnline: string | null,
    public deveGerarLinkParaMatriculaOnline: boolean,
    public regionalId: number,
    public formaDeExecucao: string,
    public vagasTotais: number,
    public vagasPreenchidas: number,
    public vagasDisponiveis: number,
    public preco: number | null,
    public eixoTecnologico: string | null,
    public segmento: string | null,
    public recursosFinanceiros: RecursoFinanceiro[]
  ) {}
}
