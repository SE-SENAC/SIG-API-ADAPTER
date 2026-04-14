import { Router } from 'express';
import { container } from 'tsyringe';
import { HealthController } from './health.controller';

const healthRouter = Router();

// Ao instanciar a rota, o Tsyringe resolve o Controller
const healthController = container.resolve(HealthController);

// O bind(healthController) é muito importante (para não perder o 'this' no express)
healthRouter.get('/', healthController.check.bind(healthController));

export { healthRouter };
