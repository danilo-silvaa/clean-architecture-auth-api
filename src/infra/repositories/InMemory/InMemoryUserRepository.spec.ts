import { describe, expect, it } from 'vitest';
import { User } from '../../../domain/entities/user/User';
import { InMemoryUserRepository } from './InMemoryUserRepository';

describe('In Memory User Repository', () => {
    let inMemoryUserRepository = new InMemoryUserRepository();

    it('should add a user and check if it exists', async () => {
        const userOrError = User.create({
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        });

        if (userOrError.isLeft()) {
            throw new Error('Unexpected error while creating user.');
        }

        const user = userOrError.value;
        await inMemoryUserRepository.add(user);

        const exists = await inMemoryUserRepository.exists(user.email);
        expect(exists).toBe(true);

        const foundUserById = await inMemoryUserRepository.findById(user.id);
        expect(foundUserById).toBeDefined();
        expect(foundUserById?.id).toBe(user.id);
        expect(foundUserById?.name).toBe(user.name);
        expect(foundUserById?.email).toBe(user.email);
        expect(foundUserById?.password).toBe(user.password);
        expect(foundUserById?.createdAt).toBe(user.createdAt);

        const foundUserByEmail = await inMemoryUserRepository.findByEmail(user.email);
        expect(foundUserByEmail).toBeDefined();
        expect(foundUserByEmail?.id).toBe(user.id);
        expect(foundUserByEmail?.name).toBe(user.name);
        expect(foundUserByEmail?.email).toBe(user.email);
        expect(foundUserByEmail?.password).toBe(user.password);
        expect(foundUserByEmail?.createdAt).toBe(user.createdAt);
    });

    it('should return false when checking for non-existent user', async () => {
        const exists = await inMemoryUserRepository.exists('nonexistent@email.com');
        expect(exists).toBe(false);
    });

    it('Should return false when searching for a non-existent user by id', async () => {
        const foundUserById = await inMemoryUserRepository.findById('nonexistentId');
        expect(foundUserById).toBeFalsy();
    });

    it('Should return false when searching for a non-existent user by email', async () => {
        const foundUserByEmail = await inMemoryUserRepository.findByEmail('nonexistentEmail');
        expect(foundUserByEmail).toBeFalsy();
    });

    it('should update user password', async () => {
        let foundUserByEmail = await inMemoryUserRepository.findByEmail('danilosilva@example.com');
        expect(foundUserByEmail).toBeTruthy();

        if (!foundUserByEmail) {
            throw new Error('Unexpected error while find user.');
        }

        const newPassword = 'NewStrongPassword456';
        await inMemoryUserRepository.updatePassword(foundUserByEmail.id, newPassword);

        foundUserByEmail = await inMemoryUserRepository.findByEmail('danilosilva@example.com');

        expect(foundUserByEmail).toBeTruthy();
        expect(foundUserByEmail?.password).toBe(newPassword);
    });

    it('should update user token signing key', async () => {
        let foundUserByEmail = await inMemoryUserRepository.findByEmail('danilosilva@example.com');
        
        expect(foundUserByEmail).toBeTruthy();

        if (!foundUserByEmail) {
            throw new Error('Unexpected error while find user.');
        }

        const newTokenSigningKey = 'NewTokenSigningKey';
        await inMemoryUserRepository.updateTokenSigningKey(foundUserByEmail.id, newTokenSigningKey);

        foundUserByEmail = await inMemoryUserRepository.findByEmail('danilosilva@example.com');

        expect(foundUserByEmail).toBeTruthy();
        expect(foundUserByEmail?.tokenSigningKey).toBe(newTokenSigningKey);
    });
});