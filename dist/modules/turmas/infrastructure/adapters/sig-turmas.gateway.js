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
exports.SigTurmasGateway = void 0;
const tsyringe_1 = require("tsyringe");
const sig_turmas_mapper_1 = require("../mappers/sig-turmas.mapper");
const sig_turma_detalhada_mapper_1 = require("../mappers/sig-turma-detalhada.mapper");
let SigTurmasGateway = class SigTurmasGateway {
    httpClient;
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getTurmaById(id) {
        try {
            const endpoint = `/integracaoserver/api/turma/${id}`;
            const response = await this.httpClient.get(endpoint);
            return sig_turma_detalhada_mapper_1.SigTurmaDetalhadaMapper.toDomain(response);
        }
        catch (error) {
            // Se a API estourar 404
            return null;
        }
    }
    async getTurmas(filters) {
        // Converte os filtros para QueryString. Campos undefined são omitidos.
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Converter as primeiras letras pra PascalCase igual ao SIG (Opcional, ou passar chave mapeada)
                const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
                queryParams.append(pascalKey, value.toString());
            }
        });
        const endpoint = `/integracaoserver/api/turma/lista-simples?${queryParams.toString()}`;
        const response = await this.httpClient.get(endpoint);
        // Passa a resposta pelo Mapper blindando a aplicação contra mudanças de tipagem
        return sig_turmas_mapper_1.SigTurmasMapper.toDomain(response);
    }
};
exports.SigTurmasGateway = SigTurmasGateway;
exports.SigTurmasGateway = SigTurmasGateway = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IHttpClient')),
    __metadata("design:paramtypes", [Object])
], SigTurmasGateway);
