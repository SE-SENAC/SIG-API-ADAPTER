import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IGerarLinkMatriculaUseCase } from '../../domain/use-cases/i-gerar-link-matricula.use-case';
import { ProcessarDadosComerciaisDto } from '../../domain/dtos/processar-dados-comerciais.dto';

@injectable()
export class MatriculasController {
  constructor(
    @inject('IGerarLinkMatriculaUseCase') private readonly gerarLinkUseCase: IGerarLinkMatriculaUseCase
  ) {}

  public async gerarLinkProcessarDados(req: Request, res: Response): Promise<void> {
    // Pegar o Payload do Json Body do post (Express.json já converteu pra gente)
    // Se o validador class-validator for instalado você pode decorar o DTO, por agora confiaremos na estrutura bruta.
    const dto: ProcessarDadosComerciaisDto = req.body;
    
    const result = await this.gerarLinkUseCase.execute(dto);
    
    res.status(200).json(result);
  }
}
