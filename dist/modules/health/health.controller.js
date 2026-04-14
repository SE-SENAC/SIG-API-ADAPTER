"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tsyringe_1 = require("tsyringe");
let HealthController = class HealthController {
    httpClient;
    // Exemplo de como você injetaria o http client ou um use-case no construtor
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async check(req, res) {
        try {
            // Bate no endpoint de ping do SIG. O interceptor injetará o Bearer automaticamente!
            const sigResponse = await this.httpClient.get('/integracaoserver/api/ping');
            res.status(200).json({
                status: 'Orchestrator and SIG API are healthy',
                sigVersion: sigResponse, // Deve retornar "1.0.0.0"
                hasHttpClientBound: !!this.httpClient
            });
        }
        catch (error) {
            // Caso a API fora do ar, o erro sobe pelo GatewayError no interceptor
            res.status(502).json({
                status: 'SIG API is offline or unreachable',
                error: error.message
            });
        }
    }
};
exports.HealthController = HealthController;
exports.HealthController = HealthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IHttpClient')),
    __metadata("design:paramtypes", [Object])
], HealthController);
