import { injectable, inject } from 'tsyringe';
import { IMatriculasGateway } from '../../domain/gateways/i-matriculas.gateway';
import { MatriculaLink } from '../../domain/entities/matricula-link.entity';
import { IHttpClient } from '../../../../core/http/i-http-client';
import { SigMatriculasMapper } from '../mappers/sig-matriculas.mapper';

@injectable()
export class SigMatriculasGateway implements IMatriculasGateway {
  constructor(
    @inject('IHttpClient') private readonly httpClient: IHttpClient
  ) {}

  public async gerarLinkMatricula(sigPayload: any): Promise<MatriculaLink> {
    const endpoint = '/integracaoserver/api/matricula-online/ProcessarDadosComerciais';
    
    // Dispara a requisição POST repassando o objeto SIG criado pelo Mapper.
    // O Token já estará sendo injetado pela camada do AxiosClient (o nosso Orchestrator!)
    const response: any = await this.httpClient.post(endpoint, sigPayload);

    // Mapeia o Payload RAW {"link": "https..."} devolta pra Entidade bonitinha de domínio
    return SigMatriculasMapper.toDomain(response);
  }
}
