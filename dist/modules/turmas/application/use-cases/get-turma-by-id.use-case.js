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
exports.GetTurmaByIdUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const validation_error_1 = require("../../../../core/exceptions/validation-error");
let GetTurmaByIdUseCase = class GetTurmaByIdUseCase {
    turmasGateway;
    constructor(turmasGateway) {
        this.turmasGateway = turmasGateway;
    }
    async execute(id) {
        const turma = await this.turmasGateway.getTurmaById(id);
        if (!turma) {
            throw new validation_error_1.ValidationError(`Turma com ID ${id} não encontrada ou indisponível.`);
        }
        // Regra 1: O estado ser 'Liberado Para Matrícula' (Case Insensitive)
        if (turma.estadoDaTurma.toLowerCase() !== 'liberado para matrícula') {
            throw new validation_error_1.ValidationError(`A turma não está liberada para matrícula (Estado: ${turma.estadoDaTurma}).`);
        }
        // Regra 2: Ser precificada com valor maior do que 0
        if (turma.preco <= 0) {
            throw new validation_error_1.ValidationError('A turma é gratuita ou possui precificação inválida.');
        }
        // Regra 3: Possuir vagas com Recurso Financeiro "Comercial", "PSG" ou "DR"
        // Vamos processar isso no proprio array
        const validResources = turma.recursosFinanceiros.filter(r => ['comercial', 'psg', 'dr'].includes(r.tipoDeRecursoNome.toLowerCase()) &&
            r.vagasDisponiveis > 0);
        if (validResources.length === 0) {
            throw new validation_error_1.ValidationError('A turma não possui vagas em recursos aceitos (Comercial, PSG, DR).');
        }
        // Regra 4: Pelo menos uma forma de pagamento cujo parcelamento e total sejam maiores que 0
        let possuiPagamentoValido = false;
        for (const oferta of turma.ofertas) {
            for (const pgto of oferta.formasDePagamento) {
                if (pgto.valorDaParcela > 0 && pgto.totalPagamento > 0) {
                    possuiPagamentoValido = true;
                    break;
                }
            }
            if (possuiPagamentoValido)
                break;
        }
        if (!possuiPagamentoValido) {
            throw new validation_error_1.ValidationError('A turma não possui formas de pagamento válidas.');
        }
        return turma;
    }
};
exports.GetTurmaByIdUseCase = GetTurmaByIdUseCase;
exports.GetTurmaByIdUseCase = GetTurmaByIdUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ITurmasGateway')),
    __metadata("design:paramtypes", [Object])
], GetTurmaByIdUseCase);
