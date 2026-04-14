"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigAuthGateway = void 0;
const tsyringe_1 = require("tsyringe");
const axios_1 = __importDefault(require("axios"));
const auth_token_1 = require("../../domain/entities/auth-token");
const env_config_1 = require("../../../../core/config/env.config");
let SigAuthGateway = class SigAuthGateway {
    async login() {
        const loginUrl = `${env_config_1.ENV.API_URL}/segserver/api/logins/form`;
        const formData = new URLSearchParams();
        if (!env_config_1.ENV.OAUTH_USERNAME || !env_config_1.ENV.OAUTH_PASSWORD) {
            throw new Error('Credenciais da API SIG (username e password) não configuradas no .env');
        }
        formData.append('username', env_config_1.ENV.OAUTH_USERNAME);
        formData.append('password', env_config_1.ENV.OAUTH_PASSWORD);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await axios_1.default.post(loginUrl, formData.toString(), config);
        const data = response.data;
        // Parseando a resposta (access_token, refresh_token, token_type, expires_in)
        return new auth_token_1.AuthToken(data.access_token, data.token_type, data.expires_in, data.refresh_token);
    }
};
exports.SigAuthGateway = SigAuthGateway;
exports.SigAuthGateway = SigAuthGateway = __decorate([
    (0, tsyringe_1.injectable)()
], SigAuthGateway);
