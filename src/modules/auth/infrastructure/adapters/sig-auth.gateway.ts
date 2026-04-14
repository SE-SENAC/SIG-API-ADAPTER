import { injectable } from 'tsyringe';
import axios from 'axios';
import { IAuthGateway } from '../../domain/gateways/i-auth.gateway';
import { AuthToken } from '../../domain/entities/auth-token';
import { ENV } from '../../../../core/config/env.config';

@injectable()
export class SigAuthGateway implements IAuthGateway {
  
  public async login(): Promise<AuthToken> {
    const loginUrl = `${ENV.API_URL}/segserver/api/logins/form`;

    const formData = new URLSearchParams();
    if (!ENV.OAUTH_USERNAME || !ENV.OAUTH_PASSWORD) {
       throw new Error('Credenciais da API SIG (username e password) não configuradas no .env');
    }
    
    formData.append('username', ENV.OAUTH_USERNAME);
    formData.append('password', ENV.OAUTH_PASSWORD);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await axios.post(loginUrl, formData.toString(), config);
    const data = response.data;

    // Parseando a resposta (access_token, refresh_token, token_type, expires_in)
    return new AuthToken(
      data.access_token,
      data.token_type,
      data.expires_in,
      data.refresh_token
    );
  }
}
