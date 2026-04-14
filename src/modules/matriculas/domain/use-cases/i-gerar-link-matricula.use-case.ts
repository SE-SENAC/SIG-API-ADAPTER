import { ProcessarDadosComerciaisDto } from '../dtos/processar-dados-comerciais.dto';
import { MatriculaLink } from '../entities/matricula-link.entity';

export interface IGerarLinkMatriculaUseCase {
  execute(dto: ProcessarDadosComerciaisDto): Promise<MatriculaLink>;
}
