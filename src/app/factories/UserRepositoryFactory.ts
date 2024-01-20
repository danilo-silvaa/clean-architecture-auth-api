import { UserRepository } from '../../domain/repositories/UserRepository';
import { InMemoryUserRepository } from '../../infra/repositories/InMemory/InMemoryUserRepository';

let userRepositoryInstance: UserRepository | null;

export const makeUserRepository = (): UserRepository => {
    if (!userRepositoryInstance) {
        userRepositoryInstance = new InMemoryUserRepository();
    }
    return userRepositoryInstance;
};