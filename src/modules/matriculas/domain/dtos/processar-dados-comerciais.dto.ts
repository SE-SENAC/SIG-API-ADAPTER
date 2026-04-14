export class CursoMatriculaDto {
  constructor(
    public unidadeOperativaId: number,
    public turmaId: number,
    public recursoFinanceiroId: number, // Usaremos ESSE campo duplicado implicitamente para 'origemDoRecursoId'
    public numeroDeVagas: number,
    public vouchersPromocionais?: string[]
  ) {}
}

export class ProcessarDadosComerciaisDto {
  constructor(
    public cursos: CursoMatriculaDto[]
  ) {}
}
