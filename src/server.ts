import { FastifyAdapter } from './infra/http/adapters/FastifyAdapter';
import { setupRoutes } from './app/routes/v1/Routes';
import { makeEnvironmentValidation } from './app/factories/EnvironmentValidationFactory';

const environmentValidation = makeEnvironmentValidation();

const httpServer = new FastifyAdapter();

setupRoutes(httpServer);

httpServer.listen(environmentValidation.PORT);