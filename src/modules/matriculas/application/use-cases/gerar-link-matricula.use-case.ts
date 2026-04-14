import { injectable, inject } from 'tsyringe';
import { IGerarLinkMatriculaUseCase } from '../../domain/use-cases/i-gerar-link-matricula.use-case';
import { IMatriculasGateway } from '../../domain/gateways/i-matriculas.gateway';
import { ProcessarDadosComerciaisDto } from '../../domain/dtos/processar-dados-comerciais.dto';
import { MatriculaLink } from '../../domain/entities/matricula-link.entity';
import { SigMatriculasMapper } from '../../infrastructure/mappers/sig-matriculas.mapper';

@injectable()
export class GerarLinkMatriculaUseCase implements IGerarLinkMatriculaUseCase {
  constructor(
    @inject('IMatriculasGateway') private readonly matriculasGateway: IMatriculasGateway
  ) {}

  public async execute(dto: ProcessarDadosComerciaisDto): Promise<MatriculaLink> {
    // 1. Invoca o Mapper para traduzir o nosso DTO limpo num 'Raw Payload' complexo e duplicado pro SIG!
    const sigPayload = SigMatriculasMapper.toSigPayload(dto);
    
    // 2. Acaba chamando o Gateway com os dados prontos
    const linkEntity = await this.matriculasGateway.gerarLinkMatricula(sigPayload);

    return linkEntity;
  }
}
