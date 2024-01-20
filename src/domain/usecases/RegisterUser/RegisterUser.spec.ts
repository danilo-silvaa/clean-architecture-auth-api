import { describe, expect, it } from 'vitest';
import { RegisterUser } from './RegisterUser';
import { EmailExistsError } from '../../errors/user/EmailExistsError';
import { makeUserRepository } from '../../../app/factories/UserRepositoryFactory';
import { makePasswordHash } from '../../../app/factories/PasswordHashFactory';
import { makeTokenManager } from '../../../app/factories/TokenManagerFactory';

describe('Register User Use Case', () => {
    const userRepository = makeUserRepository();
    const passwordHash = makePasswordHash();
    const tokenManager = makeTokenManager(userRepository);
    const registerUser = new RegisterUser(userRepository, passwordHash, tokenManager);

    it('should register a user successfully', async () => {
        const registerUserData = {
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        }

        const result = await registerUser.execute(registerUserData);

        expect(result.isRight()).toBe(true);
        const accessToken = result.value as string;
        expect(accessToken).toContain('.');
    });

    it('should return EmailExistsError if email already exists', async () => {
        const registerUserData = {
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        }

        const result = await registerUser.execute(registerUserData);

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBe(EmailExistsError);
    });
});