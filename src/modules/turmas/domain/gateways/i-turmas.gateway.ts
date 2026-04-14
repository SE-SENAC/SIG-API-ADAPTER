import { PaginatedResult } from '../../../../core/domain/paginated-result';
import { GetTurmasFiltersDto } from '../dtos/get-turmas-filters.dto';
import { Turma } from '../entities/turma.entity';
import { TurmaDetalhada } from '../entities/turma-detalhada.entity';

export interface ITurmasGateway {
  getTurmas(filters: GetTurmasFiltersDto): Promise<PaginatedResult<Turma>>;
  getTurmaById(id: number): Promise<TurmaDetalhada | null>;
}
