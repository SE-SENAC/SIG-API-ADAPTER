import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IGetTurmasUseCase } from '../../domain/use-cases/i-get-turmas.use-case';
import { GetTurmasFiltersDto } from '../../domain/dtos/get-turmas-filters.dto';

import { IGetTurmaByIdUseCase } from '../../application/use-cases/get-turma-by-id.use-case';

@injectable()
export class TurmasController {
  constructor(
    @inject('IGetTurmasUseCase') private readonly getTurmasUseCase: IGetTurmasUseCase,
    @inject('IGetTurmaByIdUseCase') private readonly getTurmaByIdUseCase: IGetTurmaByIdUseCase
  ) {}

  public async getTurmaById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID deve ser numérico.' });
      return;
    }
    
    const result = await this.getTurmaByIdUseCase.execute(id);
    res.status(200).json(result);
  }

  public async getTurmas(req: Request, res: Response): Promise<void> {
    const filters = new GetTurmasFiltersDto(
      req.query.pagina ? Number(req.query.pagina) : 1,
      req.query.tamanhoDaPagina ? Number(req.query.tamanhoDaPagina) : 10000,
      req.query.codigoDoPlano as string,
      req.query.unidadeOperativaId ? Number(req.query.unidadeOperativaId) : undefined,
      req.query.codigoDaTurma as string,
      req.query.nomeTurma as string,
      req.query.sigla as string,
      req.query.divulgacaoOnline !== undefined ? String(req.query.divulgacaoOnline) === 'true' : undefined,
      req.query.divulgacaoComMatriculaOnline !== undefined ? String(req.query.divulgacaoComMatriculaOnline) === 'true' : undefined,
      req.query.dataPeriodoExecucaoInicial as string,
      req.query.dataPeriodoExecucaoFinal as string,
      req.query.localidadeDaTurmaId ? Number(req.query.localidadeDaTurmaId) : undefined,
      req.query.segmentoId ? Number(req.query.segmentoId) : undefined,
      req.query.nome as string,
      req.query.descricao as string,
      req.query.situacao !== undefined ? String(req.query.situacao) === 'true' : undefined,
      req.query.regionalId ? Number(req.query.regionalId) : undefined,
      req.query.ordenarPor as string,
      req.query.ordem ? Number(req.query.ordem) : undefined
    );


    const result = await this.getTurmasUseCase.execute(filters);
    res.status(200).json(result);
  }
}
