import { ProcessarDadosComerciaisDto } from '../../domain/dtos/processar-dados-comerciais.dto';
import { MatriculaLink } from '../../domain/entities/matricula-link.entity';

export class SigMatriculasMapper {
  // Transforma NOSSO dto enxuto no monstro de Payload do SIG
  public static toSigPayload(dto: ProcessarDadosComerciaisDto): any {
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
  public static toDomain(sigResponseData: any): MatriculaLink {
    return new MatriculaLink(
      sigResponseData.link || ''
    );
  }
}
