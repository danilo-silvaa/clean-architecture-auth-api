import { ChangeUserPassword } from '../../domain/usecases/ChangeUserPassword/ChangeUserPassword';
import { ChangeUserPasswordController } from '../controllers/ChangeUserPasswordController';
import { makePasswordHash } from './PasswordHashFactory';
import { makeUserRepository } from './UserRepositoryFactory';

export const makeChangeUserPasswordController = (): ChangeUserPasswordController => {
    const userRepository = makeUserRepository();
    const passwordHash = makePasswordHash();
    const changeUserPassword = new ChangeUserPassword(userRepository, passwordHash);
    return new ChangeUserPasswordController(changeUserPassword);
}