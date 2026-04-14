import { Router } from 'express';
import { container } from 'tsyringe';
import { TurmasController } from './infrastructure/controllers/turmas.controller';

const turmasRouter = Router();

// Usa o container TSyringe pra instanciar o controller automaticamente preenchendo o UseCase
const turmasController = container.resolve(TurmasController);

// Mapeia o endpoint
turmasRouter.get('/lista-simples', turmasController.getTurmas.bind(turmasController));
turmasRouter.get('/:id', turmasController.getTurmaById.bind(turmasController));

export { turmasRouter };
