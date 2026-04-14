import { singleton, inject } from 'tsyringe';
import { IAuthGateway } from '../../domain/gateways/i-auth.gateway';
import { AuthToken } from '../../domain/entities/auth-token';

@singleton()
export class TokenManagerService {
  private currentToken: AuthToken | null = null;
  // Promessa guardando a requisição ativa pra previnir concorrência (múltiplas requisições simultâneas forçando novos tokens)
  private fetchTokenPromise: Promise<AuthToken> | null = null;

  constructor(
    @inject('IAuthGateway') private readonly authGateway: IAuthGateway
  ) {}

  public async getValidToken(): Promise<string> {
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
    } finally {
      this.fetchTokenPromise = null;
    }
  }

  // Método opcional caso um token válido receba 401 do gateway antes de expirar localmente
  public forceExpireToken(): void {
    this.currentToken = null;
    console.log('[TokenManager] Token forçado a expirar (provavelmente falha de Gateway 401)');
  }

  // Método usado pelo Interceptor para atualizar o token quando o servidor devolve 'set-authorization'
  public updateToken(accessToken: string, expiresIn: number): void {
    this.currentToken = new AuthToken(accessToken, 'bearer', expiresIn);
    console.log('[TokenManager] Token renovado perfeitamente pelos Headers do SIG. Novo tempo:', expiresIn);
  }
}
