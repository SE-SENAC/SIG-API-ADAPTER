"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigMatriculasMapper = void 0;
const matricula_link_entity_1 = require("../../domain/entities/matricula-link.entity");
class SigMatriculasMapper {
    // Transforma NOSSO dto enxuto no monstro de Payload do SIG
    static toSigPayload(dto) {
        const sigCursos = dto.cursos.map(curso => {
            return {
                unidadeOperativaId: curso.unidadeOperativaId,
                turmaId: curso.turmaId,
                // ** A REGRA SOLICITADA *: Duplicamos automaticamente pra aliviar a vida do Front-End (Origem vira Recurso Financeiro)
                origemDoRecursoId: curso.recursoFinanceiroId,
                recursoFinanceiroId: curso.recursoFinanceiroId,
                numeroDeVagas: curso.numeroDeVagas,
                vouchersPromocionais: curso.vouchersPromocionais || []
            };
        });
        return {
            cursos: sigCursos
        };
    }
    // Transforma o JSON cru da resposta da API em algo nosso pra evitar acoplamento
    static toDomain(sigResponseData) {
        return new matricula_link_entity_1.MatriculaLink(sigResponseData.link || '');
    }
}
exports.SigMatriculasMapper = SigMatriculasMapper;
