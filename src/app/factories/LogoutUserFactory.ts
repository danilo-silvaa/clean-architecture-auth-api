import { LogoutUser } from '../../domain/usecases/LogoutUser/LogoutUser';
import { LogoutUserController } from '../controllers/LogoutUserController';
import { makeUserRepository } from './UserRepositoryFactory';

export const makeLogoutUserController = (): LogoutUserController => {
    const userRepository = makeUserRepository();
    const logoutUser = new LogoutUser(userRepository);
    return new LogoutUserController(logoutUser);
}