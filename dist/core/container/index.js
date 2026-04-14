"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const axios_client_service_1 = require("../http/axios-client.service");
const sig_auth_gateway_1 = require("../../modules/auth/infrastructure/adapters/sig-auth.gateway");
const token_manager_service_1 = require("../../modules/auth/application/services/token-manager.service");
const sig_turmas_gateway_1 = require("../../modules/turmas/infrastructure/adapters/sig-turmas.gateway");
const get_turmas_use_case_1 = require("../../modules/turmas/application/use-cases/get-turmas.use-case");
const get_turma_by_id_use_case_1 = require("../../modules/turmas/application/use-cases/get-turma-by-id.use-case");
// HTTP
tsyringe_1.container.registerSingleton('IHttpClient', axios_client_service_1.AxiosClientService);
// Auth Module
tsyringe_1.container.registerSingleton('IAuthGateway', sig_auth_gateway_1.SigAuthGateway);
tsyringe_1.container.registerSingleton('TokenManagerService', token_manager_service_1.TokenManagerService);
// Turmas Module
tsyringe_1.container.registerSingleton('ITurmasGateway', sig_turmas_gateway_1.SigTurmasGateway);
tsyringe_1.container.registerSingleton('IGetTurmasUseCase', get_turmas_use_case_1.GetTurmasUseCase);
tsyringe_1.container.registerSingleton('IGetTurmaByIdUseCase', get_turma_by_id_use_case_1.GetTurmaByIdUseCase);
// Matrículas Module
const sig_matriculas_gateway_1 = require("../../modules/matriculas/infrastructure/adapters/sig-matriculas.gateway");
const gerar_link_matricula_use_case_1 = require("../../modules/matriculas/application/use-cases/gerar-link-matricula.use-case");
tsyringe_1.container.registerSingleton('IMatriculasGateway', sig_matriculas_gateway_1.SigMatriculasGateway);
tsyringe_1.container.registerSingleton('IGerarLinkMatriculaUseCase', gerar_link_matricula_use_case_1.GerarLinkMatriculaUseCase);
console.log('[Tsyringe] Depedencies Registered');
