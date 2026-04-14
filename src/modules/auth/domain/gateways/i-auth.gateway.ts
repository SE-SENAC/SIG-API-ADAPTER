import { AuthToken } from '../entities/auth-token';

export interface IAuthGateway {
  login(): Promise<AuthToken>;
}
