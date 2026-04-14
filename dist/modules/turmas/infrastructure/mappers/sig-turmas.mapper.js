"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigTurmasMapper = void 0;
const paginated_result_1 = require("../../../../core/domain/paginated-result");
const turma_entity_1 = require("../../domain/entities/turma.entity");
class SigTurmasMapper {
    static toDomain(sigResponse) {
        const list = (sigResponse.data || []).map((tData) => {
            const recursos = (tData.recursosFinanceiros || []).map((rData) => {
                return new turma_entity_1.RecursoFinanceiro(rData.recursoFinanceiroId, rData.nome, rData.tipoDeRecurso, rData.tipoDeRecursoNome, rData.vagas, // no json ta 'vagas' ao irmanar com vagasTotais no domain
                rData.vagasPreenchidas, rData.vagasDisponiveis, rData.linkMatriculaOnlineDoRecursoFinanceiro);
            });
            return new turma_entity_1.Turma(tData.id, tData.planoDoCursoId, tData.codigoDaTurmaFormatado, tData.codigoDoPlano, tData.unidadeOperativaId, tData.nomeUnidadeOperativa, tData.razaoSocialUnidadeOperativa, tData.localidade, tData.nomeTurma, tData.linkMatriculaOnline, tData.deveGerarLinkParaMatriculaOnline, tData.regionalId, tData.formaDeExecucao, tData.vagasTotais, tData.vagasPreenchidas, tData.vagasDisponiveis, recursos);
        });
        return new paginated_result_1.PaginatedResult(list, sigResponse.total || 0, sigResponse.qtdRegistrosDaPagina || 0, sigResponse.qtdPaginas || 0);
    }
}
exports.SigTurmasMapper = SigTurmasMapper;
