"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessarDadosComerciaisDto = exports.CursoMatriculaDto = void 0;
class CursoMatriculaDto {
    unidadeOperativaId;
    turmaId;
    recursoFinanceiroId;
    numeroDeVagas;
    vouchersPromocionais;
    constructor(unidadeOperativaId, turmaId, recursoFinanceiroId, // Usaremos ESSE campo duplicado implicitamente para 'origemDoRecursoId'
    numeroDeVagas, vouchersPromocionais) {
        this.unidadeOperativaId = unidadeOperativaId;
        this.turmaId = turmaId;
        this.recursoFinanceiroId = recursoFinanceiroId;
        this.numeroDeVagas = numeroDeVagas;
        this.vouchersPromocionais = vouchersPromocionais;
    }
}
exports.CursoMatriculaDto = CursoMatriculaDto;
class ProcessarDadosComerciaisDto {
    cursos;
    constructor(cursos) {
        this.cursos = cursos;
    }
}
exports.ProcessarDadosComerciaisDto = ProcessarDadosComerciaisDto;
