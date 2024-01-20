import { LoginUser } from '../../domain/usecases/LoginUser/LoginUser';
import { LoginUserController } from '../controllers/LoginUserController';
import { makePasswordHash } from './PasswordHashFactory';
import { makeTokenManager } from './TokenManagerFactory';
import { makeUserRepository } from './UserRepositoryFactory';

export const makeLoginUserController = (): LoginUserController => {
    const userRepository = makeUserRepository();
    const passwordHash = makePasswordHash();
    const tokenManager = makeTokenManager(userRepository);
    const loginUser = new LoginUser(userRepository, passwordHash, tokenManager);
    return new LoginUserController(loginUser);
}