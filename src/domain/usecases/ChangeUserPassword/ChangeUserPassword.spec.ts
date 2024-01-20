import { describe, expect, it } from 'vitest';
import { ChangeUserPassword } from './ChangeUserPassword';
import { User } from '../../entities/user/User';
import { CurrentPasswordIncorrectError } from '../../errors/user/CurrentPasswordIncorrectError';
import { makeUserRepository } from '../../../app/factories/UserRepositoryFactory';
import { makePasswordHash } from '../../../app/factories/PasswordHashFactory';

describe('Change User Password Use Case', () => {
    const userRepository = makeUserRepository();
    const passwordHash = makePasswordHash();
    const changeUserPassword = new ChangeUserPassword(userRepository, passwordHash);
    let oldTokenSigningKey: string;

    it('should update user password', async () => {
        const userOrError = User.create({
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        });

        if (userOrError.isLeft()) {
            throw new Error('Unexpected error while creating user.');
        }

        const user = userOrError.value;

        oldTokenSigningKey = user.tokenSigningKey;

        user.password = await passwordHash.hash(user.password);

        await userRepository.add(user);

        const result = await changeUserPassword.execute({
            currentPassword: 'StrongStrongPassword123',
            newPassword: 'NewStrongPassword456',
            user
        });

        expect(result.isRight()).toBe(true);
        expect(result.value).toBe(null);
    });

    it('should update user token signing key', async () => {
        let foundUserByEmail = await userRepository.findByEmail('danilosilva@example.com');

        expect(foundUserByEmail).toBeTruthy();

        if (!foundUserByEmail) {
            throw new Error('Unexpected error while find user.');
        }

        expect(foundUserByEmail.tokenSigningKey).not.toBe(oldTokenSigningKey);
    });

    it('should return an error if the current password is incorrect', async () => {
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

        const result = await changeUserPassword.execute({
            currentPassword: 'password.incorrect',
            newPassword: 'NewStrongPassword456',
            user
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBe(CurrentPasswordIncorrectError);
    });
});