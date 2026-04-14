"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTurmasFiltersDto = void 0;
class GetTurmasFiltersDto {
    pagina;
    tamanhoDaPagina;
    codigoDoPlano;
    unidadeOperativaId;
    codigoDaTurmaFormatado;
    localidadeDaTurmaId;
    total;
    qtdRegistrosDaPagina;
    qtdPaginas;
    constructor(pagina = 1, tamanhoDaPagina = 10, codigoDoPlano, unidadeOperativaId, codigoDaTurmaFormatado, localidadeDaTurmaId, 
    // Existem outros no print (Total, QtdPaginas...) contudo se eles forem read-only na query não faz sentido passar no request, mas deixaremos caso o SIG bizarramente exija para o estado do objeto
    total, qtdRegistrosDaPagina, qtdPaginas) {
        this.pagina = pagina;
        this.tamanhoDaPagina = tamanhoDaPagina;
        this.codigoDoPlano = codigoDoPlano;
        this.unidadeOperativaId = unidadeOperativaId;
        this.codigoDaTurmaFormatado = codigoDaTurmaFormatado;
        this.localidadeDaTurmaId = localidadeDaTurmaId;
        this.total = total;
        this.qtdRegistrosDaPagina = qtdRegistrosDaPagina;
        this.qtdPaginas = qtdPaginas;
    }
}
exports.GetTurmasFiltersDto = GetTurmasFiltersDto;
