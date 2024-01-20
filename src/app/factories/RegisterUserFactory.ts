import { RegisterUser } from '../../domain/usecases/RegisterUser/RegisterUser';
import { RegisterUserController } from '../controllers/RegisterUserController';
import { makePasswordHash } from './PasswordHashFactory';
import { makeTokenManager } from './TokenManagerFactory';
import { makeUserRepository } from './UserRepositoryFactory';

export const makeRegisterUserController = (): RegisterUserController => {
    const userRepository = makeUserRepository();
    const passwordHash = makePasswordHash();
    const tokenManager = makeTokenManager(userRepository);
    const registerUser = new RegisterUser(userRepository, passwordHash, tokenManager);
    return new RegisterUserController(registerUser);
}