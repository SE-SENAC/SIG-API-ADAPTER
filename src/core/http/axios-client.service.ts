import axios, { AxiosInstance, AxiosError } from 'axios';
import { injectable } from 'tsyringe';
import { IHttpClient } from './i-http-client';
import { ENV } from '../config/env.config';
import { GatewayError } from '../exceptions/gateway-error';
import { ValidationError } from '../exceptions/validation-error';

@injectable()
export class AxiosClientService implements IHttpClient {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: ENV.API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      async (config) => {
        // Resolve lazily para evitar problemas com injeção circular na inicialização do Tsyringe
        const { container } = require('tsyringe');
        const tokenManager = container.resolve('TokenManagerService') as any; // Type override por import local
        
        try {
          const token = await tokenManager.getValidToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('[AxiosClient] Falha ao tentar obter token interno do SIG:', error);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => {
        // [Refactor SIG] Checa se a API do SIG está fazendo "Auto-Refresh" do token nos headers
        const setAuthHeader = response.headers['set-authorization'];
        if (setAuthHeader) {
          try {
            // A API envia como JSON escapado no header
            const { container } = require('tsyringe');
            const tokenManager = container.resolve('TokenManagerService') as any;
            
            const authData = JSON.parse(setAuthHeader);
            if (authData.access_token) {
              tokenManager.updateToken(authData.access_token, authData.expires_in);
            }
          } catch (e) {
            console.error('[AxiosClient] Falha ao tentar fazer o parse do set-authorization header', e);
          }
        }
        
        return response.data;
      },
      (error: AxiosError) => {
        // Traduz falhas de HTTP para erros de domínio
        if (error.response) {
          const status = error.response.status;
          const data: any = error.response.data;
          
          if (status === 400 || status === 422) {
            throw new ValidationError(data?.message || 'Erro de validação na API externa', status);
          }
          
          throw new GatewayError(`Erro no Gateway [Status ${status}]: ${data?.message || error.message}`, status);
        } else if (error.request) {
          throw new GatewayError('Sem resposta do servidor externo (Timeout/Network)', 504);
        }
        
        throw new GatewayError(error.message, 500);
      }
    );
  }

  public async get<T>(url: string, config?: any): Promise<T> {
    return this.api.get<T>(url, config) as unknown as Promise<T>;
  }

  public async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.api.post<T>(url, data, config) as unknown as Promise<T>;
  }

  public async put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.api.put<T>(url, data, config) as unknown as Promise<T>;
  }

  public async delete<T>(url: string, config?: any): Promise<T> {
    return this.api.delete<T>(url, config) as unknown as Promise<T>;
  }
}
