import { DomainError } from './domain-error';

export class GatewayError extends DomainError {
  constructor(message: string, statusCode: number = 502) {
    super(message, statusCode);
  }
}
