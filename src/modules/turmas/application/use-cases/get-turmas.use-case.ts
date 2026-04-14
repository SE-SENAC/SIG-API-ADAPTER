import { injectable, inject } from 'tsyringe';
import { IGetTurmasUseCase } from '../../domain/use-cases/i-get-turmas.use-case';
import { ITurmasGateway } from '../../domain/gateways/i-turmas.gateway';
import { GetTurmasFiltersDto } from '../../domain/dtos/get-turmas-filters.dto';
import { PaginatedResult } from '../../../../core/domain/paginated-result';
import { Turma } from '../../domain/entities/turma.entity';

@injectable()
export class GetTurmasUseCase implements IGetTurmasUseCase {
  constructor(
    @inject('ITurmasGateway') private readonly turmasGateway: ITurmasGateway
  ) {}

  public async execute(filters: GetTurmasFiltersDto): Promise<PaginatedResult<Turma>> {
    // Caso houvesse alguma regra de negócio (ex: forçar localidade baseada em permissão),
    // seria aplicada aqui manipulando o DTO de filtros antes do Gateway
    return this.turmasGateway.getTurmas(filters);
  }
}
