"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const health_controller_1 = require("./health.controller");
const healthRouter = (0, express_1.Router)();
exports.healthRouter = healthRouter;
// Ao instanciar a rota, o Tsyringe resolve o Controller
const healthController = tsyringe_1.container.resolve(health_controller_1.HealthController);
// O bind(healthController) é muito importante (para não perder o 'this' no express)
healthRouter.get('/', healthController.check.bind(healthController));
