import { DomainError } from './domain-error';

export class ValidationError extends DomainError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
  }
}
