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
exports.TokenManagerService = void 0;
const tsyringe_1 = require("tsyringe");
const auth_token_1 = require("../../domain/entities/auth-token");
let TokenManagerService = class TokenManagerService {
    authGateway;
    currentToken = null;
    // Promessa guardando a requisição ativa pra previnir concorrência (múltiplas requisições simultâneas forçando novos tokens)
    fetchTokenPromise = null;
    constructor(authGateway) {
        this.authGateway = authGateway;
    }
    async getValidToken() {
        if (this.currentToken && !this.currentToken.isExpired()) {
            return this.currentToken.accessToken;
        }
        // Se já tiver uma requisição de fetch em andamento, retorna ela pra evitar race conditions
        if (this.fetchTokenPromise) {
            const waitToken = await this.fetchTokenPromise;
            return waitToken.accessToken;
        }
        try {
            this.fetchTokenPromise = this.authGateway.login();
            const newToken = await this.fetchTokenPromise;
            this.currentToken = newToken;
            console.log('[TokenManager] Novo Token SIG obtido com sucesso. Token expira em', newToken.expiresIn, 'segundos');
            return newToken.accessToken;
        }
        finally {
            this.fetchTokenPromise = null;
        }
    }
    // Método opcional caso um token válido receba 401 do gateway antes de expirar localmente
    forceExpireToken() {
        this.currentToken = null;
        console.log('[TokenManager] Token forçado a expirar (provavelmente falha de Gateway 401)');
    }
    // Método usado pelo Interceptor para atualizar o token quando o servidor devolve 'set-authorization'
    updateToken(accessToken, expiresIn) {
        this.currentToken = new auth_token_1.AuthToken(accessToken, 'bearer', expiresIn);
        console.log('[TokenManager] Token renovado perfeitamente pelos Headers do SIG. Novo tempo:', expiresIn);
    }
};
exports.TokenManagerService = TokenManagerService;
exports.TokenManagerService = TokenManagerService = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)('IAuthGateway')),
    __metadata("design:paramtypes", [Object])
], TokenManagerService);
