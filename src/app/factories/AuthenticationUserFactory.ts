import { AuthenticationUserMiddleware } from '../middlewares/AuthenticationUserMiddleware';
import { makeTokenManager } from './TokenManagerFactory';
import { makeUserRepository } from './UserRepositoryFactory';

export const makeAuthenticationUserMiddleware = (): AuthenticationUserMiddleware => {
    const userRepository = makeUserRepository();
    const tokenManager = makeTokenManager(userRepository);
    return new AuthenticationUserMiddleware(tokenManager);
}