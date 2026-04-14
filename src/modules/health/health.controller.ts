import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IHttpClient } from '../../core/http/i-http-client';

@injectable()
export class HealthController {
  // Exemplo de como você injetaria o http client ou um use-case no construtor
  constructor(
    @inject('IHttpClient') private readonly httpClient: IHttpClient
  ) {}

  public async check(req: Request, res: Response): Promise<void> {
    try {
      // Bate no endpoint de ping do SIG. O interceptor injetará o Bearer automaticamente!
      const sigResponse = await this.httpClient.get<string>('/integracaoserver/api/ping');
      
      res.status(200).json({ 
        status: 'Orchestrator and SIG API are healthy', 
        sigVersion: sigResponse, // Deve retornar "1.0.0.0"
        hasHttpClientBound: !!this.httpClient
      });
    } catch (error: any) {
      // Caso a API fora do ar, o erro sobe pelo GatewayError no interceptor
      res.status(502).json({
        status: 'SIG API is offline or unreachable',
        error: error.message
      });
    }
  }
}
