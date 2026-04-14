import { container } from 'tsyringe';
import { AxiosClientService } from '../http/axios-client.service';
import { SigAuthGateway } from '../../modules/auth/infrastructure/adapters/sig-auth.gateway';
import { TokenManagerService } from '../../modules/auth/application/services/token-manager.service';
import { SigTurmasGateway } from '../../modules/turmas/infrastructure/adapters/sig-turmas.gateway';
import { GetTurmasUseCase } from '../../modules/turmas/application/use-cases/get-turmas.use-case';
import { GetTurmaByIdUseCase } from '../../modules/turmas/application/use-cases/get-turma-by-id.use-case';

// HTTP
container.registerSingleton('IHttpClient', AxiosClientService);

// Auth Module
container.registerSingleton('IAuthGateway', SigAuthGateway);
container.registerSingleton('TokenManagerService', TokenManagerService);

// Turmas Module
container.registerSingleton('ITurmasGateway', SigTurmasGateway);
container.registerSingleton('IGetTurmasUseCase', GetTurmasUseCase);
container.registerSingleton('IGetTurmaByIdUseCase', GetTurmaByIdUseCase);

// Matrículas Module
import { SigMatriculasGateway } from '../../modules/matriculas/infrastructure/adapters/sig-matriculas.gateway';
import { GerarLinkMatriculaUseCase } from '../../modules/matriculas/application/use-cases/gerar-link-matricula.use-case';

container.registerSingleton('IMatriculasGateway', SigMatriculasGateway);
container.registerSingleton('IGerarLinkMatriculaUseCase', GerarLinkMatriculaUseCase);

console.log('[Tsyringe] Depedencies Registered');
