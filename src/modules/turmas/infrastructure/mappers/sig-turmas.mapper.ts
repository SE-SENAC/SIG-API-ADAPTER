import { PaginatedResult } from '../../../../core/domain/paginated-result';
import { Turma, RecursoFinanceiro } from '../../domain/entities/turma.entity';

export class SigTurmasMapper {
  public static toDomain(sigResponse: any): PaginatedResult<Turma> {
    const list: Turma[] = (sigResponse.data || []).map((tData: any) => {
      
      const recursos = (tData.recursosFinanceiros || []).map((rData: any) => {
        return new RecursoFinanceiro(
          rData.recursoFinanceiroId,
          rData.nome,
          rData.tipoDeRecurso,
          rData.tipoDeRecursoNome,
          rData.vagas, // no json ta 'vagas' ao irmanar com vagasTotais no domain
          rData.vagasPreenchidas,
          rData.vagasDisponiveis,
          rData.linkMatriculaOnlineDoRecursoFinanceiro
        );
      });

      return new Turma(
        tData.id,
        tData.planoDoCursoId,
        tData.codigoDaTurmaFormatado,
        tData.codigoDoPlano,
        tData.unidadeOperativaId,
        tData.nomeUnidadeOperativa,
        tData.razaoSocialUnidadeOperativa,
        tData.localidade,
        tData.nomeTurma,
        tData.linkMatriculaOnline,
        tData.deveGerarLinkParaMatriculaOnline,
        tData.regionalId,
        tData.formaDeExecucao,
        tData.vagasTotais,
        tData.vagasPreenchidas,
        tData.vagasDisponiveis,
        recursos
      );
    });

    return new PaginatedResult<Turma>(
      list,
      sigResponse.total || 0,
      sigResponse.qtdRegistrosDaPagina || 0,
      sigResponse.qtdPaginas || 0
    );
  }
}
