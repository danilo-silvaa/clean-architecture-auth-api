import { describe, expect, it } from 'vitest';
import { User } from '../../../domain/entities/user/User';
import { InvalidAccessTokenError } from '../../../domain/errors/user/InvalidAccessTokenError';
import { makeUserRepository } from '../../../app/factories/UserRepositoryFactory';
import { JwtTokenManager } from './JwtTokenManager';
import { makeEnvironmentValidation } from '../../../app/factories/EnvironmentValidationFactory';

describe('Jwt Token Manager', () => {
    const userRepository = makeUserRepository();
    const environmentValidation = makeEnvironmentValidation();
    const jwtTokenManager = new JwtTokenManager(environmentValidation.JWT_SIGNATURE_KEY, userRepository);
  
    it('should sign and verify a valid token', async () => {
        const userOrError = User.create({
            name: 'Danilo Silva',
            email: 'danilosilva@example.com',
            password: 'StrongStrongPassword123'
        });

        if (userOrError.isLeft()) {
            throw new Error('Unexpected error while creating user.');
        }

        const user = userOrError.value;
        await userRepository.add(user);

        const token = jwtTokenManager.sign(user.id, user.tokenSigningKey);

        expect(token).toBeDefined();

        const verificationResult = await jwtTokenManager.verify(token);

        expect(verificationResult.isRight()).toBe(true);
        expect(verificationResult.isLeft()).toBe(false);
    
        const verifiedUser = verificationResult.value as User;
        expect(verifiedUser.id).toBe(user.id);
    });

    it('should return InvalidAccessTokenError when verifying an invalid token', async () => {
        const invalidToken = 'invalid.token';

        const verificationResult = await jwtTokenManager.verify(invalidToken);

        expect(verificationResult.isRight()).toBe(false);
        expect(verificationResult.isLeft()).toBe(true);

        const error = verificationResult.value;
        expect(error).toBe(InvalidAccessTokenError);
    });
});