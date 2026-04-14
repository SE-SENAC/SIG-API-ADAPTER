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
exports.TurmasController = void 0;
const tsyringe_1 = require("tsyringe");
const get_turmas_filters_dto_1 = require("../../domain/dtos/get-turmas-filters.dto");
let TurmasController = class TurmasController {
    getTurmasUseCase;
    getTurmaByIdUseCase;
    constructor(getTurmasUseCase, getTurmaByIdUseCase) {
        this.getTurmasUseCase = getTurmasUseCase;
        this.getTurmaByIdUseCase = getTurmaByIdUseCase;
    }
    async getTurmaById(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID deve ser numérico.' });
            return;
        }
        const result = await this.getTurmaByIdUseCase.execute(id);
        res.status(200).json(result);
    }
    async getTurmas(req, res) {
        const filters = new get_turmas_filters_dto_1.GetTurmasFiltersDto(req.query.pagina ? Number(req.query.pagina) : 1, req.query.tamanhoDaPagina ? Number(req.query.tamanhoDaPagina) : 10, req.query.codigoDoPlano, req.query.unidadeOperativaId ? Number(req.query.unidadeOperativaId) : undefined, req.query.codigoDaTurmaFormatado, req.query.localidadeDaTurmaId ? Number(req.query.localidadeDaTurmaId) : undefined);
        const result = await this.getTurmasUseCase.execute(filters);
        res.status(200).json(result);
    }
};
exports.TurmasController = TurmasController;
exports.TurmasController = TurmasController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetTurmasUseCase')),
    __param(1, (0, tsyringe_1.inject)('IGetTurmaByIdUseCase')),
    __metadata("design:paramtypes", [Object, Object])
], TurmasController);
