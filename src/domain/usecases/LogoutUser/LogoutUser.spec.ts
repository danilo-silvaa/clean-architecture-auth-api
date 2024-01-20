import { describe, expect, it } from 'vitest';
import { User } from '../../entities/user/User';
import { LogoutUser } from './LogoutUser';
import { makeUserRepository } from '../../../app/factories/UserRepositoryFactory';

describe('Logout User Use Case', () => {
    const userRepository = makeUserRepository();
    const logoutUser = new LogoutUser(userRepository);
    let oldTokenSigningKey: string;

    it('should logout a user', async () => {
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

        await userRepository.add(user);

        const result = await logoutUser.execute(user);

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
});