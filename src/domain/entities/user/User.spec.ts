import { describe, expect, it } from 'vitest';
import { User } from './User';
import { InvalidNameError } from '../../errors/user/InvalidNameError';
import { InvalidEmailError } from '../../errors/user/InvalidEmailError';
import { InvalidPasswordError } from '../../errors/user/InvalidPasswordError';

describe('User domain entity', () => {
    it('should not be possible to create a user with an empty name', () => {
        const userOrError = User.create({
            name: '',
            email: 'danilosilva@example.com',
            password: 'StrongPassword123'
        });

        expect(userOrError.isLeft()).toBe(true);
        expect(userOrError.value).equals(InvalidNameError);
    });

    it('should not be possible to create a user with an invalid email', () => {
        const userOrError = User.create({
            name: 'Danilo Silva',
            email: 'invalid-email',
            password: 'StrongPassword123'
        });

        expect(userOrError.isLeft()).toBe(true);
        expect(userOrError.value).equals(InvalidEmailError);
    });

    it('should not be possible to create a user with a password shorter than 8 characters', () => {
        const userOrError = User.create({
            name: 'Danilo',
            email: 'danilosilva@example.com',
            password: '1234567'
        });

        expect(userOrError.isLeft()).toBe(true);
        expect(userOrError.value).equals(InvalidPasswordError);
    });

    it('should be possible to create a user with valid data', () => {
        const validUserData = {
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        };

        const userOrError = User.create(validUserData);

        if (userOrError.isLeft()) {
            throw new Error('Unexpected error while creating user.');
        }

        expect(userOrError.isRight()).toBe(true);

        const user = userOrError.value;
        
        expect(user.id).toBeDefined();
        expect(user.name).toBe(validUserData.name);
        expect(user.email).toBe(validUserData.email);
        expect(user.password).toBe(validUserData.password);
        expect(user.tokenSigningKey).toBeDefined();
        expect(user.createdAt).toBeInstanceOf(Date);
    });
});