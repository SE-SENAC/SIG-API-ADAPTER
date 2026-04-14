export class GetTurmasFiltersDto {
  constructor(
    public readonly pagina: number = 1,
    public readonly tamanhoDaPagina: number = 10000,
    public readonly codigoDoPlano?: string,
    public readonly unidadeOperativaId?: number,
    public readonly codigoDaTurma?: string,
    public readonly nomeTurma?: string,
    public readonly sigla?: string,
    public readonly divulgacaoOnline?: boolean,
    public readonly divulgacaoComMatriculaOnline?: boolean,
    public readonly dataPeriodoExecucaoInicial?: string,
    public readonly dataPeriodoExecucaoFinal?: string,
    public readonly localidadeDaTurmaId?: number,
    public readonly segmentoId?: number,
    public readonly nome?: string,
    public readonly descricao?: string,
    public readonly situacao?: boolean,
    public readonly regionalId?: number,
    public readonly ordenarPor?: string,
    public readonly ordem?: number,
    public readonly total?: number, 
    public readonly qtdRegistrosDaPagina?: number,
    public readonly qtdPaginas?: number
  ) {}
}
