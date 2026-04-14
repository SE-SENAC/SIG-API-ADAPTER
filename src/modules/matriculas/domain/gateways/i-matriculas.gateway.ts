import { ProcessarDadosComerciaisDto } from '../dtos/processar-dados-comerciais.dto';
import { MatriculaLink } from '../entities/matricula-link.entity';

export interface IMatriculasGateway {
  gerarLinkMatricula(payload: any): Promise<MatriculaLink>; // Repassamos o ANY aqui porque o DTO será mastigado pelo Mapper no Gateway pra gerar a matrix correta
}
