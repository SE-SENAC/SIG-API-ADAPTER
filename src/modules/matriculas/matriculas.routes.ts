import { Router } from 'express';
import { container } from 'tsyringe';
import { MatriculasController } from './infrastructure/controllers/matriculas.controller';

const matriculasRouter = Router();

// Usa o container TSyringe pra instanciar o controller
const matriculasController = container.resolve(MatriculasController);

// Mapeia o endpoint para POST /gerar-link
matriculasRouter.post('/gerar-link', matriculasController.gerarLinkProcessarDados.bind(matriculasController));

export { matriculasRouter };
