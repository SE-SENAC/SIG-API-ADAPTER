import { injectable, inject } from 'tsyringe';
import { ITurmasGateway } from '../../domain/gateways/i-turmas.gateway';
import { GetTurmasFiltersDto } from '../../domain/dtos/get-turmas-filters.dto';
import { PaginatedResult } from '../../../../core/domain/paginated-result';
import { Turma } from '../../domain/entities/turma.entity';
import { TurmaDetalhada } from '../../domain/entities/turma-detalhada.entity';
import { IHttpClient } from '../../../../core/http/i-http-client';
import { SigTurmasMapper } from '../mappers/sig-turmas.mapper';
import { SigTurmaDetalhadaMapper } from '../mappers/sig-turma-detalhada.mapper';

@injectable()
export class SigTurmasGateway implements ITurmasGateway {
  constructor(
    @inject('IHttpClient') private readonly httpClient: IHttpClient
  ) {}

  public async getTurmaById(id: number): Promise<TurmaDetalhada | null> {
    try {
      const endpoint = `/integracaoserver/api/turma/${id}`;
      const response: any = await this.httpClient.get(endpoint);
      return SigTurmaDetalhadaMapper.toDomain(response);
    } catch (error) {
      // Se a API estourar 404
      return null;
    }
  }

  public async getTurmas(filters: GetTurmasFiltersDto): Promise<PaginatedResult<Turma>> {
    // Converte os filtros para QueryString. Campos undefined são omitidos.
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Converter as primeiras letras pra PascalCase igual ao SIG (Opcional, ou passar chave mapeada)
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        queryParams.append(pascalKey, value.toString());
      }
    });

    const endpoint = `/integracaoserver/api/turma?${queryParams.toString()}`;
    
    const response: any = await this.httpClient.get(endpoint);

    // Passa a resposta pelo Mapper blindando a aplicação contra mudanças de tipagem
    return SigTurmasMapper.toDomain(response);
  }
}
