import { PaginatedResult } from '../../../../core/domain/paginated-result';
import { GetTurmasFiltersDto } from '../dtos/get-turmas-filters.dto';
import { Turma } from '../entities/turma.entity';

export interface IGetTurmasUseCase {
  execute(filters: GetTurmasFiltersDto): Promise<PaginatedResult<Turma>>;
}
