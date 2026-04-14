import { TurmaDetalhada, RecursoFinanceiroDetalhado, OfertaDetalhada, FormaDePagamentoDetalhada, InfoPlanoCurso } from '../../domain/entities/turma-detalhada.entity';

export class SigTurmaDetalhadaMapper {
  public static toDomain(sigResponse: any): TurmaDetalhada | null {
    if (!sigResponse || !sigResponse.data) {
      return null;
    }

    const tData = sigResponse.data;

    const recursos = (tData.recursosFinanceiros || []).map((rData: any) => {
      return new RecursoFinanceiroDetalhado(
        rData.recursoFinanceiroId,
        rData.nome,
        rData.tipoDeRecurso,
        rData.tipoDeRecursoNome,
        rData.vagasDisponiveis,
        rData.linkMatriculaOnlineDoRecursoFinanceiroNovo || rData.linkMatriculaOnlineDoRecursoFinanceiro
      );
    });

    const ofertas = (tData.ofertas || []).map((oData: any) => {
      const formasPgto = (oData.formasDePagamento || []).map((fData: any) => {
        return new FormaDePagamentoDetalhada(
          fData.meioDePagamentoDescricao,
          fData.numeroDeParcelas,
          fData.valorDaParcela,
          fData.totalPagamento,
          fData.disponivelParaWeb
        );
      });

      return new OfertaDetalhada(
        oData.nome,
        oData.cargaHorariaTotalDaOferta,
        formasPgto
      );
    });

    const infoPlanoData = tData.informacoesDoPlanoDoCurso || {};
    const infoPlano = new InfoPlanoCurso(
      infoPlanoData.nome || '',
      infoPlanoData.eixoTecnologico || '',
      infoPlanoData.segmento || '',
      infoPlanoData.justificativa || '',
      infoPlanoData.objetivos || '',
      infoPlanoData.perfilDoPessoalDocenteETecnico || '',
      infoPlanoData.perfilProfissional || '',
      infoPlanoData.orientacoesMetodologicas || '',
      infoPlanoData.avaliacao || '',
      infoPlanoData.requisitos || []
    );

    return new TurmaDetalhada(
      tData.id,
      tData.planoDoCursoId,
      tData.codigoDaTurma,
      tData.nomeTurma,
      tData.nomeUnidadeOperativa,
      tData.cargaHoraria,
      tData.horarios || [],
      tData.localidade,
      tData.vagasTotais,
      tData.vagasPreenchidas,
      tData.vagasDisponiveis,
      tData.dataPeriodoExecucaoInicialFormatada,
      tData.dataPeriodoExecucaoFinalFormatada,
      tData.preco,
      tData.situacao,
      tData.estadoDaTurma,
      recursos,
      ofertas,
      infoPlano
    );
  }
}
