"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matriculasRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const matriculas_controller_1 = require("./infrastructure/controllers/matriculas.controller");
const matriculasRouter = (0, express_1.Router)();
exports.matriculasRouter = matriculasRouter;
// Usa o container TSyringe pra instanciar o controller
const matriculasController = tsyringe_1.container.resolve(matriculas_controller_1.MatriculasController);
// Mapeia o endpoint para POST /gerar-link
matriculasRouter.post('/gerar-link', matriculasController.gerarLinkProcessarDados.bind(matriculasController));
