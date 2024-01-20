import { UserRepository } from '../../domain/repositories/UserRepository';
import { TokenManager } from '../../domain/services/TokenManager';
import { JwtTokenManager } from '../../infra/services/TokenManager/JwtTokenManager';
import { makeEnvironmentValidation } from './EnvironmentValidationFactory';

let tokenManagerInstance: TokenManager | null;

export const makeTokenManager = (userRepository: UserRepository): TokenManager => {
    const environmentValidation = makeEnvironmentValidation();

    if (!tokenManagerInstance) {
        tokenManagerInstance = new JwtTokenManager(
            environmentValidation.JWT_SIGNATURE_KEY,
            userRepository
        );
    }
    return tokenManagerInstance;
};