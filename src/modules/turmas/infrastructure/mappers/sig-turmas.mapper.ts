import { PaginatedResult } from '../../../../core/domain/paginated-result';
import { Turma, RecursoFinanceiro } from '../../domain/entities/turma.entity';

export class SigTurmasMapper {
  public static toDomain(sigResponse: any): PaginatedResult<Turma> {
    const rawList = sigResponse.data || [];
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const validTurmasData = rawList.filter((tData: any) => {
      const hasValidRecurso = (tData.recursosFinanceiros || []).some((r: any) => {
        if (!r.nome) return false;
        const nome = r.nome.toUpperCase();
        return nome.includes("COMERCIAL") || nome.includes("PSG") || nome.includes("DR");
      });
      
      const hasDivulgacao = tData.divulgacaoOnline === true || tData.divulgacaoComMatriculaOnline === true;
      const hasVagas = typeof tData.vagasDisponiveis === 'number' && tData.vagasDisponiveis > 0;

      let validEncerramento = false;
      if (tData.dataDeEncerramentoPresencial) {
         validEncerramento = validEncerramento || (new Date(tData.dataDeEncerramentoPresencial) >= currentDate);
      }
      if (tData.dataDeEncerramentoOnline) {
         validEncerramento = validEncerramento || (new Date(tData.dataDeEncerramentoOnline) >= currentDate);
      }

      return hasValidRecurso && hasDivulgacao && hasVagas && validEncerramento;
    });

    const list: Turma[] = validTurmasData.map((tData: any) => {
      const recursos = (tData.recursosFinanceiros || []).map((rData: any) => {
        return new RecursoFinanceiro(
          rData.recursoFinanceiroId,
          rData.nome,
          rData.tipoDeRecurso,
          rData.tipoDeRecursoNome,
          rData.vagas,
          rData.vagasPreenchidas,
          rData.vagasDisponiveis,
          rData.linkMatriculaOnlineDoRecursoFinanceiroNovo || rData.linkMatriculaOnlineDoRecursoFinanceiro
        );
      });

      return new Turma(
        tData.id,
        tData.planoDoCursoId,
        tData.codigoFormatado || tData.codigoDaTurmaFormatado || tData.codigoDaTurma,
        tData.informacoesDoPlanoDoCurso?.codigoDoPlanoDeCurso || tData.codigoDoPlano,
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
        typeof tData.preco === 'number' ? tData.preco : null,
        tData.informacoesDoPlanoDoCurso?.eixoTecnologico || null,
        tData.informacoesDoPlanoDoCurso?.segmento || null,
        recursos
      );
    });

    return new PaginatedResult<Turma>(
      list,
      sigResponse.total || validTurmasData.length,
      sigResponse.qtdRegistrosDaPagina || validTurmasData.length,
      sigResponse.qtdPaginas || 1
    );
  }
}
