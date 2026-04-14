import 'reflect-metadata'; // Importante para TSyringe
import 'express-async-errors'; // Importante para o Express lidar com errors de promises async sem o trycatch no controller
import express, { Application } from 'express';

// Import injection container e env config
import './core/container';
import { ENV } from './core/config/env.config';

import { errorHandlerMiddleware } from './core/exceptions/error-handler.middleware';
import { healthRouter } from './modules/health/health.routes';
// import cors from 'cors';

import { turmasRouter } from './modules/turmas/turmas.routes';
import { matriculasRouter } from './modules/matriculas/matriculas.routes';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.errorHandling(); // Must be after routes
  }

  private middlewares(): void {
    // Configuração inicial de CORS, restrito para uso interno (pode ajustar os origins futuramente)
    // this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.express.use('/health', healthRouter);
    this.express.use('/api/v1/turmas', turmasRouter);
    this.express.use('/api/v1/matriculas', matriculasRouter);

    // Carregar OpenAPI doc e iniciar ui
    const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private errorHandling(): void {
    this.express.use(errorHandlerMiddleware);
  }
}

export default new App().express;
