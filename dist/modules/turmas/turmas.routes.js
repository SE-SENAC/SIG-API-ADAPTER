"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turmasRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const turmas_controller_1 = require("./infrastructure/controllers/turmas.controller");
const turmasRouter = (0, express_1.Router)();
exports.turmasRouter = turmasRouter;
// Usa o container TSyringe pra instanciar o controller automaticamente preenchendo o UseCase
const turmasController = tsyringe_1.container.resolve(turmas_controller_1.TurmasController);
// Mapeia o endpoint
turmasRouter.get('/lista-simples', turmasController.getTurmas.bind(turmasController));
turmasRouter.get('/:id', turmasController.getTurmaById.bind(turmasController));
