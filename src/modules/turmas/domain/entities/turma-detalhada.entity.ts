export class FormaDePagamentoDetalhada {
  constructor(
    public meioDePagamentoDescricao: string,
    public numeroDeParcelas: number,
    public valorDaParcela: number,
    public totalPagamento: number,
    public disponivelParaWeb: boolean
  ) {}
}

export class OfertaDetalhada {
  constructor(
    public nome: string,
    public cargaHorariaTotalDaOferta: number,
    public formasDePagamento: FormaDePagamentoDetalhada[]
    // Ignorando array puramente de letreiros de 'UnidadesCurriculares' pois não tem tanta utilidade no funil imediato comercial, mas pode ser adicionado
  ) {}
}

export class RecursoFinanceiroDetalhado {
  constructor(
    public recursoFinanceiroId: number,
    public nome: string,
    public tipoDeRecurso: number,
    public tipoDeRecursoNome: string, // Importante pra validar "Comercial, PSG, DR"
    public vagasDisponiveis: number,
    public linkMatriculaOnlineDoRecursoFinanceiroNovo: string | null
  ) {}
}

export class InfoPlanoCurso {
  constructor(
    public nome: string,
    public eixoTecnologico: string,
    public segmento: string,
    public justificativa: string, // HTML raw do SIG
    public objetivos: string, // HTML raw do SIG
    public perfilDoPessoalDocenteETecnico: string, // HTML
    public perfilProfissional: string, // Raw text
    public orientacoesMetodologicas: string, // HTML
    public avaliacao: string, // HTML
    public requisitos: any[] // array de requisitos brutos
  ) {}
}

export class TurmaDetalhada {
  constructor(
    public id: number,
    public planoDoCursoId: number,
    public codigoDaTurma: string,
    public nomeTurma: string,
    public nomeUnidadeOperativa: string,
    public cargaHoraria: number,
    public horarios: string[],
    public localidade: string,
    public vagasTotais: number,
    public vagasPreenchidas: number,
    public vagasDisponiveis: number,
    public dataPeriodoExecucaoInicialFormatada: string,
    public dataPeriodoExecucaoFinalFormatada: string,
    public preco: number,
    public situacao: string, // 'Ativo'
    public estadoDaTurma: string, // 'Liberado Para Matrícula'
    public recursosFinanceiros: RecursoFinanceiroDetalhado[],
    public ofertas: OfertaDetalhada[],
    public informacoesDoPlanoDoCurso: InfoPlanoCurso
  ) {}
}
