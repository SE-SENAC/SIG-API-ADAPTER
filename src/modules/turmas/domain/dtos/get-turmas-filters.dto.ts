export class GetTurmasFiltersDto {
  constructor(
    public readonly pagina: number = 1,
    public readonly tamanhoDaPagina: number = 10,
    public readonly codigoDoPlano?: string,
    public readonly unidadeOperativaId?: number,
    public readonly codigoDaTurmaFormatado?: string,
    public readonly localidadeDaTurmaId?: number,
    // Existem outros no print (Total, QtdPaginas...) contudo se eles forem read-only na query não faz sentido passar no request, mas deixaremos caso o SIG bizarramente exija para o estado do objeto
    public readonly total?: number, 
    public readonly qtdRegistrosDaPagina?: number,
    public readonly qtdPaginas?: number
  ) {}
}
