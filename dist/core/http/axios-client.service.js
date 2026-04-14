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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosClientService = void 0;
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
const env_config_1 = require("../config/env.config");
const gateway_error_1 = require("../exceptions/gateway-error");
const validation_error_1 = require("../exceptions/validation-error");
let AxiosClientService = class AxiosClientService {
    api;
    constructor() {
        this.api = axios_1.default.create({
            baseURL: env_config_1.ENV.API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.api.interceptors.request.use(async (config) => {
            // Resolve lazily para evitar problemas com injeção circular na inicialização do Tsyringe
            const { container } = require('tsyringe');
            const tokenManager = container.resolve('TokenManagerService'); // Type override por import local
            try {
                const token = await tokenManager.getValidToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            catch (error) {
                console.error('[AxiosClient] Falha ao tentar obter token interno do SIG:', error);
            }
            return config;
        }, (error) => Promise.reject(error));
        this.api.interceptors.response.use((response) => {
            // [Refactor SIG] Checa se a API do SIG está fazendo "Auto-Refresh" do token nos headers
            const setAuthHeader = response.headers['set-authorization'];
            if (setAuthHeader) {
                try {
                    // A API envia como JSON escapado no header
                    const { container } = require('tsyringe');
                    const tokenManager = container.resolve('TokenManagerService');
                    const authData = JSON.parse(setAuthHeader);
                    if (authData.access_token) {
                        tokenManager.updateToken(authData.access_token, authData.expires_in);
                    }
                }
                catch (e) {
                    console.error('[AxiosClient] Falha ao tentar fazer o parse do set-authorization header', e);
                }
            }
            return response.data;
        }, (error) => {
            // Traduz falhas de HTTP para erros de domínio
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                if (status === 400 || status === 422) {
                    throw new validation_error_1.ValidationError(data?.message || 'Erro de validação na API externa', status);
                }
                throw new gateway_error_1.GatewayError(`Erro no Gateway [Status ${status}]: ${data?.message || error.message}`, status);
            }
            else if (error.request) {
                throw new gateway_error_1.GatewayError('Sem resposta do servidor externo (Timeout/Network)', 504);
            }
            throw new gateway_error_1.GatewayError(error.message, 500);
        });
    }
    async get(url, config) {
        return this.api.get(url, config);
    }
    async post(url, data, config) {
        return this.api.post(url, data, config);
    }
    async put(url, data, config) {
        return this.api.put(url, data, config);
    }
    async delete(url, config) {
        return this.api.delete(url, config);
    }
};
exports.AxiosClientService = AxiosClientService;
exports.AxiosClientService = AxiosClientService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AxiosClientService);
