import { describe, expect, it } from 'vitest';
import { LoginUser } from './LoginUser';
import { User } from '../../entities/user/User';
import { InvalidEmailOrPasswordError } from '../../errors/user/InvalidEmailOrPasswordError';
import { makeUserRepository } from '../../../app/factories/UserRepositoryFactory';
import { makePasswordHash } from '../../../app/factories/PasswordHashFactory';
import { makeTokenManager } from '../../../app/factories/TokenManagerFactory';

describe('Login User Use Case', () => {
    const userRepository = makeUserRepository();
    const passwordHash = makePasswordHash();
    const tokenManager = makeTokenManager(userRepository);
    const loginUser = new LoginUser(userRepository, passwordHash, tokenManager);

    it('should login a user successfully', async () => {
        const userOrError = User.create({
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        });

        if (userOrError.isLeft()) {
            throw new Error('Unexpected error while creating user.');
        }

        const user = userOrError.value;

        user.password = await passwordHash.hash(user.password);

        await userRepository.add(user);
        
        const result = await loginUser.execute({
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        });

        expect(result.isRight()).toBe(true);
        const accessToken = result.value as string;
        expect(accessToken).toContain('.');
    });

    it('should not login with an incorrect email', async () => {
        const result = await loginUser.execute({
            email: 'email@incorrect.com',
            password: 'StrongStrongPassword123'
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBe(InvalidEmailOrPasswordError);
    });

    it('should not login with an incorrect password', async () => {
        const result = await loginUser.execute({
            email: 'danilosilva@example.com',
            password: 'password.incorrect'
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBe(InvalidEmailOrPasswordError);
    });
});