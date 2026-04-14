"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Importante para TSyringe
require("express-async-errors"); // Importante para o Express lidar com errors de promises async sem o trycatch no controller
const express_1 = __importDefault(require("express"));
// Import injection container e env config
require("./core/container");
const error_handler_middleware_1 = require("./core/exceptions/error-handler.middleware");
const health_routes_1 = require("./modules/health/health.routes");
const cors_1 = __importDefault(require("cors"));
const turmas_routes_1 = require("./modules/turmas/turmas.routes");
const matriculas_routes_1 = require("./modules/matriculas/matriculas.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
class App {
    express;
    constructor() {
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.errorHandling(); // Must be after routes
    }
    middlewares() {
        // Configuração inicial de CORS, restrito para uso interno (pode ajustar os origins futuramente)
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.express.use('/health', health_routes_1.healthRouter);
        this.express.use('/api/v1/turmas', turmas_routes_1.turmasRouter);
        this.express.use('/api/v1/matriculas', matriculas_routes_1.matriculasRouter);
        // Carregar OpenAPI doc e iniciar ui
        const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../docs/swagger.yaml'));
        this.express.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
    errorHandling() {
        this.express.use(error_handler_middleware_1.errorHandlerMiddleware);
    }
}
exports.default = new App().express;
