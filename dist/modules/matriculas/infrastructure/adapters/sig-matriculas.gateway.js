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
exports.SigMatriculasGateway = void 0;
const tsyringe_1 = require("tsyringe");
const sig_matriculas_mapper_1 = require("../mappers/sig-matriculas.mapper");
let SigMatriculasGateway = class SigMatriculasGateway {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async gerarLinkMatricula(sigPayload) {
        const endpoint = '/integracaoserver/api/matricula-online/ProcessarDadosComerciais';
        // Dispara a requisição POST repassando o objeto SIG criado pelo Mapper.
        // O Token já estará sendo injetado pela camada do AxiosClient (o nosso Orchestrator!)
        const response = await this.httpClient.post(endpoint, sigPayload);
        // Mapeia o Payload RAW {"link": "https..."} devolta pra Entidade bonitinha de domínio
        return sig_matriculas_mapper_1.SigMatriculasMapper.toDomain(response);
    }
};
exports.SigMatriculasGateway = SigMatriculasGateway;
exports.SigMatriculasGateway = SigMatriculasGateway = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IHttpClient')),
    __metadata("design:paramtypes", [Object])
], SigMatriculasGateway);
