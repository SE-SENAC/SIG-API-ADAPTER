"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigTurmaDetalhadaMapper = void 0;
const turma_detalhada_entity_1 = require("../../domain/entities/turma-detalhada.entity");
class SigTurmaDetalhadaMapper {
    static toDomain(sigResponse) {
        if (!sigResponse || !sigResponse.data) {
            return null;
        }
        const tData = sigResponse.data;
        const recursos = (tData.recursosFinanceiros || []).map((rData) => {
            return new turma_detalhada_entity_1.RecursoFinanceiroDetalhado(rData.recursoFinanceiroId, rData.nome, rData.tipoDeRecurso, rData.tipoDeRecursoNome, rData.vagasDisponiveis, rData.linkMatriculaOnlineDoRecursoFinanceiroNovo || rData.linkMatriculaOnlineDoRecursoFinanceiro);
        });
        const ofertas = (tData.ofertas || []).map((oData) => {
            const formasPgto = (oData.formasDePagamento || []).map((fData) => {
                return new turma_detalhada_entity_1.FormaDePagamentoDetalhada(fData.meioDePagamentoDescricao, fData.numeroDeParcelas, fData.valorDaParcela, fData.totalPagamento, fData.disponivelParaWeb);
            });
            return new turma_detalhada_entity_1.OfertaDetalhada(oData.nome, oData.cargaHorariaTotalDaOferta, formasPgto);
        });
        const infoPlanoData = tData.informacoesDoPlanoDoCurso || {};
        const infoPlano = new turma_detalhada_entity_1.InfoPlanoCurso(infoPlanoData.nome || '', infoPlanoData.eixoTecnologico || '', infoPlanoData.segmento || '', infoPlanoData.justificativa || '', infoPlanoData.objetivos || '', infoPlanoData.perfilDoPessoalDocenteETecnico || '', infoPlanoData.perfilProfissional || '', infoPlanoData.orientacoesMetodologicas || '', infoPlanoData.avaliacao || '', infoPlanoData.requisitos || []);
        return new turma_detalhada_entity_1.TurmaDetalhada(tData.id, tData.planoDoCursoId, tData.codigoDaTurma, tData.nomeTurma, tData.nomeUnidadeOperativa, tData.cargaHoraria, tData.horarios || [], tData.localidade, tData.vagasTotais, tData.vagasPreenchidas, tData.vagasDisponiveis, tData.dataPeriodoExecucaoInicialFormatada, tData.dataPeriodoExecucaoFinalFormatada, tData.preco, tData.situacao, tData.estadoDaTurma, recursos, ofertas, infoPlano);
    }
}
exports.SigTurmaDetalhadaMapper = SigTurmaDetalhadaMapper;
