import { injectable, inject } from 'tsyringe';
import { ITurmasGateway } from '../../domain/gateways/i-turmas.gateway';
import { TurmaDetalhada } from '../../domain/entities/turma-detalhada.entity';
import { ValidationError } from '../../../../core/exceptions/validation-error';

export interface IGetTurmaByIdUseCase {
  execute(id: number): Promise<TurmaDetalhada>;
}

@injectable()
export class GetTurmaByIdUseCase implements IGetTurmaByIdUseCase {
  constructor(
    @inject('ITurmasGateway') private readonly turmasGateway: ITurmasGateway
  ) {}

  public async execute(id: number): Promise<TurmaDetalhada> {
    const turma = await this.turmasGateway.getTurmaById(id);

    if (!turma) {
      throw new ValidationError(`Turma com ID ${id} não encontrada ou indisponível.`);
    }

    // Regra 1: O estado ser 'Liberado Para Matrícula' (Case Insensitive)
    if (turma.estadoDaTurma.toLowerCase() !== 'liberado para matrícula') {
      throw new ValidationError(`A turma não está liberada para matrícula (Estado: ${turma.estadoDaTurma}).`);
    }

    // Regra 2: Ser precificada com valor maior do que 0
    if (turma.preco <= 0) {
      throw new ValidationError('A turma é gratuita ou possui precificação inválida.');
    }

    // Regra 3: Possuir vagas com Recurso Financeiro "Comercial", "PSG" ou "DR"
    // Vamos processar isso no proprio array
    const validResources = turma.recursosFinanceiros.filter(r => 
      ['comercial', 'psg', 'dr'].includes(r.tipoDeRecursoNome.toLowerCase()) &&
      r.vagasDisponiveis > 0
    );

    if (validResources.length === 0) {
       throw new ValidationError('A turma não possui vagas em recursos aceitos (Comercial, PSG, DR).');
    }

    // Regra 4: Pelo menos uma forma de pagamento cujo parcelamento e total sejam maiores que 0
    let possuiPagamentoValido = false;
    for (const oferta of turma.ofertas) {
      for (const pgto of oferta.formasDePagamento) {
        if (pgto.valorDaParcela > 0 && pgto.totalPagamento > 0) {
          possuiPagamentoValido = true;
          break;
        }
      }
      if (possuiPagamentoValido) break;
    }

    if (!possuiPagamentoValido) {
      throw new ValidationError('A turma não possui formas de pagamento válidas.');
    }

    return turma;
  }
}
