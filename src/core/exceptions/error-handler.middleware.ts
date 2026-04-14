import { Request, Response, NextFunction } from 'express';
import { DomainError } from './domain-error';

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return;
  }

  // Erros inesperados
  console.error('[Unhandled Error]', err);
  
  res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred.',
  });
}
